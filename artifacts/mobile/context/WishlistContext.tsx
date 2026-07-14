import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Product } from '@/constants/data';

interface WishlistContextType {
  items: Product[];
  toggle: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | null>(null);
const STORAGE_KEY = '@griper_wishlist';

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then(data => {
      if (data) setItems(JSON.parse(data) as Product[]);
    }).catch(() => {});
  }, []);

  const toggle = useCallback((product: Product) => {
    setItems(prev => {
      const exists = prev.some(p => p.id === product.id);
      const updated = exists ? prev.filter(p => p.id !== product.id) : [...prev, product];
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated)).catch(() => {});
      return updated;
    });
  }, []);

  const isInWishlist = useCallback((id: string) => items.some(p => p.id === id), [items]);

  return (
    <WishlistContext.Provider value={{ items, toggle, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
