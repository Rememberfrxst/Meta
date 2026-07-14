import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';
import { Product, formatPrice } from '@/constants/data';
import RatingStars from './RatingStars';

interface Props {
  product: Product;
  onPress: () => void;
  isWishlisted?: boolean;
  onWishlistToggle?: () => void;
  style?: object;
}

export default function ProductCard({ product, onPress, isWishlisted = false, onWishlistToggle, style }: Props) {
  const colors = useColors();

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card, borderRadius: 16 }, style]}
      onPress={onPress}
      activeOpacity={0.92}
    >
      <LinearGradient
        colors={product.gradient as string[]}
        style={styles.image}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.imageTop}>
          {product.discount >= 20 && (
            <View style={[styles.discountBadge, { backgroundColor: colors.primary }]}>
              <Text style={[styles.discountText, { color: colors.primaryForeground }]}>
                {product.discount}% OFF
              </Text>
            </View>
          )}
          {onWishlistToggle && (
            <TouchableOpacity
              style={[styles.wishBtn, { backgroundColor: 'rgba(0,0,0,0.28)' }]}
              onPress={onWishlistToggle}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons
                name={isWishlisted ? 'heart' : 'heart-outline'}
                size={16}
                color={isWishlisted ? '#FF4D6D' : '#fff'}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Center product icon hint */}
        <View style={styles.centerHint}>
          <Ionicons name="cube-outline" size={36} color="rgba(255,255,255,0.35)" />
        </View>

        {product.isExpress && (
          <View style={[styles.expressBadge, { backgroundColor: colors.accent }]}>
            <Text style={styles.expressText}>EXPRESS</Text>
          </View>
        )}
      </LinearGradient>
      <View style={styles.info}>
        <Text style={[styles.name, { color: colors.foreground }]} numberOfLines={2}>
          {product.name}
        </Text>
        <View style={styles.ratingRow}>
          <RatingStars rating={product.rating} size={10} />
          <Text style={[styles.reviewCount, { color: colors.mutedForeground }]}>
            ({product.reviewCount.toLocaleString()})
          </Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={[styles.price, { color: colors.foreground }]}>
            {formatPrice(product.price)}
          </Text>
          <Text style={[styles.originalPrice, { color: colors.mutedForeground }]}>
            {formatPrice(product.originalPrice)}
          </Text>
        </View>
        {product.discount > 0 && (
          <Text style={[styles.saving, { color: colors.primary }]}>
            Save {formatPrice(product.originalPrice - product.price)}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
  },
  // Increased height: aspectRatio 0.78 means image is taller than wide
  image: {
    width: '100%',
    aspectRatio: 0.78,
    justifyContent: 'space-between',
    padding: 10,
  },
  imageTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  discountBadge: { paddingHorizontal: 7, paddingVertical: 3, borderRadius: 6 },
  discountText: { fontSize: 9, fontFamily: 'Inter_700Bold', letterSpacing: 0.3 },
  wishBtn: { width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  centerHint: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' },
  expressBadge: { alignSelf: 'flex-start', paddingHorizontal: 7, paddingVertical: 3, borderRadius: 5 },
  expressText: { fontSize: 8, fontFamily: 'Inter_700Bold', color: '#fff', letterSpacing: 0.8 },
  info: { padding: 12, gap: 5 },
  name: { fontSize: 13, fontFamily: 'Inter_500Medium', lineHeight: 18 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  reviewCount: { fontSize: 10, fontFamily: 'Inter_400Regular' },
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2 },
  price: { fontSize: 15, fontFamily: 'Inter_700Bold' },
  originalPrice: {
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
    textDecorationLine: 'line-through',
  },
  saving: { fontSize: 11, fontFamily: 'Inter_600SemiBold' },
});
