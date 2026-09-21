export interface FloatingText {
  id: number;
  x: number;
  y: number;
  value: number;
}

export interface Task {
  id: string;
  title: string;
  category: 'telegram' | 'social' | 'special';
  reward: number;
  icon: string;
  url?: string;
  status: 'idle' | 'verifying' | 'claimable' | 'claimed';
  countdown?: number;
}

export interface Friend {
  id: string;
  name: string;
  username: string;
  tier: string;
  earnedCoins: number;
  avatar: string;
  joinedDate: string;
}

export interface Upgrades {
  multitapLevel: number;
  energyLimitLevel: number;
  autoBotLevel: number;
}

export interface DailyStreak {
  streakDay: number;
  lastClaimDate: string;
}

export interface WalletState {
  connected: boolean;
  address: string;
  provider: string;
  tonBalance: number;
}

export interface MinerTier {
  level: number;
  name: string;
  minCoins: number;
  baseTap: number;
  color: string;
  badgeBg: string;
  borderColor: string;
}

export interface TelegramWebAppUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
  photo_url?: string;
}

export interface ActiveUserSession {
  type: 'telegram' | 'google' | 'guest';
  id: string; // e.g., "tg_12345678" or Firebase Auth UID
  rawId?: string | number;
  displayName: string;
  username?: string;
  photoURL?: string;
  isTelegramNative?: boolean;
}

export interface CloudUserGameData {
  userId: string;
  telegramId?: string;
  username?: string;
  firstName?: string;
  email?: string;
  displayName: string;
  photoURL: string;
  balance: number;
  energy: number;
  profitPerHour?: number;
  totalTaps: number;
  totalEarned: number;
  lastSaved: number;
  lastEnergyUpdate: number;
  upgrades: Upgrades;
  tasks: Task[];
  dailyStreak: DailyStreak;
  wallet: WalletState;
  friends: Friend[];
  dailyFreeRefills: number;
  dailyFreeTurbos: number;
  updatedAt?: number;
}
