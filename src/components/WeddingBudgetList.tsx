import React from 'react';
import {
  Building2,
  Sparkles,
  Camera,
  CheckCircle2,
  Gift,
  ArrowRight,
  Plus,
  Heart,
  BookmarkCheck,
  Percent,
} from 'lucide-react';
import { WeddingCategoryItem } from '../types';
import { formatCurrency } from '../utils/formatters';

interface WeddingBudgetListProps {
  categories: WeddingCategoryItem[];
  onManageClick: () => void;
  onItemClick?: (item: WeddingCategoryItem) => void;
}

export const WeddingBudgetList: React.FC<WeddingBudgetListProps> = ({
  categories,
  onManageClick,
  onItemClick,
}) => {
  const getIcon = (type: string, isFullyPaid?: boolean) => {
    switch (type) {
      case 'venue':
        return (
          <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-700 shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
        );
      case 'attire':
        return (
          <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
        );
      case 'camera':
        return (
          <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-700 shrink-0">
            <Camera className="w-5 h-5" />
          </div>
        );
      case 'ring':
        return (
          <div className="w-10 h-10 rounded-xl bg-emerald-800 text-white flex items-center justify-center shrink-0 shadow-xs">
            <CheckCircle2 className="w-5 h-5 text-emerald-200" />
          </div>
        );
      case 'gift':
      default:
        return (
          <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-700 shrink-0">
            <Gift className="w-5 h-5" />
          </div>
        );
    }
  };

  const getProgressColor = (item: WeddingCategoryItem, percent: number) => {
    if (percent >= 100 || item.isFullyPaid) return 'bg-[#1E4E3D]';
    if (item.iconType === 'attire') return 'bg-[#C27B88]';
    if (item.iconType === 'gift') return 'bg-amber-500';
    return 'bg-[#1E4E3D]';
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-5 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
            <BookmarkCheck className="w-4 h-4" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">Target Pos Pernikahan</h2>
        </div>

        <button
          id="btn-manage-wedding-target"
          onClick={onManageClick}
          className="text-xs sm:text-sm font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 transition-colors cursor-pointer group"
        >
          <span>Kelola Target</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* List */}
      <div className="divide-y divide-slate-100 mt-2 flex-1">
        {categories.map((item) => {
          const percent = (item.currentAmount / item.targetAmount) * 100;
          const remaining = item.targetAmount - item.currentAmount;

          return (
            <div
              key={item.id}
              onClick={() => onItemClick && onItemClick(item)}
              className="py-4 first:pt-3 last:pb-1 group hover:bg-slate-50/70 px-2 -mx-2 rounded-xl transition-colors cursor-pointer"
            >
              {/* Top Row: Icon + Title + Amounts */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  {getIcon(item.iconType, item.isFullyPaid)}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                        {item.title}
                      </h3>
                      {item.badge && (
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            item.isFullyPaid || item.badge.includes('100%')
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 truncate mt-0.5">{item.vendor}</p>
                  </div>
                </div>

                {/* Right side: Amount info */}
                <div className="text-right shrink-0">
                  <div className="text-sm font-extrabold text-slate-900">
                    {formatCurrency(item.currentAmount)}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {item.isFullyPaid ? 'Lunas Penuh' : `dari ${formatCurrency(item.targetAmount)}`}
                  </div>
                </div>
              </div>

              {/* Progress Bar & Subtext */}
              <div className="mt-3">
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className={`${getProgressColor(item, percent)} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${Math.min(100, percent)}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1.5 font-medium">
                  <span>
                    {remaining > 0
                      ? `Tersisa ${formatCurrency(remaining)}`
                      : '✅ Siap dan lunas sepenuhnya'}
                  </span>
                  <span className="font-semibold text-slate-700">
                    {percent >= 100 ? '100%' : `${percent.toFixed(percent % 1 === 0 ? 0 : 1)}%`}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
