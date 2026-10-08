<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $title ?? 'Portal Berita' ?></title>

    <!-- Bootstrap 5 -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Tailwind utilities (Bootstrap remains responsible for the grid and components) -->
    <script>
        window.tailwind = {
            config: {
                corePlugins: {
                    preflight: false
                }
            }
        };
    </script>
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Bootstrap Icons -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet">
    <!-- Google Fonts: Lora for editorial headlines + DM Sans for readable body text -->
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Lora:wght@500;600;700&display=swap" rel="stylesheet">

    <!-- Custom Stylesheet -->
    <link href="<?= base_url('css/style.css') ?>" rel="stylesheet">
</head>

<body>

    <!-- Top Bar -->
    <div class="topbar">
        <div class="container d-flex justify-content-between align-items-center">
            <span class="inline-flex items-center gap-2">
                <i class="bi bi-calendar3 me-1"></i>
                <?= date('l, d F Y') ?>
            </span>
            <span class="inline-flex items-center gap-2">
                <i class="bi bi-circle-fill text-danger" style="font-size:0.5rem"></i>
                Berita Terkini &amp; Terpercaya
            </span>
        </div>
    </div>

    <!-- Masthead -->
    <header class="masthead">
        <div class="container d-flex align-items-center justify-content-between">
            <a href="<?= site_url('/') ?>" class="masthead-logo inline-flex items-center gap-3">
                <span class="masthead-mark"><i class="bi bi-newspaper"></i></span>
                <span class="masthead-wordmark">Portal<span>Berita</span></span>
            </a>
            <div class="text-end">
                <div class="masthead-tagline">Informasi terpercaya</div>
                <div class="masthead-tagline">Setiap hari, untuk semua</div>
            </div>
        </div>
    </header>

    <!-- Category Navigation -->
    <nav class="cat-nav">
        <div class="container">
            <a href="<?= site_url('kategori/terbaru') ?>" class="<?= ($kategori ?? '') === 'terbaru' ? 'active' : '' ?>"><i class="bi bi-house-fill me-1"></i>Terbaru</a>
            <a href="<?= site_url('kategori/nasional') ?>" class="<?= ($kategori ?? '') === 'nasional' ? 'active' : '' ?>">Nasional</a>
            <a href="<?= site_url('kategori/internasional') ?>" class="<?= ($kategori ?? '') === 'internasional' ? 'active' : '' ?>">Internasional</a>
            <a href="<?= site_url('kategori/ekonomi') ?>" class="<?= ($kategori ?? '') === 'ekonomi' ? 'active' : '' ?>">Ekonomi</a>
            <a href="<?= site_url('kategori/olahraga') ?>" class="<?= ($kategori ?? '') === 'olahraga' ? 'active' : '' ?>">Olahraga</a>
            <a href="<?= site_url('kategori/teknologi') ?>" class="<?= ($kategori ?? '') === 'teknologi' ? 'active' : '' ?>">Teknologi</a>
            <a href="<?= site_url('kategori/hiburan') ?>" class="<?= ($kategori ?? '') === 'hiburan' ? 'active' : '' ?>">Hiburan</a>
            <a href="<?= site_url('kategori/gaya-hidup') ?>" class="<?= ($kategori ?? '') === 'gaya-hidup' ? 'active' : '' ?>">Gaya Hidup</a>
        </div>
    </nav>