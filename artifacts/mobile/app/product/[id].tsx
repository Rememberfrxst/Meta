import React, { useState } from 'react';
import { Alert, Dimensions, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useColors } from '@/hooks/useColors';
import { PRODUCTS, formatPrice } from '@/constants/data';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import RatingStars from '@/components/RatingStars';

const { width: SCREEN_W } = Dimensions.get('window');
const HERO_HEIGHT = SCREEN_W * 0.95;
const SHEET_RADIUS = 28;

const MOCK_REVIEWS = [
  { id: '1', user: 'Priya S.', rating: 5, date: '2 Jun 2025', text: 'Excellent product! Very happy with the quality and packaging.' },
  { id: '2', user: 'Rahul K.', rating: 4, date: '15 May 2025', text: 'Good value for money. Fast delivery. Would recommend.' },
  { id: '3', user: 'Ananya M.', rating: 5, date: '3 Apr 2025', text: 'Amazing! Will definitely buy again. Great seller.' },
  { id: '4', user: 'Vikram P.', rating: 3, date: '22 Mar 2025', text: 'Decent product but packaging could be improved.' },
];

type TabKey = 'description' | 'specs' | 'reviews';

export default function ProductDetailScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { addItem, items } = useCart();
  const { toggle, isInWishlist } = useWishlist();
  const isWeb = Platform.OS === 'web';
  const [activeTab, setActiveTab] = useState<TabKey>('description');
  const [qty, setQty] = useState(1);

  const product = PRODUCTS.find(p => p.id === id);

  if (!product) {
    return (
      <View style={[styles.notFound, { backgroundColor: colors.background }]}>
        <Ionicons name="cube-outline" size={56} color={colors.mutedForeground} />
        <Text style={[styles.notFoundText, { color: colors.foreground }]}>Product not found</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.backLink, { color: colors.primary }]}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const isWishlisted = isInWishlist(product.id);
  const inCart = items.find(i => i.product.id === product.id);
  const specs = [
    { key: 'Category', value: product.category.charAt(0).toUpperCase() + product.category.slice(1) },
    { key: 'Sold by', value: product.seller },
    { key: 'Rating', value: `${product.rating} / 5 (${product.reviewCount.toLocaleString()} reviews)` },
    { key: 'Discount', value: `${product.discount}% off` },
    { key: 'Express Delivery', value: product.isExpress ? 'Available' : 'Standard Only' },
    { key: 'In Stock', value: product.inStock ? 'Yes' : 'Out of Stock' },
  ];

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addItem(product);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert('Added to Cart', `${product.name} x${qty} added.`, [
      { text: 'View Cart', onPress: () => router.push('/cart') },
      { text: 'Continue', style: 'cancel' },
    ]);
  };

  const handleBuyNow = () => {
    for (let i = 0; i < qty; i++) addItem(product);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    router.push('/checkout');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} bounces>

        {/* ── Hero image ── */}
        <View style={{ height: HERO_HEIGHT }}>
          <LinearGradient
            colors={product.gradient as string[]}
            style={StyleSheet.absoluteFill}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />

          {/* Floating action buttons top-right */}
          <View style={styles.heroActions}>
            <TouchableOpacity
              style={[styles.heroBtn, { backgroundColor: 'rgba(0,0,0,0.32)' }]}
              onPress={() => { toggle(product); Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }}
            >
              <Ionicons name={isWishlisted ? 'heart' : 'heart-outline'} size={21} color={isWishlisted ? '#FF4D6D' : '#fff'} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.heroBtn, { backgroundColor: 'rgba(0,0,0,0.32)' }]}>
              <Ionicons name="share-outline" size={21} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Center product icon placeholder */}
          <View style={styles.heroCenter}>
            <Ionicons name="cube-outline" size={80} color="rgba(255,255,255,0.25)" />
          </View>

          {/* Discount badge bottom-left */}
          {product.discount >= 10 && (
            <View style={[styles.heroBadge, { backgroundColor: colors.primary }]}>
              <Text style={[styles.heroBadgeText, { color: '#fff' }]}>{product.discount}% OFF</Text>
            </View>
          )}

          {/* Express badge bottom-right */}
          {product.isExpress && (
            <View style={[styles.heroExpress, { backgroundColor: colors.accent }]}>
              <Ionicons name="flash" size={12} color="#fff" />
              <Text style={styles.heroExpressText}>EXPRESS</Text>
            </View>
          )}
        </View>

        {/* ── Bottom sheet — overlaps image with rounded top ── */}
        <View style={[
          styles.sheet,
          {
            backgroundColor: colors.card,
            borderTopLeftRadius: SHEET_RADIUS,
            borderTopRightRadius: SHEET_RADIUS,
            marginTop: -SHEET_RADIUS,
          },
        ]}>
          {/* Pull handle */}
          <View style={styles.sheetHandle}>
            <View style={[styles.handleBar, { backgroundColor: colors.border }]} />
          </View>

          {/* Category + name */}
          <View style={styles.sheetPad}>
            <Text style={[styles.category, { color: colors.primary }]}>
              {product.category.toUpperCase()}
            </Text>
            <Text style={[styles.productName, { color: colors.foreground }]}>
              {product.name}
            </Text>
            <Text style={[styles.sellerText, { color: colors.mutedForeground }]}>
              Sold by{' '}
              <Text style={{ color: colors.primary, fontFamily: 'Inter_600SemiBold' }}>
                {product.seller}
              </Text>
            </Text>

            {/* Rating row */}
            <TouchableOpacity style={styles.ratingRow} onPress={() => setActiveTab('reviews')}>
              <RatingStars rating={product.rating} size={15} />
              <Text style={[styles.ratingNum, { color: colors.foreground }]}>{product.rating}</Text>
              <Text style={[styles.reviewCount, { color: colors.mutedForeground }]}>
                ({product.reviewCount.toLocaleString()})
              </Text>
              <Ionicons name="chevron-forward" size={14} color={colors.mutedForeground} />
            </TouchableOpacity>
          </View>

          {/* Price section — tinted strip */}
          <View style={[styles.priceStrip, { backgroundColor: colors.primary + '0C' }]}>
            <View style={styles.priceRow}>
              <Text style={[styles.price, { color: colors.foreground }]}>
                {formatPrice(product.price * qty)}
              </Text>
              <Text style={[styles.originalPrice, { color: colors.mutedForeground }]}>
                {formatPrice(product.originalPrice * qty)}
              </Text>
              <View style={[styles.discountPill, { backgroundColor: colors.success + '22' }]}>
                <Text style={[styles.discountPillText, { color: colors.success }]}>
                  {product.discount}% off
                </Text>
              </View>
            </View>
            <Text style={[styles.savingText, { color: colors.success }]}>
              You save {formatPrice((product.originalPrice - product.price) * qty)} 🎉
            </Text>
          </View>

          {/* Delivery / stock banners */}
          <View style={styles.sheetPad}>
            {product.isExpress && (
              <View style={[styles.infoBanner, { backgroundColor: colors.accent + '14', borderColor: colors.accent + '50' }]}>
                <Ionicons name="flash" size={15} color={colors.accent} />
                <Text style={[styles.infoBannerText, { color: colors.accent }]}>Express Delivery Available</Text>
              </View>
            )}
            {!product.inStock && (
              <View style={[styles.infoBanner, { backgroundColor: colors.destructive + '14', borderColor: colors.destructive + '50' }]}>
                <Ionicons name="close-circle" size={15} color={colors.destructive} />
                <Text style={[styles.infoBannerText, { color: colors.destructive }]}>Out of Stock</Text>
              </View>
            )}

            {/* Quantity picker */}
            <View style={styles.qtyRow}>
              <Text style={[styles.qtyLabel, { color: colors.foreground }]}>Quantity</Text>
              <View style={styles.qtyControls}>
                <TouchableOpacity
                  style={[styles.qtyBtn, { backgroundColor: colors.muted, borderColor: colors.border }]}
                  onPress={() => setQty(q => Math.max(1, q - 1))}
                >
                  <Ionicons name="remove" size={17} color={colors.foreground} />
                </TouchableOpacity>
                <Text style={[styles.qtyNum, { color: colors.foreground }]}>{qty}</Text>
                <TouchableOpacity
                  style={[styles.qtyBtn, { backgroundColor: colors.muted, borderColor: colors.border }]}
                  onPress={() => setQty(q => Math.min(10, q + 1))}
                >
                  <Ionicons name="add" size={17} color={colors.foreground} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Tabs */}
          <View style={[styles.tabBar, { borderBottomColor: colors.border, borderTopColor: colors.border }]}>
            {(['description', 'specs', 'reviews'] as TabKey[]).map(tab => (
              <TouchableOpacity
                key={tab}
                style={[styles.tabBtn, activeTab === tab && { borderBottomColor: colors.primary, borderBottomWidth: 2.5 }]}
                onPress={() => setActiveTab(tab)}
              >
                <Text style={[styles.tabText, { color: activeTab === tab ? colors.primary : colors.mutedForeground }]}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Tab content */}
          <View style={styles.tabContent}>
            {activeTab === 'description' && (
              <Text style={[styles.description, { color: colors.foreground }]}>{product.description}</Text>
            )}

            {activeTab === 'specs' && (
              <View>
                {specs.map((spec, i) => (
                  <View key={i} style={[styles.specRow, { borderBottomColor: colors.border, backgroundColor: i % 2 === 0 ? 'transparent' : colors.muted + '60' }]}>
                    <Text style={[styles.specKey, { color: colors.mutedForeground }]}>{spec.key}</Text>
                    <Text style={[styles.specVal, { color: colors.foreground }]}>{spec.value}</Text>
                  </View>
                ))}
              </View>
            )}

            {activeTab === 'reviews' && (
              <View style={styles.reviewsList}>
                <View style={[styles.ratingSummary, { backgroundColor: colors.muted }]}>
                  <Text style={[styles.ratingBig, { color: colors.foreground }]}>{product.rating}</Text>
                  <RatingStars rating={product.rating} size={22} />
                  <Text style={[styles.ratingTotal, { color: colors.mutedForeground }]}>
                    {product.reviewCount.toLocaleString()} ratings
                  </Text>
                </View>
                {MOCK_REVIEWS.map(review => (
                  <View key={review.id} style={[styles.reviewCard, { borderBottomColor: colors.border }]}>
                    <View style={styles.reviewHeader}>
                      <View style={[styles.reviewAvatar, { backgroundColor: colors.primary }]}>
                        <Text style={styles.reviewAvatarText}>{review.user.charAt(0)}</Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={[styles.reviewUser, { color: colors.foreground }]}>{review.user}</Text>
                        <Text style={[styles.reviewDate, { color: colors.mutedForeground }]}>{review.date}</Text>
                      </View>
                      <RatingStars rating={review.rating} size={12} />
                    </View>
                    <Text style={[styles.reviewText, { color: colors.foreground }]}>{review.text}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>

        <View style={{ height: isWeb ? 100 : 120 }} />
      </ScrollView>

      {/* ── Sticky footer ── */}
      {product.inStock && (
        <View style={[
          styles.footer,
          {
            backgroundColor: colors.card,
            borderTopColor: colors.border,
            borderTopWidth: 1,
            paddingBottom: isWeb ? 16 : insets.bottom + 10,
          },
        ]}>
          <TouchableOpacity
            style={[styles.cartBtn, { backgroundColor: colors.muted, borderColor: colors.primary }]}
            onPress={handleAddToCart}
          >
            <Ionicons name="bag-add-outline" size={19} color={colors.primary} />
            <Text style={[styles.cartBtnText, { color: colors.primary }]}>
              {inCart ? 'Add More' : 'Add to Cart'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buyBtn, { backgroundColor: colors.primary }]}
            onPress={handleBuyNow}
          >
            <Ionicons name="flash" size={19} color="#fff" />
            <Text style={[styles.buyBtnText, { color: '#fff' }]}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  notFound: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 14 },
  notFoundText: { fontSize: 18, fontFamily: 'Inter_500Medium' },
  backLink: { fontSize: 15, fontFamily: 'Inter_600SemiBold' },

  /* Hero */
  heroActions: { position: 'absolute', top: 14, right: 14, gap: 10 },
  heroBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  heroCenter: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  heroBadge: { position: 'absolute', bottom: SHEET_RADIUS + 10, left: 14, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  heroBadgeText: { fontSize: 13, fontFamily: 'Inter_700Bold' },
  heroExpress: { position: 'absolute', bottom: SHEET_RADIUS + 10, right: 14, flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  heroExpressText: { fontSize: 10, fontFamily: 'Inter_700Bold', color: '#fff' },

  /* Bottom sheet */
  sheet: {
    overflow: 'hidden',
    // shadow to lift the sheet above image
    shadowColor: '#000',
    shadowOpacity: 0.14,
    shadowOffset: { width: 0, height: -4 },
    shadowRadius: 12,
    elevation: 8,
  },
  sheetHandle: { alignItems: 'center', paddingTop: 10, paddingBottom: 4 },
  handleBar: { width: 40, height: 4, borderRadius: 2 },
  sheetPad: { paddingHorizontal: 20, paddingTop: 6, paddingBottom: 12, gap: 8 },

  /* Product info */
  category: { fontSize: 11, fontFamily: 'Inter_700Bold', letterSpacing: 1.4 },
  productName: { fontSize: 20, fontFamily: 'Inter_700Bold', lineHeight: 28 },
  sellerText: { fontSize: 13, fontFamily: 'Inter_400Regular' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2 },
  ratingNum: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
  reviewCount: { fontSize: 12, fontFamily: 'Inter_400Regular' },

  /* Price strip */
  priceStrip: { paddingHorizontal: 20, paddingVertical: 14, gap: 4 },
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: 10, flexWrap: 'wrap' },
  price: { fontSize: 26, fontFamily: 'Inter_700Bold' },
  originalPrice: { fontSize: 16, fontFamily: 'Inter_400Regular', textDecorationLine: 'line-through' },
  discountPill: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  discountPillText: { fontSize: 12, fontFamily: 'Inter_700Bold' },
  savingText: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },

  /* Banners */
  infoBanner: { flexDirection: 'row', alignItems: 'center', gap: 7, padding: 10, borderRadius: 10, borderWidth: 1 },
  infoBannerText: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },

  /* Qty */
  qtyRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  qtyLabel: { fontSize: 15, fontFamily: 'Inter_600SemiBold' },
  qtyControls: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  qtyBtn: { width: 36, height: 36, borderRadius: 10, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  qtyNum: { fontSize: 18, fontFamily: 'Inter_700Bold', minWidth: 28, textAlign: 'center' },

  /* Tabs */
  tabBar: { flexDirection: 'row', borderBottomWidth: 1, borderTopWidth: 1 },
  tabBtn: { flex: 1, paddingVertical: 14, alignItems: 'center', borderBottomWidth: 0 },
  tabText: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
  tabContent: { padding: 20 },

  /* Description */
  description: { fontSize: 15, fontFamily: 'Inter_400Regular', lineHeight: 25 },

  /* Specs */
  specRow: { flexDirection: 'row', paddingVertical: 12, paddingHorizontal: 4, borderBottomWidth: 1 },
  specKey: { flex: 1.1, fontSize: 13, fontFamily: 'Inter_400Regular' },
  specVal: { flex: 1.5, fontSize: 13, fontFamily: 'Inter_600SemiBold', textAlign: 'right' },

  /* Reviews */
  reviewsList: { gap: 16 },
  ratingSummary: { borderRadius: 14, padding: 20, alignItems: 'center', gap: 8 },
  ratingBig: { fontSize: 52, fontFamily: 'Inter_700Bold' },
  ratingTotal: { fontSize: 12, fontFamily: 'Inter_400Regular' },
  reviewCard: { paddingBottom: 16, borderBottomWidth: 1, gap: 10 },
  reviewHeader: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  reviewAvatar: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center' },
  reviewAvatarText: { fontSize: 16, fontFamily: 'Inter_700Bold', color: '#fff' },
  reviewUser: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
  reviewDate: { fontSize: 12, fontFamily: 'Inter_400Regular', marginTop: 1 },
  reviewText: { fontSize: 14, fontFamily: 'Inter_400Regular', lineHeight: 21 },

  /* Footer */
  footer: { flexDirection: 'row', paddingHorizontal: 16, paddingTop: 12, gap: 12 },
  cartBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 15, borderRadius: 14, borderWidth: 1.5 },
  cartBtnText: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
  buyBtn: { flex: 1.3, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 15, borderRadius: 14 },
  buyBtnText: { fontSize: 15, fontFamily: 'Inter_700Bold' },
});
