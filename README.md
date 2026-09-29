# 🎬 WatchVault

A modern, self-hosted personal watch tracking platform built with Next.js. Track your movies, TV series, K-dramas, and anime — with episode progress tracking, personal reviews, and auto-fetched metadata from TMDB.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss) ![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)

---

## ✨ Features

- 🎥 **Multi-Format Support** — Track **Movies**, **TV Series / K-Dramas**, and **Anime** in a unified interface.
- 🔍 **Auto Metadata via TMDB** — Powered by [The Movie Database (TMDB)](https://www.themoviedb.org/) to auto-fill official posters, synopsis, genres, and release dates.
- ⏱️ **Episode Progress Tracker** — Track your current episode per series or anime (e.g., Ep 8/12) with a quick **+1 Episode** button directly on the card.
- 🍿 **Platform Tagging** — Log where you watched it: Netflix, Cinema, Disney+, Prime Video, Crunchyroll, Bstation, local TV, and more.
- 📝 **Reviews & Personal Notes** — Write markdown-formatted notes: plot theories, favorite quotes, scene analysis.
- 📊 **Auto Statistics** — Counts completed movies, total episodes watched, estimated watch hours, and average rating.
- 💾 **JSON Backup & Restore** — Export and import your entire watch list as a portable JSON file.
- ☁️ **Cloud-Ready** — Deploy to [Vercel](https://vercel.com/) for free with zero configuration.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| Framework | Next.js 16 (App Router, TypeScript) |
| Styling | Tailwind CSS v4 + Lucide Icons |
| Data Storage | Browser LocalStorage (portable JSON backup) |
| Metadata API | TMDB — The Movie Database API |
| Deployment | Vercel (free tier) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/watch-vault.git
cd watch-vault

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### TMDB API Key (Optional)

WatchVault includes a built-in offline database of popular titles. For full search access to hundreds of thousands of movies, series, and anime, get a free TMDB API key:

1. Create an account at [themoviedb.org](https://www.themoviedb.org/).
2. Go to **Settings → API** and request a free Developer API key.
3. In the app, open **Settings** and paste your key.

---

## 📦 Deployment

Deploy instantly to Vercel:

1. Push this repository to your GitHub account.
2. Go to [vercel.com](https://vercel.com/) → **Add New Project** → Import your repo.
3. Click **Deploy**. Done!

---

## 📄 License

MIT License — free to use, modify, and distribute.
