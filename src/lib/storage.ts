'use client';

import { WatchEntry } from '@/types/watch';
import { INITIAL_WATCH_LIST } from './sampleData';

const STORAGE_KEY = 'watch_vault_entries_v1';

export function getStoredWatchList(): WatchEntry[] {
  if (typeof window === 'undefined') return INITIAL_WATCH_LIST;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_WATCH_LIST));
      return INITIAL_WATCH_LIST;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load watchlist from localStorage', e);
    return INITIAL_WATCH_LIST;
  }
}

export function saveStoredWatchList(list: WatchEntry[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    window.dispatchEvent(new Event('watch_vault_updated'));
  } catch (e) {
    console.error('Failed to save watchlist to localStorage', e);
  }
}

export function exportWatchBackup(list: WatchEntry[]) {
  const jsonStr = JSON.stringify(list, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `watch-vault-backup-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function importWatchBackup(
  file: File,
  onSuccess: (imported: WatchEntry[]) => void,
  onError: (err: string) => void
) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target?.result as string);
      if (Array.isArray(data)) {
        saveStoredWatchList(data);
        onSuccess(data);
      } else {
        onError('Format file JSON tidak valid (harus berupa array tontonan).');
      }
    } catch {
      onError('Gagal membaca file JSON. Pastikan file tidak rusak.');
    }
  };
  reader.readAsText(file);
}
