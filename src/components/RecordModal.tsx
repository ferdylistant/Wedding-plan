import React, { useState } from 'react';
import { X, Check, ArrowDownCircle, ArrowUpCircle } from 'lucide-react';
import { CoupleUser, Transaction } from '../types';
import { parseIndonesianCurrency } from '../utils/formatters';
import confetti from 'canvas-confetti';

interface RecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTransaction: (tx: {
    user: CoupleUser;
    type: 'deposit' | 'expense';
    amount: number;
    note: string;
    category: string;
    date: string;
  }) => void;
}

export const RecordModal: React.FC<RecordModalProps> = ({
  isOpen,
  onClose,
  onAddTransaction,
}) => {
  const [recordType, setRecordType] = useState<'deposit' | 'expense'>('deposit');
  const [selectedUser, setSelectedUser] = useState<CoupleUser>('Ferdy');
  const [nominalStr, setNominalStr] = useState<string>('2.500.000');
  const [category, setCategory] = useState<string>('Pos Tabungan Nikah');
  const [note, setNote] = useState<string>('');

  if (!isOpen) return null;

  const categories =
    recordType === 'deposit'
      ? ['Pos Tabungan Nikah', 'Pos Fondasi Masa Depan', 'Dana Darurat & DP Rumah', 'Rekening Bersama Mandiri']
      : [
          'Pengeluaran Venue & Catering',
          'Pos MUA & Busana',
          'Dokumentasi Photo & Video',
          'Mahar & Cincin Kawin',
          'Souvenir & Undangan',
          'Lain-lain',
        ];

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
    setNominalStr((currentNum + addAmount).toLocaleString('id-ID'));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseIndonesianCurrency(nominalStr);
    if (amount <= 0) return;

    if (recordType === 'deposit') {
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#10B981', '#34D399', '#FBBF24'],
        });
      } catch {
        // fallback
      }
    }

    onAddTransaction({
      user: selectedUser,
      type: recordType,
      amount,
      note: note.trim() || (recordType === 'deposit' ? `Setoran ${selectedUser}` : `Pengeluaran ${category}`),
      category,
      date: 'Hari ini, ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 overflow-hidden relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Catat Transaksi</h2>
            <p className="text-xs text-slate-500">Pencatatan transparan untuk tabungan bersama Ferdy & Tika</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Type Toggle: Setoran vs Pengeluaran */}
        <div className="grid grid-cols-2 gap-2 mt-4 p-1 bg-slate-100 rounded-xl">
          <button
            type="button"
            onClick={() => {
              setRecordType('deposit');
              setCategory('Pos Tabungan Nikah');
            }}
            className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              recordType === 'deposit'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ArrowUpCircle className="w-4 h-4" />
            <span>+ Setoran Bersama</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setRecordType('expense');
              setCategory('Pengeluaran Venue & Catering');
            }}
            className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              recordType === 'expense'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ArrowDownCircle className="w-4 h-4" />
            <span>- Pengeluaran / DP</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* User selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Siapa yang melakukan transaksi?
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectedUser('Ferdy')}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  selectedUser === 'Ferdy'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/20'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-[#1E4E3D] text-white flex items-center justify-center text-[10px] font-bold">
                  F
                </div>
                <span>Ferdy Pratama</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedUser('Tika')}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  selectedUser === 'Tika'
                    ? 'border-rose-500 bg-rose-50 text-rose-900 ring-2 ring-rose-500/20'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-[#C27B88] text-white flex items-center justify-center text-[10px] font-bold">
                  T
                </div>
                <span>Tika Amelia</span>
              </button>
            </div>
          </div>

          {/* Nominal */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nominal (Rp)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-base">
                Rp
              </span>
              <input
                type="text"
                value={nominalStr}
                onChange={handleNominalChange}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-2.5 text-slate-900 font-extrabold text-lg outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Quick chips */}
            <div className="flex items-center gap-1.5 mt-2">
              <button
                type="button"
                onClick={() => handleQuickAdd(500_000)}
                className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
              >
                +500rb
              </button>
              <button
                type="button"
                onClick={() => handleQuickAdd(1_000_000)}
                className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
              >
                +1jt
              </button>
              <button
                type="button"
                onClick={() => handleQuickAdd(5_000_000)}
                className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
              >
                +5jt
              </button>
              <button
                type="button"
                onClick={() => handleQuickAdd(10_000_000)}
                className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
              >
                +10jt
              </button>
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Kategori / Pos Anggaran
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Note */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Catatan Kasih
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Contoh: Setoran gaji + bonus atau Pelunasan vendor"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#1E4E3D] hover:bg-[#163a2c] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Simpan Transaksi</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
