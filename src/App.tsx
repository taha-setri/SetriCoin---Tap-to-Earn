import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  Pickaxe,
  Coins,
  Zap,
  Users,
  Wallet,
  Gift,
  Copy,
  Check,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Share2,
  TrendingUp,
  Flame,
  X,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Volume2,
  VolumeX,
  RotateCcw,
  Bot,
  UserPlus,
  Loader2,
  Calendar,
  Layers,
  Award,
  Heart,
  QrCode,
  Lock,
  FileText,
  Code2
} from 'lucide-react';

// ================= TYPES & INTERFACES =================

interface FloatingText {
  id: number;
  x: number;
  y: number;
  value: number;
}

interface Task {
  id: string;
  title: string;
  category: 'telegram' | 'social' | 'special';
  reward: number;
  icon: string;
  url?: string;
  status: 'idle' | 'verifying' | 'claimable' | 'claimed';
  countdown?: number;
}

interface Friend {
  id: string;
  name: string;
  username: string;
  tier: string;
  earnedCoins: number;
  avatar: string;
  joinedDate: string;
}

interface Upgrades {
  multitapLevel: number;
  energyLimitLevel: number;
  autoBotLevel: number;
}

interface DailyStreak {
  streakDay: number;
  lastClaimDate: string;
}

interface WalletState {
  connected: boolean;
  address: string;
  provider: string;
  tonBalance: number;
}

interface MinerTier {
  level: number;
  name: string;
  minCoins: number;
  baseTap: number;
  color: string;
  badgeBg: string;
  borderColor: string;
}

// Miner Tiers Definition
const MINER_TIERS: MinerTier[] = [
  { level: 1, name: 'Bronze Miner', minCoins: 0, baseTap: 1, color: 'text-amber-500', badgeBg: 'bg-amber-500/10', borderColor: 'border-amber-500/30' },
  { level: 2, name: 'Silver Staker', minCoins: 25000, baseTap: 2, color: 'text-slate-300', badgeBg: 'bg-slate-300/10', borderColor: 'border-slate-300/30' },
  { level: 3, name: 'Gold Validator', minCoins: 100000, baseTap: 3, color: 'text-yellow-400', badgeBg: 'bg-yellow-400/10', borderColor: 'border-yellow-400/30' },
  { level: 4, name: 'Diamond Whale', minCoins: 500000, baseTap: 5, color: 'text-cyan-400', badgeBg: 'bg-cyan-400/10', borderColor: 'border-cyan-400/30' },
  { level: 5, name: 'TON Legend', minCoins: 2000000, baseTap: 10, color: 'text-purple-400', badgeBg: 'bg-purple-400/10', borderColor: 'border-purple-400/30' }
];

// Official Dedicated SetriCoin & Platform Logo Emblem
export const SetriCoinEmblem = ({
  size = 32,
  className = '',
  turbo = false,
  animated = false
}: {
  size?: number;
  className?: string;
  turbo?: boolean;
  animated?: boolean;
}) => {
  const gradId = turbo ? 'setriTurboGrad' : 'setriCyanGrad';
  const strokeColor = turbo ? '#f59e0b' : '#06b6d4';
  const secondaryColor = turbo ? '#fbbf24' : '#38bdf8';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block select-none ${className}`}
    >
      <defs>
        {/* Cyan/Blue High-tech Gradient */}
        <linearGradient id="setriCyanGrad" x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="45%" stopColor="#0098ea" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>

        {/* Turbo Amber/Gold Gradient */}
        <linearGradient id="setriTurboGrad" x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="40%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>

        {/* Core Dark Gradient */}
        <radialGradient id="setriCoreGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0f1f2e" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#070c14" stopOpacity="0.98" />
        </radialGradient>

        <filter id="setriEmblemGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Outer Hexagonal Shield (TON & Crystal Facets) */}
      <polygon
        points="50,6 88,26 88,74 50,94 12,74 12,26"
        fill="url(#setriCoreGrad)"
        stroke={`url(#${gradId})`}
        strokeWidth="3.5"
        strokeLinejoin="round"
        className={animated ? 'drop-shadow-lg' : ''}
      />

      {/* Internal Gem Facet Refraction Lines */}
      <path
        d="M50,6 L50,94 M12,26 L88,74 M12,74 L88,26"
        stroke={strokeColor}
        strokeOpacity="0.22"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* Mid Inner Diamond Perimeter */}
      <polygon
        points="50,18 78,34 78,66 50,82 22,66 22,34"
        stroke={secondaryColor}
        strokeOpacity="0.4"
        strokeWidth="1.5"
        strokeDasharray="4 2"
      />

      {/* Signature Cybernetic 'S' Monogram */}
      <path
        d="M68 33 C64 24 40 23 34 32 C29 39 33 46 42 48 L58 52 C68 55 71 63 66 70 C60 78 36 78 30 69"
        stroke={`url(#${gradId})`}
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#setriEmblemGlow)"
      />

      {/* High-light inner stroke on the 'S' */}
      <path
        d="M66 34 C63 26 42 25 36 33 C32 39 35 45 43 47 L57 51 C66 54 69 61 65 67 C60 74 38 75 32 68"
        stroke="#ffffff"
        strokeOpacity="0.65"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Tech Vertices Accent Nodes */}
      <circle cx="50" cy="6" r="2.5" fill={secondaryColor} />
      <circle cx="88" cy="26" r="2.5" fill={secondaryColor} />
      <circle cx="88" cy="74" r="2.5" fill={secondaryColor} />
      <circle cx="50" cy="94" r="2.5" fill={secondaryColor} />
      <circle cx="12" cy="74" r="2.5" fill={secondaryColor} />
      <circle cx="12" cy="26" r="2.5" fill={secondaryColor} />

      {/* Center Quantum Pulse Node */}
      <circle cx="50" cy="50" r="3" fill="#ffffff" />
    </svg>
  );
};

// User's Official Telegram Wallet Referral Link
const TELEGRAM_WALLET_REFERRAL_URL = 'https://telegram.me/wallet/start?startapp=ref-3-R_GccZDZGYs';

// Initial Tasks
const INITIAL_TASKS: Task[] = [
  {
    id: 't_tg_wallet_ref',
    title: 'Activate Official Telegram @wallet',
    category: 'special',
    reward: 35000,
    icon: '💼',
    url: TELEGRAM_WALLET_REFERRAL_URL,
    status: 'idle'
  },
  {
    id: 't1',
    title: 'Join Official SetriCoin Telegram',
    category: 'telegram',
    reward: 10000,
    icon: '✈️',
    url: 'https://t.me/SetriCoinCommunity',
    status: 'idle'
  },
  {
    id: 't2',
    title: 'Subscribe to TON Ecosystem News',
    category: 'telegram',
    reward: 7500,
    icon: '📢',
    url: 'https://t.me/toncoin',
    status: 'idle'
  },
  {
    id: 't3',
    title: 'Follow @SetriCoin on X / Twitter',
    category: 'social',
    reward: 8000,
    icon: '𝕏',
    url: 'https://x.com',
    status: 'idle'
  },
  {
    id: 't4',
    title: 'Connect TON Connect Wallet',
    category: 'special',
    reward: 25000,
    icon: '💎',
    status: 'idle'
  },
  {
    id: 't5',
    title: 'Retweet TON Ecosystem Airdrop News',
    category: 'social',
    reward: 12000,
    icon: '🔁',
    url: 'https://x.com',
    status: 'idle'
  },
  {
    id: 't6',
    title: 'Invite 3 Friends to Mining Squad',
    category: 'special',
    reward: 50000,
    icon: '👥',
    status: 'claimable' // pre-ready for quick test
  }
];

// Initial Friends List
const INITIAL_FRIENDS: Friend[] = [
  { id: 'f1', name: 'Alex T.', username: '@alex_ton', tier: 'Gold Validator', earnedCoins: 48200, avatar: '👨‍🚀', joinedDate: '2d ago' },
  { id: 'f2', name: 'Elena V.', username: '@elena_crypto', tier: 'Silver Staker', earnedCoins: 31500, avatar: '🦊', joinedDate: '4d ago' },
  { id: 'f3', name: 'Dmitry K.', username: '@dmitry_web3', tier: 'Diamond Whale', earnedCoins: 86400, avatar: '💎', joinedDate: '7d ago' }
];

// 7-Day Streak Rewards
const STREAK_REWARDS = [1000, 2500, 5000, 10000, 25000, 50000, 100000];

// Founder Ethereum / EVM Wallet Address for Developer Donations
const FOUNDER_ETH_ADDRESS = '0x63aE838D28b44F13571928c77578A6E94450beBb';

// ================= AUDIO SYNTHESIZER =================
class SoundFX {
  private ctx: AudioContext | null = null;

  private getContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  playTap(pitchMultiplier = 1) {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      const baseFreq = 540 * pitchMultiplier;
      osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  playSuccess() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const notes = [440, 554, 659, 880];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);

        gain.gain.setValueAtTime(0.15, ctx.currentTime + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.06 + 0.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.06);
        osc.stop(ctx.currentTime + idx * 0.06 + 0.22);
      });
    } catch {
      // Audio autoplay policy fallback
    }
  }
}

const sfx = new SoundFX();

