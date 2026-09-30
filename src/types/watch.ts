export type MediaType = 'MOVIE' | 'SERIES' | 'ANIME';
export type AnimeType = 'SERIES' | 'MOVIE';

export type WatchStatus = 'WATCHING' | 'COMPLETED' | 'PLAN_TO_WATCH' | 'ON_HOLD' | 'DROPPED';

export interface WatchEntry {
  id: string;
  tmdbId?: number;
  title: string;
  originalTitle?: string;
  mediaType: MediaType;
  animeType?: AnimeType; // Membedakan Anime Movie (Film layar lebar) vs Anime Series (Episodik)
  posterImage: string;
  backdropImage?: string;
  status: WatchStatus;
  rating: number; // 0 (unrated) or 1-10
  currentEpisode?: number;
  totalEpisodes?: number;
  currentSeason?: number;
  totalSeasons?: number;
  runtimeMinutes?: number; // durasi film atau rata-rata durasi per episode
  platform: string; // Netflix, Bioskop, Prime Video, Disney+, Crunchyroll, Bstation, TV, Laptop
  releaseYear?: string;
  genres: string[];
  review?: string;
  notes?: string; // Catatan pribadi / favorit karakter / teori cerita
  startDate?: string;
  finishDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TmdbSearchResult {
  id: number;
  title?: string;
  name?: string;
  original_title?: string;
  original_name?: string;
  media_type?: 'movie' | 'tv';
  poster_path?: string;
  backdrop_path?: string;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
  overview?: string;
  genre_ids?: number[];
  origin_country?: string[];
}
