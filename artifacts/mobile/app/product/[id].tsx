import React, { useState } from 'react';
import { Alert, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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

const MOCK_REVIEWS = [
  { id: '1', user: 'Priya S.', rating: 5, date: '2 Jun 2025', text: 'Excellent product! Very happy with the quality and packaging.' },
  { id: '2', user: 'Rahul K.', rating: 4, date: '15 May 2025', text: 'Good value for money. Fast delivery. Would recommend.' },
  { id: '3', user: 'Ananya M.', rating: 5, date: '3 Apr 2025', text: 'Amazing! Will definitely buy again. Great seller.' },
  { id: '4', user: 'Vikram P.', rating: 3, date: '22 Mar 2025', text: 'Decent product but packaging could be improved.' },
];

type Tab = 'description' | 'specs' | 'reviews';

export default function ProductDetailScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { addItem, items } = useCart();
  const { toggle, isInWishlist } = useWishlist();
  const isWeb = Platform.OS === 'web';
  const [activeTab, setActiveTab] = useState<Tab>('description');
  const [qty, setQty] = useState(1);

  const product = PRODUCTS.find(p => p.id === id);

  if (!product) {
    return (
      <View style={[styles.notFound, { backgroundColor: colors.background }]}>
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
    Alert.alert('Added to Cart', `${product.name} x${qty} added to your cart.`, [
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
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <View style={styles.heroWrap}>
          <LinearGradient colors={product.gradient as string[]} style={styles.hero} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
            <View style={styles.heroActions}>
              <TouchableOpacity
                style={[styles.heroBtn, { backgroundColor: 'rgba(0,0,0,0.3)' }]}
                onPress={() => { toggle(product); Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }}
              >
                <Ionicons name={isWishlisted ? 'heart' : 'heart-outline'} size={22} color={isWishlisted ? '#FF4D6D' : '#fff'} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.heroBtn, { backgroundColor: 'rgba(0,0,0,0.3)' }]}>
                <Ionicons name="share-outline" size={22} color="#fff" />
              </TouchableOpacity>
            </View>
          </LinearGradient>
          {product.discount >= 20 && (
            <View style={[styles.heroBadge, { backgroundColor: colors.primary }]}>
              <Text style={[styles.heroBadgeText, { color: colors.primaryForeground }]}>{product.discount}% OFF</Text>
            </View>
          )}
        </View>

        {/* Product Info */}
        <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.category, { color: colors.mutedForeground }]}>{product.category.toUpperCase()}</Text>
          <Text style={[styles.productName, { color: colors.foreground }]}>{product.name}</Text>
          <Text style={[styles.sellerText, { color: colors.mutedForeground }]}>Sold by <Text style={{ color: colors.primary, fontFamily: 'Inter_600SemiBold' }}>{product.seller}</Text></Text>

          <View style={styles.ratingRow}>
            <RatingStars rating={product.rating} size={16} />
            <Text style={[styles.ratingNum, { color: colors.foreground }]}>{product.rating}</Text>
            <Text style={[styles.reviewCount, { color: colors.mutedForeground }]}>({product.reviewCount.toLocaleString()} reviews)</Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={[styles.price, { color: colors.foreground }]}>{formatPrice(product.price * qty)}</Text>
            <Text style={[styles.originalPrice, { color: colors.mutedForeground }]}>{formatPrice(product.originalPrice * qty)}</Text>
            <View style={[styles.discountBadge, { backgroundColor: colors.success + '22' }]}>
              <Text style={[styles.discountText, { color: colors.success }]}>{product.discount}% off</Text>
            </View>
          </View>

          {product.isExpress && (
            <View style={[styles.expressBanner, { backgroundColor: colors.accent + '18', borderColor: colors.accent }]}>
              <Ionicons name="flash" size={16} color={colors.accent} />
              <Text style={[styles.expressText, { color: colors.accent }]}>Express Delivery Available</Text>
            </View>
          )}

          {!product.inStock && (
            <View style={[styles.outOfStock, { backgroundColor: colors.destructive + '18' }]}>
              <Text style={[styles.outOfStockText, { color: colors.destructive }]}>Out of Stock</Text>
            </View>
          )}

          {/* Quantity */}
          <View style={styles.qtyWrap}>
            <Text style={[styles.qtyLabel, { color: colors.foreground }]}>Quantity:</Text>
            <View style={styles.qtyRow}>
              <TouchableOpacity style={[styles.qtyBtn, { backgroundColor: colors.muted }]} onPress={() => setQty(q => Math.max(1, q - 1))}>
                <Ionicons name="remove" size={16} color={colors.foreground} />
              </TouchableOpacity>
              <Text style={[styles.qtyNum, { color: colors.foreground }]}>{qty}</Text>
              <TouchableOpacity style={[styles.qtyBtn, { backgroundColor: colors.muted }]} onPress={() => setQty(q => Math.min(10, q + 1))}>
                <Ionicons name="add" size={16} color={colors.foreground} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Tabs */}
        <View style={[styles.tabsCard, { backgroundColor: colors.card, marginTop: 8 }]}>
          <View style={[styles.tabBar, { borderBottomColor: colors.border }]}>
            {(['description', 'specs', 'reviews'] as Tab[]).map(tab => (
              <TouchableOpacity
                key={tab}
                style={[styles.tabBtn, activeTab === tab && { borderBottomColor: colors.primary, borderBottomWidth: 2 }]}
                onPress={() => setActiveTab(tab)}
              >
                <Text style={[styles.tabText, { color: activeTab === tab ? colors.primary : colors.mutedForeground }]}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.tabContent}>
            {activeTab === 'description' && (
              <Text style={[styles.description, { color: colors.foreground }]}>{product.description}</Text>
            )}
            {activeTab === 'specs' && (
              <View style={styles.specsList}>
                {specs.map((spec, i) => (
                  <View key={i} style={[styles.specRow, { borderBottomColor: colors.border }]}>
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
                  <RatingStars rating={product.rating} size={20} />
                  <Text style={[styles.ratingTotal, { color: colors.mutedForeground }]}>{product.reviewCount.toLocaleString()} ratings</Text>
                </View>
                {MOCK_REVIEWS.map(review => (
                  <View key={review.id} style={[styles.reviewCard, { borderBottomColor: colors.border }]}>
                    <View style={styles.reviewHeader}>
                      <View style={[styles.reviewAvatar, { backgroundColor: colors.primary }]}>
                        <Text style={styles.reviewAvatarText}>{review.user.charAt(0)}</Text>
                      </View>
                      <View>
                        <Text style={[styles.reviewUser, { color: colors.foreground }]}>{review.user}</Text>
                        <Text style={[styles.reviewDate, { color: colors.mutedForeground }]}>{review.date}</Text>
                      </View>
                      <View style={styles.reviewRating}>
                        <RatingStars rating={review.rating} size={12} />
                      </View>
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

      {/* Sticky Footer */}
      {product.inStock && (
        <View style={[styles.footer, { backgroundColor: colors.card, borderTopColor: colors.border, borderTopWidth: 1, paddingBottom: isWeb ? 16 : insets.bottom + 12 }]}>
          <TouchableOpacity style={[styles.cartBtn, { backgroundColor: colors.secondary, borderColor: colors.primary }]} onPress={handleAddToCart}>
            <Ionicons name="bag-add-outline" size={18} color={colors.primary} />
            <Text style={[styles.cartBtnText, { color: colors.primary }]}>{inCart ? 'Add More' : 'Add to Cart'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buyBtn, { backgroundColor: colors.primary }]} onPress={handleBuyNow}>
            <Ionicons name="flash" size={18} color={colors.primaryForeground} />
            <Text style={[styles.buyBtnText, { color: colors.primaryForeground }]}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  notFound: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  notFoundText: { fontSize: 18, fontFamily: 'Inter_500Medium' },
  backLink: { fontSize: 15, fontFamily: 'Inter_600SemiBold' },
  heroWrap: { position: 'relative' },
  hero: { width: '100%', aspectRatio: 1.2 },
  heroActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 10, padding: 14 },
  heroBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  heroBadge: { position: 'absolute', bottom: 12, left: 12, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  heroBadgeText: { fontSize: 13, fontFamily: 'Inter_700Bold' },
  infoCard: { padding: 20, gap: 8 },
  category: { fontSize: 11, fontFamily: 'Inter_600SemiBold', letterSpacing: 1.2 },
  productName: { fontSize: 20, fontFamily: 'Inter_700Bold', lineHeight: 28 },
  sellerText: { fontSize: 13, fontFamily: 'Inter_400Regular' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  ratingNum: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
  reviewCount: { fontSize: 12, fontFamily: 'Inter_400Regular' },
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: 10, flexWrap: 'wrap' },
  price: { fontSize: 26, fontFamily: 'Inter_700Bold' },
  originalPrice: { fontSize: 16, fontFamily: 'Inter_400Regular', textDecorationLine: 'line-through' },
  discountBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  discountText: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
  expressBanner: { flexDirection: 'row', alignItems: 'center', gap: 6, padding: 10, borderRadius: 10, borderWidth: 1 },
  expressText: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
  outOfStock: { padding: 10, borderRadius: 10, alignItems: 'center' },
  outOfStockText: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
  qtyWrap: { flexDirection: 'row', alignItems: 'center', gap: 14, marginTop: 4 },
  qtyLabel: { fontSize: 15, fontFamily: 'Inter_500Medium' },
  qtyRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  qtyBtn: { width: 32, height: 32, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  qtyNum: { fontSize: 18, fontFamily: 'Inter_700Bold', minWidth: 24, textAlign: 'center' },
  tabsCard: { overflow: 'hidden' },
  tabBar: { flexDirection: 'row', borderBottomWidth: 1 },
  tabBtn: { flex: 1, paddingVertical: 14, alignItems: 'center' },
  tabText: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
  tabContent: { padding: 20 },
  description: { fontSize: 15, fontFamily: 'Inter_400Regular', lineHeight: 24 },
  specsList: { gap: 0 },
  specRow: { flexDirection: 'row', paddingVertical: 12, borderBottomWidth: 1 },
  specKey: { flex: 1, fontSize: 14, fontFamily: 'Inter_400Regular' },
  specVal: { flex: 1, fontSize: 14, fontFamily: 'Inter_500Medium', textAlign: 'right' },
  reviewsList: { gap: 16 },
  ratingSummary: { borderRadius: 12, padding: 16, alignItems: 'center', gap: 6 },
  ratingBig: { fontSize: 48, fontFamily: 'Inter_700Bold' },
  ratingTotal: { fontSize: 12, fontFamily: 'Inter_400Regular' },
  reviewCard: { paddingBottom: 16, borderBottomWidth: 1, gap: 8 },
  reviewHeader: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  reviewAvatar: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  reviewAvatarText: { fontSize: 16, fontFamily: 'Inter_700Bold', color: '#fff' },
  reviewUser: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
  reviewDate: { fontSize: 12, fontFamily: 'Inter_400Regular' },
  reviewRating: { marginLeft: 'auto' },
  reviewText: { fontSize: 14, fontFamily: 'Inter_400Regular', lineHeight: 20 },
  footer: { flexDirection: 'row', padding: 16, gap: 12 },
  cartBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 14, borderRadius: 12, borderWidth: 1.5 },
  cartBtnText: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
  buyBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 14, borderRadius: 12 },
  buyBtnText: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
});