export default function App() {
  // Navigation active tab: 'mine' | 'earn' | 'friends' | 'wallet'
  const [activeTab, setActiveTab] = useState<'mine' | 'earn' | 'friends' | 'wallet'>('mine');

  // ================= CORE PERSISTENT STATE =================

  // Total balance
  const [balance, setBalance] = useState<number>(() => {
    const saved = localStorage.getItem('setricoin_balance');
    return saved !== null ? Math.max(0, parseInt(saved, 10)) : 14250;
  });

  // Current Stamina/Energy
  const [energy, setEnergy] = useState<number>(() => {
    const saved = localStorage.getItem('setricoin_energy');
    return saved !== null ? Math.max(0, parseInt(saved, 10)) : 1000;
  });

  // Upgrades
  const [upgrades, setUpgrades] = useState<Upgrades>(() => {
    const saved = localStorage.getItem('setricoin_upgrades');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return { multitapLevel: 1, energyLimitLevel: 1, autoBotLevel: 1 };
  });

  // Wallet
  const [wallet, setWallet] = useState<WalletState>(() => {
    const saved = localStorage.getItem('setricoin_wallet');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return {
      connected: false,
      address: 'UQDx7K2...8w9B',
      provider: 'Tonkeeper',
      tonBalance: 1.84
    };
  });

  // Tasks
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('setricoin_tasks');
    if (saved) {
      try {
        const parsed: Task[] = JSON.parse(saved);
        const existingIds = new Set(parsed.map(t => t.id));
        const missing = INITIAL_TASKS.filter(t => !existingIds.has(t.id));
        return [...parsed, ...missing];
      } catch {}
    }
    return INITIAL_TASKS;
  });

  // Friends
  const [friends, setFriends] = useState<Friend[]>(() => {
    const saved = localStorage.getItem('setricoin_friends');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return INITIAL_FRIENDS;
  });

  // Daily Streak
  const [dailyStreak, setDailyStreak] = useState<DailyStreak>(() => {
    const saved = localStorage.getItem('setricoin_daily_streak');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return {
      streakDay: 3,
      lastClaimDate: ''
    };
  });

  // Sound FX enabled
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    return localStorage.getItem('setricoin_sound') !== 'false';
  });

  // Stats
  const [totalTaps, setTotalTaps] = useState<number>(() => {
    const saved = localStorage.getItem('setricoin_total_taps');
    return saved !== null ? parseInt(saved, 10) : 412;
  });

  // ================= UI & INTERACTIVE STATES =================
  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);
  const [isTapping, setIsTapping] = useState<boolean>(false);
  const [tapTilt, setTapTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [showWalletModal, setShowWalletModal] = useState<boolean>(false);
  const [connectingWallet, setConnectingWallet] = useState<string | null>(null);
  const [showBoostModal, setShowBoostModal] = useState<boolean>(false);
  const [showStatsModal, setShowStatsModal] = useState<boolean>(false);
  const [showWelcomeBack, setShowWelcomeBack] = useState<{ show: boolean; coins: number; energy: number } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedReferral, setCopiedReferral] = useState<boolean>(false);
  const [turboActive, setTurboActive] = useState<boolean>(false);
  const [turboTimeLeft, setTurboTimeLeft] = useState<number>(0);
  const [dailyFreeRefills, setDailyFreeRefills] = useState<number>(3);
  const [dailyFreeTurbos, setDailyFreeTurbos] = useState<number>(3);
  const [showDonationModal, setShowDonationModal] = useState<boolean>(false);
  const [copiedFounderAddress, setCopiedFounderAddress] = useState<boolean>(false);
  const [showQrCodeInWallet, setShowQrCodeInWallet] = useState<boolean>(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState<boolean>(false);
  const [copiedTgWalletRef, setCopiedTgWalletRef] = useState<boolean>(false);

  const buttonRef = useRef<HTMLDivElement>(null);

  // ================= COMPUTED ATTRIBUTES =================

  // Current tier calculation
  const currentTier = useMemo(() => {
    return [...MINER_TIERS].reverse().find(t => balance >= t.minCoins) || MINER_TIERS[0];
  }, [balance]);

  const nextTier = useMemo(() => {
    const idx = MINER_TIERS.findIndex(t => t.level === currentTier.level);
    return idx + 1 < MINER_TIERS.length ? MINER_TIERS[idx + 1] : null;
  }, [currentTier]);

  // Max Energy based on Base + Level + Upgrades
  const maxEnergy = useMemo(() => {
    const tierEnergyBonus = (currentTier.level - 1) * 500;
    const upgradeEnergyBonus = (upgrades.energyLimitLevel - 1) * 500;
    return 1000 + tierEnergyBonus + upgradeEnergyBonus;
  }, [currentTier.level, upgrades.energyLimitLevel]);

  // Tap Power: (Tier Base + Multitap Upgrade) * Turbo
  const tapPower = useMemo(() => {
    const base = currentTier.baseTap + (upgrades.multitapLevel - 1);
    return turboActive ? base * 5 : base;
  }, [currentTier.baseTap, upgrades.multitapLevel, turboActive]);

  // Passive profit per hour
  const profitPerHour = useMemo(() => {
    // 600 base + 1200 per autobot level
    return 600 + (upgrades.autoBotLevel * 1200);
  }, [upgrades.autoBotLevel]);

  // Upgrade Costs
  const multitapCost = useMemo(() => Math.round(1500 * Math.pow(2.2, upgrades.multitapLevel - 1)), [upgrades.multitapLevel]);
  const energyLimitCost = useMemo(() => Math.round(2000 * Math.pow(2, upgrades.energyLimitLevel - 1)), [upgrades.energyLimitLevel]);
  const autoBotCost = useMemo(() => Math.round(3500 * Math.pow(2.4, upgrades.autoBotLevel - 1)), [upgrades.autoBotLevel]);

  // Progress to next tier
  const progressPercent = useMemo(() => {
    if (!nextTier) return 100;
    const range = nextTier.minCoins - currentTier.minCoins;
    const currentInRange = balance - currentTier.minCoins;
    return Math.min(100, Math.max(0, (currentInRange / range) * 100));
  }, [balance, currentTier, nextTier]);

  // Unique Referral Link
  const referralLink = useMemo(() => {
    const cleanId = wallet.connected ? wallet.address.slice(2, 8) : '84920';
    return `https://t.me/SetriCoin_bot?start=ref_${cleanId}`;
  }, [wallet.connected, wallet.address]);

  // ================= TOAST HELPER =================
  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  }, []);

  // ================= OFFLINE REGENERATION & LOCALSTORAGE INIT =================
  useEffect(() => {
    const lastSavedTime = localStorage.getItem('setricoin_last_saved');
    if (lastSavedTime) {
      const elapsedSec = Math.max(0, Math.floor((Date.now() - parseInt(lastSavedTime, 10)) / 1000));
      
      if (elapsedSec > 5) {
        // Offline Energy Recovery (+3 per sec, capped at maxEnergy)
        const recoveredEnergy = elapsedSec * 3;
        setEnergy(prev => Math.min(maxEnergy, prev + recoveredEnergy));

        // Offline Bot Mining (capped at 3 hours max = 10,800 sec)
        const effectiveSec = Math.min(elapsedSec, 10800);
        const coinsPerSec = profitPerHour / 3600;
        const offlineCoins = Math.floor(effectiveSec * coinsPerSec);

        if (offlineCoins > 0) {
          setBalance(prev => prev + offlineCoins);
          setShowWelcomeBack({
            show: true,
            coins: offlineCoins,
            energy: Math.min(maxEnergy, recoveredEnergy)
          });
        }
      }
    }
  }, [maxEnergy, profitPerHour]);

  // ================= LOCALSTORAGE PERSISTENCE =================
  useEffect(() => {
    localStorage.setItem('setricoin_balance', balance.toString());
    localStorage.setItem('setricoin_last_saved', Date.now().toString());
  }, [balance]);

  useEffect(() => {
    localStorage.setItem('setricoin_energy', energy.toString());
    localStorage.setItem('setricoin_last_saved', Date.now().toString());
  }, [energy]);

  useEffect(() => {
    localStorage.setItem('setricoin_upgrades', JSON.stringify(upgrades));
  }, [upgrades]);

  useEffect(() => {
    localStorage.setItem('setricoin_wallet', JSON.stringify(wallet));
  }, [wallet]);

  useEffect(() => {
    localStorage.setItem('setricoin_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('setricoin_friends', JSON.stringify(friends));
  }, [friends]);

  useEffect(() => {
    localStorage.setItem('setricoin_daily_streak', JSON.stringify(dailyStreak));
  }, [dailyStreak]);

  useEffect(() => {
    localStorage.setItem('setricoin_sound', soundEnabled ? 'true' : 'false');
  }, [soundEnabled]);

  useEffect(() => {
    localStorage.setItem('setricoin_total_taps', totalTaps.toString());
  }, [totalTaps]);

  // ================= CONTINUOUS CLOCK / INTERVAL ENGINE =================
  useEffect(() => {
    // 1-second game loop:
    // 1. Regenerates stamina (+3/s up to maxEnergy)
    // 2. Increments passive profit from Auto-Bot
    // 3. Decrements task verification timers if active
    const gameLoop = setInterval(() => {
      // Energy Regen
      setEnergy(prev => {
        if (prev < maxEnergy) {
          return Math.min(maxEnergy, prev + 3);
        }
        return prev;
      });

      // Passive Auto-Bot income (+profitPerHour / 3600)
      const passivePerSec = profitPerHour / 3600;
      if (passivePerSec > 0) {
        setBalance(prev => prev + Math.ceil(passivePerSec));
      }

      // Update timestamp for offline tracking
      localStorage.setItem('setricoin_last_saved', Date.now().toString());
    }, 1000);

    return () => clearInterval(gameLoop);
  }, [maxEnergy, profitPerHour]);

  // Verification Countdown Timer for Tasks
  useEffect(() => {
    const hasVerifying = tasks.some(t => t.status === 'verifying');
    if (!hasVerifying) return;

    const timer = setInterval(() => {
      setTasks(prev =>
        prev.map(t => {
          if (t.status === 'verifying') {
            const currentCount = t.countdown !== undefined ? t.countdown : 4;
            if (currentCount <= 1) {
              if (soundEnabled) sfx.playSuccess();
              showToast(`Quest verified: "${t.title}"! Click Claim.`);
              return { ...t, status: 'claimable', countdown: 0 };
            }
            return { ...t, countdown: currentCount - 1 };
          }
          return t;
        })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [tasks, soundEnabled, showToast]);

  // Turbo Boost Timer
  useEffect(() => {
    if (!turboActive) return;
    const interval = setInterval(() => {
      setTurboTimeLeft(prev => {
        if (prev <= 1) {
          setTurboActive(false);
          showToast('⚡ Turbo Mode ended.');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [turboActive, showToast]);

  // ================= TAP ACTION SYSTEM =================
  const executeSingleTap = (clientX?: number, clientY?: number) => {
    if (energy <= 0) {
      showToast('⚡ Stamina depleted! Wait for energy recovery.');
      if (typeof window !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate([30, 40, 30]);
      }
      return;
    }

    const energyDeduction = Math.min(energy, tapPower);
    const coinsEarned = tapPower;

    setEnergy(prev => Math.max(0, prev - energyDeduction));
    setBalance(prev => prev + coinsEarned);
    setTotalTaps(prev => prev + 1);

    // Audio & Haptics
    if (soundEnabled) {
      sfx.playTap(turboActive ? 1.4 : 1.0);
    }
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(12);
      } catch {}
    }

    // Floating animation calculation
    let floatX = 50;
    let floatY = 40;

    if (buttonRef.current && clientX !== undefined && clientY !== undefined) {
      const rect = buttonRef.current.getBoundingClientRect();
      floatX = ((clientX - rect.left) / rect.width) * 100;
      floatY = ((clientY - rect.top) / rect.height) * 100;

      // Calculate 3D tilt
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const tiltX = (clientY - centerY) / 10;
      const tiltY = (clientX - centerX) / -10;
      setTapTilt({ x: tiltX, y: tiltY });
    }

    const newId = Date.now() + Math.random();
    setFloatingTexts(prev => [
      ...prev.slice(-14),
      { id: newId, x: floatX, y: floatY, value: coinsEarned }
    ]);

    setIsTapping(true);

    setTimeout(() => {
      setFloatingTexts(prev => prev.filter(item => item.id !== newId));
    }, 800);

    setTimeout(() => {
      setIsTapping(false);
      setTapTilt({ x: 0, y: 0 });
    }, 100);
  };

  // Multi-Touch Event Listener for mobile multi-finger mining!
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    const touches = Array.from(e.changedTouches);
    touches.forEach(t => {
      executeSingleTap(t.clientX, t.clientY);
    });
  };

  // Mouse click fallback for desktop
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only handle mouse (touch is captured by onTouchStart)
    if (e.pointerType === 'mouse') {
      executeSingleTap(e.clientX, e.clientY);
    }
  };

  // ================= TASK CLAIMING & VERIFICATION =================
  const handleStartTask = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    if (task.status === 'idle') {
      if (task.url) {
        window.open(task.url, '_blank', 'noopener,noreferrer');
      }
      // Put task into 'verifying' state with 4s timer
      setTasks(prev =>
        prev.map(t => (t.id === taskId ? { ...t, status: 'verifying', countdown: 4 } : t))
      );
      showToast('Verifying task completion with Telegram/TON network...');
    }
  };

  const handleClaimReward = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task || task.status !== 'claimable') return;

    setTasks(prev =>
      prev.map(t => (t.id === taskId ? { ...t, status: 'claimed' } : t))
    );
    setBalance(prev => prev + task.reward);

    if (soundEnabled) sfx.playSuccess();
    showToast(`🎉 Claimed +${task.reward.toLocaleString()} SETRI!`);
  };

  // Claim Daily Streak
  const handleClaimDailyStreak = () => {
    const todayStr = new Date().toDateString();
    if (dailyStreak.lastClaimDate === todayStr) {
      showToast('Already claimed today! Check back tomorrow for the next streak.');
      return;
    }

    const currentReward = STREAK_REWARDS[Math.min(dailyStreak.streakDay - 1, STREAK_REWARDS.length - 1)];
    setBalance(prev => prev + currentReward);
    setDailyStreak(prev => ({
      streakDay: prev.streakDay >= 7 ? 1 : prev.streakDay + 1,
      lastClaimDate: todayStr
    }));

    if (soundEnabled) sfx.playSuccess();
    showToast(`🔥 Claimed Day ${dailyStreak.streakDay} Reward: +${currentReward.toLocaleString()} SETRI!`);
  };

  // ================= REFERRAL SYSTEM =================
  const handleCopyReferral = () => {
    navigator.clipboard.writeText(referralLink);
    setCopiedReferral(true);
    showToast('Referral link copied to clipboard!');
    setTimeout(() => setCopiedReferral(false), 2200);
  };

  const handleCopyTgWalletReferral = () => {
    navigator.clipboard.writeText(TELEGRAM_WALLET_REFERRAL_URL);
    setCopiedTgWalletRef(true);
    if (soundEnabled) sfx.playSuccess();
    showToast('تم نسخ رابط إحالة Telegram Wallet بنجاح! 💼');
    setTimeout(() => setCopiedTgWalletRef(false), 2400);
  };

  const handleShareTelegram = () => {
    const text = encodeURIComponent('🚀 Join SetriCoin on TON! Tap to mine SETRI tokens and get a +25,000 start bonus:');
    const url = encodeURIComponent(referralLink);
    window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank');
  };

  // Simulate friend invite for immediate testing
  const handleSimulateInvite = () => {
    const mockNames = ['Vladislav S.', 'Olga M.', 'Nikita B.', 'Maria P.', 'Artem R.', 'Anya K.'];
    const mockAvatars = ['🚀', '🦁', '⭐', '🪐', '🎯', '⚡'];
    const randomName = mockNames[Math.floor(Math.random() * mockNames.length)];
    const randomAvatar = mockAvatars[Math.floor(Math.random() * mockAvatars.length)];
    const newFriend: Friend = {
      id: 'f_' + Date.now(),
      name: randomName,
      username: '@' + randomName.toLowerCase().replace(/[^a-z]/g, '') + Math.floor(Math.random() * 99),
      tier: 'Silver Staker',
      earnedCoins: 25000,
      avatar: randomAvatar,
      joinedDate: 'Just now'
    };

    setFriends(prev => [newFriend, ...prev]);
    setBalance(prev => prev + 25000);

    if (soundEnabled) sfx.playSuccess();
    showToast(`🎉 New referral joined! You received +25,000 SETRI bonus!`);
  };

  // ================= UPGRADES & BOOSTERS =================
  const handleBuyMultitap = () => {
    if (balance < multitapCost) {
      showToast('Insufficient SETRI coins for this upgrade.');
      return;
    }
    setBalance(prev => prev - multitapCost);
    setUpgrades(prev => ({ ...prev, multitapLevel: prev.multitapLevel + 1 }));
    if (soundEnabled) sfx.playSuccess();
    showToast(`Upgraded Multitap to Level ${upgrades.multitapLevel + 1}! (+1 coin/tap)`);
  };

  const handleBuyEnergyLimit = () => {
    if (balance < energyLimitCost) {
      showToast('Insufficient SETRI coins for this upgrade.');
      return;
    }
    setBalance(prev => prev - energyLimitCost);
    setUpgrades(prev => ({ ...prev, energyLimitLevel: prev.energyLimitLevel + 1 }));
    setEnergy(prev => prev + 500);
    if (soundEnabled) sfx.playSuccess();
    showToast(`Upgraded Max Stamina! (+500 capacity)`);
  };

  const handleBuyAutoBot = () => {
    if (balance < autoBotCost) {
      showToast('Insufficient SETRI coins for this upgrade.');
      return;
    }
    setBalance(prev => prev - autoBotCost);
    setUpgrades(prev => ({ ...prev, autoBotLevel: prev.autoBotLevel + 1 }));
    if (soundEnabled) sfx.playSuccess();
    showToast(`SetriBot upgraded to Level ${upgrades.autoBotLevel + 1}! (+1,200/hr passive)`);
  };

  const handleActivateTurbo = () => {
    if (turboActive) return;
    if (dailyFreeTurbos <= 0) {
      showToast('No free turbos remaining today.');
      return;
    }
    setDailyFreeTurbos(prev => Math.max(0, prev - 1));
    setTurboActive(true);
    setTurboTimeLeft(30);
    setEnergy(maxEnergy);
    setShowBoostModal(false);
    if (soundEnabled) sfx.playSuccess();
    showToast('🚀 5X Turbo Mode & Full Stamina activated for 30s!');
  };

  const handleRefillEnergy = () => {
    if (energy >= maxEnergy) {
      showToast('Stamina is already 100% full!');
      return;
    }
    if (dailyFreeRefills <= 0) {
      showToast('No free refills remaining today.');
      return;
    }
    setDailyFreeRefills(prev => Math.max(0, prev - 1));
    setEnergy(maxEnergy);
    setShowBoostModal(false);
    if (soundEnabled) sfx.playSuccess();
    showToast('⚡ Stamina 100% recharged!');
  };

  // ================= WALLET CONNECT / DISCONNECT =================
  const handleConnectProvider = (providerName: string) => {
    setConnectingWallet(providerName);

    setTimeout(() => {
      const generatedAddr = 'UQ' + Math.random().toString(36).substring(2, 6).toUpperCase() + '...' + Math.random().toString(36).substring(2, 6).toUpperCase();
      setWallet({
        connected: true,
        address: generatedAddr,
        provider: providerName,
        tonBalance: 2.45
      });
      setConnectingWallet(null);
      setShowWalletModal(false);

      // Complete wallet task automatically if present
      setTasks(prev =>
        prev.map(t => (t.id === 't4' ? { ...t, status: 'claimable' } : t))
      );

      if (soundEnabled) sfx.playSuccess();
      showToast(`Connected ${providerName} (${generatedAddr})`);
    }, 1200);
  };

  const handleDisconnectWallet = () => {
    setWallet(prev => ({
      ...prev,
      connected: false
    }));
    setShowWalletModal(false);
    showToast('Wallet disconnected.');
  };

  // Copy Founder Ethereum Address
  const handleCopyFounderAddress = () => {
    navigator.clipboard.writeText(FOUNDER_ETH_ADDRESS);
    setCopiedFounderAddress(true);
    if (soundEnabled) sfx.playSuccess();
    showToast('Founder Ethereum address copied! Thank you for supporting the team ❤️');
    setTimeout(() => setCopiedFounderAddress(false), 2400);
  };

  // Reset demo for testing
  const handleResetDemo = () => {
    localStorage.clear();
    setBalance(14250);
    setEnergy(1000);
    setUpgrades({ multitapLevel: 1, energyLimitLevel: 1, autoBotLevel: 1 });
    setWallet({ connected: false, address: 'UQDx7K2...8w9B', provider: 'Tonkeeper', tonBalance: 1.84 });
    setTasks(INITIAL_TASKS);
    setFriends(INITIAL_FRIENDS);
    setDailyStreak({ streakDay: 3, lastClaimDate: '' });
    setTotalTaps(412);
    showToast('Demo data reset to initial defaults.');
  };

  const handleAddTestCoins = () => {
    setBalance(prev => prev + 50000);
    showToast('+50,000 test SETRI added to balance!');
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex justify-center selection:bg-cyan-500/30 font-sans select-none">
      {/* Telegram Mini App Container */}
      <div className="w-full max-w-md min-h-screen flex flex-col bg-gradient-to-b from-[#0b0e17] via-[#090b12] to-[#06080d] relative shadow-2xl overflow-hidden border-x border-slate-800/40">

        {/* Ambient Light Orbs */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

        {/* ================= HEADER ================= */}
        <header id="header" className="px-4 pt-3.5 pb-2.5 z-20 flex items-center justify-between border-b border-slate-800/40 bg-[#0b0e17]/85 backdrop-blur-md sticky top-0">
          <div className="flex items-center gap-2.5">
            {/* SetriCoin Official Platform Logo */}
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500/25 via-slate-900 to-blue-600/30 border border-cyan-400/40 flex items-center justify-center p-1 shadow-lg shadow-cyan-500/20">
                <SetriCoinEmblem size={28} turbo={turboActive} animated />
              </div>
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#0b0e17] flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-base font-bold tracking-tight text-white flex items-center gap-1">
                  SetriCoin
                  <span className="text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded bg-cyan-500/15 text-cyan-400 border border-cyan-500/25">
                    TON
                  </span>
                </h1>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <span className={`font-semibold ${currentTier.color}`}>{currentTier.name}</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400 font-mono">Lvl {currentTier.level}</span>
              </div>
            </div>
          </div>

          {/* Right Controls: Privacy, Support Founders, Sound & Connect Wallet */}
          <div className="flex items-center gap-2">
            {/* Privacy & Security Policy Button */}
            <button
              id="privacy-policy-btn"
              onClick={() => setShowPrivacyModal(true)}
              className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 text-emerald-400 hover:text-emerald-300 flex items-center justify-center active:scale-95 transition-all relative group"
              title="الخصوصية والأمان | Privacy & Security"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
            </button>

            {/* Support Founders Button */}
            <button
              id="support-founders-btn"
              onClick={() => setShowDonationModal(true)}
              className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 hover:border-rose-500/40 text-rose-400 hover:text-rose-300 flex items-center justify-center active:scale-95 transition-all relative group"
              title="Support Founders & Developers (ETH)"
            >
              <Heart className="w-4 h-4 fill-rose-500/20 group-hover:scale-110 transition-transform" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            </button>

            {/* Sound Toggle */}
            <button
              onClick={() => {
                setSoundEnabled(prev => !prev);
                showToast(!soundEnabled ? '🔊 Sound enabled' : '🔇 Sound muted');
              }}
              className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white flex items-center justify-center active:scale-95 transition-all"
              title="Toggle Audio"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>

            {/* TON Connect Wallet Button */}
            <button
              id="ton-connect-btn"
              onClick={() => setShowWalletModal(true)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 shadow-md ${
                wallet.connected
                  ? 'bg-slate-900 text-cyan-400 border border-cyan-500/30 shadow-cyan-500/10'
                  : 'bg-gradient-to-r from-[#0098EA] to-[#0081c7] hover:from-[#05a4fc] hover:to-[#0090de] text-white shadow-blue-500/25 active:scale-95'
              }`}
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2L2 9.5L12 22L22 9.5L12 2ZM4.4 9.5L12 3.8L19.6 9.5L12 20L4.4 9.5Z" />
              </svg>
              {wallet.connected ? (
                <span className="font-mono text-[11px]">{wallet.address}</span>
              ) : (
                <span>Connect TON</span>
              )}
            </button>
          </div>
        </header>

        {/* Global Toast Notification */}
        {toastMessage && (
          <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-slate-900/95 border border-cyan-500/50 text-cyan-300 text-xs font-semibold rounded-full shadow-2xl shadow-cyan-500/20 backdrop-blur-md flex items-center gap-2 animate-bounce">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* ================= MAIN CONTENT ================= */}
        <main className="flex-1 flex flex-col px-4 pt-3 pb-24 overflow-y-auto">

          {/* TAB 1: MINE SCREEN */}
          {activeTab === 'mine' && (
            <div className="flex-1 flex flex-col justify-between items-center py-1">

              {/* Top Stats Bar */}
              <div className="w-full flex items-center justify-between gap-1.5 px-3 py-2 bg-slate-900/70 border border-slate-800/80 rounded-2xl backdrop-blur-sm shadow-sm">
                
                {/* Profit Per Hour */}
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <TrendingUp className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-medium">Profit per hour</div>
                    <div className="text-xs font-bold text-slate-200 font-mono">+{profitPerHour.toLocaleString()}</div>
                  </div>
                </div>

                <div className="h-6 w-px bg-slate-800" />

                {/* Earn per tap */}
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <Pickaxe className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-medium">Earn per tap</div>
                    <div className="text-xs font-bold text-cyan-300 font-mono">+{tapPower} SETRI</div>
                  </div>
                </div>

                {/* Boost / Upgrades Trigger */}
                <button
                  id="boost-btn"
                  onClick={() => setShowBoostModal(true)}
                  className="px-2.5 py-1 rounded-xl bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-yellow-500/30 text-yellow-400 text-xs font-bold flex items-center gap-1 hover:brightness-110 active:scale-95 transition-all"
                >
                  <Flame className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
                  <span>Boost</span>
                </button>
              </div>

              {/* Central Balance Display */}
              <div className="my-3 text-center">
                <div className="inline-flex items-center justify-center gap-2 mb-1">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-b from-yellow-300 via-amber-400 to-amber-600 p-0.5 shadow-lg shadow-amber-500/30 flex items-center justify-center">
                    <Coins className="w-5 h-5 text-slate-950 fill-current" />
                  </div>
                  <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white font-mono drop-shadow-[0_2px_15px_rgba(255,215,0,0.2)]">
                    {balance.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-center gap-2 text-xs font-medium text-slate-400">
                  <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                    <SetriCoinEmblem size={15} turbo={turboActive} />
                    <span>SETRI</span>
                  </span>
                  <span>•</span>
                  <span className="text-slate-300 font-medium">≈ {(balance / 150000).toFixed(3)} TON</span>
                </div>

                {/* Level Progress Bar */}
                <div className="mt-2.5 w-64 mx-auto">
                  <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                    <span className="font-semibold text-slate-300">{currentTier.name}</span>
                    <span className="font-mono text-cyan-400">{nextTier ? `${Math.round(progressPercent)}%` : 'MAX'}</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  {nextTier && (
                    <div className="text-[10px] text-slate-500 mt-1 font-mono">
                      {Math.max(0, nextTier.minCoins - balance).toLocaleString()} coins to {nextTier.name}
                    </div>
                  )}
                </div>
              </div>

              {/* Central Interactive Tap Button */}
              <div className="relative my-auto flex items-center justify-center w-full py-3">
                {/* Outer Glow Halo */}
                <div
                  className={`absolute w-64 h-64 sm:w-72 sm:h-72 rounded-full transition-all duration-500 pointer-events-none ${
                    turboActive
                      ? 'bg-gradient-to-tr from-amber-500/35 to-yellow-400/40 blur-3xl animate-pulse scale-110'
                      : 'bg-gradient-to-tr from-cyan-500/20 to-blue-600/20 blur-2xl'
                  }`}
                />

                {/* Decorative Concentric Rings */}
                <div className="absolute w-64 h-64 sm:w-72 sm:h-72 rounded-full border border-cyan-500/15 animate-spin pointer-events-none" style={{ animationDuration: '35s' }} />
                <div className="absolute w-56 h-56 sm:w-64 sm:h-64 rounded-full border border-dashed border-blue-400/20 pointer-events-none" />

                {/* Interactive Tappable Coin */}
                <div
                  id="main-tap-target"
                  ref={buttonRef}
                  onTouchStart={handleTouchStart}
                  onPointerDown={handlePointerDown}
                  style={{
                    transform: isTapping
                      ? `scale(0.93) rotateX(${tapTilt.x}deg) rotateY(${tapTilt.y}deg)`
                      : 'scale(1) rotateX(0deg) rotateY(0deg)',
                    transformStyle: 'preserve-3d',
                    perspective: 1000
                  }}
                  className={`tap-target relative w-56 h-56 sm:w-64 sm:h-64 rounded-full cursor-pointer select-none transition-transform duration-100 ease-out flex items-center justify-center p-3 shadow-2xl active:shadow-inner ${
                    turboActive
                      ? 'shadow-yellow-500/50 ring-4 ring-yellow-400/60'
                      : 'shadow-cyan-500/25 ring-4 ring-cyan-400/30'
                  }`}
                >
                  {/* Coin Outer Bevel */}
                  <div className="w-full h-full rounded-full bg-gradient-to-b from-[#1a2538] via-[#0e1624] to-[#080d16] p-2.5 shadow-[inset_0_2px_8px_rgba(255,255,255,0.2)] border border-slate-700/60 flex items-center justify-center">
                    
                    {/* Inner 3D Coin Core */}
                    <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#005580] via-[#0088cc] to-[#00d2ff] p-1.5 shadow-2xl flex items-center justify-center relative overflow-hidden">
                      
                      {/* Shimmer Stripe */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full animate-shimmer" />

                      {/* Inner Face */}
                      <div className="w-full h-full rounded-full bg-gradient-to-b from-[#0c1626] to-[#060b13] flex flex-col items-center justify-center border border-cyan-300/30 relative">
                        
                        {/* Dedicated SetriCoin Logo Emblem */}
                        <div className="relative flex flex-col items-center justify-center py-1">
                          <div className="relative">
                            <div
                              className={`absolute inset-0 rounded-full blur-xl scale-110 pointer-events-none transition-all duration-300 ${
                                turboActive ? 'bg-amber-400/45' : 'bg-cyan-400/35'
                              }`}
                            />
                            <SetriCoinEmblem
                              size={105}
                              turbo={turboActive}
                              className="relative drop-shadow-[0_4px_22px_rgba(0,180,255,0.45)]"
                              animated
                            />
                          </div>

                          {/* Center Token Monogram (No dollar sign) */}
                          <div className="mt-1.5 flex items-center justify-center">
                            <span className="font-extrabold text-white text-base tracking-[0.22em] font-mono drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                              SETRI
                            </span>
                          </div>
                        </div>

                        <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-300/90 mt-1">
                          {turboActive ? '5X TURBO MINER' : 'TAP TO MINE'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Floating Number Particles */}
                  {floatingTexts.map(f => (
                    <div
                      key={f.id}
                      style={{
                        left: `${f.x}%`,
                        top: `${f.y}%`
                      }}
                      className="absolute z-30 font-extrabold text-2xl sm:text-3xl text-yellow-300 animate-float-up drop-shadow-[0_2px_12px_rgba(255,215,0,0.9)] font-mono pointer-events-none select-none"
                    >
                      +{f.value}
                    </div>
                  ))}
                </div>
              </div>

              {/* Energy / Stamina Bar Section */}
              <div className="w-full mt-2 bg-slate-900/70 border border-slate-800/80 rounded-2xl p-3.5 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                    <Zap className="w-4 h-4 fill-current animate-pulse" />
                    <span>Energy / Stamina</span>
                  </div>
                  <div className="text-xs font-mono font-bold text-slate-200">
                    <span className={energy < 100 ? 'text-red-400' : 'text-slate-100'}>{energy}</span>
                    <span className="text-slate-500"> / {maxEnergy}</span>
                  </div>
                </div>

                {/* Smooth Stamina Progress Bar */}
                <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
                  <div
                    className={`h-full rounded-full transition-all duration-200 ${
                      energy > maxEnergy * 0.25
                        ? 'bg-gradient-to-r from-amber-500 to-yellow-400'
                        : 'bg-gradient-to-r from-rose-600 to-amber-500'
                    }`}
                    style={{ width: `${(energy / maxEnergy) * 100}%` }}
                  />
                </div>

                <div className="flex items-center justify-between mt-2 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-cyan-400" />
                    +3 stamina/sec auto-recovery
                  </span>
                  {turboActive ? (
                    <span className="text-yellow-400 font-bold animate-pulse">
                      Turbo: {turboTimeLeft}s left
                    </span>
                  ) : (
                    <button
                      onClick={() => setShowBoostModal(true)}
                      className="text-cyan-400 font-semibold hover:underline flex items-center gap-0.5"
                    >
                      Refill Fast <ChevronRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: EARN & TASKS */}
          {activeTab === 'earn' && (
            <div className="flex-1 flex flex-col py-1 space-y-3.5">
              
              {/* Daily Streak Card */}
              <div className="bg-gradient-to-br from-amber-950/30 via-slate-900 to-slate-900 border border-amber-500/25 rounded-2xl p-4 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-sm font-bold text-white">Daily Mining Streak</h3>
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-mono">
                          Day {dailyStreak.streakDay}/7
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Log in every 24h to claim escalating SETRI rewards!
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleClaimDailyStreak}
                    disabled={dailyStreak.lastClaimDate === new Date().toDateString()}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-95 ${
                      dailyStreak.lastClaimDate === new Date().toDateString()
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
                        : 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 hover:brightness-110 shadow-md shadow-amber-500/20 animate-pulse'
                    }`}
                  >
                    {dailyStreak.lastClaimDate === new Date().toDateString() ? 'Claimed Today' : 'Claim Reward'}
                  </button>
                </div>

                {/* 7-Day Rewards Track */}
                <div className="grid grid-cols-7 gap-1.5 mt-3 pt-3 border-t border-slate-800/80">
                  {STREAK_REWARDS.map((reward, i) => {
                    const dayNum = i + 1;
                    const isPassed = dayNum < dailyStreak.streakDay;
                    const isCurrent = dayNum === dailyStreak.streakDay;
                    return (
                      <div
                        key={dayNum}
                        className={`text-center p-1.5 rounded-xl border flex flex-col items-center ${
                          isPassed
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                            : isCurrent
                            ? 'bg-amber-500/20 border-amber-400 text-yellow-300 ring-1 ring-amber-400'
                            : 'bg-slate-950/60 border-slate-800 text-slate-500'
                        }`}
                      >
                        <span className="text-[9px] font-bold">D{dayNum}</span>
                        <span className="text-[10px] font-bold font-mono mt-0.5">
                          {reward >= 1000 ? `${reward / 1000}k` : reward}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Top Banner */}
              <div className="bg-gradient-to-br from-cyan-900/30 via-slate-900 to-blue-900/20 border border-cyan-500/20 rounded-2xl p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 text-[10px] font-bold tracking-wide uppercase border border-cyan-500/20">
                      Community Quests
                    </span>
                    <h2 className="text-base font-bold text-white mt-1">Complete Tasks & Earn</h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Earn tokens toward your official TON Ecosystem Airdrop allocation.
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <Gift className="w-5 h-5" />
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Available: {tasks.filter(t => t.status !== 'claimed').length} Quests</span>
                  <span className="text-yellow-400 font-bold font-mono">
                    +{tasks.filter(t => t.status !== 'claimed').reduce((acc, t) => acc + t.reward, 0).toLocaleString()} SETRI
                  </span>
                </div>
              </div>

              {/* Tasks List */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
                  Social & Ecosystem Quests
                </h3>

                {tasks.map(task => (
                  <div
                    key={task.id}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                      task.status === 'claimed'
                        ? 'bg-slate-900/30 border-slate-800/40 opacity-60'
                        : task.status === 'claimable'
                        ? 'bg-slate-900/90 border-emerald-500/40 ring-1 ring-emerald-500/30 shadow-lg shadow-emerald-500/10'
                        : 'bg-slate-900/70 border-slate-800 hover:border-cyan-500/30 shadow-md'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700/60 flex items-center justify-center text-lg">
                        {task.icon}
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-slate-100 line-clamp-1">
                          {task.title}
                        </h4>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <Coins className="w-3.5 h-3.5 text-yellow-400" />
                          <span className="text-xs font-bold text-yellow-400 font-mono">
                            +{task.reward.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      {task.status === 'claimed' ? (
                        <div className="flex items-center gap-1 text-emerald-400 text-xs font-semibold px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                          <Check className="w-3.5 h-3.5" />
                          <span>Done</span>
                        </div>
                      ) : task.status === 'verifying' ? (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Verifying ({task.countdown || 4}s)</span>
                        </div>
                      ) : task.status === 'claimable' ? (
                        <button
                          onClick={() => handleClaimReward(task.id)}
                          className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 active:scale-95 transition-all animate-pulse"
                        >
                          Claim
                        </button>
                      ) : (
                        <button
                          onClick={() => handleStartTask(task.id)}
                          className="px-3.5 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-semibold text-xs flex items-center gap-1 active:scale-95 transition-all"
                        >
                          <span>Start</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: FRIENDS / REFERRAL */}
          {activeTab === 'friends' && (
            <div className="flex-1 flex flex-col py-1 space-y-3.5">
              {/* Header Box */}
              <div className="bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-900 border border-indigo-500/20 rounded-2xl p-4 text-center">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mx-auto mb-2">
                  <Users className="w-6 h-6" />
                </div>
                <h2 className="text-base font-bold text-white">Invite Friends & Earn</h2>
                <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                  Earn <span className="text-yellow-400 font-semibold">+25,000 SETRI</span> for every invited friend plus <span className="text-cyan-400 font-semibold">10% of their mining taps</span> for life!
                </p>

                {/* Referral Link Box */}
                <div className="mt-3.5 flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl p-2">
                  <input
                    type="text"
                    readOnly
                    value={referralLink}
                    className="bg-transparent text-xs text-slate-300 flex-1 outline-none px-2 font-mono truncate"
                  />
                  <button
                    onClick={handleCopyReferral}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1 active:scale-95 transition-all shrink-0"
                  >
                    {copiedReferral ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedReferral ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="mt-2.5 grid grid-cols-2 gap-2">
                  <button
                    onClick={handleShareTelegram}
                    className="py-2.5 rounded-xl bg-gradient-to-r from-[#0098EA] to-[#0081c7] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-500/20 active:scale-95 transition-all"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share on Telegram</span>
                  </button>

                  <button
                    onClick={handleSimulateInvite}
                    className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-yellow-400 border border-yellow-500/30 font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>+ Sim Referral (+25k)</span>
                  </button>
                </div>
              </div>

              {/* Referral Metrics */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-3">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wide">
                    Friends Invited
                  </span>
                  <div className="text-xl font-extrabold text-white font-mono mt-1">
                    {friends.length} <span className="text-xs font-normal text-slate-400">miners</span>
                  </div>
                </div>

                <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-3">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wide">
                    Total Bonus Earned
                  </span>
                  <div className="text-xl font-extrabold text-yellow-400 font-mono mt-1">
                    +{friends.reduce((acc, f) => acc + f.earnedCoins, 0).toLocaleString()}
                  </div>
                </div>
              </div>

              {/* ================= TELEGRAM WALLET REFERRAL CARD ================= */}
              <div className="bg-gradient-to-br from-[#0c2438] via-slate-900 to-[#0c1c2b] border border-cyan-500/35 rounded-2xl p-4 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-base shadow-md shadow-cyan-500/10">
                      ✈️
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-xs font-bold text-white">رابط إحالة Telegram Wallet الرسمي</h3>
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                          @wallet
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400">Official Telegram @wallet Referral</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                    +Bonus
                  </span>
                </div>

                <p className="text-[11px] text-slate-300 mb-3 leading-relaxed">
                  أنشئ وفعّل محفظتك الرسمية داخل تطبيق تيليجرام (<span className="text-cyan-400 font-semibold">Telegram @wallet</span>) عبر الرابط المعتمد أدناه لتأهيل حسابك لاستقبال إيردروب عملة <span className="text-yellow-400 font-semibold">SetriCoin</span> والحصول على مزايا حصرية:
                </p>

                {/* Referral Link Box */}
                <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-2.5 mb-2.5">
                  <div className="text-[10px] text-slate-400 font-semibold mb-1 flex items-center justify-between">
                    <span>رابط الإحالة المباشر:</span>
                    <span className="text-cyan-400 font-mono text-[9px]">Verified Link</span>
                  </div>
                  <div className="font-mono text-xs text-cyan-300 break-all select-all font-semibold bg-slate-900/80 px-2 py-1.5 rounded-lg border border-slate-800">
                    {TELEGRAM_WALLET_REFERRAL_URL}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleCopyTgWalletReferral}
                    className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-700 transition-all active:scale-95"
                  >
                    {copiedTgWalletRef ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedTgWalletRef ? 'تم النسخ!' : 'نسخ الرابط'}</span>
                  </button>

                  <a
                    href={TELEGRAM_WALLET_REFERRAL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 rounded-xl bg-gradient-to-r from-[#0098EA] to-[#007cc0] hover:from-[#05a4fc] hover:to-[#008bd9] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-cyan-500/25 transition-all active:scale-95"
                  >
                    <span>فتح في تيليجرام</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Friends Squad List */}
              <div className="space-y-2">
                <div className="flex items-center justify-between px-1">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Your Mining Squad ({friends.length})
                  </h3>
                  <span className="text-[11px] text-cyan-400 font-semibold">10% Lifetime Cut</span>
                </div>

                {friends.map(friend => (
                  <div
                    key={friend.id}
                    className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/60 border border-slate-800/70 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700/50 flex items-center justify-center text-lg">
                        {friend.avatar}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-100 flex items-center gap-1">
                          {friend.name}
                          <span className="text-[10px] font-normal text-slate-400">{friend.username}</span>
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          {friend.tier} • {friend.joinedDate}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-extrabold text-yellow-400 font-mono">
                        +{friend.earnedCoins.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-slate-500">coins earned</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: WALLET & TON CONNECT */}
          {activeTab === 'wallet' && (
            <div className="flex-1 flex flex-col py-1 space-y-3.5">
              {/* Wallet Status Card */}
              <div className="bg-gradient-to-b from-[#0c1322] to-[#080d17] border border-cyan-500/25 rounded-3xl p-5 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                      <Wallet className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white">TON Connect Status</span>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            wallet.connected ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'
                          }`}
                        />
                        <span className="text-[11px] font-medium text-slate-400">
                          {wallet.connected ? `Connected (${wallet.provider})` : 'Disconnected'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-500/10 text-cyan-400 border border-cyan-500/20">
                    TON Mainnet
                  </span>
                </div>

                {/* Estimated Airdrop Card */}
                <div className="bg-slate-950/70 rounded-2xl p-4 border border-slate-800/80 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="text-[11px] text-slate-400 font-medium">Estimated Airdrop Allocation</div>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-yellow-300">
                      Phase 1
                    </span>
                  </div>
                  <div className="text-2xl font-bold font-mono text-white mt-1 flex items-baseline gap-2">
                    <span>{Math.round(balance * 0.05 + friends.length * 100).toLocaleString()}</span>
                    <span className="text-xs font-semibold text-cyan-400">SETRI TGE</span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1">
                    Calculated from mining taps ({totalTaps}), quest completions, and squad referrals.
                  </div>
                </div>

                {/* Wallet Details / Connect Button */}
                {wallet.connected ? (
                  <div className="space-y-2.5">
                    <div className="p-3 bg-slate-900/70 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                      <span className="text-slate-400">Address:</span>
                      <span className="font-mono text-cyan-300 font-semibold">{wallet.address}</span>
                    </div>

                    <div className="p-3 bg-slate-900/70 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                      <span className="text-slate-400">TON Balance:</span>
                      <span className="font-mono text-white font-semibold">{wallet.tonBalance} TON (Mainnet)</span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(wallet.address);
                          showToast('Address copied!');
                        }}
                        className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 font-bold text-xs transition-all active:scale-95"
                      >
                        Copy Address
                      </button>

                      <button
                        onClick={handleDisconnectWallet}
                        className="flex-1 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 font-bold text-xs transition-all active:scale-95"
                      >
                        Disconnect
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-xs text-slate-400 mb-3 text-center">
                      Connect your TON wallet (Tonkeeper, Telegram @wallet, MyTonWallet) to lock in your token airdrop rewards.
                    </p>
                    <button
                      onClick={() => setShowWalletModal(true)}
                      className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#0098EA] to-[#007cc0] hover:from-[#05a4fc] hover:to-[#008bd9] text-white font-bold text-xs shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 active:scale-95 transition-all"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2L2 9.5L12 22L22 9.5L12 2ZM4.4 9.5L12 3.8L19.6 9.5L12 20L4.4 9.5Z" />
                      </svg>
                      <span>Connect with TON Connect</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Official Telegram @wallet Referral Card */}
              <div className="bg-gradient-to-br from-[#0c2438] via-slate-900 to-[#0c1c2b] border border-cyan-500/35 rounded-2xl p-4 shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-sm">
                      ✈️
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">تفعيل محفظة تيليجرام الرسمية (@wallet)</h4>
                      <p className="text-[10px] text-slate-400">Telegram @wallet Official Direct Link</p>
                    </div>
                  </div>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    رابط رسمي
                  </span>
                </div>

                <p className="text-[11px] text-slate-300 mb-2.5 leading-relaxed">
                  لا تملك محفظة TON حتى الآن؟ افتح محفظة تيليجرام الرسمية المدمجة عبر رابط الإحالة المعتمد لتأهيل حسابك واستلام أرباح التعدين:
                </p>

                <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-2 mb-2.5">
                  <div className="font-mono text-[11px] text-cyan-300 break-all select-all font-semibold">
                    {TELEGRAM_WALLET_REFERRAL_URL}
                  </div>
                </div>

                <div className="flex gap-2">
                  <a
                    href={TELEGRAM_WALLET_REFERRAL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 rounded-xl bg-gradient-to-r from-[#0098EA] to-[#007cc0] hover:from-[#05a4fc] hover:to-[#008bd9] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-cyan-500/20 active:scale-95 transition-all"
                  >
                    <span>فتح Telegram @wallet</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={handleCopyTgWalletReferral}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 font-bold text-xs flex items-center gap-1 border border-slate-700 active:scale-95 transition-all"
                  >
                    {copiedTgWalletRef ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedTgWalletRef ? 'تم النسخ' : 'نسخ'}</span>
                  </button>
                </div>
              </div>

              {/* Airdrop Qualification Checklist */}
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>Airdrop Eligibility Checklist</span>
                </h3>

                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300">1. Connect TON Wallet</span>
                    {wallet.connected ? (
                      <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Qualified
                      </span>
                    ) : (
                      <span className="text-amber-400 flex items-center gap-1 font-semibold">
                        <Clock className="w-3.5 h-3.5" /> Pending
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300">2. Reach Level 2 (Silver Miner)</span>
                    {balance >= 25000 ? (
                      <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Qualified
                      </span>
                    ) : (
                      <span className="text-amber-400 flex items-center gap-1 font-semibold">
                        <Clock className="w-3.5 h-3.5" /> In Progress
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300">3. Invite at least 1 Friend</span>
                    {friends.length >= 1 ? (
                      <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Qualified ({friends.length}/1)
                      </span>
                    ) : (
                      <span className="text-slate-500">0/1</span>
                    )}
                  </div>
                </div>
              </div>

              {/* ================= SUPPORT FOUNDERS / DEVELOPERS CARD ================= */}
              <div className="bg-gradient-to-br from-[#121626] via-slate-900 to-[#0e111d] border border-rose-500/30 rounded-3xl p-5 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 shadow-md shadow-rose-500/10">
                      <Heart className="w-4 h-4 fill-current animate-pulse" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-xs font-bold text-white">Support the Founders</h3>
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                          ETH / EVM
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400">دعم مطوري ومشروع العملة</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowQrCodeInWallet(prev => !prev)}
                    className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1 border transition-all ${
                      showQrCodeInWallet
                        ? 'bg-rose-500 text-slate-950 border-rose-400'
                        : 'bg-slate-800/80 hover:bg-slate-750 text-slate-300 border-slate-700'
                    }`}
                    title="Toggle QR Code"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span className="text-[10px]">QR</span>
                  </button>
                </div>

                <p className="text-[11px] text-slate-300 mb-3 leading-relaxed">
                  Support the creators and engineers behind <span className="text-cyan-400 font-semibold">SetriCoin</span>. Send tips or contributions in ETH or any ERC-20 / EVM token directly to the founders' wallet:
                </p>

                {/* QR Code Collapsible Display */}
                {showQrCodeInWallet && (
                  <div className="my-3 p-3 bg-slate-950/90 rounded-2xl border border-slate-800 text-center flex flex-col items-center animate-fadeIn">
                    <div className="bg-white p-2 rounded-xl shadow-lg mb-2">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${FOUNDER_ETH_ADDRESS}&margin=0`}
                        alt="Founder Ethereum Wallet QR"
                        className="w-32 h-32"
                      />
                    </div>
                    <span className="text-[10px] text-slate-400">
                      Scan with MetaMask, Trust Wallet, Binance, or OKX
                    </span>
                  </div>
                )}

                {/* Ethereum Address Display Box */}
                <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-3 mb-3">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                    <span className="flex items-center gap-1 font-semibold text-slate-300">
                      <svg className="w-3 h-3 text-cyan-400 fill-current" viewBox="0 0 24 24">
                        <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z" />
                      </svg>
                      Founder Ethereum Address
                    </span>
                    <span className="text-emerald-400 font-mono text-[9px]">Verified</span>
                  </div>

                  <div className="font-mono text-xs text-cyan-300 font-semibold break-all bg-slate-900/80 px-2.5 py-1.5 rounded-lg border border-slate-800/80 select-all">
                    {FOUNDER_ETH_ADDRESS}
                  </div>

                  <div className="flex items-center gap-2 mt-2.5">
                    <button
                      onClick={handleCopyFounderAddress}
                      className="flex-1 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-400 hover:to-pink-400 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-rose-500/20 active:scale-95 transition-all"
                    >
                      {copiedFounderAddress ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedFounderAddress ? 'Address Copied!' : 'Copy ETH Address'}</span>
                    </button>

                    <a
                      href={`https://etherscan.io/address/${FOUNDER_ETH_ADDRESS}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white font-semibold text-xs flex items-center gap-1 border border-slate-700 transition-all"
                    >
                      <span>Etherscan</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>
                  </div>
                </div>

                {/* Supported Networks Tag Pills */}
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[9px] font-semibold px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/60">
                    Ethereum (ERC-20)
                  </span>
                  <span className="text-[9px] font-semibold px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/60">
                    Arbitrum (Layer 2)
                  </span>
                  <span className="text-[9px] font-semibold px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/60">
                    BNB Chain (BEP-20)
                  </span>
                  <span className="text-[9px] font-semibold px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/60">
                    Polygon
                  </span>
                </div>
              </div>

              {/* ================= PRIVACY, SECURITY & ENGINEERING TRUST SECTION ================= */}
              <div className="bg-gradient-to-br from-[#0c1a1e] via-slate-900 to-[#0b141a] border border-emerald-500/30 rounded-3xl p-5 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-md shadow-emerald-500/10">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-xs font-bold text-white">الخصوصية والأمان ومستقبل العملة</h3>
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          Audited & Verified
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400">Privacy, Security & Engineering Backing</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowPrivacyModal(true)}
                    className="p-1.5 px-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-[11px] font-bold transition-all active:scale-95 flex items-center gap-1"
                  >
                    <span>تفاصيل</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>

                <p className="text-[11px] text-slate-300 mb-3 leading-relaxed">
                  تتميز عملة <span className="text-cyan-400 font-semibold">SetriCoin</span> بأنها مبنية بأحدث معايير الأمان والخصوصية اللامركزية ومدعومة من نخبة من المهندسين والمطورين المتخصصين لضمان مستقبل واعد ومستدام لجميع المعدنين والمستثمرين.
                </p>

                {/* 3 Core Trust Pillars */}
                <div className="space-y-2 mb-3.5">
                  <div className="p-2.5 bg-slate-950/80 rounded-xl border border-slate-800 flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                      <Lock className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-200">خصوصية مطلقة وبدون تتبع (Zero-Knowledge)</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">لا يتم جمع أي بيانات هوية شخصية أو مراقبة سلوكك. مفاتيح محفظتك غير قابلة للاختراق وتظل تحت تحكمك الحصري 100%.</div>
                    </div>
                  </div>

                  <div className="p-2.5 bg-slate-950/80 rounded-xl border border-slate-800 flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-lg bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                      <Code2 className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-200">مدعومة من فريق مهندسين ومطورين معتمدين</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">تطوير مستمر للبنية التحتية، فحص دقيق للثغرات، وتأمين توزيع الإنزال الجوي العادل وحماية ضد الحسابات الوهمية.</div>
                    </div>
                  </div>

                  <div className="p-2.5 bg-slate-950/80 rounded-xl border border-slate-800 flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-lg bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-200">مستقبل واعد واقتصاد رمزي مستدام (Tokenomics)</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">خارطة طريق واضحة تتضمن إدراج العملة على منصات التداول وتوفير سيولة قوية وحوكمة لا مركزية للمعدنين.</div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setShowPrivacyModal(true)}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20 active:scale-95 transition-all"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>عرض ميثاق الخصوصية والأمان الكامل</span>
                </button>
              </div>

              {/* Demo Controls Bar */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-3 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Developer Testing:</span>
                <div className="flex gap-2">
                  <button
                    onClick={handleAddTestCoins}
                    className="px-2.5 py-1 rounded-lg bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 text-[11px] font-semibold border border-yellow-500/30"
                  >
                    +50k Coins
                  </button>
                  <button
                    onClick={handleResetDemo}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-semibold flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset
                  </button>
                </div>
              </div>

            </div>
          )}

        </main>

        {/* ================= BOTTOM NAVIGATION ================= */}
        <nav
          id="bottom-nav"
          className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-[#090b12]/95 border-t border-slate-800/80 backdrop-blur-lg px-2 py-2 z-30 flex items-center justify-around shadow-2xl"
        >
          {/* Mine Tab */}
          <button
            id="nav-mine-tab"
            onClick={() => setActiveTab('mine')}
            className={`flex flex-col items-center justify-center flex-1 py-1 rounded-xl transition-all ${
              activeTab === 'mine' ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <div
              className={`p-1.5 rounded-xl transition-all ${
                activeTab === 'mine' ? 'bg-cyan-500/15 ring-1 ring-cyan-500/30 scale-105' : 'bg-transparent'
              }`}
            >
              <Pickaxe className="w-5 h-5" />
            </div>
            <span className="text-[11px] mt-1 tracking-tight">Mine</span>
          </button>

          {/* Earn Tab */}
          <button
            id="nav-earn-tab"
            onClick={() => setActiveTab('earn')}
            className={`flex flex-col items-center justify-center flex-1 py-1 rounded-xl transition-all relative ${
              activeTab === 'earn' ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <div
              className={`p-1.5 rounded-xl transition-all ${
                activeTab === 'earn' ? 'bg-cyan-500/15 ring-1 ring-cyan-500/30 scale-105' : 'bg-transparent'
              }`}
            >
              <Gift className="w-5 h-5" />
              {tasks.some(t => t.status === 'claimable') && (
                <span className="absolute top-1 right-3 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              )}
            </div>
            <span className="text-[11px] mt-1 tracking-tight">Earn</span>
          </button>

          {/* Friends Tab */}
          <button
            id="nav-friends-tab"
            onClick={() => setActiveTab('friends')}
            className={`flex flex-col items-center justify-center flex-1 py-1 rounded-xl transition-all ${
              activeTab === 'friends' ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <div
              className={`p-1.5 rounded-xl transition-all ${
                activeTab === 'friends' ? 'bg-cyan-500/15 ring-1 ring-cyan-500/30 scale-105' : 'bg-transparent'
              }`}
            >
              <Users className="w-5 h-5" />
            </div>
            <span className="text-[11px] mt-1 tracking-tight">Friends</span>
          </button>

          {/* Wallet Tab */}
          <button
            id="nav-wallet-tab"
            onClick={() => setActiveTab('wallet')}
            className={`flex flex-col items-center justify-center flex-1 py-1 rounded-xl transition-all relative ${
              activeTab === 'wallet' ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <div
              className={`p-1.5 rounded-xl transition-all ${
                activeTab === 'wallet' ? 'bg-cyan-500/15 ring-1 ring-cyan-500/30 scale-105' : 'bg-transparent'
              }`}
            >
              <Wallet className="w-5 h-5" />
              {wallet.connected && (
                <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-emerald-400" />
              )}
            </div>
            <span className="text-[11px] mt-1 tracking-tight">Wallet</span>
          </button>
        </nav>

        {/* ================= TON CONNECT WALLET MODAL ================= */}
        {showWalletModal && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
            <div className="w-full max-w-sm bg-[#0e131f] border border-slate-800 rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                    <Wallet className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">TON Connect</h3>
                    <div className="text-[10px] text-slate-400">Open-source Web3 wallet protocol</div>
                  </div>
                </div>
                <button
                  onClick={() => setShowWalletModal(false)}
                  className="w-7 h-7 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {wallet.connected ? (
                <div className="space-y-3 py-2">
                  <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                    <span className="text-xs text-slate-400">Connected via {wallet.provider}</span>
                    <div className="text-sm font-bold font-mono text-cyan-400 mt-1">{wallet.address}</div>
                    <div className="text-xs text-slate-300 font-mono mt-0.5">{wallet.tonBalance} TON Balance</div>
                  </div>
                  <button
                    onClick={handleDisconnectWallet}
                    className="w-full py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 font-bold text-xs active:scale-95 transition-all"
                  >
                    Disconnect Wallet
                  </button>
                </div>
              ) : (
                <div className="space-y-2 pt-1">
                  <p className="text-xs text-slate-400 mb-2">
                    Choose your TON wallet application:
                  </p>

                  {/* Tonkeeper */}
                  <button
                    onClick={() => handleConnectProvider('Tonkeeper')}
                    disabled={connectingWallet !== null}
                    className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/40 transition-all active:scale-98"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                        💎
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-bold text-white">Tonkeeper</div>
                        <div className="text-[10px] text-slate-400">Most popular mobile TON wallet</div>
                      </div>
                    </div>
                    {connectingWallet === 'Tonkeeper' ? (
                      <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-500" />
                    )}
                  </button>

                  {/* Telegram Wallet (@wallet) */}
                  <div className="space-y-1">
                    <button
                      onClick={() => handleConnectProvider('Telegram @wallet')}
                      disabled={connectingWallet !== null}
                      className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/40 transition-all active:scale-98"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-cyan-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                          ✈️
                        </div>
                        <div className="text-left">
                          <div className="text-xs font-bold text-white">Telegram @wallet</div>
                          <div className="text-[10px] text-slate-400">Native in-chat Telegram wallet</div>
                        </div>
                      </div>
                      {connectingWallet === 'Telegram @wallet' ? (
                        <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-slate-500" />
                      )}
                    </button>
                    <div className="px-1.5 flex items-center justify-between text-[10px]">
                      <span className="text-slate-400">New to @wallet?</span>
                      <a
                        href={TELEGRAM_WALLET_REFERRAL_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 hover:underline"
                      >
                        <span>Activate with referral link</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                  </div>

                  {/* MyTonWallet */}
                  <button
                    onClick={() => handleConnectProvider('MyTonWallet')}
                    disabled={connectingWallet !== null}
                    className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/40 transition-all active:scale-98"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                        ⚡
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-bold text-white">MyTonWallet</div>
                        <div className="text-[10px] text-slate-400">Web extension & mobile app</div>
                      </div>
                    </div>
                    {connectingWallet === 'MyTonWallet' ? (
                      <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-500" />
                    )}
                  </button>
                </div>
              )}

              <div className="pt-2 text-center text-[10px] text-slate-500">
                TON Connect v2.0 • Cryptographically verified
              </div>
            </div>
          </div>
        )}

        {/* ================= BOOSTERS & UPGRADES MODAL ================= */}
        {showBoostModal && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
            <div className="w-full max-w-sm bg-[#0e131f] border border-slate-800 rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 sticky top-0 bg-[#0e131f] z-10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
                    <Flame className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Boosters & Upgrades</h3>
                    <div className="text-[10px] text-slate-400">Upgrade your mining efficiency</div>
                  </div>
                </div>
                <button
                  onClick={() => setShowBoostModal(false)}
                  className="w-7 h-7 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Free Daily Boosters */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Free Daily Boosters
                </span>

                <div className="space-y-2">
                  {/* 5X Turbo */}
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900 border border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-lg">
                        🚀
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">5X Turbo Miner</h4>
                        <p className="text-[10px] text-slate-400">5X coins per tap for 30s ({dailyFreeTurbos}/3 left)</p>
                      </div>
                    </div>
                    <button
                      onClick={handleActivateTurbo}
                      disabled={turboActive || dailyFreeTurbos <= 0}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        turboActive
                          ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                          : dailyFreeTurbos <= 0
                          ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                          : 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 hover:brightness-110 active:scale-95 shadow-md shadow-amber-500/20'
                      }`}
                    >
                      {turboActive ? `${turboTimeLeft}s` : 'Use'}
                    </button>
                  </div>

                  {/* Full Stamina Refill */}
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900 border border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-lg">
                        ⚡
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">Full Stamina Refill</h4>
                        <p className="text-[10px] text-slate-400">Instantly recharge to {maxEnergy} ({dailyFreeRefills}/3 left)</p>
                      </div>
                    </div>
                    <button
                      onClick={handleRefillEnergy}
                      disabled={energy >= maxEnergy || dailyFreeRefills <= 0}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        energy >= maxEnergy || dailyFreeRefills <= 0
                          ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                          : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 active:scale-95 shadow-md shadow-cyan-500/20'
                      }`}
                    >
                      {energy >= maxEnergy ? 'Full' : 'Refill'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Mining Upgrades (Spent with Coins) */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Permanent Equipment Upgrades
                </span>

                <div className="space-y-2">
                  {/* Multitap */}
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900 border border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-lg">
                        👆
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <h4 className="text-xs font-bold text-white">Multitap</h4>
                          <span className="text-[10px] text-cyan-400 font-mono">Lvl {upgrades.multitapLevel}</span>
                        </div>
                        <p className="text-[10px] text-slate-400">+1 coin per tap</p>
                      </div>
                    </div>
                    <button
                      onClick={handleBuyMultitap}
                      disabled={balance < multitapCost}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                        balance < multitapCost
                          ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                          : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 active:scale-95 shadow-md shadow-emerald-500/20'
                      }`}
                    >
                      <Coins className="w-3 h-3" />
                      <span>{multitapCost.toLocaleString()}</span>
                    </button>
                  </div>

                  {/* Energy Limit */}
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900 border border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-lg">
                        🔋
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <h4 className="text-xs font-bold text-white">Energy Tank</h4>
                          <span className="text-[10px] text-cyan-400 font-mono">Lvl {upgrades.energyLimitLevel}</span>
                        </div>
                        <p className="text-[10px] text-slate-400">+500 max stamina cap</p>
                      </div>
                    </div>
                    <button
                      onClick={handleBuyEnergyLimit}
                      disabled={balance < energyLimitCost}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                        balance < energyLimitCost
                          ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                          : 'bg-blue-500 text-white hover:bg-blue-400 active:scale-95 shadow-md shadow-blue-500/20'
                      }`}
                    >
                      <Coins className="w-3 h-3" />
                      <span>{energyLimitCost.toLocaleString()}</span>
                    </button>
                  </div>

                  {/* Auto-Mining Bot */}
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900 border border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-lg">
                        🤖
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <h4 className="text-xs font-bold text-white">SetriBot 24/7</h4>
                          <span className="text-[10px] text-cyan-400 font-mono">Lvl {upgrades.autoBotLevel}</span>
                        </div>
                        <p className="text-[10px] text-slate-400">+1,200/hr passive offline</p>
                      </div>
                    </div>
                    <button
                      onClick={handleBuyAutoBot}
                      disabled={balance < autoBotCost}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                        balance < autoBotCost
                          ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                          : 'bg-purple-500 text-white hover:bg-purple-400 active:scale-95 shadow-md shadow-purple-500/20'
                      }`}
                    >
                      <Coins className="w-3 h-3" />
                      <span>{autoBotCost.toLocaleString()}</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ================= OFFLINE WELCOME BACK MODAL ================= */}
        {showWelcomeBack?.show && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-sm bg-[#0e131f] border border-cyan-500/40 rounded-3xl p-5 shadow-2xl text-center space-y-3 animate-fadeIn">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-3xl mx-auto">
                🤖
              </div>
              <h3 className="text-base font-bold text-white">Welcome Back, Miner!</h3>
              <p className="text-xs text-slate-400">
                While you were offline, your <span className="text-cyan-400 font-semibold">SetriBot</span> continued mining and your stamina recharged:
              </p>

              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Coins Farmed:</span>
                  <span className="text-yellow-400 font-bold font-mono text-sm">
                    +{showWelcomeBack.coins.toLocaleString()} SETRI
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Stamina Recovered:</span>
                  <span className="text-emerald-400 font-bold font-mono text-sm">
                    +{showWelcomeBack.energy} Energy
                  </span>
                </div>
              </div>

              <button
                onClick={() => setShowWelcomeBack(null)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:brightness-110 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 active:scale-95 transition-all"
              >
                Claim & Continue Mining
              </button>
            </div>
          </div>
        )}

        {/* ================= SUPPORT FOUNDERS & DONATIONS MODAL ================= */}
        {showDonationModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
            <div className="w-full max-w-sm bg-[#0e131f] border border-rose-500/30 rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400">
                    <Heart className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Support the Founders</h3>
                    <div className="text-[10px] text-slate-400">دعم مؤسسي ومطوري العملة</div>
                  </div>
                </div>
                <button
                  onClick={() => setShowDonationModal(false)}
                  className="w-7 h-7 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="text-center space-y-3">
                <p className="text-xs text-slate-300 leading-relaxed">
                  Help accelerate development of the <span className="text-cyan-400 font-semibold">SetriCoin ecosystem</span>, server nodes, and airdrop liquidity by contributing directly to the team:
                </p>

                {/* QR Code Container */}
                <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col items-center">
                  <div className="bg-white p-2.5 rounded-xl shadow-lg mb-2">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${FOUNDER_ETH_ADDRESS}&margin=0`}
                      alt="Ethereum Wallet QR Code"
                      className="w-40 h-40"
                    />
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">
                    Scan with any EVM or Web3 Wallet app
                  </span>
                </div>

                {/* Address Box */}
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-2xl text-left space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Ethereum / EVM Address
                  </span>
                  <div className="font-mono text-xs font-semibold text-cyan-300 break-all select-all bg-slate-950 p-2 rounded-lg border border-slate-800">
                    {FOUNDER_ETH_ADDRESS}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={handleCopyFounderAddress}
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-400 hover:to-pink-400 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-rose-500/20 active:scale-95 transition-all"
                  >
                    {copiedFounderAddress ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedFounderAddress ? 'Copied!' : 'Copy Address'}</span>
                  </button>

                  <a
                    href={`https://etherscan.io/address/${FOUNDER_ETH_ADDRESS}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white font-semibold text-xs flex items-center justify-center gap-1 border border-slate-700 transition-all"
                  >
                    <span>Etherscan</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Supported tokens list */}
                <div className="pt-1 text-[10px] text-slate-400 text-left border-t border-slate-800 space-y-1">
                  <div className="font-semibold text-slate-300">Accepted Networks & Tokens:</div>
                  <div className="text-slate-400">
                    ETH, BNB, MATIC, and Web3 tokens on Ethereum, Arbitrum, BSC, Polygon, and Optimism.
                  </div>
                </div>

                <div className="text-center pt-1 text-[11px] text-rose-300 font-medium">
                  شكراً جزيلاً لدعمكم المستمر للمشروع وفريق العمل ❤️
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= PRIVACY & SECURITY / ENGINEERING TRUST MODAL ================= */}
        {showPrivacyModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
            <div className="w-full max-w-md bg-[#0e141c] border border-emerald-500/40 rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto">
              
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/10">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                      الخصوصية والأمان والمستقبل الواعد
                    </h3>
                    <div className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      مدعومة ومطورة من مهندسين معتمدين • Zero-Knowledge
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowPrivacyModal(false)}
                  className="w-7 h-7 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Main Content */}
              <div className="space-y-3.5 text-right">
                {/* Intro Callout */}
                <div className="p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-2xl text-slate-300 text-xs leading-relaxed text-right">
                  <div className="flex items-center gap-1.5 text-emerald-300 font-bold mb-1 text-xs justify-end">
                    <span>التزامنا الصارم بالخصوصية والأمان التقني</span>
                    <Lock className="w-3.5 h-3.5" />
                  </div>
                  تم تصميم وتطوير <span className="text-cyan-400 font-bold">SetriCoin</span> وفق أعلى المعايير الهندسية لتقنيات الويب 3 (Web3)، بهدف حماية خصوصية المستخدمين بشكل كامل وبناء اقتصاد رقمي ذو مستقبل واعد ومستدام.
                </div>

                {/* Section 1: User Privacy & No Tracking */}
                <div className="p-3.5 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-2">
                  <div className="flex items-center justify-end gap-2 text-white font-bold text-xs">
                    <span>1. خصوصية مطلقة وعدم جمع البيانات (Zero-Knowledge)</span>
                    <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <Lock className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <ul className="text-[11px] text-slate-300 space-y-1.5 list-disc list-inside leading-relaxed text-right">
                    <li><strong className="text-slate-200">لا نطلب بيانات شخصية:</strong> لا يُطلب منك إدخال بريد إلكتروني أو رقم هاتف أو أي وثائق هوية شخصية.</li>
                    <li><strong className="text-slate-200">السيادة الكاملة لمحفظتك:</strong> لا يمكن لأي خادم أو طرف خارجي الوصول إلى عبارات الاسترداد أو المفاتيح الخاصة بك.</li>
                    <li><strong className="text-slate-200">تشفير محلي آمن:</strong> يتم حفظ تقدمك وبيانات التعدين بأمان تام مع احترام كامل لمعايير الخصوصية الرقمية الدولية.</li>
                  </ul>
                </div>

                {/* Section 2: Backed by Engineers & Developers */}
                <div className="p-3.5 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-2">
                  <div className="flex items-center justify-end gap-2 text-white font-bold text-xs">
                    <span>2. فريق هندسي وتطويري متمرس (Engineering Excellence)</span>
                    <div className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                      <Code2 className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <ul className="text-[11px] text-slate-300 space-y-1.5 list-disc list-inside leading-relaxed text-right">
                    <li><strong className="text-slate-200">مطورو بلوكتشين محترفون:</strong> يقود المشروع نخبة من مهندسي البرمجيات المتخصصين في بنية شبكة TON وعقود الذكاء البرمجي.</li>
                    <li><strong className="text-slate-200">حماية ضد البوتات والحسابات الوهمية:</strong> تم تطوير خوارزميات متقدمة لرصد محاولات الغش لضمان عدم سرقة حصص المعدنين الحقيقيين.</li>
                    <li><strong className="text-slate-200">تحديثات أمنية دورية:</strong> مراجعة مستمرة للكود البرمجي وسيرفرات الاستضافة لضمان استقرار التطبيق بنسبة 99.9%.</li>
                  </ul>
                </div>

                {/* Section 3: Promising Future & Tokenomics */}
                <div className="p-3.5 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-2">
                  <div className="flex items-center justify-end gap-2 text-white font-bold text-xs">
                    <span>3. مستقبل واعد واقتصاد رمزي متين (Promising Future)</span>
                    <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <ul className="text-[11px] text-slate-300 space-y-1.5 list-disc list-inside leading-relaxed text-right">
                    <li><strong className="text-slate-200">إنزال جوي عادل (Fair Airdrop):</strong> توزيع العملة مبني على نقاط التعدين الحقيقية والمهام المنجزة بدون محاباة.</li>
                    <li><strong className="text-slate-200">إدراج على شبكة TON:</strong> خطط واضحة لإطلاق رمز SETRI الرسمي على الشبكة اللامركزية وربطه بأحواض سيولة موثوقة.</li>
                    <li><strong className="text-slate-200">شراكات ومنظومة متكاملة:</strong> توسيع الاستخدامات الحقيقية للعملة داخل ألعاب وتطبيقات منظومة TON وTelegram.</li>
                  </ul>
                </div>

                {/* Section 4: Web3 Safety Protocol */}
                <div className="p-3.5 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-2">
                  <div className="flex items-center justify-end gap-2 text-white font-bold text-xs">
                    <span>4. أمان الاتصال عبر TON Connect</span>
                    <div className="w-6 h-6 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed text-right">
                    اتصالك بمحفظة TON يتم من خلال بروتوكول <span className="text-cyan-400 font-mono font-semibold">TON Connect 2.0</span> المفتوح المصدر، حيث يقتصر فقط على قراءة العنوان لتسجيل استحقاق الإنزال الجوي ولا يمكنه إجراء أي معاملات أو تحويلات بدون موافقتك اليدوية الصريحة من داخل محفظتك.
                  </p>
                </div>

                {/* Affirmation Button */}
                <button
                  onClick={() => {
                    setShowPrivacyModal(false);
                    showToast('✅ تم تأكيد مراجعة ميثاق الخصوصية والأمان');
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:brightness-110 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
                >
                  فهمت وأوافق على ميثاق الخصوصية والأمان
                </button>

                <div className="text-center text-[10px] text-slate-400">
                  فريق مهندسي ومطوري SetriCoin • الإصدار الأمني الموثق v2.4
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
