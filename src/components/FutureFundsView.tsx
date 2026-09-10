import React, { useState } from 'react';
import { Home, ShieldCheck, Baby, Plane, TrendingUp, Plus, CheckCircle2 } from 'lucide-react';
import { formatCurrency, formatCompactCurrency } from '../utils/formatters';

interface FutureFundsViewProps {
  totalFutureCurrent: number;
  totalFutureTarget: number;
  onAllocateFund?: (amount: number, target: string) => void;
}

export const FutureFundsView: React.FC<FutureFundsViewProps> = ({
  totalFutureCurrent,
  totalFutureTarget,
}) => {
  const [funds, setFunds] = useState([
    {
      id: '1',
      title: 'Dana Darurat Keluarga (6 Bulan)',
      desc: 'Simpanan likuid untuk keamanan darurat medis & biaya hidup tak terduga',
      current: 35_000_000,
      target: 60_000_000,
      monthly: 3_000_000,
      icon: 'shield',
      color: 'emerald',
    },
    {
      id: '2',
      title: 'DP Rumah Impian & Biaya KPR',
      desc: 'Tabungan awal untuk hunian nyaman Ferdy & Tika di masa depan',
      current: 27_000_000,
      target: 50_000_000,
      monthly: 3_500_000,
      icon: 'home',
      color: 'amber',
    },
    {
      id: '3',
      title: 'Persiapan Buah Hati & Kesehatan Anak',
      desc: 'Persiapan biaya kelahiran, perlengkapan bayi & imunisasi',
      current: 0,
      target: 25_000_000,
      monthly: 1_500_000,
      icon: 'baby',
      color: 'sky',
    },
    {
      id: '4',
      title: 'Honeymoon & Umrah Bersama',
      desc: 'Momen rehat dan ibadah berdua setelah rangkaian pernikahan selesai',
      current: 0,
      target: 20_000_000,
      monthly: 1_000_000,
      icon: 'plane',
      color: 'rose',
    },
  ]);

  const percent = (totalFutureCurrent / totalFutureTarget) * 100;

  return (
    <div className="space-y-6 pt-4 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-sky-500/10 border border-amber-200/60 rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-xs">
              Fondasi Jangka Panjang
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
              Masa Depan & Dana Darurat Ferdy & Tika
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              Pernikahan adalah hari pertama dari perjalanan panjang. Kami menyiapkan fondasi finansial yang kuat sebelum dan sesudah akad.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs min-w-[240px]">
            <div className="text-xs text-slate-500 font-medium">Terkumpul Saat Ini</div>
            <div className="text-2xl font-extrabold text-slate-900 mt-0.5">
              {formatCurrency(totalFutureCurrent)}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Target Total: {formatCurrency(totalFutureTarget)}
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 mt-3 overflow-hidden">
              <div
                className="bg-amber-500 h-2 rounded-full"
                style={{ width: `${Math.min(100, percent)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Fund Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {funds.map((fund) => {
          const itemPercent = (fund.current / fund.target) * 100;
          return (
            <div
              key={fund.id}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-700 shrink-0">
                      {fund.icon === 'shield' && <ShieldCheck className="w-5 h-5" />}
                      {fund.icon === 'home' && <Home className="w-5 h-5" />}
                      {fund.icon === 'baby' && <Baby className="w-5 h-5" />}
                      {fund.icon === 'plane' && <Plane className="w-5 h-5" />}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{fund.title}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">{fund.desc}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xl font-extrabold text-slate-900">
                      {formatCurrency(fund.current)}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      Target {formatCompactCurrency(fund.target)}
                    </span>
                  </div>

                  <div className="w-full bg-slate-100 rounded-full h-2 mt-2 overflow-hidden">
                    <div
                      className="bg-emerald-600 h-2 rounded-full transition-all"
                      style={{ width: `${Math.min(100, itemPercent)}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between text-xs text-slate-500 mt-2 font-medium">
                    <span>{itemPercent.toFixed(0)}% Tercapai</span>
                    <span>Alokasi: {formatCompactCurrency(fund.monthly)}/bln</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">Estimasi Tercapai:</span>
                <span className="font-bold text-emerald-800">
                  {fund.current >= fund.target
                    ? 'Sudah Terpenuhi'
                    : `${Math.ceil((fund.target - fund.current) / fund.monthly)} Bulan ke Depan`}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
