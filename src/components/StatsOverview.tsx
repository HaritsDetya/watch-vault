'use client';

import React from 'react';
import { WatchEntry } from '@/types/watch';
import { Film, Tv, Sparkles, CheckCircle2, Clock, Star } from 'lucide-react';

interface StatsOverviewProps {
  entries: WatchEntry[];
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ entries }) => {
  const total = entries.length;
  const moviesCompleted = entries.filter(e => e.mediaType === 'MOVIE' && e.status === 'COMPLETED').length;
  const seriesCount = entries.filter(e => e.mediaType === 'SERIES').length;
  const animeCount = entries.filter(e => e.mediaType === 'ANIME').length;
  
  // Total episodes watched
  const totalEpisodesWatched = entries.reduce((acc, e) => {
    if (e.mediaType === 'MOVIE') return acc;
    return acc + (e.currentEpisode || 0);
  }, 0);

  // Total runtime estimation in hours
  const totalMinutes = entries.reduce((acc, e) => {
    if (e.mediaType === 'MOVIE') {
      if (e.status === 'COMPLETED') return acc + (e.runtimeMinutes || 120);
      return acc;
    }
    // Series & Anime: episodes * runtime
    const eps = e.currentEpisode || 0;
    const minPerEp = e.runtimeMinutes || (e.mediaType === 'ANIME' ? 24 : 50);
    return acc + (eps * minPerEp);
  }, 0);

  const totalHours = Math.round(totalMinutes / 60);

  const ratedEntries = entries.filter(e => (e.rating || 0) > 0);
  const avgRating = ratedEntries.length > 0
    ? (ratedEntries.reduce((acc, e) => acc + e.rating, 0) / ratedEntries.length).toFixed(1)
    : '0';

  const stats = [
    {
      label: 'Film Tamat',
      value: moviesCompleted,
      icon: Film,
      color: 'text-rose-400',
      bg: 'bg-rose-500/10 border-rose-500/20'
    },
    {
      label: 'Series & Drakor',
      value: seriesCount,
      icon: Tv,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20'
    },
    {
      label: 'Koleksi Anime',
      value: animeCount,
      icon: Sparkles,
      color: 'text-pink-400',
      bg: 'bg-pink-500/10 border-pink-500/20'
    },
    {
      label: 'Episode Ditonton',
      value: `${totalEpisodesWatched} Ep`,
      icon: CheckCircle2,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20'
    },
    {
      label: 'Total Waktu Tonton',
      value: `~${totalHours} Jam`,
      icon: Clock,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10 border-cyan-500/20'
    },
    {
      label: 'Rata-rata Rating',
      value: `★ ${avgRating}`,
      icon: Star,
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10 border-yellow-500/20'
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
      {stats.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div
            key={idx}
            className={`p-3.5 rounded-xl border ${item.bg} backdrop-blur-sm transition-all hover:translate-y-[-2px]`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-medium text-zinc-400 line-clamp-1">{item.label}</span>
              <Icon className={`w-4 h-4 ${item.color}`} />
            </div>
            <p className="text-xl font-bold tracking-tight text-white">{item.value}</p>
          </div>
        );
      })}
    </div>
  );
};
