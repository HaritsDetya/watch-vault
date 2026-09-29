'use client';

import React from 'react';
import { Film, Plus, Settings } from 'lucide-react';

interface HeaderProps {
  onOpenAddModal: () => void;
  onOpenSettings: () => void;
  totalEntries: number;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAddModal, onOpenSettings, totalEntries }) => {
  return (
    <header className="sticky top-0 z-30 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md px-4 sm:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 via-pink-600 to-amber-500 p-[1px] shadow-lg shadow-rose-500/20">
            <div className="w-full h-full bg-zinc-950 rounded-[11px] flex items-center justify-center">
              <Film className="w-5 h-5 text-rose-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-white">WatchVault</h1>
              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
                Film &bull; Series &bull; Anime
              </span>
            </div>
            <p className="text-xs text-zinc-400">Arsip Pelacak Tontonan Layar Pribadi</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenSettings}
            className="p-2 sm:px-3 sm:py-2 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg transition-colors flex items-center gap-1.5"
            title="Pengaturan API & Backup Data"
          >
            <Settings className="w-4 h-4 text-zinc-400" />
            <span className="hidden sm:inline">Pengaturan</span>
          </button>

          <button
            onClick={onOpenAddModal}
            className="px-3.5 py-2 text-xs font-medium text-white bg-rose-600 hover:bg-rose-500 rounded-lg shadow-md shadow-rose-600/20 transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Tontonan</span>
          </button>
        </div>
      </div>
    </header>
  );
};
