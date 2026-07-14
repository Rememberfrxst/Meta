import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';

export default function RatingStars({ rating, size = 14 }: { rating: number; size?: number }) {
  const colors = useColors();
  return (
    <View style={styles.row}>
      {[1, 2, 3, 4, 5].map(i => (
        <Ionicons
          key={i}
          name={i <= rating ? 'star' : i - 0.5 <= rating ? 'star-half' : 'star-outline'}
          size={size}
          color={colors.star}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({ row: { flexDirection: 'row', gap: 1 } });
