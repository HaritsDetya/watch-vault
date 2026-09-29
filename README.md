# 🎬 WatchVault - Personal Movies, Series & Anime Tracker

WatchVault adalah platform cloud pribadi untuk melacak seluruh tontonan layar Anda: Film bioskop, Serial/TV Show barat, Drama Korea (Drakor), dan Anime dalam satu tempat yang rapi dan terorganisir.

---

## ✨ Fitur Utama

- 🎥 **Multi-Format Support:** Melacak **Film Bioskop**, **Series / Drakor**, dan **Anime**.
- 🔍 **Otomasi Metadata TMDB:** Terhubung dengan The Movie Database (TMDB API) untuk menarik cover poster resmi, sinopsis, developer/studio, genre, dan tahun rilis otomatis (disertai fallback database offline siap pakai).
- ⏱️ **Episode Progress Tracker:** Melacak progres episode serial dan anime (*misal: Ep 8 / 12*) dengan tombol cepat **+1 Episode** langsung dari kartu tontonan.
- 🍿 **Katalog Platform Tontonan:** Filter tempat Anda menonton (Bioskop XXI, Netflix, Disney+, Prime Video, Bstation, Crunchyroll, TV Lokal, Laptop).
- 📝 **Ulasan & Catatan Teori (Markdown):** Simpan ulasan pribadi, teori misteri alur cerita, atau kutipan dialog berkesan.
- 📊 **Statistik Otomatis:** Menghitung total film tamat, total episode yang sudah ditonton, estimasi jam tonton, dan rata-rata skor rating.
- 💾 **Backup & Restore (.JSON):** Ekspor dan impor seluruh data arsip tontonan Anda kapan saja.
- ☁️ **Siap Deploy Cloud ($0/Bulan):** Siap di-deploy ke Vercel dan diakses dari HP atau browser mana pun.

---

## 🚀 Cara Menjalankan Secara Lokal

1. Buka terminal di folder proyek:
   ```bash
   cd "D:\Program Files\VS Code File\watch-vault"
   ```
2. Jalankan development server:
   ```bash
   npm run dev
   ```
3. Buka browser di **[http://localhost:3000](http://localhost:3000)** (atau port 3001 jika port 3000 sedang digunakan oleh GameVault).

---

## 🔑 Mendapatkan TMDB API Key (Gratis)

1. Daftar akun di [themoviedb.org](https://www.themoviedb.org/).
2. Masuk ke **Settings > API** ([themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)).
3. Buat API Key gratis (pilih jenis *Developer / Personal*).
4. Di WatchVault, buka menu **Pengaturan** di pojok kanan atas, tempel API Key Anda, lalu klik **Simpan**.
