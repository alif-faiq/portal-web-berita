<?php

namespace App\Controllers;

class Home extends BaseController
{
    public function index()
    {
        return redirect()->to('/kategori/terbaru');
    }

    public function kategori($kategori)
    {
        $kategoriValid = [
            'terbaru',
            'nasional',
            'internasional',
            'ekonomi',
            'olahraga',
            'teknologi',
            'hiburan',
            'gaya-hidup'
        ];

        if (!in_array($kategori, $kategoriValid)) {
            throw \CodeIgniter\Exceptions\PageNotFoundException::forPageNotFound();
        }

        // Khusus kategori terbaru
        if ($kategori == 'terbaru') {
            $url = 'https://berita-indo-api-next.vercel.app/api/cnn-news/';
        } else {
            $url = 'https://berita-indo-api-next.vercel.app/api/cnn-news/' . $kategori;
        }

        $api = file_get_contents($url);
        $result = json_decode($api, true);

        $data = [
            'title' => ucfirst($kategori),
            'kategori' => $kategori,
            'berita' => $result['data']
        ];

        return view('home', $data);
    }
}
