<?php

/**
 * @var string $title
 * @var array $berita
 */
?>
<?= $this->include('layout/header') ?>

<!-- Page Header -->
<div class="page-header">
    <div class="container">
        <div class="page-heading">
            <div>
                <p class="page-eyebrow inline-flex items-center gap-2">
                    <span class="page-eyebrow__line"></span> KABAR TERKINI
                </p>
                <h1><?= esc($title) ?></h1>
                <p class="page-intro">Ikuti kabar terbaru dan pilihan redaksi hari ini.</p>
            </div>
            <span class="article-count inline-flex items-center gap-2">
                <i class="bi bi-newspaper"></i>
                <?= count($berita) ?> artikel
            </span>
        </div>
    </div>
</div>

<!-- Main Content -->
<main class="news-main py-5">
    <div class="container">
        <div class="row g-4">

            <?php foreach ($berita as $index => $item): ?>

                <?php if ($index === 0): ?>
                    <!-- ── Featured Card (artikel pertama) ── -->
                    <div class="col-12">
                        <article class="news-card news-card--featured">
                            <div class="row g-0 h-100">
                                <div class="col-lg-7">
                                    <div class="news-card__img-wrap news-card__img-wrap--featured">
                                        <img
                                            src="<?= esc($item['image']['small']) ?>"
                                            alt="<?= esc($item['title']) ?>"
                                            class="news-card__img"
                                            fetchpriority="high">
                                        <span class="news-card__badge">
                                            <i class="bi bi-star-fill me-1"></i>Pilihan Utama
                                        </span>
                                        <span class="news-card__image-caption">Sorotan hari ini</span>
                                    </div>
                                </div>
                                <div class="col-lg-5 d-flex flex-column">
                                    <div class="news-card__body news-card__body--featured">
                                        <div class="news-card__meta">
                                            <i class="bi bi-clock me-1"></i>
                                            <?= date('d M Y', strtotime($item['isoDate'])) ?>
                                        </div>
                                        <h2 class="news-card__title news-card__title--featured">
                                            <?= esc($item['title']) ?>
                                        </h2>
                                        <p class="news-card__snippet">
                                            <?= esc($item['contentSnippet']) ?>
                                        </p>
                                        <a href="<?= esc($item['link']) ?>"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            class="news-btn news-btn--primary mt-auto">
                                            <span>Baca Selengkapnya</span>
                                            <i class="bi bi-arrow-up-right ms-2"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>

                <?php else: ?>
                    <!-- ── Regular Card ── -->
                    <div class="col-md-6 col-lg-4">
                        <article class="news-card">
                            <div class="news-card__img-wrap">
                                <img
                                    src="<?= esc($item['image']['small']) ?>"
                                    alt="<?= esc($item['title']) ?>"
                                    class="news-card__img"
                                    loading="lazy">
                            </div>
                            <div class="news-card__body">
                                <div class="news-card__meta">
                                    <i class="bi bi-clock me-1"></i>
                                    <?= date('d M Y', strtotime($item['isoDate'])) ?>
                                </div>
                                <h3 class="news-card__title">
                                    <?= esc($item['title']) ?>
                                </h3>
                                <p class="news-card__snippet">
                                    <?= esc($item['contentSnippet']) ?>
                                </p>
                                <div class="news-card__footer">
                                    <a href="<?= esc($item['link']) ?>"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="news-btn news-btn--outline">
                                        Baca
                                        <i class="bi bi-arrow-up-right ms-1"></i>
                                    </a>
                                </div>
                            </div>
                        </article>
                    </div>
                <?php endif; ?>

            <?php endforeach; ?>

        </div><!-- /row -->

        <!-- Back to top -->
        <div class="text-center mt-5 pt-3 border-top">
            <a href="#" class="back-top">
                <i class="bi bi-arrow-up-circle me-1"></i>Kembali ke Atas
            </a>
        </div>

    </div>
</main>

<?= $this->include('layout/footer') ?>