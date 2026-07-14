import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Address, User } from '@/constants/data';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, phone: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  addAddress: (address: Omit<Address, 'id'>) => Promise<void>;
  setDefaultAddress: (id: string) => Promise<void>;
  becomeSeller: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const STORAGE_KEY = '@griper_user';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await AsyncStorage.getItem(STORAGE_KEY);
        if (data) setUser(JSON.parse(data) as User);
      } catch {}
      setIsLoading(false);
    };
    load();
  }, []);

  const save = async (u: User | null) => {
    if (u) await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    else await AsyncStorage.removeItem(STORAGE_KEY);
  };

  const login = useCallback(async (email: string, _password: string): Promise<boolean> => {
    if (!email) return false;
    const newUser: User = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0] ?? 'User',
      email,
      phone: '+91 98765 43210',
      addresses: [
        {
          id: 'addr1',
          name: email.split('@')[0] ?? 'User',
          line1: '42 MG Road, Koramangala',
          city: 'Bangalore',
          state: 'Karnataka',
          pincode: '560034',
          phone: '+91 98765 43210',
          isDefault: true,
        },
      ],
      isSeller: false,
    };
    await save(newUser);
    setUser(newUser);
    return true;
  }, []);

  const register = useCallback(async (name: string, email: string, phone: string, _password: string): Promise<boolean> => {
    if (!name || !email) return false;
    const newUser: User = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name,
      email,
      phone,
      addresses: [],
      isSeller: false,
    };
    await save(newUser);
    setUser(newUser);
    return true;
  }, []);

  const logout = useCallback(async () => {
    await save(null);
    setUser(null);
  }, []);

  const addAddress = useCallback(async (address: Omit<Address, 'id'>) => {
    if (!user) return;
    const newAddr: Address = { ...address, id: Date.now().toString() };
    const updated = { ...user, addresses: [...user.addresses, newAddr] };
    await save(updated);
    setUser(updated);
  }, [user]);

  const setDefaultAddress = useCallback(async (id: string) => {
    if (!user) return;
    const updated = {
      ...user,
      addresses: user.addresses.map(a => ({ ...a, isDefault: a.id === id })),
    };
    await save(updated);
    setUser(updated);
  }, [user]);

  const becomeSeller = useCallback(async () => {
    if (!user) return;
    const updated = { ...user, isSeller: true };
    await save(updated);
    setUser(updated);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, addAddress, setDefaultAddress, becomeSeller }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
