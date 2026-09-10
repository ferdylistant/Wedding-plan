/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { MetricCards } from './components/MetricCards';
import { ContributionBalanceCard } from './components/ContributionBalanceCard';
import { QuickDepositCard } from './components/QuickDepositCard';
import { WeddingBudgetList } from './components/WeddingBudgetList';
import { RecentTransactionsList } from './components/RecentTransactionsList';
import { Footer } from './components/Footer';
import { RecordModal } from './components/RecordModal';
import { ManageTargetsModal } from './components/ManageTargetsModal';
import { CountdownModal } from './components/CountdownModal';
import { FutureFundsView } from './components/FutureFundsView';
import { FullLedgerView } from './components/FullLedgerView';
import { CoupleUser, Transaction, WeddingCategoryItem } from './types';
import couplePhoto from './assets/images/couple_ferdy_tika_1789048050288.jpg';

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState<'summary' | 'wedding' | 'future' | 'ledger'>('summary');

  // Modals
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [isManageTargetsOpen, setIsManageTargetsOpen] = useState(false);
  const [isCountdownModalOpen, setIsCountdownModalOpen] = useState(false);

  // Wedding details
  const [daysLeft, setDaysLeft] = useState(120);
  const [weddingDate, setWeddingDate] = useState('18 Oktober 2025');
  const [weddingLocation, setWeddingLocation] = useState('Jakarta');

  // Financial States
  const [totalTarget] = useState(270_000_000);
  const [weddingTarget] = useState(160_000_000);
  const [futureTarget] = useState(110_000_000);
  const [monthlyTarget] = useState(15_000_000);
  const [monthlyCurrent, setMonthlyCurrent] = useState(14_000_000);

  // Individual Contributions
  const [ferdyAmount, setFerdyAmount] = useState(96_000_000);
  const [tikaAmount, setTikaAmount] = useState(88_500_000);

  // Target Pos Items
  const [weddingCategories, setWeddingCategories] = useState<WeddingCategoryItem[]>([
    {
      id: '1',
      title: 'Venue & Catering Grand Ballroom',
      vendor: 'Vendor: Plataran Cilandak • Pelunasan H-30',
      currentAmount: 70_000_000,
      targetAmount: 85_000_000,
      badge: 'DP Lunas',
      iconType: 'venue',
    },
    {
      id: '2',
      title: 'MUA, Attire & Busana Pengantin',
      vendor: 'Adat Sunda & Resepsi Modern • Fit-in Juli',
      currentAmount: 18_000_000,
      targetAmount: 20_000_000,
      iconType: 'attire',
    },
    {
      id: '3',
      title: 'Dokumentasi Photo & Cinematic Video',
      vendor: 'Team The Leonardi • Termasuk Pre-wedding outdoor',
      currentAmount: 15_000_000,
      targetAmount: 18_000_000,
      iconType: 'camera',
    },
    {
      id: '4',
      title: 'Mahar & Cincin Kawin Custom',
      vendor: 'Sudah di-order di Frank & co. • Siap Diambil',
      currentAmount: 12_000_000,
      targetAmount: 12_000_000,
      badge: '100% Tercapai! 🎉',
      isFullyPaid: true,
      iconType: 'ring',
    },
    {
      id: '5',
      title: 'Souvenir & Undangan Digital Interaktif',
      vendor: 'Target 500 pcs bibit aromaterapi & web undangan',
      currentAmount: 7_500_000,
      targetAmount: 15_000_000,
      iconType: 'gift',
    },
  ]);

  // Pos Fondasi Masa Depan current amount
  const [futureCurrent, setFutureCurrent] = useState(62_000_000);

  // Recent Transactions
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 'tx-1',
      user: 'Tika',
      fullName: 'Tika Amelia',
      type: 'deposit',
      amount: 7_500_000,
      note: 'Setoran gaji Tika + bonus lembur ❤️',
      category: 'Pos Tabungan Nikah',
      date: 'Kemarin, 16:45',
      timestamp: Date.now() - 86400000,
    },
    {
      id: 'tx-2',
      user: 'Ferdy',
      fullName: 'Ferdy Pratama',
      type: 'expense',
      amount: 25_000_000,
      note: 'Ferdy bayar DP Gedung Graha Asri (Tahap 1)',
      category: 'Pengeluaran Venue',
      date: '3 Hari lalu',
      timestamp: Date.now() - 86400000 * 3,
    },
    {
      id: 'tx-3',
      user: 'Ferdy',
      fullName: 'Ferdy Pratama',
      type: 'deposit',
      amount: 8_000_000,
      note: 'Autodebit gaji bulanan Ferdy ke rekening bersama ✨',
      category: 'Rekening Bersama Mandiri',
      date: '5 Juni 2025',
      timestamp: Date.now() - 86400000 * 5,
    },
    {
      id: 'tx-4',
      user: 'Tika',
      fullName: 'Tika Amelia',
      type: 'expense',
      amount: 6_000_000,
      note: 'Booking fee MUA & fitting attire adat Sunda 🌸',
      category: 'Pos MUA & Busana',
      date: '1 Juni 2025',
      timestamp: Date.now() - 86400000 * 9,
    },
  ]);

  // Derived Totals
  const totalCurrent = ferdyAmount + tikaAmount;
  const weddingCurrent = weddingCategories.reduce((acc, item) => acc + item.currentAmount, 0);

  // Handler for Quick Deposit from the card
  const handleQuickDeposit = (deposit: {
    user: CoupleUser;
    amount: number;
    note: string;
    category: string;
  }) => {
    const isFerdy = deposit.user === 'Ferdy';
    if (isFerdy) {
      setFerdyAmount((prev) => prev + deposit.amount);
    } else {
      setTikaAmount((prev) => prev + deposit.amount);
    }

    setMonthlyCurrent((prev) => prev + deposit.amount);

    if (deposit.category.includes('Masa Depan') || deposit.category.includes('Darurat')) {
      setFutureCurrent((prev) => prev + deposit.amount);
    }

    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      user: deposit.user,
      fullName: isFerdy ? 'Ferdy Pratama' : 'Tika Amelia',
      type: 'deposit',
      amount: deposit.amount,
      note: deposit.note,
      category: deposit.category,
      date: 'Baru saja',
      timestamp: Date.now(),
    };

    setTransactions((prev) => [newTx, ...prev]);
  };

  // Handler for modal transactions
  const handleAddTransaction = (tx: {
    user: CoupleUser;
    type: 'deposit' | 'expense';
    amount: number;
    note: string;
    category: string;
    date: string;
  }) => {
    const isFerdy = tx.user === 'Ferdy';

    if (tx.type === 'deposit') {
      if (isFerdy) {
        setFerdyAmount((prev) => prev + tx.amount);
      } else {
        setTikaAmount((prev) => prev + tx.amount);
      }
      setMonthlyCurrent((prev) => prev + tx.amount);
    } else {
      // Expense reduces amount proportionally or updates vendor
      if (isFerdy) {
        setFerdyAmount((prev) => Math.max(0, prev - Math.round(tx.amount * 0.52)));
      } else {
        setTikaAmount((prev) => Math.max(0, prev - Math.round(tx.amount * 0.48)));
      }
    }

    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      user: tx.user,
      fullName: isFerdy ? 'Ferdy Pratama' : 'Tika Amelia',
      type: tx.type,
      amount: tx.amount,
      note: tx.note,
      category: tx.category,
      date: tx.date,
      timestamp: Date.now(),
    };

    setTransactions((prev) => [newTx, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Sticky Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        daysLeft={daysLeft}
        onOpenDepositModal={() => setIsRecordModalOpen(true)}
        onOpenCountdownModal={() => setIsCountdownModalOpen(true)}
        coupleAvatarUrl={couplePhoto}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Hero Section */}
        <HeroSection
          currentPercentage={(totalCurrent / totalTarget) * 100}
          daysLeft={daysLeft}
          weddingDate={weddingDate}
          weddingLocation={weddingLocation}
          onOpenCountdownModal={() => setIsCountdownModalOpen(true)}
        />

        {/* Top 4 Summary Cards */}
        <div className="mt-2">
          <MetricCards
            totalCurrent={totalCurrent}
            totalTarget={totalTarget}
            weddingCurrent={weddingCurrent}
            weddingTarget={weddingTarget}
            futureCurrent={futureCurrent}
            futureTarget={futureTarget}
            monthlyCurrent={monthlyCurrent}
            monthlyTarget={monthlyTarget}
            currentMonthName="Juni"
            onSelectCategory={(cat) => {
              if (cat === 'wedding') setActiveTab('wedding');
              if (cat === 'future') setActiveTab('future');
            }}
          />
        </div>

        {/* View Switcher based on Active Tab */}
        {activeTab === 'summary' && (
          <div className="mt-8 space-y-8">
            {/* Middle Row: Kontribusi Berimbang & Tambah Setoran Bersama */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              <div className="lg:col-span-7">
                <ContributionBalanceCard
                  ferdyAmount={ferdyAmount}
                  tikaAmount={tikaAmount}
                  ferdyMonthlyRoutine={7_500_000}
                  tikaMonthlyRoutine={6_500_000}
                />
              </div>

              <div className="lg:col-span-5">
                <QuickDepositCard onAddDeposit={handleQuickDeposit} />
              </div>
            </div>

            {/* Lower Row: Target Pos Pernikahan & Catatan Kas Terakhir */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              <div className="lg:col-span-7">
                <WeddingBudgetList
                  categories={weddingCategories}
                  onManageClick={() => setIsManageTargetsOpen(true)}
                  onItemClick={() => setIsManageTargetsOpen(true)}
                />
              </div>

              <div className="lg:col-span-5">
                <RecentTransactionsList
                  transactions={transactions}
                  onViewAllClick={() => setActiveTab('ledger')}
                  coupleAvatarUrl={couplePhoto}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'wedding' && (
          <div className="mt-8 space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Rencana Anggaran Pos Pernikahan</h2>
                <p className="text-sm text-slate-500">
                  Target total: 160 Juta Rupiah untuk hari bahagia Ferdy & Tika
                </p>
              </div>
              <button
                onClick={() => setIsManageTargetsOpen(true)}
                className="px-4 py-2 bg-[#1E4E3D] hover:bg-[#163a2c] text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
              >
                + Kelola / Tambah Pos
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8">
                <WeddingBudgetList
                  categories={weddingCategories}
                  onManageClick={() => setIsManageTargetsOpen(true)}
                  onItemClick={() => setIsManageTargetsOpen(true)}
                />
              </div>
              <div className="lg:col-span-4">
                <QuickDepositCard onAddDeposit={handleQuickDeposit} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'future' && (
          <div className="mt-8">
            <FutureFundsView
              totalFutureCurrent={futureCurrent}
              totalFutureTarget={futureTarget}
            />
          </div>
        )}

        {activeTab === 'ledger' && (
          <div className="mt-8">
            <FullLedgerView
              transactions={transactions}
              onOpenAddModal={() => setIsRecordModalOpen(true)}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <RecordModal
        isOpen={isRecordModalOpen}
        onClose={() => setIsRecordModalOpen(false)}
        onAddTransaction={handleAddTransaction}
      />

      <ManageTargetsModal
        isOpen={isManageTargetsOpen}
        onClose={() => setIsManageTargetsOpen(false)}
        categories={weddingCategories}
        onUpdateCategories={setWeddingCategories}
      />

      <CountdownModal
        isOpen={isCountdownModalOpen}
        onClose={() => setIsCountdownModalOpen(false)}
        daysLeft={daysLeft}
        weddingDate={weddingDate}
        weddingLocation={weddingLocation}
        onUpdateWeddingInfo={(info) => {
          setDaysLeft(info.daysLeft);
          setWeddingDate(info.date);
          setWeddingLocation(info.location);
        }}
      />
    </div>
  );
}
