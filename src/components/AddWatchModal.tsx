'use client';

import React, { useState, useEffect } from 'react';
import { WatchEntry, WatchStatus, MediaType } from '@/types/watch';
import { searchTmdb } from '@/lib/tmdb';
import { Search, Plus, Sparkles, X, Loader2, Film, Tv, PenTool } from 'lucide-react';

interface AddWatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (entry: WatchEntry) => void;
}

export const AddWatchModal: React.FC<AddWatchModalProps> = ({ isOpen, onClose, onAdd }) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState<'API' | 'MANUAL'>('API');
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<any | null>(null);

  // Form parameters
  const [status, setStatus] = useState<WatchStatus>('WATCHING');
  const [mediaType, setMediaType] = useState<MediaType>('MOVIE');
  const [platform, setPlatform] = useState('Netflix');
  const [rating, setRating] = useState<number>(0);
  const [currentEpisode, setCurrentEpisode] = useState<number>(1);
  const [totalEpisodes, setTotalEpisodes] = useState<number>(12);

  // Manual entry state
  const [manualTitle, setManualTitle] = useState('');
  const [manualPoster, setManualPoster] = useState('');
  const [manualGenre, setManualGenre] = useState('');
  const [manualYear, setManualYear] = useState('');

  // Debounced search
  useEffect(() => {
    if (mode !== 'API') return;
    const timer = setTimeout(async () => {
      if (searchQuery.trim().length >= 2) {
        setIsSearching(true);
        const results = await searchTmdb(searchQuery);
        setSearchResults(results);
        setIsSearching(false);
      } else {
        setSearchResults([]);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [searchQuery, mode]);

  const handleSelectMedia = (item: any) => {
    setSelectedMedia(item);
    setMediaType(item.mediaType);
    if (item.totalEpisodes) {
      setTotalEpisodes(item.totalEpisodes);
    }
  };

  const handleSubmitApi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMedia) return;

    const isEpisodic = mediaType === 'SERIES' || mediaType === 'ANIME';

    const newEntry: WatchEntry = {
      id: `watch-${Date.now()}`,
      tmdbId: selectedMedia.id,
      title: selectedMedia.title,
      originalTitle: selectedMedia.originalTitle,
      mediaType,
      posterImage: selectedMedia.posterImage,
      backdropImage: selectedMedia.backdropImage,
      status,
      platform,
      rating,
      currentEpisode: isEpisodic ? (status === 'COMPLETED' ? totalEpisodes : currentEpisode) : undefined,
      totalEpisodes: isEpisodic && totalEpisodes > 0 ? totalEpisodes : undefined,
      genres: selectedMedia.genres || ['Drama'],
      releaseYear: selectedMedia.releaseYear,
      review: '',
      notes: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onAdd(newEntry);
    onClose();
  };

  const handleSubmitManual = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualTitle.trim()) return;

    const isEpisodic = mediaType === 'SERIES' || mediaType === 'ANIME';

    const newEntry: WatchEntry = {
      id: `watch-${Date.now()}`,
      title: manualTitle.trim(),
      mediaType,
      posterImage: manualPoster.trim() || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=600&auto=format&fit=crop',
      backdropImage: manualPoster.trim() || undefined,
      status,
      platform,
      rating,
      currentEpisode: isEpisodic ? currentEpisode : undefined,
      totalEpisodes: isEpisodic && totalEpisodes > 0 ? totalEpisodes : undefined,
      genres: manualGenre ? manualGenre.split(',').map(g => g.trim()) : ['General'],
      releaseYear: manualYear.trim() || undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onAdd(newEntry);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-zinc-800 bg-zinc-950 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-600/20 text-rose-400 flex items-center justify-center border border-rose-500/30">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Tambah ke WatchVault</h3>
              <p className="text-xs text-zinc-400">Pencarian Film, Series, dan Anime otomatis</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Switcher */}
        <div className="flex border-b border-zinc-800 bg-zinc-950/40 px-6">
          <button
            onClick={() => { setMode('API'); setSelectedMedia(null); }}
            className={`py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 transition-all ${
              mode === 'API'
                ? 'border-rose-500 text-rose-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Cari via Metadata TMDB</span>
          </button>

          <button
            onClick={() => setMode('MANUAL')}
            className={`py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 transition-all ${
              mode === 'MANUAL'
                ? 'border-rose-500 text-rose-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <PenTool className="w-4 h-4" />
            <span>Input Tontonan Manual</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {mode === 'API' ? (
            <div className="space-y-4">
              {/* Search input */}
              <div className="relative">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ketik judul (misal: Oppenheimer, Queen of Tears, Frieren, Attack on Titan)..."
                  className="w-full pl-9 pr-10 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-rose-500"
                  autoFocus
                />
                {isSearching && (
                  <Loader2 className="w-4 h-4 text-rose-400 animate-spin absolute right-3.5 top-1/2 -translate-y-1/2" />
                )}
              </div>

              {/* Selected item preview or Search results */}
              {selectedMedia ? (
                <div className="p-4 rounded-2xl bg-zinc-950 border border-rose-500/40 relative flex gap-4 items-center">
                  <img
                    src={selectedMedia.posterImage}
                    alt={selectedMedia.title}
                    className="w-16 h-24 object-cover rounded-xl shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider">
                      {selectedMedia.mediaType} Terpilih
                    </span>
                    <h4 className="font-bold text-white text-base truncate">{selectedMedia.title}</h4>
                    <p className="text-xs text-zinc-400">
                      Tahun: {selectedMedia.releaseYear || 'N/A'} • {selectedMedia.genres?.slice(0, 2).join(', ')}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedMedia(null)}
                    className="text-xs text-zinc-400 hover:text-zinc-200 underline"
                  >
                    Ganti
                  </button>
                </div>
              ) : (
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {searchResults.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleSelectMedia(item)}
                      className="flex items-center gap-3 p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80 hover:border-rose-500/60 hover:bg-zinc-800/50 cursor-pointer transition-all"
                    >
                      <img
                        src={item.posterImage}
                        alt={item.title}
                        className="w-10 h-14 object-cover rounded-lg shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="text-[9px] font-bold uppercase px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-300">
                            {item.mediaType}
                          </span>
                          <span className="text-xs text-zinc-400">{item.releaseYear}</span>
                        </div>
                        <h4 className="font-semibold text-sm text-zinc-100 truncate">{item.title}</h4>
                        <p className="text-[11px] text-zinc-400 truncate">
                          {item.genres?.slice(0, 2).join(', ') || 'Umum'}
                        </p>
                      </div>
                      <span className="text-xs text-rose-400 font-semibold px-2 py-1 rounded bg-rose-500/10">
                        Pilih
                      </span>
                    </div>
                  ))}
                  {searchQuery.trim().length >= 2 && searchResults.length === 0 && !isSearching && (
                    <p className="text-xs text-zinc-500 text-center py-4">
                      Judul tidak ditemukan di database cepat. Anda bisa memasukkannya lewat tab <strong className="text-zinc-300">Input Manual</strong> atau pastikan TMDB API Key terpasang di Pengaturan.
                    </p>
                  )}
                </div>
              )}

              {/* Form Config once item selected */}
              {selectedMedia && (
                <form onSubmit={handleSubmitApi} className="space-y-4 pt-3 border-t border-zinc-800">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-1.5">Tipe Media</label>
                      <select
                        value={mediaType}
                        onChange={(e) => setMediaType(e.target.value as MediaType)}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:border-rose-500 focus:outline-none"
                      >
                        <option value="MOVIE">Film Bioskop / Movie</option>
                        <option value="SERIES">Series / Drakor</option>
                        <option value="ANIME">Anime</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-1.5">Status Tontonan</label>
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value as WatchStatus)}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:border-rose-500 focus:outline-none"
                      >
                        <option value="WATCHING">Sedang Ditonton</option>
                        <option value="COMPLETED">Tamat (Completed)</option>
                        <option value="PLAN_TO_WATCH">Watchlist</option>
                        <option value="ON_HOLD">Ditunda (On Hold)</option>
                        <option value="DROPPED">Dropped</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-1.5">Platform Nonton</label>
                      <input
                        type="text"
                        value={platform}
                        onChange={(e) => setPlatform(e.target.value)}
                        placeholder="Netflix, Bioskop XXI, Bstation..."
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:border-rose-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* If Series / Anime, show episode inputs */}
                  {(mediaType === 'SERIES' || mediaType === 'ANIME') && (
                    <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-zinc-950/60 border border-zinc-800">
                      <div>
                        <label className="block text-xs text-zinc-400 mb-1">Episode Saat Ini</label>
                        <input
                          type="number"
                          min="0"
                          value={currentEpisode}
                          onChange={(e) => setCurrentEpisode(Number(e.target.value))}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-zinc-400 mb-1">Total Episode</label>
                        <input
                          type="number"
                          min="0"
                          value={totalEpisodes}
                          onChange={(e) => setTotalEpisodes(Number(e.target.value))}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-lg shadow-rose-600/20 transition-all flex items-center justify-center gap-2 mt-4"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambahkan ke WatchVault</span>
                  </button>
                </form>
              )}
            </div>
          ) : (
            /* Manual Form */
            <form onSubmit={handleSubmitManual} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Judul Tontonan *</label>
                <input
                  type="text"
                  required
                  value={manualTitle}
                  onChange={(e) => setManualTitle(e.target.value)}
                  placeholder="Contoh: Pengabdi Setan 2 / Video Dokumenter"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:border-rose-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Tipe Media</label>
                  <select
                    value={mediaType}
                    onChange={(e) => setMediaType(e.target.value as MediaType)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:border-rose-500 focus:outline-none"
                  >
                    <option value="MOVIE">Film Bioskop / Movie</option>
                    <option value="SERIES">Series / Drakor</option>
                    <option value="ANIME">Anime</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as WatchStatus)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:border-rose-500 focus:outline-none"
                  >
                    <option value="WATCHING">Sedang Ditonton</option>
                    <option value="COMPLETED">Tamat</option>
                    <option value="PLAN_TO_WATCH">Watchlist</option>
                    <option value="ON_HOLD">On Hold</option>
                    <option value="DROPPED">Dropped</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Platform</label>
                  <input
                    type="text"
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    placeholder="Bioskop / TV / Laptop"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:border-rose-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">URL Gambar Poster (Opsional)</label>
                <input
                  type="url"
                  value={manualPoster}
                  onChange={(e) => setManualPoster(e.target.value)}
                  placeholder="https://example.com/poster.jpg"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:border-rose-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Genre (Pisahkan Koma)</label>
                  <input
                    type="text"
                    value={manualGenre}
                    onChange={(e) => setManualGenre(e.target.value)}
                    placeholder="Horror, Mystery"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:border-rose-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Tahun Rilis</label>
                  <input
                    type="text"
                    value={manualYear}
                    onChange={(e) => setManualYear(e.target.value)}
                    placeholder="2022"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:border-rose-500 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-lg shadow-rose-600/20 transition-all flex items-center justify-center gap-2 mt-4"
              >
                <Plus className="w-4 h-4" />
                <span>Simpan Tontonan Manual</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
