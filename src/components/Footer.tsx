import React from 'react';
import { ShieldCheck, Heart } from 'lucide-react';
import { DuaHatiLogo } from './DuaHatiLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-slate-200/80 bg-white/70 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Left: Brand, Quote, Tagline */}
          <div className="space-y-2">
            <DuaHatiLogo size="sm" showSubtitle={false} />
            <p className="text-base sm:text-lg font-serif italic text-slate-800 leading-snug">
              “Membangun mimpi dan masa depan berdua, satu langkah setiap hari.”
            </p>
            <p className="text-xs text-slate-500 font-medium">
              Perencanaan Keuangan Eksklusif • Ferdy & Tika
            </p>
          </div>

          {/* Right: Security & Copyright */}
          <div className="flex flex-col md:items-end gap-3 text-xs text-slate-500">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100/90 border border-slate-200 text-slate-700 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Enkripsi Rekening Bersama 256-bit Aktif</span>
            </div>
            <p className="text-right">
              © 2024-2026 DuaHati Indonesia. Ruang Finansial Suami Istri Masa Depan.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
