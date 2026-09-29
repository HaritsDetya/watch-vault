'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { WatchEntry, WatchStatus, MediaType } from '@/types/watch';
import { getStoredWatchList, saveStoredWatchList } from '@/lib/storage';
import { Header } from '@/components/Header';
import { StatsOverview } from '@/components/StatsOverview';
import { FilterBar } from '@/components/FilterBar';
import { WatchCard } from '@/components/WatchCard';
import { WatchDetailModal } from '@/components/WatchDetailModal';
import { AddWatchModal } from '@/components/AddWatchModal';
import { SettingsModal } from '@/components/SettingsModal';
import { Film, Ghost } from 'lucide-react';

export default function Home() {
  const [entries, setEntries] = useState<WatchEntry[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [mediaTypeFilter, setMediaTypeFilter] = useState<MediaType | 'ALL'>('ALL');
  const [statusFilter, setStatusFilter] = useState<WatchStatus | 'ALL'>('ALL');
  const [platformFilter, setPlatformFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState<'UPDATED' | 'RATING' | 'EPISODES' | 'TITLE'>('UPDATED');

  // Modals
  const [activeEntry, setActiveEntry] = useState<WatchEntry | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  // Load from local storage
  useEffect(() => {
    const data = getStoredWatchList();
    setEntries(data);
    setIsLoaded(true);

    const handleUpdate = () => {
      setEntries(getStoredWatchList());
    };
    window.addEventListener('watch_vault_updated', handleUpdate);
    return () => window.removeEventListener('watch_vault_updated', handleUpdate);
  }, []);

  // Distinct platforms list for filter
  const platforms = useMemo(() => {
    const set = new Set<string>();
    entries.forEach((e) => {
      if (e.platform) set.add(e.platform);
    });
    return Array.from(set);
  }, [entries]);

  // Filtered and sorted entries
  const filteredEntries = useMemo(() => {
    let result = [...entries];

    // Media type filter
    if (mediaTypeFilter !== 'ALL') {
      result = result.filter((e) => e.mediaType === mediaTypeFilter);
    }

    // Status filter
    if (statusFilter !== 'ALL') {
      result = result.filter((e) => e.status === statusFilter);
    }

    // Platform filter
    if (platformFilter !== 'ALL') {
      result = result.filter((e) => e.platform === platformFilter);
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.originalTitle?.toLowerCase().includes(q) ||
          e.genres?.some((g) => g.toLowerCase().includes(q)) ||
          e.review?.toLowerCase().includes(q)
      );
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'RATING') {
        return (b.rating || 0) - (a.rating || 0);
      }
      if (sortBy === 'EPISODES') {
        return (b.currentEpisode || 0) - (a.currentEpisode || 0);
      }
      if (sortBy === 'TITLE') {
        return a.title.localeCompare(b.title);
      }
      // UPDATED default
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

    return result;
  }, [entries, mediaTypeFilter, statusFilter, platformFilter, searchQuery, sortBy]);

  // Actions
  const handleAddEntry = (newEntry: WatchEntry) => {
    const updated = [newEntry, ...entries];
    setEntries(updated);
    saveStoredWatchList(updated);
  };

  const handleSaveEntry = (updatedEntry: WatchEntry) => {
    const updated = entries.map((e) => (e.id === updatedEntry.id ? updatedEntry : e));
    setEntries(updated);
    saveStoredWatchList(updated);
  };

  const handleDeleteEntry = (id: string) => {
    const updated = entries.filter((e) => e.id !== id);
    setEntries(updated);
    saveStoredWatchList(updated);
  };

  // Quick +1 episode increment from card
  const handleQuickEpisodeAdd = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const updated = entries.map((item) => {
      if (item.id === id) {
        const nextEp = (item.currentEpisode || 0) + 1;
        const isComplete = item.totalEpisodes ? nextEp >= item.totalEpisodes : false;
        return {
          ...item,
          currentEpisode: nextEp,
          status: isComplete ? 'COMPLETED' : item.status,
          updatedAt: new Date().toISOString()
        };
      }
      return item;
    });
    setEntries(updated);
    saveStoredWatchList(updated);
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-zinc-500">
        <div className="flex items-center gap-2">
          <Film className="w-5 h-5 animate-pulse text-rose-500" />
          <span>Memuat WatchVault Anda...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-rose-500 selection:text-white">
      {/* Header */}
      <Header
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onOpenSettings={() => setIsSettingsModalOpen(true)}
        totalEntries={entries.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6 sm:py-8">
        {/* Statistics Banner */}
        <StatsOverview entries={entries} />

        {/* Filters & Search */}
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          mediaTypeFilter={mediaTypeFilter}
          onMediaTypeChange={setMediaTypeFilter}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          platformFilter={platformFilter}
          onPlatformChange={setPlatformFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
          platforms={platforms}
        />

        {/* Media Grid */}
        {filteredEntries.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-5">
            {filteredEntries.map((entry) => (
              <WatchCard
                key={entry.id}
                entry={entry}
                onClick={() => setActiveEntry(entry)}
                onQuickEpisodeAdd={handleQuickEpisodeAdd}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center flex flex-col items-center justify-center bg-zinc-900/40 border border-zinc-800/80 rounded-3xl p-8">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 mb-3">
              <Ghost className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-zinc-200">Tidak ada tontonan ditemukan</h3>
            <p className="text-xs text-zinc-400 max-w-sm mt-1 mb-5">
              Coba ganti filter tipe tontonan/status atau cari dengan kata kunci lain.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setMediaTypeFilter('ALL');
                setStatusFilter('ALL');
                setPlatformFilter('ALL');
              }}
              className="text-xs text-rose-400 hover:text-rose-300 font-semibold underline"
            >
              Reset Semua Filter
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-6 text-center text-xs text-zinc-500">
        <p>WatchVault &bull; Personal Cinema, Series & Anime Archive</p>
      </footer>

      {/* Modals */}
      <WatchDetailModal
        entry={activeEntry}
        isOpen={Boolean(activeEntry)}
        onClose={() => setActiveEntry(null)}
        onSave={handleSaveEntry}
        onDelete={handleDeleteEntry}
      />

      <AddWatchModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddEntry}
      />

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        entries={entries}
        onRefreshData={(newEntries) => setEntries(newEntries)}
      />
    </div>
  );
}
