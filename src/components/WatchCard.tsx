'use client';

import React from 'react';
import { WatchEntry } from '@/types/watch';
import { Star, Film, Tv, Sparkles, Plus, Clock, FileText } from 'lucide-react';

interface WatchCardProps {
  entry: WatchEntry;
  onClick: () => void;
  onQuickEpisodeAdd?: (e: React.MouseEvent, id: string) => void;
}

export const WatchCard: React.FC<WatchCardProps> = ({ entry, onClick, onQuickEpisodeAdd }) => {
  const getMediaTypeBadge = () => {
    switch (entry.mediaType) {
      case 'MOVIE':
        return { label: 'Film', bg: 'bg-rose-500/20 text-rose-300 border-rose-500/30', icon: Film };
      case 'SERIES':
        return { label: 'Series', bg: 'bg-amber-500/20 text-amber-300 border-amber-500/30', icon: Tv };
      case 'ANIME':
        return { label: 'Anime', bg: 'bg-pink-500/20 text-pink-300 border-pink-500/30', icon: Sparkles };
    }
  };

  const getStatusBadge = () => {
    switch (entry.status) {
      case 'COMPLETED':
        return { label: 'Tamat', bg: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' };
      case 'WATCHING':
        return { label: 'Ditonton', bg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' };
      case 'PLAN_TO_WATCH':
        return { label: 'Watchlist', bg: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' };
      case 'ON_HOLD':
        return { label: 'On Hold', bg: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' };
      case 'DROPPED':
        return { label: 'Dropped', bg: 'bg-zinc-700/40 text-zinc-400 border-zinc-600/30' };
    }
  };

  const mediaInfo = getMediaTypeBadge();
  const statusInfo = getStatusBadge();
  const MediaIcon = mediaInfo.icon;
  const isEpisodic = entry.mediaType === 'SERIES' || entry.mediaType === 'ANIME';

  return (
    <div
      onClick={onClick}
      className="group relative bg-zinc-900 border border-zinc-800 hover:border-rose-500/50 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-rose-500/10 hover:-translate-y-1 flex flex-col"
    >
      {/* Poster Image Container */}
      <div className="relative aspect-[2/3] overflow-hidden bg-zinc-950">
        <img
          src={entry.posterImage || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=600&auto=format&fit=crop'}
          alt={entry.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-black/50" />

        {/* Media Type Badge (Top Left) */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
          <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border backdrop-blur-md flex items-center gap-1 ${mediaInfo.bg}`}>
            <MediaIcon className="w-3 h-3" />
            <span>{mediaInfo.label}</span>
          </span>
        </div>

        {/* Rating Badge (Top Right) */}
        {entry.rating > 0 && (
          <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full bg-zinc-950/80 backdrop-blur-md border border-amber-500/30 text-amber-400 text-xs font-bold shadow-sm">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{entry.rating}</span>
          </div>
        )}

        {/* Status Badge (Bottom Left of Poster) */}
        <div className="absolute bottom-2.5 left-2.5">
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border backdrop-blur-md ${statusInfo.bg}`}>
            {statusInfo.label}
          </span>
        </div>

        {/* Episode Quick Increment Button for Series & Anime */}
        {isEpisodic && entry.status === 'WATCHING' && onQuickEpisodeAdd && (
          <button
            onClick={(e) => onQuickEpisodeAdd(e, entry.id)}
            className="absolute bottom-2.5 right-2.5 px-2 py-1 rounded-lg bg-rose-600/90 hover:bg-rose-500 text-white text-[11px] font-bold backdrop-blur-md shadow-md flex items-center gap-1 transition-transform active:scale-95"
            title="Tambah 1 Episode"
          >
            <Plus className="w-3 h-3" />
            <span>1 Ep</span>
          </button>
        )}
      </div>

      {/* Card Info Body */}
      <div className="p-3.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Platform and Year */}
          <div className="flex items-center gap-2 text-[11px] text-zinc-400 mb-1.5 line-clamp-1">
            <span className="font-semibold text-zinc-300 bg-zinc-800 px-1.5 py-0.5 rounded text-[10px]">
              {entry.platform || 'Streaming'}
            </span>
            {entry.releaseYear && <span>• {entry.releaseYear}</span>}
            {entry.genres && entry.genres.length > 0 && (
              <span className="truncate">• {entry.genres.slice(0, 2).join(', ')}</span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-bold text-sm sm:text-base text-zinc-100 group-hover:text-rose-400 transition-colors line-clamp-1">
            {entry.title}
          </h3>

          {/* Review snippet */}
          {entry.review && (
            <p className="text-xs text-zinc-400 line-clamp-2 mt-1.5 italic font-light">
              "{entry.review}"
            </p>
          )}
        </div>

        {/* Footer Meta (Episode / Duration & Notes indicator) */}
        <div className="mt-3 pt-2.5 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
          <div className="flex items-center gap-1.5 font-medium">
            {isEpisodic ? (
              <span className="text-zinc-200">
                Ep {entry.currentEpisode || 0} {entry.totalEpisodes ? `/ ${entry.totalEpisodes}` : ''}
              </span>
            ) : (
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-zinc-500" />
                <span>{entry.runtimeMinutes ? `${entry.runtimeMinutes} mnt` : 'Film'}</span>
              </div>
            )}
          </div>

          {entry.notes && entry.notes.trim().length > 0 && (
            <div className="flex items-center gap-1 text-[11px] text-rose-400 font-medium bg-rose-500/10 px-1.5 py-0.5 rounded" title="Memiliki Catatan Pribadi">
              <FileText className="w-3 h-3" />
              <span>Notes</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
