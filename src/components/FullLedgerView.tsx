import React, { useState } from 'react';
import { Search, Filter, ArrowDownLeft, ArrowUpRight, Calendar, UserCheck } from 'lucide-react';
import { Transaction, CoupleUser } from '../types';
import { formatCurrency } from '../utils/formatters';

interface FullLedgerViewProps {
  transactions: Transaction[];
  onOpenAddModal: () => void;
}

export const FullLedgerView: React.FC<FullLedgerViewProps> = ({
  transactions,
  onOpenAddModal,
}) => {
  const [userFilter, setUserFilter] = useState<'All' | CoupleUser>('All');
  const [typeFilter, setTypeFilter] = useState<'All' | 'deposit' | 'expense'>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = transactions.filter((tx) => {
    if (userFilter !== 'All' && tx.user !== userFilter) return false;
    if (typeFilter !== 'All' && tx.type !== typeFilter) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        tx.note.toLowerCase().includes(q) ||
        tx.category.toLowerCase().includes(q) ||
        tx.fullName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalDeposits = filtered
    .filter((t) => t.type === 'deposit')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpenses = filtered
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  return (
    <div className="space-y-6 pt-4 animate-in fade-in duration-200">
      {/* Overview stats bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Total Pemasukan / Setoran</span>
          <div className="text-xl sm:text-2xl font-extrabold text-emerald-800 mt-1">
            +{formatCurrency(totalDeposits)}
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Akumulasi tabungan bersama</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Total Pengeluaran / DP</span>
          <div className="text-xl sm:text-2xl font-extrabold text-rose-800 mt-1">
            -{formatCurrency(totalExpenses)}
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Dibayarkan ke vendor</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <span className="text-xs font-semibold text-slate-500">Jumlah Transaksi Terdata</span>
          <div className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
            {filtered.length} Transaksi
          </div>
          <button
            onClick={onOpenAddModal}
            className="text-xs font-bold text-emerald-800 hover:text-emerald-950 text-left mt-1 cursor-pointer"
          >
            + Tambah Catatan Baru →
          </button>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari transaksi, vendor, atau catatan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-800 outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* User filter */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setUserFilter('All')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                userFilter === 'All' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setUserFilter('Ferdy')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                userFilter === 'Ferdy' ? 'bg-emerald-800 text-white shadow-xs' : 'text-slate-600'
              }`}
            >
              Ferdy
            </button>
            <button
              onClick={() => setUserFilter('Tika')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                userFilter === 'Tika' ? 'bg-rose-700 text-white shadow-xs' : 'text-slate-600'
              }`}
            >
              Tika
            </button>
          </div>

          {/* Type filter */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setTypeFilter('All')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                typeFilter === 'All' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              Semua Tipe
            </button>
            <button
              onClick={() => setTypeFilter('deposit')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                typeFilter === 'deposit' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600'
              }`}
            >
              Setoran (+)
            </button>
            <button
              onClick={() => setTypeFilter('expense')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                typeFilter === 'expense' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-600'
              }`}
            >
              Pengeluaran (-)
            </button>
          </div>
        </div>
      </div>

      {/* Ledger Table / List */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="divide-y divide-slate-100">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm">
              Tidak ada catatan transaksi yang sesuai dengan filter.
            </div>
          ) : (
            filtered.map((tx) => {
              const isDeposit = tx.type === 'deposit';
              const isFerdy = tx.user === 'Ferdy';

              return (
                <div
                  key={tx.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/70 transition-colors"
                >
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 ${
                        isFerdy ? 'bg-[#1E4E3D]' : 'bg-[#C27B88]'
                      }`}
                    >
                      {isFerdy ? 'F' : 'T'}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-bold text-slate-900">{tx.fullName}</span>
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                          {tx.category}
                        </span>
                        <span className="text-[11px] text-slate-400">{tx.date}</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 italic">“{tx.note}”</p>
                    </div>
                  </div>

                  <div className="text-right pl-12 sm:pl-0">
                    <div
                      className={`text-base font-extrabold tracking-tight ${
                        isDeposit ? 'text-emerald-700' : 'text-rose-700'
                      }`}
                    >
                      {isDeposit ? '+' : '-'}
                      {formatCurrency(tx.amount)}
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {isDeposit ? 'Masuk Rekening' : 'Dibayar ke Vendor'}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
