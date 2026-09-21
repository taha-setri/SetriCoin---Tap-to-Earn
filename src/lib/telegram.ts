import { TelegramWebAppUser } from '../types';

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        initData: string;
        initDataUnsafe: {
          query_id?: string;
          user?: TelegramWebAppUser;
          receiver?: TelegramWebAppUser;
          chat?: any;
          start_param?: string;
          auth_date?: number;
          hash?: string;
        };
        version: string;
        platform: string;
        colorScheme: 'light' | 'dark';
        themeParams: {
          bg_color?: string;
          text_color?: string;
          hint_color?: string;
          link_color?: string;
          button_color?: string;
          button_text_color?: string;
          secondary_bg_color?: string;
          header_bg_color?: string;
          bottom_bar_bg_color?: string;
          accent_text_color?: string;
          section_bg_color?: string;
          section_header_text_color?: string;
          subtitle_text_color?: string;
          destructive_text_color?: string;
        };
        isExpanded: boolean;
        viewportHeight: number;
        viewportStableHeight: number;
        headerColor: string;
        backgroundColor: string;
        isClosingConfirmationEnabled: boolean;
        BackButton: {
          isVisible: boolean;
          onClick(callback: () => void): void;
          offClick(callback: () => void): void;
          show(): void;
          hide(): void;
        };
        MainButton: {
          text: string;
          color: string;
          textColor: string;
          isVisible: boolean;
          isActive: boolean;
          isProgressVisible: boolean;
          setText(text: string): void;
          onClick(callback: () => void): void;
          offClick(callback: () => void): void;
          show(): void;
          hide(): void;
          enable(): void;
          disable(): void;
          showProgress(leaveActive?: boolean): void;
          hideProgress(): void;
        };
        HapticFeedback: {
          impactOccurred(style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft'): void;
          notificationOccurred(type: 'error' | 'success' | 'warning'): void;
          selectionChanged(): void;
        };
        ready(): void;
        expand(): void;
        close(): void;
        enableClosingConfirmation?(): void;
        setHeaderColor?(color: string): void;
        setBackgroundColor?(color: string): void;
        openLink(url: string, options?: { try_instant_view?: boolean }): void;
        openTelegramLink(url: string): void;
      };
    };
  }
}

/**
 * Checks if running inside genuine Telegram WebApp
 */
export function isTelegramWebAppAvailable(): boolean {
  return typeof window !== 'undefined' && Boolean(window.Telegram?.WebApp?.initDataUnsafe?.user?.id);
}

/**
 * Gets Telegram WebApp instance if available
 */
export function getTelegramWebApp() {
  if (typeof window !== 'undefined') {
    return window.Telegram?.WebApp || null;
  }
  return null;
}

/**
 * Extracts native Telegram user from window.Telegram.WebApp.initDataUnsafe
 */
export function getNativeTelegramUser(): TelegramWebAppUser | null {
  if (typeof window === 'undefined') return null;
  const webApp = window.Telegram?.WebApp;
  if (webApp && webApp.initDataUnsafe?.user?.id) {
    return webApp.initDataUnsafe.user;
  }
  return null;
}

/**
 * Initializes Telegram Mini App viewport, theme styling, and readiness signal
 */
export function initTelegramWebApp(): void {
  if (typeof window === 'undefined') return;
  const webApp = window.Telegram?.WebApp;
  if (!webApp) return;

  try {
    // Notify Telegram client that Mini App is ready
    webApp.ready();

    // Expand view to full screen
    webApp.expand();

    // Configure header & background dark tones
    if (webApp.setHeaderColor) {
      webApp.setHeaderColor('#0b0e17');
    }
    if (webApp.setBackgroundColor) {
      webApp.setBackgroundColor('#07090e');
    }

    // Enable closing confirmation to prevent accidental swipes during intense tapping
    if (webApp.enableClosingConfirmation) {
      webApp.enableClosingConfirmation();
    }
  } catch (err) {
    console.warn('Telegram WebApp init warning:', err);
  }
}

/**
 * Triggers native Telegram haptic feedback with web vibration fallback
 */
export function triggerHaptic(type: 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error' = 'light'): void {
  const webApp = getTelegramWebApp();
  if (webApp?.HapticFeedback) {
    try {
      if (type === 'success' || type === 'warning' || type === 'error') {
        webApp.HapticFeedback.notificationOccurred(type);
      } else {
        webApp.HapticFeedback.impactOccurred(type);
      }
      return;
    } catch {
      // ignore fallback below
    }
  }

  // Fallback to browser vibration API
  if (typeof window !== 'undefined' && 'vibrate' in navigator) {
    try {
      if (type === 'heavy') navigator.vibrate(25);
      else if (type === 'medium') navigator.vibrate(15);
      else if (type === 'success') navigator.vibrate([15, 30, 20]);
      else if (type === 'error') navigator.vibrate([40, 40, 40]);
      else navigator.vibrate(8);
    } catch {
      // ignore
    }
  }
}

/**
 * Open external or telegram links safely inside Telegram WebApp
 */
export function openLinkSafely(url: string): void {
  const webApp = getTelegramWebApp();
  if (url.startsWith('https://t.me/')) {
    if (webApp && typeof webApp.openTelegramLink === 'function') {
      webApp.openTelegramLink(url);
      return;
    }
  } else if (webApp && typeof webApp.openLink === 'function') {
    webApp.openLink(url);
    return;
  }
  window.open(url, '_blank', 'noopener,noreferrer');
}
