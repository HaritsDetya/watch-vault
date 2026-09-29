'use client';

import React, { useState } from 'react';
import { WatchEntry, WatchStatus, MediaType } from '@/types/watch';
import { 
  X, Star, Trash2, Save, Clock, Tv, Film, Sparkles, 
  Plus, Minus, FileText, CheckCircle2 
} from 'lucide-react';

interface WatchDetailModalProps {
  entry: WatchEntry | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: WatchEntry) => void;
  onDelete: (id: string) => void;
}

export const WatchDetailModal: React.FC<WatchDetailModalProps> = ({
  entry,
  isOpen,
  onClose,
  onSave,
  onDelete
}) => {
  if (!isOpen || !entry) return null;

  const [status, setStatus] = useState<WatchStatus>(entry.status);
  const [mediaType, setMediaType] = useState<MediaType>(entry.mediaType);
  const [platform, setPlatform] = useState(entry.platform || 'Streaming');
  const [rating, setRating] = useState<number>(entry.rating || 0);
  const [currentEpisode, setCurrentEpisode] = useState<number>(entry.currentEpisode || 0);
  const [totalEpisodes, setTotalEpisodes] = useState<number>(entry.totalEpisodes || 0);
  const [currentSeason, setCurrentSeason] = useState<number>(entry.currentSeason || 1);
  const [runtimeMinutes, setRuntimeMinutes] = useState<number>(entry.runtimeMinutes || 0);
  const [startDate, setStartDate] = useState(entry.startDate || '');
  const [finishDate, setFinishDate] = useState(entry.finishDate || '');
  const [review, setReview] = useState(entry.review || '');
  const [notes, setNotes] = useState(entry.notes || '');

  const isEpisodic = mediaType === 'SERIES' || mediaType === 'ANIME';

  const handleSave = () => {
    // If completed episode equals total, auto-check status if needed
    let finalStatus = status;
    if (isEpisodic && totalEpisodes > 0 && currentEpisode >= totalEpisodes && status === 'WATCHING') {
      finalStatus = 'COMPLETED';
    }

    const updated: WatchEntry = {
      ...entry,
      status: finalStatus,
      mediaType,
      platform,
      rating,
      currentEpisode: isEpisodic ? Number(currentEpisode) : undefined,
      totalEpisodes: isEpisodic && totalEpisodes > 0 ? Number(totalEpisodes) : undefined,
      currentSeason: isEpisodic ? Number(currentSeason) : undefined,
      runtimeMinutes: Number(runtimeMinutes) || undefined,
      startDate: startDate || undefined,
      finishDate: finishDate || undefined,
      review: review.trim() || undefined,
      notes: notes.trim() || undefined,
      updatedAt: new Date().toISOString()
    };
    onSave(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl my-6 flex flex-col max-h-[92vh]">
        {/* Header Backdrop Banner */}
        <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-zinc-950 shrink-0">
          <img
            src={entry.backdropImage || entry.posterImage}
            alt={entry.title}
            className="w-full h-full object-cover object-center filter brightness-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/60 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-zinc-950/70 text-zinc-300 hover:text-white hover:bg-zinc-800 border border-zinc-700/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title and Meta */}
          <div className="absolute bottom-4 left-5 right-5">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                {mediaType === 'MOVIE' ? 'Film Bioskop' : mediaType === 'ANIME' ? 'Anime' : 'Series / Drakor'}
              </span>
              {entry.releaseYear && (
                <span className="text-xs text-zinc-400">Rilis {entry.releaseYear}</span>
              )}
              {entry.genres && entry.genres.length > 0 && (
                <span className="text-xs text-zinc-400">• {entry.genres.join(', ')}</span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight line-clamp-1">
              {entry.title}
            </h2>
            {entry.originalTitle && entry.originalTitle !== entry.title && (
              <p className="text-xs text-zinc-400 italic line-clamp-1">{entry.originalTitle}</p>
            )}
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-sm text-zinc-200">
          {/* Status, Media Type & Platform */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Status Tontonan
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as WatchStatus)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-zinc-100 font-medium focus:border-rose-500 focus:outline-none text-xs sm:text-sm"
              >
                <option value="WATCHING">Sedang Ditonton (Watching)</option>
                <option value="COMPLETED">Tamat (Completed)</option>
                <option value="PLAN_TO_WATCH">Rencana Nonton (Watchlist)</option>
                <option value="ON_HOLD">Ditunda (On Hold)</option>
                <option value="DROPPED">Ditinggalkan (Dropped)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Tipe Media
              </label>
              <select
                value={mediaType}
                onChange={(e) => setMediaType(e.target.value as MediaType)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-zinc-100 font-medium focus:border-rose-500 focus:outline-none text-xs sm:text-sm"
              >
                <option value="MOVIE">Film Bioskop / Movie</option>
                <option value="SERIES">Series / TV Show / Drakor</option>
                <option value="ANIME">Anime</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Tempat / Platform Nonton
              </label>
              <input
                type="text"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                placeholder="Bioskop XXI, Netflix, Bstation, TV..."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-zinc-100 focus:border-rose-500 focus:outline-none text-xs sm:text-sm"
              />
            </div>
          </div>

          {/* Episode Progress Section for Series / Anime */}
          {isEpisodic && (
            <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Tv className="w-4 h-4" />
                  <span>Pelacak Progress Episode</span>
                </span>
                {totalEpisodes > 0 && (
                  <span className="text-xs text-zinc-400">
                    Progres: {Math.round((currentEpisode / totalEpisodes) * 100)}%
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Current Episode Counter */}
                <div>
                  <label className="block text-xs text-zinc-400 mb-1.5">Episode Saat Ini</label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setCurrentEpisode(Math.max(0, currentEpisode - 1))}
                      className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      min="0"
                      value={currentEpisode}
                      onChange={(e) => setCurrentEpisode(Math.max(0, parseInt(e.target.value) || 0))}
                      className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl py-2 px-3 text-center text-base font-bold text-white focus:border-rose-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const next = currentEpisode + 1;
                        setCurrentEpisode(next);
                        if (totalEpisodes > 0 && next >= totalEpisodes) {
                          setStatus('COMPLETED');
                        }
                      }}
                      className="p-2.5 rounded-xl bg-rose-600 text-white hover:bg-rose-500 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Total Episodes & Season */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1.5">Total Episode</label>
                    <input
                      type="number"
                      min="0"
                      value={totalEpisodes}
                      onChange={(e) => setTotalEpisodes(Math.max(0, parseInt(e.target.value) || 0))}
                      placeholder="Misal: 12"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2.5 px-3 text-center text-sm text-white focus:border-rose-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1.5">Season Ke-</label>
                    <input
                      type="number"
                      min="1"
                      value={currentSeason}
                      onChange={(e) => setCurrentSeason(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2.5 px-3 text-center text-sm text-white focus:border-rose-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Movie Runtime */}
          {!isEpisodic && (
            <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800">
              <label className="block text-xs text-zinc-400 mb-1.5">Durasi Film (Menit)</label>
              <div className="relative max-w-xs">
                <Clock className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="number"
                  min="0"
                  value={runtimeMinutes}
                  onChange={(e) => setRuntimeMinutes(Math.max(0, parseInt(e.target.value) || 0))}
                  placeholder="Misal: 169 menit"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-4 py-2 text-zinc-100 focus:border-rose-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* Rating (1-10) */}
          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Rating Pribadi: {rating > 0 ? `${rating} / 10` : 'Belum dinilai'}
            </label>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setRating(num === rating ? 0 : num)}
                  className={`w-7 h-8 rounded-lg text-xs font-bold transition-all ${
                    rating >= num
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-zinc-950 text-zinc-500 border border-zinc-800 hover:bg-zinc-800'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-zinc-400 mb-1.5">Tanggal Mulai Nonton</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-zinc-200 focus:border-rose-500 focus:outline-none text-xs"
              />
            </div>
            <div>
              <label className="block text-xs text-zinc-400 mb-1.5">Tanggal Selesai / Tamat</label>
              <input
                type="date"
                value={finishDate}
                onChange={(e) => setFinishDate(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-zinc-200 focus:border-rose-500 focus:outline-none text-xs"
              />
            </div>
          </div>

          {/* Review & Impressions */}
          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Ulasan & Kesan Tontonan
            </label>
            <textarea
              rows={3}
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Tulis ulasan alur cerita, plot twist, akting karakter, atau kualitas animasi..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3.5 text-zinc-100 focus:border-rose-500 focus:outline-none text-xs sm:text-sm leading-relaxed"
            />
          </div>

          {/* Personal Notes (Quotes / Theories / Arc notes) */}
          <div>
            <label className="flex items-center gap-2 text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              <FileText className="w-4 h-4 text-rose-400" />
              <span>Catatan Pribadi & Teori Cerita (Markdown)</span>
            </label>
            <textarea
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Catatan kutipan dialog favorit, teori misteri, atau hal berkesan..."
              className="w-full font-mono bg-zinc-950 border border-zinc-800 rounded-xl p-3.5 text-zinc-200 focus:border-rose-500 focus:outline-none text-xs leading-relaxed"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              if (window.confirm(`Hapus "${entry.title}" dari WatchVault Anda?`)) {
                onDelete(entry.id);
                onClose();
              }
            }}
            className="px-3.5 py-2 text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl transition-colors flex items-center gap-1.5"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Hapus</span>
          </button>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 rounded-xl transition-colors"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-xl shadow-lg shadow-rose-600/20 flex items-center gap-1.5 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Perubahan</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
