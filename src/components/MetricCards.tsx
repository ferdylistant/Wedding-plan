import React from 'react';
import { Wallet, Church, Home, CalendarCheck } from 'lucide-react';
import { formatCurrency, formatCompactCurrency } from '../utils/formatters';

interface MetricCardsProps {
  totalCurrent: number;
  totalTarget: number;
  weddingCurrent: number;
  weddingTarget: number;
  futureCurrent: number;
  futureTarget: number;
  monthlyCurrent: number;
  monthlyTarget: number;
  currentMonthName?: string;
  onSelectCategory?: (category: 'all' | 'wedding' | 'future' | 'monthly') => void;
}

export const MetricCards: React.FC<MetricCardsProps> = ({
  totalCurrent,
  totalTarget,
  weddingCurrent,
  weddingTarget,
  futureCurrent,
  futureTarget,
  monthlyCurrent,
  monthlyTarget,
  currentMonthName = 'Juni',
  onSelectCategory,
}) => {
  const totalPercent = (totalCurrent / totalTarget) * 100;
  const weddingPercent = (weddingCurrent / weddingTarget) * 100;
  const futurePercent = (futureCurrent / futureTarget) * 100;
  const monthlyPercent = (monthlyCurrent / monthlyTarget) * 100;

  const weddingRemaining = weddingTarget - weddingCurrent;
  const monthlyRemaining = monthlyTarget - monthlyCurrent;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {/* Card 1: Total Dana Bersama */}
      <div
        onClick={() => onSelectCategory && onSelectCategory('all')}
        className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100/80 flex items-center justify-center text-emerald-700">
              <Wallet className="w-5 h-5" />
            </div>
            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
              {totalPercent.toFixed(1)}% Target
            </span>
          </div>

          <div className="mt-4">
            <span className="text-xs font-medium text-slate-500">Total Dana Bersama</span>
            <div className="text-2xl sm:text-[26px] font-extrabold text-slate-900 tracking-tight mt-0.5">
              {formatCompactCurrency(totalCurrent)}
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100">
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden mb-2">
            <div
              className="bg-emerald-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, totalPercent)}%` }}
            ></div>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Target: {formatCurrency(totalTarget)}</span>
            <span className="font-semibold text-emerald-800">{formatCurrency(totalCurrent)}</span>
          </div>
        </div>
      </div>

      {/* Card 2: Pos Tabungan Nikah */}
      <div
        onClick={() => onSelectCategory && onSelectCategory('wedding')}
        className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:border-rose-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100/80 flex items-center justify-center text-rose-600">
              <Church className="w-5 h-5" />
            </div>
            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-rose-50 text-rose-700 border border-rose-200/60">
              {weddingPercent.toFixed(1)}% Lunas
            </span>
          </div>

          <div className="mt-4">
            <span className="text-xs font-medium text-slate-500">Pos Tabungan Nikah</span>
            <div className="text-2xl sm:text-[26px] font-extrabold text-slate-900 tracking-tight mt-0.5">
              {formatCurrency(weddingCurrent)}
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100">
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden mb-2">
            <div
              className="bg-[#C27B88] h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, weddingPercent)}%` }}
            ></div>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Target {formatCompactCurrency(weddingTarget)}</span>
            <span className="font-semibold text-rose-600">
              {weddingRemaining > 0 ? `-${formatCompactCurrency(weddingRemaining)}` : 'Lunas'}
            </span>
          </div>
        </div>
      </div>

      {/* Card 3: Pos Fondasi Masa Depan */}
      <div
        onClick={() => onSelectCategory && onSelectCategory('future')}
        className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:border-amber-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100/80 flex items-center justify-center text-amber-600">
              <Home className="w-5 h-5" />
            </div>
            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-50 text-amber-700 border border-amber-200/60">
              {futurePercent.toFixed(1)}%
            </span>
          </div>

          <div className="mt-4">
            <span className="text-xs font-medium text-slate-500">Pos Fondasi Masa Depan</span>
            <div className="text-2xl sm:text-[26px] font-extrabold text-slate-900 tracking-tight mt-0.5">
              {formatCurrency(futureCurrent)}
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100">
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden mb-2">
            <div
              className="bg-amber-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, futurePercent)}%` }}
            ></div>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Dana Darurat & DP Rumah</span>
            <span className="font-semibold text-amber-700">Target {formatCompactCurrency(futureTarget)}</span>
          </div>
        </div>
      </div>

      {/* Card 4: Setoran Bulan Ini */}
      <div
        onClick={() => onSelectCategory && onSelectCategory('monthly')}
        className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:border-teal-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100/80 flex items-center justify-center text-teal-600">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
              {monthlyPercent.toFixed(1)}% On Track
            </span>
          </div>

          <div className="mt-4">
            <span className="text-xs font-medium text-slate-500">Setoran Bulan {currentMonthName}</span>
            <div className="text-2xl sm:text-[26px] font-extrabold text-slate-900 tracking-tight mt-0.5">
              {formatCurrency(monthlyCurrent)}
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100">
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden mb-2">
            <div
              className="bg-teal-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, monthlyPercent)}%` }}
            ></div>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Target {formatCurrency(monthlyTarget)}</span>
            <span className="font-semibold text-slate-700">
              {monthlyRemaining > 0 ? `Sisa ${formatCompactCurrency(monthlyRemaining).replace('Rp ', '')}` : 'Tercapai!'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
