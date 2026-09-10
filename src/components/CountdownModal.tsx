import React, { useState } from 'react';
import { X, Heart, Calendar, MapPin, Sparkles, Check } from 'lucide-react';

interface CountdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  daysLeft: number;
  weddingDate: string;
  weddingLocation: string;
  onUpdateWeddingInfo: (info: { daysLeft: number; date: string; location: string }) => void;
}

export const CountdownModal: React.FC<CountdownModalProps> = ({
  isOpen,
  onClose,
  daysLeft,
  weddingDate,
  weddingLocation,
  onUpdateWeddingInfo,
}) => {
  const [days, setDays] = useState(daysLeft);
  const [date, setDate] = useState(weddingDate);
  const [location, setLocation] = useState(weddingLocation);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateWeddingInfo({
      daysLeft: Number(days),
      date,
      location,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 overflow-hidden relative">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center">
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Menuju Hari Bahagia</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Big Countdown display */}
        <div className="my-5 p-5 bg-gradient-to-br from-rose-50 via-pink-50/50 to-amber-50/40 rounded-2xl border border-rose-100/80 text-center">
          <span className="text-4xl sm:text-5xl font-extrabold text-rose-600 font-serif">
            {days}
          </span>
          <span className="block text-xs font-bold uppercase tracking-wider text-rose-800 mt-1">
            Hari Menuju Akad & Resepsi
          </span>
          <p className="text-xs text-slate-600 mt-2 italic font-serif">
            “Ferdy & Tika — Dua hati mengikat satu janji suci selamanya.”
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Sisa Hari (Hitung Mundur)
            </label>
            <input
              type="number"
              min="0"
              value={days}
              onChange={(e) => setDays(parseInt(e.target.value, 10) || 0)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 font-bold outline-none focus:bg-white focus:ring-2 focus:ring-rose-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Tanggal Pernikahan
            </label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="Contoh: 18 Oktober 2025"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none focus:bg-white focus:ring-2 focus:ring-rose-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Lokasi Akad & Resepsi
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Contoh: Jakarta / Plataran Cilandak"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none focus:bg-white focus:ring-2 focus:ring-rose-400"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
            >
              <Check className="w-4 h-4" />
              <span>Simpan Pengaturan</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
