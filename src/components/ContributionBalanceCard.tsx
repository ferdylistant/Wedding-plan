import React from 'react';
import { Scale, Sparkles, TrendingUp, Users } from 'lucide-react';
import { formatCurrency, formatCompactCurrency } from '../utils/formatters';

interface ContributionBalanceCardProps {
  ferdyAmount: number;
  tikaAmount: number;
  ferdyMonthlyRoutine?: number;
  tikaMonthlyRoutine?: number;
  onSimulateClick?: () => void;
}

export const ContributionBalanceCard: React.FC<ContributionBalanceCardProps> = ({
  ferdyAmount,
  tikaAmount,
  ferdyMonthlyRoutine = 7_500_000,
  tikaMonthlyRoutine = 6_500_000,
  onSimulateClick,
}) => {
  const total = ferdyAmount + tikaAmount;
  const ferdyRatio = total > 0 ? (ferdyAmount / total) * 100 : 50;
  const tikaRatio = total > 0 ? (tikaAmount / total) * 100 : 50;

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#1E4E3D] flex items-center justify-center">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 leading-tight">Kontribusi Berimbang</h2>
              <p className="text-xs text-slate-500">Transparansi penuh dan pembagian adil untuk setiap rencana kita.</p>
            </div>
          </div>

          <div className="self-start sm:self-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              Rasio Dinamis {Math.round(ferdyRatio)} : {Math.round(tikaRatio)}
            </span>
          </div>
        </div>

        {/* Dual Progress Bar */}
        <div className="w-full h-3 rounded-full overflow-hidden flex my-4 bg-slate-100 p-0.5 border border-slate-200/60">
          <div
            className="bg-[#1E4E3D] h-full rounded-l-full transition-all duration-500"
            style={{ width: `${ferdyRatio}%` }}
            title={`Ferdy: ${ferdyRatio.toFixed(1)}%`}
          ></div>
          <div
            className="bg-[#C27B88] h-full rounded-r-full transition-all duration-500"
            style={{ width: `${tikaRatio}%` }}
            title={`Tika: ${tikaRatio.toFixed(1)}%`}
          ></div>
        </div>

        {/* 2 Comparison Cards Side by Side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-4">
          {/* Ferdy's Card */}
          <div className="bg-[#F0FDF4]/70 border border-emerald-100 rounded-xl p-4 flex items-center gap-3.5 hover:border-emerald-300 transition-colors">
            <div className="w-10 h-10 rounded-full bg-[#1E4E3D] text-white font-bold flex items-center justify-center text-base shrink-0 shadow-xs">
              F
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Bagian Ferdy ({Math.round(ferdyRatio)}%)
              </div>
              <div className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                {formatCurrency(ferdyAmount)}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5 font-medium">
                Setoran rutin: {formatCompactCurrency(ferdyMonthlyRoutine).replace('Rp ', '')}/bln
              </div>
            </div>
          </div>

          {/* Tika's Card */}
          <div className="bg-[#FFF1F2]/70 border border-rose-100 rounded-xl p-4 flex items-center gap-3.5 hover:border-rose-300 transition-colors">
            <div className="w-10 h-10 rounded-full bg-[#C27B88] text-white font-bold flex items-center justify-center text-base shrink-0 shadow-xs">
              T
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Bagian Tika ({Math.round(tikaRatio)}%)
              </div>
              <div className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                {formatCurrency(tikaAmount)}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5 font-medium">
                Setoran rutin: {formatCompactCurrency(tikaMonthlyRoutine).replace('Rp ', '')}/bln
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reassurance Note Box */}
      <div className="mt-5 p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl flex items-start gap-3 text-xs text-slate-600">
        <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
          <Sparkles className="w-3.5 h-3.5" />
        </div>
        <p className="leading-relaxed">
          <strong className="text-slate-800 font-semibold">Kompak dan selaras!</strong> Kontribusi kita seimbang sesuai kesepakatan bersama untuk mencapai pernikahan impian tanpa beban finansial berlebih.
        </p>
      </div>
    </div>
  );
};
