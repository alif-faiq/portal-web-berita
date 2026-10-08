(() => {
    "use strict";

    const categories = [
        { slug: "terbaru", label: "Terbaru" },
        { slug: "nasional", label: "Nasional" },
        { slug: "internasional", label: "Internasional" },
        { slug: "ekonomi", label: "Ekonomi" },
        { slug: "olahraga", label: "Olahraga" },
        { slug: "teknologi", label: "Teknologi" },
        { slug: "hiburan", label: "Hiburan" },
        { slug: "gaya-hidup", label: "Gaya Hidup" }
    ];
    const cachedStories = new Map();
    const nav = document.querySelector("#category-nav");
    const grid = document.querySelector("#news-grid");
    const title = document.querySelector("#category-title");
    const count = document.querySelector("#article-count");

    document.querySelector("#current-date").textContent = new Intl.DateTimeFormat("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    }).format(new Date());
    document.querySelector("#current-year").textContent = new Date().getFullYear();

    function routeFor(slug) {
        return `#/kategori/${slug}`;
    }

    function renderNavigation() {
        nav.innerHTML = categories.map((category, index) => `
            <a href="${routeFor(category.slug)}" data-category="${category.slug}"${index === 0 ? ' class="home-link"' : ""}>
                ${index === 0 ? '<i class="bi bi-house-fill me-1"></i>' : ""}${category.label}
            </a>
        `).join("");

        document.querySelector("#footer-category-links").innerHTML = categories.map(category =>
            `<li><a href="${routeFor(category.slug)}">${category.label}</a></li>`
        ).join("");
    }

    function safeUrl(value) {
        try {
            const url = new URL(value);
            return url.protocol === "https:" || url.protocol === "http:" ? url.href : "";
        } catch {
            return "";
        }
    }

    function escapeHtml(value) {
        return String(value).replace(/[&<>"']/g, character => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[character]);
    }

    function formatDate(value) {
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return "Tanggal tidak tersedia";
        return new Intl.DateTimeFormat("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric"
        }).format(date);
    }

    function storyCard(story, index) {
        const image = escapeHtml(safeUrl(story?.image?.small));
        const link = escapeHtml(safeUrl(story?.link));
        const imageMarkup = image
            ? `<img src="${image}" alt="" class="news-card__img" ${index === 0 ? 'fetchpriority="high"' : 'loading="lazy"'}>`
            : '<div class="news-card__image-placeholder" aria-hidden="true"><i class="bi bi-image"></i></div>';
        const headline = escapeHtml(story?.title ?? "Judul berita tidak tersedia");
        const summary = escapeHtml(story?.contentSnippet ?? "");
        const date = formatDate(story?.isoDate);
        const readLink = link
            ? `<a href="${link}" target="_blank" rel="noopener noreferrer" class="news-btn ${index === 0 ? "news-btn--primary mt-auto" : "news-btn--outline"}">${index === 0 ? "<span>Baca Selengkapnya</span>" : "Baca"} <i class="bi bi-arrow-up-right ms-2"></i></a>`
            : "";

        if (index === 0) {
            return `<div class="col-12">
                <article class="news-card news-card--featured">
                    <div class="row g-0 h-100">
                        <div class="col-lg-7">
                            <div class="news-card__img-wrap news-card__img-wrap--featured">
                                ${imageMarkup}
                                <span class="news-card__badge"><i class="bi bi-star-fill me-1"></i>Pilihan Utama</span>
                                <span class="news-card__image-caption">Sorotan hari ini</span>
                            </div>
                        </div>
                        <div class="col-lg-5 d-flex flex-column">
                            <div class="news-card__body news-card__body--featured">
                                <div class="news-card__meta"><i class="bi bi-clock me-1"></i>${date}</div>
                                <h2 class="news-card__title news-card__title--featured">${headline}</h2>
                                <p class="news-card__snippet">${summary}</p>
                                ${readLink}
                            </div>
                        </div>
                    </div>
                </article>
            </div>`;
        }

        return `<div class="col-md-6 col-lg-4">
            <article class="news-card">
                <div class="news-card__img-wrap">${imageMarkup}</div>
                <div class="news-card__body">
                    <div class="news-card__meta"><i class="bi bi-clock me-1"></i>${date}</div>
                    <h2 class="news-card__title">${headline}</h2>
                    <p class="news-card__snippet">${summary}</p>
                    <div class="news-card__footer">${readLink}</div>
                </div>
            </article>
        </div>`;
    }

    function showError(message) {
        count.innerHTML = '<i class="bi bi-exclamation-circle"></i> Gagal memuat';
        grid.setAttribute("aria-busy", "false");
        grid.innerHTML = `<div class="col-12"><div class="news-error" role="alert">
            <i class="bi bi-wifi-off"></i>
            <h2>Berita belum dapat dimuat</h2>
            <p>${message}</p>
            <button class="news-btn news-btn--primary" type="button" id="retry-loading">Coba lagi</button>
        </div></div>`;
        document.querySelector("#retry-loading").addEventListener("click", () => loadCategory(currentCategory, true));
    }

    let currentCategory = "terbaru";

    async function loadCategory(slug, refresh = false) {
        const category = categories.find(item => item.slug === slug);
        if (!category) {
            showError("Kategori yang diminta tidak tersedia.");
            return;
        }

        currentCategory = slug;
        title.textContent = category.label;
        count.innerHTML = '<i class="bi bi-newspaper"></i> Memuat berita...';
        nav.querySelectorAll("a[data-category]").forEach(link => {
            const active = link.dataset.category === slug;
            link.classList.toggle("active", active);
            if (active) link.setAttribute("aria-current", "page");
            else link.removeAttribute("aria-current");
        });
        grid.setAttribute("aria-busy", "true");
        grid.innerHTML = '<div class="col-12"><p class="loading-message"><span class="spinner-border spinner-border-sm me-2" role="status"></span>Memuat berita...</p></div>';

        try {
            let stories = refresh ? null : cachedStories.get(slug);
            if (!stories) {
                const response = await fetch(`data/${encodeURIComponent(slug)}.json`, {
                    headers: { Accept: "application/json" }
                });
                if (!response.ok) throw new Error(`Layanan berita merespons dengan status ${response.status}.`);
                const payload = await response.json();
                if (!Array.isArray(payload?.data)) throw new Error("Format data dari layanan berita tidak sesuai.");
                stories = payload.data;
                cachedStories.set(slug, stories);
            }

            if (currentCategory !== slug) return;
            count.innerHTML = `<i class="bi bi-newspaper"></i> ${stories.length} artikel`;
            grid.innerHTML = stories.length
                ? stories.map(storyCard).join("")
                : '<div class="col-12"><p class="news-empty">Belum ada berita untuk kategori ini.</p></div>';
            grid.setAttribute("aria-busy", "false");
        } catch (error) {
            if (currentCategory !== slug) return;
            console.error("Gagal memuat berita:", error);
            showError("Periksa koneksi internet Anda, lalu coba muat ulang berita.");
        }
    }

    function routeFromHash() {
        if (window.location.hash === "#top") return;
        const match = window.location.hash.match(/^#\/kategori\/([^/?#]+)$/);
        let slug = "terbaru";
        if (match) {
            try {
                slug = decodeURIComponent(match[1]);
            } catch {
                window.location.hash = routeFor("terbaru");
                return;
            }
        }
        if (!categories.some(category => category.slug === slug)) {
            window.location.hash = routeFor("terbaru");
            return;
        }
        loadCategory(slug);
    }

    renderNavigation();
    window.addEventListener("hashchange", routeFromHash);
    if (!window.location.hash) window.location.hash = routeFor("terbaru");
    else routeFromHash();
})();
