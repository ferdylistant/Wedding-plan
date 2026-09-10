import React, { useState } from 'react';
import { X, Plus, Trash2, CheckCircle2, Edit3 } from 'lucide-react';
import { WeddingCategoryItem } from '../types';
import { formatCurrency, parseIndonesianCurrency } from '../utils/formatters';

interface ManageTargetsModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: WeddingCategoryItem[];
  onUpdateCategories: (categories: WeddingCategoryItem[]) => void;
}

export const ManageTargetsModal: React.FC<ManageTargetsModalProps> = ({
  isOpen,
  onClose,
  categories,
  onUpdateCategories,
}) => {
  const [items, setItems] = useState<WeddingCategoryItem[]>(categories);
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newVendor, setNewVendor] = useState('');
  const [newTarget, setNewTarget] = useState('10.000.000');
  const [newCurrent, setNewCurrent] = useState('0');
  const [newIconType, setNewIconType] = useState<WeddingCategoryItem['iconType']>('gift');

  if (!isOpen) return null;

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const targetVal = parseIndonesianCurrency(newTarget);
    const currentVal = parseIndonesianCurrency(newCurrent);

    const newItem: WeddingCategoryItem = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      vendor: newVendor.trim() || 'Vendor belum ditentukan',
      currentAmount: currentVal,
      targetAmount: targetVal || 10_000_000,
      iconType: newIconType,
      isFullyPaid: currentVal >= targetVal,
      badge: currentVal >= targetVal ? '100% Tercapai! 🎉' : undefined,
    };

    const updated = [...items, newItem];
    setItems(updated);
    onUpdateCategories(updated);
    setIsAdding(false);
    setNewTitle('');
    setNewVendor('');
  };

  const handleDeleteItem = (id: string) => {
    const updated = items.filter((i) => i.id !== id);
    setItems(updated);
    onUpdateCategories(updated);
  };

  const handleTogglePaid = (id: string) => {
    const updated = items.map((item) => {
      if (item.id === id) {
        const isNowPaid = !item.isFullyPaid;
        return {
          ...item,
          isFullyPaid: isNowPaid,
          currentAmount: isNowPaid ? item.targetAmount : Math.floor(item.targetAmount * 0.7),
          badge: isNowPaid ? '100% Tercapai! 🎉' : 'DP Lunas',
        };
      }
      return item;
    });
    setItems(updated);
    onUpdateCategories(updated);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Kelola Target Pos Pernikahan</h2>
            <p className="text-xs text-slate-500">
              Rincian pos biaya, status pelunasan vendor, dan target anggaran pernikahan Ferdy & Tika
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List of items */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between gap-3 hover:bg-slate-100/60 transition-colors"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-900">{item.title}</span>
                  {item.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {item.badge}
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">{item.vendor}</div>
                <div className="text-xs font-semibold text-emerald-800 mt-1">
                  {formatCurrency(item.currentAmount)} / {formatCurrency(item.targetAmount)} (
                  {((item.currentAmount / item.targetAmount) * 100).toFixed(0)}%)
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleTogglePaid(item.id)}
                  title={item.isFullyPaid ? 'Tandai belum lunas' : 'Tandai Lunas Penuh'}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 ${
                    item.isFullyPaid
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{item.isFullyPaid ? 'Lunas' : 'Set Lunas'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDeleteItem(item.id)}
                  title="Hapus pos"
                  className="w-8 h-8 rounded-xl bg-white border border-slate-200 hover:bg-rose-50 hover:border-rose-300 text-slate-400 hover:text-rose-600 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}

          {/* Add form */}
          {isAdding ? (
            <form onSubmit={handleAddItem} className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-3">
              <h3 className="text-xs font-bold text-emerald-900 uppercase">Tambah Pos Baru</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-700">Nama Pos</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Contoh: Souvenir Tambahan"
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-700">Vendor / Catatan</label>
                  <input
                    type="text"
                    value={newVendor}
                    onChange={(e) => setNewVendor(e.target.value)}
                    placeholder="Nama vendor atau lokasi"
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-700">Target Anggaran (Rp)</label>
                  <input
                    type="text"
                    value={newTarget}
                    onChange={(e) => setNewTarget(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 font-bold"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-700">Sudah Terkumpul / Dibayar (Rp)</label>
                  <input
                    type="text"
                    value={newCurrent}
                    onChange={(e) => setNewCurrent(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 font-bold"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-[#1E4E3D] hover:bg-[#163a2c] text-white text-xs font-bold"
                >
                  Tambahkan Pos
                </button>
              </div>
            </form>
          ) : (
            <button
              type="button"
              onClick={() => setIsAdding(true)}
              className="w-full py-3 rounded-2xl border-2 border-dashed border-slate-300 hover:border-emerald-500 hover:bg-emerald-50/50 text-slate-600 hover:text-emerald-800 font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Pos Target Anggaran Baru</span>
            </button>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#1E4E3D] hover:bg-[#163a2c] text-white text-xs font-bold cursor-pointer"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
};
