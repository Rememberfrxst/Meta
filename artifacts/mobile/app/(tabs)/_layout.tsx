import React, { useEffect, useRef } from 'react';
import { Animated, Platform, StyleSheet, View } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { BlurView } from 'expo-blur';
import { isLiquidGlassAvailable } from 'expo-glass-effect';
import { Tabs } from 'expo-router';
import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs';
import { useCart } from '@/context/CartContext';
import { useTheme } from '@/context/ThemeContext';
import SvgIcon from '@/components/SvgIcon';
import {
  HomeIconFilled,
  HomeIconOutline,
  ProfileIconFilled,
  CartIconNew,
  OrdersIconNew,
} from '@/components/TabIcons';

/* Animated Me icon — always shows the filled icon, springs on focus */
function AnimatedMeIcon({ focused, color, size }: { focused: boolean; color: string; size: number }) {
  const scale = useRef(new Animated.Value(focused ? 1.12 : 1)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: focused ? 1.15 : 1,
      useNativeDriver: true,
      friction: 5,
      tension: 120,
    }).start();
  }, [focused, scale]);

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <ProfileIconFilled color={color} size={size} />
    </Animated.View>
  );
}

// NativeTabs + SF Symbols are iOS-only — never render on Android/web
// to avoid Japanese-character fallbacks from SF Symbol rendering.
function NativeTabLayout() {
  const { itemCount } = useCart();
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <Icon sf={{ default: 'house', selected: 'house.fill' }} />
        <Label>Home</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="search" role="search">
        <Icon sf={{ default: 'magnifyingglass', selected: 'magnifyingglass' }} />
        <Label>Search</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="cart">
        <Icon sf={{ default: 'bag', selected: 'bag.fill' }} />
        <Label>Cart{itemCount > 0 ? ` (${itemCount})` : ''}</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="orders">
        <Icon sf={{ default: 'list.clipboard', selected: 'list.clipboard.fill' }} />
        <Label>Orders</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="profile">
        <Icon sf={{ default: 'person.circle', selected: 'person.circle.fill' }} />
        <Label>Me</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}

function ClassicTabLayout() {
  const colors = useColors();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const isIOS = Platform.OS === 'ios';
  const isWeb = Platform.OS === 'web';
  const { itemCount } = useCart();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.mutedForeground,
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: isIOS ? 'transparent' : colors.card,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          elevation: 0,
          ...(isWeb ? { height: 84 } : {}),
        },
        tabBarBackground: () =>
          isIOS ? (
            <BlurView
              intensity={100}
              tint={isDark ? 'dark' : 'light'}
              style={StyleSheet.absoluteFill}
            />
          ) : (
            <View style={[StyleSheet.absoluteFill, { backgroundColor: colors.card }]} />
          ),
        tabBarLabelStyle: { fontFamily: 'GoogleSans_500Medium', fontSize: 11 },
      }}
    >
      {/* HOME — custom FA SVG icons (filled when active, outline when inactive) */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) =>
            focused
              ? <HomeIconFilled color={color} size={24} />
              : <HomeIconOutline color={color} size={24} />,
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, focused, size }) => (
            <SvgIcon name={focused ? 'search' : 'search-outline'} size={size ?? 23} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarBadge: itemCount > 0 ? itemCount : undefined,
          tabBarBadgeStyle: {
            backgroundColor: colors.primary,
            fontFamily: 'GoogleSans_700Bold',
            fontSize: 10,
          },
          tabBarIcon: ({ color, size }) =>
            <CartIconNew color={color} size={size ?? 23} />,
        }}
      />

      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          tabBarIcon: ({ color, size }) =>
            <OrdersIconNew color={color} size={size ?? 23} />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Me',
          tabBarIcon: ({ color, focused, size }) => (
            <AnimatedMeIcon focused={focused} color={color} size={size ?? 23} />
          ),
        }}
      />
    </Tabs>
  );
}

export default function TabLayout() {
  // Only use NativeTabs + SF Symbols on iOS — they render Japanese glyphs on Android
  if (Platform.OS === 'ios' && isLiquidGlassAvailable()) {
    return <NativeTabLayout />;
  }
  return <ClassicTabLayout />;
}
