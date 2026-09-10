import React, { useState } from 'react';
import { Sparkles, HeartHandshake, Check, Coins } from 'lucide-react';
import { CoupleUser } from '../types';
import { formatCurrency, parseIndonesianCurrency } from '../utils/formatters';
import confetti from 'canvas-confetti';

interface QuickDepositCardProps {
  onAddDeposit: (deposit: {
    user: CoupleUser;
    amount: number;
    note: string;
    category: string;
  }) => void;
}

export const QuickDepositCard: React.FC<QuickDepositCardProps> = ({ onAddDeposit }) => {
  const [selectedUser, setSelectedUser] = useState<CoupleUser>('Ferdy');
  const [nominalStr, setNominalStr] = useState<string>('3.500.000');
  const [note, setNote] = useState<string>('Tabungan tambahan dari insentif kerja');
  const [targetCategory, setTargetCategory] = useState<string>('Pos Tabungan Nikah');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleNominalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/[^\d]/g, '');
    if (!rawVal) {
      setNominalStr('');
      return;
    }
    const num = parseInt(rawVal, 10);
    setNominalStr(num.toLocaleString('id-ID'));
  };

  const handleQuickAdd = (addAmount: number) => {
    const currentNum = parseIndonesianCurrency(nominalStr);
    const updated = currentNum + addAmount;
    setNominalStr(updated.toLocaleString('id-ID'));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseIndonesianCurrency(nominalStr);
    if (amount <= 0) return;

    // Trigger joyful celebration
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#10B981', '#F43F5E', '#FBBF24', '#34D399'],
      });
    } catch {
      // safe fallback
    }

    onAddDeposit({
      user: selectedUser,
      amount,
      note: note.trim() || `Setoran rutin ${selectedUser}`,
      category: targetCategory,
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setNominalStr('3.500.000');
      setNote('Tabungan tambahan dari insentif kerja');
    }, 2200);
  };

  return (
    <div className="bg-gradient-to-br from-[#163A2C] via-[#1B4332] to-[#143226] text-white rounded-2xl p-6 shadow-md border border-emerald-900/40 relative overflow-hidden flex flex-col justify-between">
      {/* Decorative ambient background accents */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none -mr-16 -mt-16"></div>
      <div className="absolute bottom-0 left-0 w-36 h-36 bg-rose-500/10 rounded-full blur-xl pointer-events-none -ml-10 -mb-10"></div>

      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/80 border border-emerald-700/60 text-emerald-200 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Tabungan Cinta
          </span>

          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-emerald-200">
            <HeartHandshake className="w-4 h-4" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-white tracking-tight mt-1">Tambah Setoran Bersama</h2>
        <p className="text-xs text-emerald-100/80 mt-1 leading-relaxed">
          Setiap rupiah mendekatkan kita pada momen mengikat janji sehidup semati.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
          {/* User selector */}
          <div>
            <label className="block text-xs font-medium text-emerald-100 mb-1.5">
              Siapa yang menyetor?
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                id="deposit-user-ferdy"
                onClick={() => setSelectedUser('Ferdy')}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  selectedUser === 'Ferdy'
                    ? 'bg-emerald-900/90 border-emerald-400 text-white shadow-inner'
                    : 'bg-black/20 border-white/10 text-emerald-200/80 hover:bg-black/30'
                }`}
              >
                <span
                  className={`w-3 h-3 rounded-full border-2 flex items-center justify-center ${
                    selectedUser === 'Ferdy' ? 'border-emerald-400 bg-white' : 'border-white/40'
                  }`}
                ></span>
                <span>Ferdy</span>
              </button>

              <button
                type="button"
                id="deposit-user-tika"
                onClick={() => setSelectedUser('Tika')}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  selectedUser === 'Tika'
                    ? 'bg-rose-950/80 border-rose-400 text-white shadow-inner'
                    : 'bg-black/20 border-white/10 text-emerald-200/80 hover:bg-black/30'
                }`}
              >
                <span
                  className={`w-3 h-3 rounded-full border-2 flex items-center justify-center ${
                    selectedUser === 'Tika' ? 'border-rose-400 bg-white' : 'border-white/40'
                  }`}
                ></span>
                <span>Tika</span>
              </button>
            </div>
          </div>

          {/* Nominal Input */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-medium text-emerald-100">
                Nominal (Rp)
              </label>
              <span className="text-[11px] text-emerald-300 font-medium">Bebas nominal</span>
            </div>

            <div className="relative">
              <input
                id="deposit-amount-input"
                type="text"
                value={nominalStr}
                onChange={handleNominalChange}
                placeholder="0"
                className="w-full bg-white text-slate-900 font-bold text-lg px-4 py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-emerald-400 border border-emerald-200 shadow-inner"
              />
            </div>

            {/* Quick Increment Chips */}
            <div className="flex items-center gap-1.5 mt-2">
              <button
                type="button"
                onClick={() => handleQuickAdd(500_000)}
                className="text-[11px] bg-white/10 hover:bg-white/20 text-emerald-100 px-2 py-1 rounded-lg border border-white/10 transition-colors"
              >
                +500rb
              </button>
              <button
                type="button"
                onClick={() => handleQuickAdd(1_000_000)}
                className="text-[11px] bg-white/10 hover:bg-white/20 text-emerald-100 px-2 py-1 rounded-lg border border-white/10 transition-colors"
              >
                +1jt
              </button>
              <button
                type="button"
                onClick={() => handleQuickAdd(2_500_000)}
                className="text-[11px] bg-white/10 hover:bg-white/20 text-emerald-100 px-2 py-1 rounded-lg border border-white/10 transition-colors"
              >
                +2.5jt
              </button>
              <button
                type="button"
                onClick={() => handleQuickAdd(5_000_000)}
                className="text-[11px] bg-white/10 hover:bg-white/20 text-emerald-100 px-2 py-1 rounded-lg border border-white/10 transition-colors"
              >
                +5jt
              </button>
            </div>
          </div>

          {/* Catatan Kasih */}
          <div>
            <label className="block text-xs font-medium text-emerald-100 mb-1">
              Catatan Kasih
            </label>
            <input
              id="deposit-note-input"
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Contoh: Tabungan tambahan dari insentif kerja"
              className="w-full bg-white text-slate-800 text-xs px-3.5 py-2 rounded-xl outline-none focus:ring-2 focus:ring-emerald-400 border border-emerald-200"
            />
          </div>

          {/* Action Button */}
          <button
            id="deposit-submit-btn"
            type="submit"
            disabled={isSuccess}
            className={`w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer mt-3 shadow-md ${
              isSuccess
                ? 'bg-emerald-400 text-emerald-950 scale-100'
                : 'bg-white hover:bg-emerald-50 text-[#163A2C] active:scale-[0.99]'
            }`}
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>{isSuccess ? 'Berhasil Disimpan! 🎉' : 'Konfirmasi Simpanan'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
