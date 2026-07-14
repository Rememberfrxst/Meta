import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';
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

/* FA-style heart — filled or outline */
function HeartBtn({ isWishlisted, onPress }: { isWishlisted: boolean; onPress: () => void }) {
  return (
    <TouchableOpacity
      style={styles.wishBtn}
      onPress={onPress}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
    >
      <Svg width={16} height={16} viewBox="0 0 640 640">
        {isWishlisted ? (
          <Path
            fill="#FF4D6D"
            d="M335 151.1C360 116.5 400.2 96 442.9 96C516.4 96 576 155.6 576 229.1L576 231.7C576 343.9 436.1 474.2 363.1 529.9C350.7 539.3 335.5 544 320 544C304.5 544 289.2 539.4 276.9 529.9C203.9 474.2 64 343.9 64 231.7L64 229.1C64 155.6 123.6 96 197.1 96C239.8 96 280 116.5 305 151.1L320 171.8L335 151.1z"
          />
        ) : (
          <Path
            fill="rgba(255,255,255,0.9)"
            d="M442.9 144C415.6 144 389.9 157.1 373.9 179.2L339.5 226.8C335 233 327.8 236.7 320.1 236.7C312.4 236.7 305.2 233 300.7 226.8L266.3 179.2C250.3 157.1 224.6 144 197.3 144C150.3 144 112.2 182.1 112.2 229.1C112.2 279 144.2 327.5 180.3 371.4C221.4 421.4 271.7 465.4 306.2 491.7C309.4 494.1 314.1 495.9 320.2 495.9C326.3 495.9 331 494.1 334.2 491.7C368.7 465.4 419 421.3 460.1 371.4C496.3 327.5 528.2 279 528.2 229.1C528.2 182.1 490.1 144 443.1 144zM335 151.1C360 116.5 400.2 96 442.9 96C516.4 96 576 155.6 576 229.1L576 231.7C576 343.9 436.1 474.2 363.1 529.9C350.7 539.3 335.5 544 320 544C304.5 544 289.2 539.4 276.9 529.9C203.9 474.2 64 343.9 64 231.7L64 229.1C64 155.6 123.6 96 197.1 96C239.8 96 280 116.5 305 151.1L320 171.8L335 151.1z"
          />
        )}
      </Svg>
    </TouchableOpacity>
  );
}

export default function ProductCard({ product, onPress, isWishlisted = false, onWishlistToggle, style }: Props) {
  const colors = useColors();

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card }, style]}
      onPress={onPress}
      activeOpacity={0.92}
    >
      {/* Image area */}
      <LinearGradient
        colors={product.gradient as string[]}
        style={styles.image}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Discount badge — top left */}
        {product.discount >= 20 && (
          <View style={[styles.discountBadge, { backgroundColor: colors.primary }]}>
            <Text style={[styles.discountText, { color: colors.primaryForeground }]}>
              {product.discount}% OFF
            </Text>
          </View>
        )}

        {/* Express badge — top right */}
        {product.isExpress && (
          <View style={[styles.expressBadge, { backgroundColor: colors.accent }]}>
            <Text style={styles.expressText}>EXPRESS</Text>
          </View>
        )}
      </LinearGradient>

      {/* Info section */}
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

        {/* Price row — price left, heart right */}
        <View style={styles.bottomRow}>
          <View style={styles.priceCol}>
            <Text style={[styles.price, { color: colors.foreground }]}>
              {formatPrice(product.price)}
            </Text>
            <Text style={[styles.originalPrice, { color: colors.mutedForeground }]}>
              {formatPrice(product.originalPrice)}
            </Text>
          </View>

          {onWishlistToggle && (
            <View style={[styles.wishBtnWrap, { backgroundColor: isWishlisted ? '#FF4D6D18' : colors.muted }]}>
              <HeartBtn isWishlisted={isWishlisted} onPress={onWishlistToggle} />
            </View>
          )}
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
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  image: {
    width: '100%',
    aspectRatio: 0.9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 10,
  },
  discountBadge: {
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  discountText: { fontSize: 9, fontFamily: 'GoogleSans_700Bold', letterSpacing: 0.3 },
  expressBadge: {
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  expressText: { fontSize: 8, fontFamily: 'GoogleSans_700Bold', color: '#fff', letterSpacing: 0.8 },

  info: { padding: 12, gap: 5 },
  name: { fontSize: 13, fontFamily: 'GoogleSans_500Medium', lineHeight: 18 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  reviewCount: { fontSize: 10, fontFamily: 'GoogleSans_400Regular' },

  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  priceCol: { flex: 1, gap: 1 },
  price: { fontSize: 15, fontFamily: 'GoogleSans_700Bold' },
  originalPrice: {
    fontSize: 11,
    fontFamily: 'GoogleSans_400Regular',
    textDecorationLine: 'line-through',
  },

  wishBtnWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wishBtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  saving: { fontSize: 11, fontFamily: 'GoogleSans_600SemiBold' },
});
