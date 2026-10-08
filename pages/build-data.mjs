import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const categories = [
    "terbaru",
    "nasional",
    "internasional",
    "ekonomi",
    "olahraga",
    "teknologi",
    "hiburan",
    "gaya-hidup"
];
const apiBase = "https://berita-indo-api-next.vercel.app/api/cnn-news";
const outputDirectory = path.resolve(process.argv[2] || "_site/data");

async function fetchCategory(slug) {
    const endpoint = slug === "terbaru" ? `${apiBase}/` : `${apiBase}/${slug}`;
    const response = await fetch(endpoint, {
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(30000)
    });

    if (!response.ok) {
        throw new Error(`${slug}: API merespons dengan status ${response.status}.`);
    }

    const payload = await response.json();
    if (!Array.isArray(payload?.data)) {
        throw new Error(`${slug}: format data API tidak sesuai (field "data" bukan array).`);
    }

    await writeFile(
        path.join(outputDirectory, `${slug}.json`),
        `${JSON.stringify(payload)}\n`,
        "utf8"
    );
}

try {
    await mkdir(outputDirectory, { recursive: true });
    await Promise.all(categories.map(fetchCategory));
    console.log(`Berhasil menyiapkan snapshot berita untuk ${categories.length} kategori.`);
} catch (error) {
    console.error("Gagal membuat snapshot berita untuk GitHub Pages:", error);
    process.exitCode = 1;
}
