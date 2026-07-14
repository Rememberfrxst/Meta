import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { COUPONS, Order, Product } from '@/constants/data';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, qty: number) => void;
  clearCart: () => void;
  coupon: string;
  couponDiscount: number;
  applyCoupon: (code: string) => 'valid' | 'invalid' | 'already';
  removeCoupon: () => void;
  subtotal: number;
  deliveryFee: number;
  discountAmount: number;
  total: number;
  itemCount: number;
  orders: Order[];
  placeOrder: (paymentMethod: Order['paymentMethod'], address: Order['address']) => Order;
}

const CartContext = createContext<CartContextType | null>(null);
const CART_KEY = '@griper_cart';
const ORDERS_KEY = '@griper_orders';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [coupon, setCoupon] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const cartData = await AsyncStorage.getItem(CART_KEY);
        if (cartData) setItems(JSON.parse(cartData) as CartItem[]);
        const ordersData = await AsyncStorage.getItem(ORDERS_KEY);
        if (ordersData) setOrders(JSON.parse(ordersData) as Order[]);
      } catch {}
    };
    load();
  }, []);

  const saveCart = async (newItems: CartItem[]) => {
    await AsyncStorage.setItem(CART_KEY, JSON.stringify(newItems));
  };

  const saveOrders = async (newOrders: Order[]) => {
    await AsyncStorage.setItem(ORDERS_KEY, JSON.stringify(newOrders));
  };

  const addItem = useCallback((product: Product) => {
    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      const updated = existing
        ? prev.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i)
        : [...prev, { product, quantity: 1 }];
      saveCart(updated);
      return updated;
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems(prev => {
      const updated = prev.filter(i => i.product.id !== productId);
      saveCart(updated);
      return updated;
    });
  }, []);

  const updateQuantity = useCallback((productId: string, qty: number) => {
    if (qty <= 0) { removeItem(productId); return; }
    setItems(prev => {
      const updated = prev.map(i => i.product.id === productId ? { ...i, quantity: qty } : i);
      saveCart(updated);
      return updated;
    });
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setItems([]);
    setCoupon('');
    setCouponDiscount(0);
    AsyncStorage.removeItem(CART_KEY);
  }, []);

  const applyCoupon = useCallback((code: string): 'valid' | 'invalid' | 'already' => {
    if (coupon) return 'already';
    const pct = COUPONS[code.toUpperCase()];
    if (!pct) return 'invalid';
    setCoupon(code.toUpperCase());
    setCouponDiscount(pct);
    return 'valid';
  }, [coupon]);

  const removeCoupon = useCallback(() => {
    setCoupon('');
    setCouponDiscount(0);
  }, []);

  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const deliveryFee = subtotal >= 499 ? 0 : 40;
  const discountAmount = Math.round(subtotal * couponDiscount / 100);
  const total = subtotal + deliveryFee - discountAmount;
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  const placeOrder = useCallback((paymentMethod: Order['paymentMethod'], address: Order['address']): Order => {
    const now = new Date();
    const estimated = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
    const order: Order = {
      id: 'ORD' + Date.now().toString().slice(-8),
      items: items.map(i => ({
        productId: i.product.id,
        name: i.product.name,
        price: i.product.price,
        quantity: i.quantity,
        gradient: i.product.gradient,
      })),
      total,
      status: paymentMethod === 'cod' ? 'confirmed' : 'confirmed',
      date: now.toISOString(),
      estimatedDelivery: estimated.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      paymentMethod,
      address,
    };
    setOrders(prev => {
      const updated = [order, ...prev];
      saveOrders(updated);
      return updated;
    });
    clearCart();
    return order;
  }, [items, total, clearCart]);

  return (
    <CartContext.Provider value={{
      items, addItem, removeItem, updateQuantity, clearCart,
      coupon, couponDiscount, applyCoupon, removeCoupon,
      subtotal, deliveryFee, discountAmount, total, itemCount,
      orders, placeOrder,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
