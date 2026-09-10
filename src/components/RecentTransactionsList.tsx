import React from 'react';
import { Receipt, ArrowUpRight, ArrowDownRight, ArrowRight } from 'lucide-react';
import { Transaction } from '../types';
import { formatCurrency } from '../utils/formatters';

interface RecentTransactionsListProps {
  transactions: Transaction[];
  onViewAllClick: () => void;
  coupleAvatarUrl: string;
}

export const RecentTransactionsList: React.FC<RecentTransactionsListProps> = ({
  transactions,
  onViewAllClick,
  coupleAvatarUrl,
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#1E4E3D] flex items-center justify-center">
              <Receipt className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Catatan Kas Terakhir</h2>
          </div>

          <button
            id="btn-view-all-transactions"
            onClick={onViewAllClick}
            className="text-xs sm:text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            Lihat Semua
          </button>
        </div>

        {/* Transactions List */}
        <div className="divide-y divide-slate-100 mt-1">
          {transactions.slice(0, 4).map((tx) => {
            const isDeposit = tx.type === 'deposit';
            const isFerdy = tx.user === 'Ferdy';

            return (
              <div
                key={tx.id}
                className="py-3.5 first:pt-2.5 last:pb-2 flex items-start justify-between gap-3 hover:bg-slate-50/70 px-2 -mx-2 rounded-xl transition-colors"
              >
                {/* User Avatar + Details */}
                <div className="flex items-start gap-3 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-2xs ${
                      isFerdy ? 'bg-[#1E4E3D]' : 'bg-[#C27B88]'
                    }`}
                  >
                    {isFerdy ? 'F' : 'T'}
                  </div>

                  <div className="min-w-0">
                    <div className="text-sm font-bold text-slate-900 leading-tight">
                      {tx.fullName}
                    </div>
                    <div className="text-xs text-slate-600 italic mt-0.5 break-words">
                      “{tx.note}”
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 font-medium">
                      {tx.date} • {tx.category}
                    </div>
                  </div>
                </div>

                {/* Amount */}
                <div className="text-right shrink-0 pt-0.5">
                  <span
                    className={`text-sm font-extrabold tracking-tight ${
                      isDeposit ? 'text-emerald-700' : 'text-rose-700'
                    }`}
                  >
                    {isDeposit ? '+' : '-'}
                    {formatCurrency(tx.amount)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Love / Motivation Quote Card */}
      <div className="mt-5 p-4 bg-gradient-to-r from-[#EFF6FF] via-[#F1F5F9] to-[#FDF2F8] border border-sky-100/90 rounded-2xl flex items-center gap-3.5 shadow-2xs">
        <img
          src={coupleAvatarUrl}
          alt="Ferdy & Tika"
          referrerPolicy="no-referrer"
          className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-xs shrink-0"
        />
        <div className="min-w-0">
          <p className="text-xs sm:text-[13px] font-serif italic font-semibold text-slate-800 leading-snug">
            “Selangkah demi selangkah, menuju hari bahagia.”
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Semoga senantiasa dimudahkan rezeki berdua.
          </p>
        </div>
      </div>
    </div>
  );
};
