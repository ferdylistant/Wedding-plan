import React from 'react';
import { Heart, Plus, Calendar, ChevronDown } from 'lucide-react';
import { DuaHatiLogo } from './DuaHatiLogo';

interface HeaderProps {
  activeTab: 'summary' | 'wedding' | 'future' | 'ledger';
  setActiveTab: (tab: 'summary' | 'wedding' | 'future' | 'ledger') => void;
  daysLeft: number;
  onOpenDepositModal: () => void;
  onOpenCountdownModal: () => void;
  coupleAvatarUrl: string;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  daysLeft,
  onOpenDepositModal,
  onOpenCountdownModal,
  coupleAvatarUrl,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-3">
          {/* Brand & Couple Badge */}
          <div className="flex items-center gap-3.5 shrink-0">
            <DuaHatiLogo size="md" />

            <div className="hidden xl:flex items-center pl-3 border-l border-slate-200">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-800 tracking-tight flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  FERDY & TIKA
                </span>
                <span className="text-[10px] text-slate-500 font-medium">Mitra Hidup & Finansial</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 p-1 bg-slate-100/80 rounded-full border border-slate-200/70 text-sm font-medium">
            <button
              id="nav-tab-summary"
              onClick={() => setActiveTab('summary')}
              className={`px-4 py-2 rounded-full transition-all duration-200 cursor-pointer ${
                activeTab === 'summary'
                  ? 'bg-[#E0F2FE] text-sky-900 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              Ringkasan Bersama
            </button>
            <button
              id="nav-tab-wedding"
              onClick={() => setActiveTab('wedding')}
              className={`px-4 py-2 rounded-full transition-all duration-200 cursor-pointer ${
                activeTab === 'wedding'
                  ? 'bg-[#E0F2FE] text-sky-900 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              Target Pernikahan
            </button>
            <button
              id="nav-tab-future"
              onClick={() => setActiveTab('future')}
              className={`px-4 py-2 rounded-full transition-all duration-200 cursor-pointer ${
                activeTab === 'future'
                  ? 'bg-[#E0F2FE] text-sky-900 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              Masa Depan & Dana Darurat
            </button>
            <button
              id="nav-tab-ledger"
              onClick={() => setActiveTab('ledger')}
              className={`px-4 py-2 rounded-full transition-all duration-200 cursor-pointer ${
                activeTab === 'ledger'
                  ? 'bg-[#E0F2FE] text-sky-900 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              Buku Catatan & Kontribusi
            </button>
          </nav>

          {/* Right Action Items */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            {/* Wedding Countdown Badge */}
            <button
              id="header-countdown-btn"
              onClick={onOpenCountdownModal}
              title="Klik untuk melihat / atur tanggal pernikahan"
              className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full bg-rose-50 border border-rose-200/70 text-rose-700 hover:bg-rose-100/70 transition-colors text-xs sm:text-sm font-semibold cursor-pointer shadow-2xs"
            >
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500 shrink-0" />
              <span>Hari Pernikahan: <strong className="font-bold">{daysLeft} Hari Lagi</strong></span>
              <span className="hidden sm:inline ml-0.5">💍</span>
            </button>

            {/* + Catat Setoran Button */}
            <button
              id="header-deposit-btn"
              onClick={onOpenDepositModal}
              className="flex items-center gap-1.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-[#1E4E3D] hover:bg-[#163a2c] active:scale-[0.98] text-white text-xs sm:text-sm font-semibold transition-all shadow-sm shadow-emerald-950/20 cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span className="whitespace-nowrap">+ Catat Setoran</span>
            </button>

            {/* User Profile Avatar */}
            <div className="flex items-center gap-2 pl-1 sm:pl-2 border-l border-slate-200">
              <div className="relative">
                <img
                  src={coupleAvatarUrl}
                  alt="Ferdy & Tika"
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover border-2 border-emerald-600 shadow-2xs"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
              </div>
              <div className="hidden md:flex flex-col leading-tight text-left">
                <span className="text-xs font-bold text-slate-800">Ferdy & Tika</span>
                <span className="text-[11px] text-slate-500 font-medium">Akun Bersama</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="flex lg:hidden overflow-x-auto py-2.5 gap-2 border-t border-slate-100 no-scrollbar">
          <button
            onClick={() => setActiveTab('summary')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium shrink-0 ${
              activeTab === 'summary'
                ? 'bg-[#E0F2FE] text-sky-900 font-semibold'
                : 'bg-slate-100 text-slate-600'
            }`}
          >
            Ringkasan
          </button>
          <button
            onClick={() => setActiveTab('wedding')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium shrink-0 ${
              activeTab === 'wedding'
                ? 'bg-[#E0F2FE] text-sky-900 font-semibold'
                : 'bg-slate-100 text-slate-600'
            }`}
          >
            Target Pos Nikah
          </button>
          <button
            onClick={() => setActiveTab('future')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium shrink-0 ${
              activeTab === 'future'
                ? 'bg-[#E0F2FE] text-sky-900 font-semibold'
                : 'bg-slate-100 text-slate-600'
            }`}
          >
            Masa Depan & Darurat
          </button>
          <button
            onClick={() => setActiveTab('ledger')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium shrink-0 ${
              activeTab === 'ledger'
                ? 'bg-[#E0F2FE] text-sky-900 font-semibold'
                : 'bg-slate-100 text-slate-600'
            }`}
          >
            Buku Catatan
          </button>
        </div>
      </div>
    </header>
  );
};
