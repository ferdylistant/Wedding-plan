import React from 'react';
import { Compass, Heart, Calendar } from 'lucide-react';

interface HeroSectionProps {
  currentPercentage: number;
  daysLeft: number;
  weddingDate: string;
  weddingLocation: string;
  onOpenCountdownModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentPercentage,
  daysLeft,
  weddingDate,
  weddingLocation,
  onOpenCountdownModal,
}) => {
  return (
    <section className="pt-8 pb-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left: Greeting & Journey Status */}
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 mb-4">
            <Compass className="w-3.5 h-3.5 text-emerald-600" />
            <span>Perjalanan Bersama • Tahun ke-1 Persiapan</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-slate-900 tracking-tight leading-[1.2]">
            Selamat Datang Kembali,{' '}
            <span className="font-serif italic font-normal text-[#1E4E3D] underline decoration-emerald-200/80 decoration-2 underline-offset-4">
              Ferdy & Tika
            </span>{' '}
            <span className="inline-block animate-pulse">✨</span>
          </h1>

          {/* Description */}
          <p className="mt-3 text-slate-600 text-base sm:text-lg leading-relaxed">
            Total tabungan terkumpul sudah mencapai{' '}
            <span className="font-bold text-emerald-800 underline decoration-emerald-300">
              {currentPercentage.toFixed(0)}%
            </span>{' '}
            dari keseluruhan target kita tahun ini. Bersama membangun ikrar dan masa depan yang kokoh.
          </p>
        </div>

        {/* Right: Wedding Countdown Widget */}
        <div
          id="hero-countdown-widget"
          onClick={onOpenCountdownModal}
          className="lg:self-end bg-white border border-rose-100 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center gap-4 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 group-hover:scale-105 transition-transform shrink-0">
            <Heart className="w-6 h-6 fill-rose-500 text-rose-500" />
          </div>

          <div>
            <div className="text-[11px] font-bold tracking-wider text-rose-500 uppercase">
              Menuju Hari Bahagia
            </div>
            <div className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
              {daysLeft} Hari Menuju Akad & Resepsi
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-500 font-medium">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{weddingDate} • {weddingLocation}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
