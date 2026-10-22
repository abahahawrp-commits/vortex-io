import React, { createContext, useContext, useEffect, useState } from 'react';
import { getSupabaseClient } from '../lib/supabase';

interface User {
  id: string;
  email: string;
  role: 'admin' | 'guest';
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  isLoading: boolean;
  loginAsDemoAdmin: () => void;
  loginWithSupabase: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem('portfolio_auth_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('portfolio_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('portfolio_auth_user');
    }
  }, [user]);

  // Demo admin quick login
  const loginAsDemoAdmin = () => {
    const adminUser: User = {
      id: 'usr-admin-owner',
      email: 'abahahawrp@gmail.com',
      role: 'admin',
      name: 'Samuel (Owner & Admin)',
    };
    setUser(adminUser);
  };

  // Real Supabase Auth login
  const loginWithSupabase = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    const supabase = getSupabaseClient();
    if (!supabase) {
      setIsLoading(false);
      // Fallback: If no supabase configured, check demo credentials
      if (email.trim() && password.length >= 4) {
        setUser({
          id: 'usr-admin-local',
          email,
          role: 'admin',
          name: email.split('@')[0],
        });
        return { success: true };
      }
      return { success: false, error: 'Koneksi Supabase belum dikonfigurasi. Anda dapat menggunakan opsi Demo Admin.' };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      setIsLoading(false);
      if (error) {
        return { success: false, error: error.message };
      }
      if (data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email || email,
          role: 'admin',
          name: data.user.user_metadata?.full_name || email.split('@')[0],
        });
        return { success: true };
      }
      return { success: false, error: 'Login gagal.' };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err?.message || 'Gagal terhubung ke Supabase Auth.' };
    }
  };

  const logout = async () => {
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        await supabase.auth.signOut();
      } catch {}
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin: user?.role === 'admin',
        isLoading,
        loginAsDemoAdmin,
        loginWithSupabase,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
