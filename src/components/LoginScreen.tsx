import React, { useState } from 'react';
import { ShieldCheck, Zap, Cloud, Award, Sparkles, Loader2, ArrowRight, Send, User, ChevronRight } from 'lucide-react';
import { TelegramWebAppUser } from '../types';

interface LoginScreenProps {
  onSignInGoogle: () => void;
  onSignInTelegram: (user: TelegramWebAppUser) => void;
  onContinueGuest: () => void;
  nativeTelegramUser: TelegramWebAppUser | null;
  loading: boolean;
  error: string | null;
  SetriCoinEmblem: React.FC<{ size?: number; turbo?: boolean; animated?: boolean }>;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onSignInGoogle,
  onSignInTelegram,
  onContinueGuest,
  nativeTelegramUser,
  loading,
  error,
  SetriCoinEmblem
}) => {
  const [showSimulatedTelegram, setShowSimulatedTelegram] = useState(false);
  const [simUsername, setSimUsername] = useState('');
  const [simFirstName, setSimFirstName] = useState('');

  const handleSimulatedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUsername = simUsername.replace('@', '').trim() || 'setri_miner';
    const cleanFirstName = simFirstName.trim() || 'Miner';
    // Deterministic pseudo-ID from username
    let hash = 0;
    for (let i = 0; i < cleanUsername.length; i++) {
      hash = (hash << 5) - hash + cleanUsername.charCodeAt(i);
      hash |= 0;
    }
    const pseudoId = Math.abs(hash) || 987654321;

    onSignInTelegram({
      id: pseudoId,
      first_name: cleanFirstName,
      username: cleanUsername,
      is_premium: true
    });
  };

  return (
    <div className="w-full max-w-md min-h-screen flex flex-col justify-between p-6 bg-gradient-to-b from-[#0c0f1a] via-[#080a12] to-[#04060a] relative overflow-hidden text-slate-100 select-none">
      {/* Ambient background glows */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-cyan-500/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-72 h-72 bg-blue-600/10 rounded-full blur-[110px] pointer-events-none" />

      {/* Top Header info */}
      <div className="pt-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
            <SetriCoinEmblem size={20} />
          </div>
          <span className="text-xs font-bold tracking-wider text-slate-300 uppercase">SetriCoin Network</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono">
            TMA • TON
          </span>
        </div>
      </div>

      {/* Center Branding & Hero */}
      <div className="my-auto py-6 text-center flex flex-col items-center z-10">
        {/* Animated SetriCoin Hologram Badge */}
        <div className="relative mb-5">
          <div className="w-28 h-28 rounded-3xl bg-gradient-to-tr from-cyan-500/20 via-slate-900 to-blue-600/25 border-2 border-cyan-400/40 flex items-center justify-center p-3 shadow-2xl shadow-cyan-500/25 relative group">
            <SetriCoinEmblem size={74} animated />
            <div className="absolute inset-0 rounded-3xl border border-cyan-400/20 animate-pulse pointer-events-none" />
          </div>
          <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-slate-900 border border-cyan-500/50 text-[10px] font-bold text-cyan-300 shadow-md flex items-center gap-1 whitespace-nowrap">
            <Zap className="w-2.5 h-2.5 text-amber-400" />
            <span>Telegram WebApp</span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
          <span>SetriCoin</span>
          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            TMA
          </span>
        </h1>
        <p className="text-xs text-slate-400 max-w-xs mt-2 leading-relaxed">
          تطبيق التعدين المباشر لعملة <span className="text-cyan-400 font-semibold">SETRI</span> عبر Telegram Mini App مع حفظ سحابي معزول بالكامل لكل مستخدم.
        </p>

        {/* Feature badges */}
        <div className="grid grid-cols-3 gap-2 mt-5 w-full max-w-xs text-left">
          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col items-center text-center">
            <Send className="w-4 h-4 text-sky-400 mb-1" />
            <span className="text-[10px] font-bold text-white">دخول تلقائي</span>
            <span className="text-[9px] text-slate-400">Telegram Auto-Auth</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col items-center text-center">
            <ShieldCheck className="w-4 h-4 text-emerald-400 mb-1" />
            <span className="text-[10px] font-bold text-white">حساب معزول</span>
            <span className="text-[9px] text-slate-400">Isolated 0 Balance</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col items-center text-center">
            <Cloud className="w-4 h-4 text-cyan-400 mb-1" />
            <span className="text-[10px] font-bold text-white">مزامنة سلسة</span>
            <span className="text-[9px] text-slate-400">Zero-Lag Sync</span>
          </div>
        </div>
      </div>

      {/* Action Controls */}
      <div className="w-full space-y-3 pb-3 z-10">
        {/* Error message banner if any */}
        {error && (
          <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs text-center leading-relaxed">
            {error}
          </div>
        )}

        {/* Case 1: Native Telegram User Detected */}
        {nativeTelegramUser ? (
          <button
            id="native-telegram-signin-btn"
            onClick={() => onSignInTelegram(nativeTelegramUser)}
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 active:scale-[0.98] text-white font-bold text-sm flex items-center justify-center gap-3 shadow-xl shadow-sky-500/20 transition-all disabled:opacity-60 cursor-pointer"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin text-white" />
            ) : (
              <Send className="w-5 h-5 text-white" />
            )}
            <span>
              {loading
                ? 'جاري تحميل الحساب السحابي...'
                : `المتابعة بحساب تيليجرام (${nativeTelegramUser.first_name}${nativeTelegramUser.username ? ' @' + nativeTelegramUser.username : ''})`}
            </span>
          </button>
        ) : (
          /* Case 2: Running outside native Telegram WebApp (e.g. browser preview) */
          <>
            {!showSimulatedTelegram ? (
              <button
                id="tma-telegram-signin-btn"
                onClick={() => {
                  // Default sample Telegram account for rapid testing
                  onSignInTelegram({
                    id: 772910481,
                    first_name: 'Setri Pioneer',
                    username: 'setricoin_miner',
                    is_premium: true
                  });
                }}
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 active:scale-[0.98] text-white font-bold text-sm flex items-center justify-center gap-3 shadow-xl shadow-sky-500/20 transition-all disabled:opacity-60 cursor-pointer"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin text-white" />
                ) : (
                  <Send className="w-5 h-5 text-white" />
                )}
                <span>دخول مباشر بهوية تيليجرام (Telegram Auto-Auth)</span>
              </button>
            ) : (
              /* Custom Telegram User Simulator Form */
              <form onSubmit={handleSimulatedSubmit} className="p-3.5 rounded-2xl bg-slate-900/90 border border-sky-500/30 space-y-2.5">
                <div className="text-[11px] font-semibold text-sky-300 flex items-center justify-between">
                  <span>تجربة معرّف تيليجرام مخصص (Custom TMA User):</span>
                  <button
                    type="button"
                    onClick={() => setShowSimulatedTelegram(false)}
                    className="text-slate-400 hover:text-white text-[10px]"
                  >
                    إلغاء
                  </button>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="الاسم الأول (e.g. Taha)"
                    value={simFirstName}
                    onChange={(e) => setSimFirstName(e.target.value)}
                    className="w-1/2 px-3 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
                  />
                  <input
                    type="text"
                    placeholder="اسم المستخدم @username"
                    value={simUsername}
                    onChange={(e) => setSimUsername(e.target.value)}
                    className="w-1/2 px-3 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>دخول بالمعرّف المخصص وتحميل السحابة</span>
                </button>
              </form>
            )}

            {!showSimulatedTelegram && (
              <button
                type="button"
                onClick={() => setShowSimulatedTelegram(true)}
                className="w-full text-center text-[11px] text-sky-400/80 hover:text-sky-300 underline cursor-pointer py-0.5"
              >
                تخصيص معرّف تيليجرام تجريبي آخر
              </button>
            )}

            {/* Alternative: Google Sign-In */}
            <button
              id="google-signin-btn"
              onClick={onSignInGoogle}
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 active:scale-[0.98] text-slate-900 font-bold text-xs flex items-center justify-center gap-2.5 shadow-md transition-all disabled:opacity-60 cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>تسجيل الدخول بحساب Google</span>
            </button>
          </>
        )}

        {/* Secondary Action: Guest / Demo Mode */}
        <button
          id="guest-signin-btn"
          onClick={onContinueGuest}
          disabled={loading}
          className="w-full py-2 px-4 rounded-xl bg-slate-900/80 hover:bg-slate-850 active:scale-[0.98] border border-slate-800 text-slate-400 hover:text-white font-medium text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <span>المتابعة كضيف بدون تسجيل</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
        </button>

        <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500 pt-1">
          <span>بوت تيليجرام الرسمي:</span>
          <a
            href="https://t.me/SetriCoin_App_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-400 hover:underline font-mono"
          >
            @SetriCoin_App_bot
          </a>
        </div>
      </div>
    </div>
  );
};
