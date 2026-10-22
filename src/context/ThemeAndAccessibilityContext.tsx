import React, { createContext, useContext, useEffect, useState } from 'react';
import { AccessibilitySettings } from '../types';

interface NotificationToast {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning';
  timestamp: number;
}

interface ThemeAndAccessibilityContextType {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  accessibility: AccessibilitySettings;
  updateAccessibility: (key: keyof AccessibilitySettings, value: boolean) => void;
  toasts: NotificationToast[];
  addToast: (title: string, message: string, type?: 'info' | 'success' | 'warning') => void;
  removeToast: (id: string) => void;
  requestNotificationPermission: () => Promise<boolean>;
}

const ThemeAndAccessibilityContext = createContext<ThemeAndAccessibilityContextType | undefined>(undefined);

export const ThemeAndAccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state: defaults to dark for striking editorial impact, but respects stored preference
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('portfolio_theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [accessibility, setAccessibility] = useState<AccessibilitySettings>(() => {
    try {
      const saved = localStorage.getItem('portfolio_a11y');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      highContrast: false,
      largeText: false,
      reducedMotion: false,
      screenReaderOptimized: false,
    };
  });

  const [toasts, setToasts] = useState<NotificationToast[]>([]);

  // Apply theme class to document
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('portfolio_theme', theme);
  }, [theme]);

  // Apply accessibility styles
  useEffect(() => {
    const root = document.documentElement;
    if (accessibility.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    if (accessibility.largeText) {
      root.classList.add('text-size-large');
    } else {
      root.classList.remove('text-size-large');
    }

    localStorage.setItem('portfolio_a11y', JSON.stringify(accessibility));
  }, [accessibility]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const updateAccessibility = (key: keyof AccessibilitySettings, value: boolean) => {
    setAccessibility(prev => ({ ...prev, [key]: value }));
  };

  const addToast = (title: string, message: string, type: 'info' | 'success' | 'warning' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`;
    const newToast: NotificationToast = { id, title, message, type, timestamp: Date.now() };

    setToasts(prev => [newToast, ...prev].slice(0, 4));

    // Browser notification if permitted
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(title, {
          body: message,
          icon: '/assets/aistudio/Gemini_Generated_Image_k4jo3dk4jo3dk4jo_8bf28cf4.jpg',
        });
      } catch (e) {
        console.warn('Browser notification skipped:', e);
      }
    }

    setTimeout(() => {
      removeToast(id);
    }, 5000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const requestNotificationPermission = async (): Promise<boolean> => {
    if (!('Notification' in window)) {
      addToast('Notifikasi', 'Browser Anda tidak mendukung notifikasi push web.', 'warning');
      return false;
    }
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        addToast('Notifikasi Aktif', 'Notifikasi browser real-time telah diaktifkan dengan sukses!', 'success');
        return true;
      }
    } catch (e) {
      console.warn('Error requesting notification permission:', e);
    }
    return false;
  };

  return (
    <ThemeAndAccessibilityContext.Provider
      value={{
        theme,
        toggleTheme,
        accessibility,
        updateAccessibility,
        toasts,
        addToast,
        removeToast,
        requestNotificationPermission,
      }}
    >
      {children}
      {/* Toast notifications container */}
      <div
        aria-live="polite"
        className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none"
      >
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-xl border shadow-xl backdrop-blur-md transition-all duration-300 transform translate-y-0 ${
              toast.type === 'success'
                ? 'bg-emerald-950/90 border-emerald-700/60 text-emerald-100'
                : toast.type === 'warning'
                ? 'bg-amber-950/90 border-amber-700/60 text-amber-100'
                : 'bg-neutral-900/90 border-neutral-700/70 text-neutral-100'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold tracking-wide">{toast.title}</p>
                <p className="text-xs text-neutral-300 mt-0.5 leading-relaxed">{toast.message}</p>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-neutral-400 hover:text-white transition-colors text-xs p-1"
                aria-label="Tutup notifikasi"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </ThemeAndAccessibilityContext.Provider>
  );
};

export const useThemeAndAccessibility = () => {
  const context = useContext(ThemeAndAccessibilityContext);
  if (!context) {
    throw new Error('useThemeAndAccessibility must be used within ThemeAndAccessibilityProvider');
  }
  return context;
};
