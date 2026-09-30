import { TmdbSearchResult, MediaType } from '@/types/watch';

export const TMDB_GENRES: Record<number, string> = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Sci-Fi',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
  10759: 'Action & Adventure',
  10762: 'Kids',
  10763: 'News',
  10764: 'Reality',
  10765: 'Sci-Fi & Fantasy',
  10766: 'Soap',
  10767: 'Talk',
  10768: 'War & Politics'
};

// Fallback database untuk pencarian instan tanpa perlu API key
export const FALLBACK_MEDIA_DATABASE: {
  id: number;
  title: string;
  originalTitle?: string;
  mediaType: MediaType;
  animeType?: 'SERIES' | 'MOVIE';
  posterImage: string;
  backdropImage: string;
  releaseYear: string;
  rating: number;
  genres: string[];
  totalEpisodes?: number;
  runtimeMinutes?: number;
  overview: string;
}[] = [
  // MOVIES
  {
    id: 157336,
    title: 'Interstellar',
    originalTitle: 'Interstellar',
    mediaType: 'MOVIE',
    posterImage: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    backdropImage: 'https://image.tmdb.org/t/p/original/xJHokMbljvjADYdit5fK5VQsXEG.jpg',
    releaseYear: '2014',
    rating: 8.4,
    genres: ['Adventure', 'Drama', 'Sci-Fi'],
    runtimeMinutes: 169,
    overview: 'Petualangan antariksa sekelompok penjelajah melintasi lubang cacing untuk mencari tempat tinggal baru bagi kelangsungan umat manusia.'
  },
  {
    id: 872585,
    title: 'Oppenheimer',
    originalTitle: 'Oppenheimer',
    mediaType: 'MOVIE',
    posterImage: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
    backdropImage: 'https://image.tmdb.org/t/p/original/fm6K9vYI02ZY9CezFVM3y49uvvI.jpg',
    releaseYear: '2023',
    rating: 8.1,
    genres: ['Drama', 'History'],
    runtimeMinutes: 180,
    overview: 'Kisah fisikawan teoretis J. Robert Oppenheimer yang memimpin Proyek Manhattan untuk menciptakan bom atom pertama di dunia.'
  },
  {
    id: 693134,
    title: 'Dune: Part Two',
    originalTitle: 'Dune: Part Two',
    mediaType: 'MOVIE',
    posterImage: 'https://image.tmdb.org/t/p/w500/czembW0Rk1Ke7lCJGahbOhdCuhV.jpg',
    backdropImage: 'https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg',
    releaseYear: '2024',
    rating: 8.2,
    genres: ['Sci-Fi', 'Adventure'],
    runtimeMinutes: 166,
    overview: 'Paul Atreides bergabung dengan Chani dan suku Fremen untuk membalas dendam terhadap para konspirator yang menghancurkan keluarganya.'
  },

  // SERIES & DRAKOR
  {
    id: 1396,
    title: 'Breaking Bad',
    originalTitle: 'Breaking Bad',
    mediaType: 'SERIES',
    posterImage: 'https://image.tmdb.org/t/p/w500/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg',
    backdropImage: 'https://image.tmdb.org/t/p/original/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg',
    releaseYear: '2008',
    rating: 8.9,
    genres: ['Drama', 'Crime'],
    totalEpisodes: 62,
    runtimeMinutes: 47,
    overview: 'Seorang guru kimia SMA yang didiagnosis menderita kanker paru-paru beralih memproduksi metamfetamin untuk menjamin masa depan finansial keluarganya.'
  },
  {
    id: 206586,
    title: 'Queen of Tears',
    originalTitle: '눈물의 여왕',
    mediaType: 'SERIES',
    posterImage: 'https://image.tmdb.org/t/p/w500/t0p714FjRvh7rMv5mZ19nKkQW0r.jpg',
    backdropImage: 'https://image.tmdb.org/t/p/original/2wT8Y7uQf6vD0e7q3u5F4bB8w1e.jpg',
    releaseYear: '2024',
    rating: 8.7,
    genres: ['Drama', 'Romance'],
    totalEpisodes: 16,
    runtimeMinutes: 75,
    overview: 'Kisah cinta ajaib dan berliku antara seorang ratu department store konglomerat dan suami berlatar belakang sederhana dari desa.'
  },
  {
    id: 100088,
    title: 'The Last of Us',
    originalTitle: 'The Last of Us',
    mediaType: 'SERIES',
    posterImage: 'https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2V7JMrHG.jpg',
    backdropImage: 'https://image.tmdb.org/t/p/original/uDgy6hyPd82kOHh6I95FLtLnj6p.jpg',
    releaseYear: '2023',
    rating: 8.6,
    genres: ['Drama', 'Sci-Fi & Fantasy'],
    totalEpisodes: 9,
    runtimeMinutes: 60,
    overview: 'Joel, seorang penyintas tangguh, disewa untuk menyelundupkan Ellie yang berusia 14 tahun keluar dari zona karantina yang menindas.'
  },

  // ANIME
  {
    id: 372058,
    title: 'Your Name.',
    originalTitle: '君の名は。',
    mediaType: 'ANIME',
    animeType: 'MOVIE',
    posterImage: 'https://image.tmdb.org/t/p/w500/q719jXXEzOoYaps6qFsLWaHqHN4.jpg',
    backdropImage: 'https://image.tmdb.org/t/p/original/7Xunp0079C1PqU0WvPps0n4jTjW.jpg',
    releaseYear: '2016',
    rating: 8.5,
    genres: ['Animation', 'Romance', 'Drama'],
    runtimeMinutes: 106,
    overview: 'Dua remaja, Mitsuha di desa dan Taki di Tokyo, mendapati diri mereka secara ajaib bertukar tubuh dalam mimpi.'
  },
  {
    id: 129,
    title: 'Spirited Away',
    originalTitle: '千と千尋の神隠し',
    mediaType: 'ANIME',
    animeType: 'MOVIE',
    posterImage: 'https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg',
    backdropImage: 'https://image.tmdb.org/t/p/original/mSDsSDwaP3E7dEfUPWy4J0djt4O.jpg',
    releaseYear: '2001',
    rating: 8.5,
    genres: ['Animation', 'Family', 'Fantasy'],
    runtimeMinutes: 125,
    overview: 'Chihiro yang berusia 10 tahun terperangkap di dunia roh pemandian para dewa setelah orang tuanya berubah menjadi babi.'
  },
  {
    id: 209867,
    title: 'Frieren: Beyond Journey\'s End',
    originalTitle: '葬送のフリーレン',
    mediaType: 'ANIME',
    animeType: 'SERIES',
    posterImage: 'https://image.tmdb.org/t/p/w500/dqzenchTd7lp5zht7BdlqM7RBhD.jpg',
    backdropImage: 'https://image.tmdb.org/t/p/original/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg',
    releaseYear: '2023',
    rating: 9.0,
    genres: ['Animation', 'Fantasy', 'Adventure'],
    totalEpisodes: 28,
    runtimeMinutes: 24,
    overview: 'Penyihir elf Frieren memulai perjalanan baru untuk memahami emosi manusia setelah petualangan 10 tahun mengalahkan Raja Iblis berakhir.'
  },
  {
    id: 1429,
    title: 'Attack on Titan',
    originalTitle: '進撃の巨人',
    mediaType: 'ANIME',
    animeType: 'SERIES',
    posterImage: 'https://image.tmdb.org/t/p/w500/hTP1DtLGFamjfu8WqjnuQdP1n4i.jpg',
    backdropImage: 'https://image.tmdb.org/t/p/original/rqbCbjB19amtOtFQbb3K2LG9Gud.jpg',
    releaseYear: '2013',
    rating: 8.7,
    genres: ['Animation', 'Action & Adventure', 'Sci-Fi & Fantasy'],
    totalEpisodes: 89,
    runtimeMinutes: 24,
    overview: 'Setelah kampung halamannya dihancurkan dan ibunya terbunuh, Eren Jaeger bersumpah untuk membasmi seluruh Titan raksasa pemakan manusia.'
  },
  {
    id: 95479,
    title: 'Jujutsu Kaisen',
    originalTitle: '呪術廻戦',
    mediaType: 'ANIME',
    animeType: 'SERIES',
    posterImage: 'https://image.tmdb.org/t/p/w500/fHpKW59z9yA046G6QY9eH99tE5F.jpg',
    backdropImage: 'https://image.tmdb.org/t/p/original/jBJWaqoSCiARWtfV0Glq6YmmEG9.jpg',
    releaseYear: '2020',
    rating: 8.6,
    genres: ['Animation', 'Action & Adventure'],
    totalEpisodes: 47,
    runtimeMinutes: 24,
    overview: 'Yuji Itadori menelan jari kutukan Sukuna untuk menyelamatkan temannya dan terjun ke dunia penyihir jujutsu untuk melawan kutukan jahat.'
  },
  {
    id: 211075,
    title: 'Solo Leveling',
    originalTitle: '俺だけレベルアップな件',
    mediaType: 'ANIME',
    animeType: 'SERIES',
    posterImage: 'https://image.tmdb.org/t/p/w500/geCRueV3ElhRTr0xtJuClJ7xtIj.jpg',
    backdropImage: 'https://image.tmdb.org/t/p/original/gJL5idqDjh789Y6879R3f0QkG2E.jpg',
    releaseYear: '2024',
    rating: 8.5,
    genres: ['Animation', 'Action & Adventure', 'Fantasy'],
    totalEpisodes: 12,
    runtimeMinutes: 24,
    overview: 'Sung Jinwoo, hunter terlemah di dunia, mendapatkan quest misterius yang memungkinkan dirinya meningkatkan level tanpa batas.'
  }
];

