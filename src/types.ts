export type CoupleUser = 'Ferdy' | 'Tika';

export interface Transaction {
  id: string;
  user: CoupleUser;
  fullName: string;
  type: 'deposit' | 'expense';
  amount: number;
  note: string;
  category: string;
  date: string;
  timestamp: number;
}

export interface WeddingCategoryItem {
  id: string;
  title: string;
  vendor: string;
  currentAmount: number;
  targetAmount: number;
  badge?: string;
  isFullyPaid?: boolean;
  iconType: 'venue' | 'attire' | 'camera' | 'ring' | 'gift' | 'catering' | 'music';
}

export interface FutureFundItem {
  id: string;
  title: string;
  description: string;
  currentAmount: number;
  targetAmount: number;
  monthlyAllocation: number;
  iconType: 'emergency' | 'house' | 'invest' | 'baby' | 'travel';
}

export interface AppConfig {
  weddingDate: string; // e.g. '18 Oktober 2025'
  weddingDaysLeft: number;
  location: string;
  activeTab: 'summary' | 'wedding' | 'future' | 'ledger';
}
