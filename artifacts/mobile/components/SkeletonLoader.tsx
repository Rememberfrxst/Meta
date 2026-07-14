import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { useColors } from '@/hooks/useColors';

interface SkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: object;
}

export default function SkeletonLoader({ width = '100%', height = 16, borderRadius = 8, style }: SkeletonProps) {
  const colors = useColors();
  const anim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(anim, { toValue: 0.9, duration: 800, useNativeDriver: true }),
        Animated.timing(anim, { toValue: 0.4, duration: 800, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [anim]);

  return (
    <Animated.View
      style={[{ width: width as any, height, borderRadius, backgroundColor: colors.muted, opacity: anim }, style]}
    />
  );
}

export function ProductCardSkeleton() {
  const colors = useColors();
  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderRadius: 14 }]}>
      <SkeletonLoader height={150} borderRadius={0} />
      <View style={{ padding: 10, gap: 6 }}>
        <SkeletonLoader height={13} />
        <SkeletonLoader width="70%" height={11} />
        <SkeletonLoader width="45%" height={14} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({ card: { overflow: 'hidden' } });