export async function searchTmdb(query: string, customApiKey?: string) {
  const clean = query.trim().toLowerCase();
  if (!clean) return [];

  const apiKey = customApiKey || (typeof window !== 'undefined' ? localStorage.getItem('tmdb_api_key') : '') || process.env.NEXT_PUBLIC_TMDB_API_KEY;

  if (apiKey) {
    try {
      const url = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${encodeURIComponent(query)}&include_adult=false&language=id-ID&page=1`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        return (data.results || []).map((item: TmdbSearchResult) => {
          const isAnime = 
            (item.origin_country?.includes('JP') && item.genre_ids?.includes(16)) ||
            (item.genre_ids?.includes(16) && (item.original_name?.match(/[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff]/) || item.original_title?.match(/[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff]/)));

          let mediaType: MediaType = 'MOVIE';
          let animeType: 'SERIES' | 'MOVIE' | undefined = undefined;
          if (isAnime) {
            mediaType = 'ANIME';
            animeType = item.media_type === 'tv' ? 'SERIES' : 'MOVIE';
          } else if (item.media_type === 'tv') {
            mediaType = 'SERIES';
          }

          const release = item.release_date || item.first_air_date || '';
          const poster = item.poster_path 
            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
            : 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=800&auto=format&fit=crop';
          const backdrop = item.backdrop_path ? `https://image.tmdb.org/t/p/original${item.backdrop_path}` : poster;

          return {
            id: item.id,
            title: item.title || item.name || 'Untitled',
            originalTitle: item.original_title || item.original_name,
            mediaType,
            animeType,
            posterImage: poster,
            backdropImage: backdrop,
            releaseYear: release ? release.slice(0, 4) : undefined,
            rating: item.vote_average ? Number(item.vote_average.toFixed(1)) : 0,
            genres: (item.genre_ids || []).map(id => TMDB_GENRES[id]).filter(Boolean),
            overview: item.overview || ''
          };
        });
      }
    } catch (e) {
      console.warn('TMDB API fetch failed, using fallback:', e);
    }
  }

  // Fallback database filter
  return FALLBACK_MEDIA_DATABASE.filter(item => 
    item.title.toLowerCase().includes(clean) ||
    item.originalTitle?.toLowerCase().includes(clean) ||
    item.genres.some(g => g.toLowerCase().includes(clean))
  );
}
