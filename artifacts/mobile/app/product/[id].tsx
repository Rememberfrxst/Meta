import React, { useState } from 'react';
import { Alert, Dimensions, NativeScrollEvent, NativeSyntheticEvent, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import SvgIcon from '@/components/SvgIcon';
import * as Haptics from 'expo-haptics';
import { useColors } from '@/hooks/useColors';
import { useTheme } from '@/context/ThemeContext';
import { PRODUCTS, formatPrice } from '@/constants/data';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import RatingStars from '@/components/RatingStars';

const { width: SCREEN_W } = Dimensions.get('window');
const HERO_HEIGHT = SCREEN_W * 0.95;
const SHEET_RADIUS = 28;

/* Demo image variants — same product art, different gradient angle + icon,
   so the hero behaves like a real multi-photo swipe gallery. */
const HERO_SLIDES = [
  { start: { x: 0, y: 0 }, end: { x: 1, y: 1 }, icon: 'cube-outline' as const },
  { start: { x: 1, y: 0 }, end: { x: 0, y: 1 }, icon: 'bag-outline' as const },
  { start: { x: 0, y: 1 }, end: { x: 1, y: 0 }, icon: 'sparkles-outline' as const },
  { start: { x: 0, y: 0.5 }, end: { x: 1, y: 0.5 }, icon: 'star-outline' as const },
];

/* Custom back-chevron glyph (exact path supplied by the user) */
function BackChevronIcon({ size, color }: { size: number; color: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 640 640">
      <Path
        fill={color}
        d="M201.4 297.4C188.9 309.9 188.9 330.2 201.4 342.7L361.4 502.7C373.9 515.2 394.2 515.2 406.7 502.7C419.2 490.2 419.2 469.9 406.7 457.4L269.3 320L406.6 182.6C419.1 170.1 419.1 149.8 406.6 137.3C394.1 124.8 373.8 124.8 361.3 137.3L201.3 297.3z"
      />
    </Svg>
  );
}

/* Custom heart glyph (exact path supplied by the user) */
function HeartIcon({ size, color }: { size: number; color: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 640 640">
      <Path
        fill={color}
        d="M305 151.1L320 171.8L335 151.1C360 116.5 400.2 96 442.9 96C516.4 96 576 155.6 576 229.1L576 231.7C576 343.9 436.1 474.2 363.1 529.9C350.7 539.3 335.5 544 320 544C304.5 544 289.2 539.4 276.9 529.9C203.9 474.2 64 343.9 64 231.7L64 229.1C64 155.6 123.6 96 197.1 96C239.8 96 280 116.5 305 151.1z"
      />
    </Svg>
  );
}

const MOCK_REVIEWS = [
  { id: '1', user: 'Priya S.', rating: 5, date: '2 Jun 2025', text: 'Excellent product! Very happy with the quality and packaging.' },
  { id: '2', user: 'Rahul K.', rating: 4, date: '15 May 2025', text: 'Good value for money. Fast delivery. Would recommend.' },
  { id: '3', user: 'Ananya M.', rating: 5, date: '3 Apr 2025', text: 'Amazing! Will definitely buy again. Great seller.' },
  { id: '4', user: 'Vikram P.', rating: 3, date: '22 Mar 2025', text: 'Decent product but packaging could be improved.' },
];

type TabKey = 'description' | 'specs' | 'reviews';

export default function ProductDetailScreen() {
  const colors = useColors();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { addItem, items } = useCart();
  const { toggle, isInWishlist } = useWishlist();
  const isWeb = Platform.OS === 'web';
  const [activeTab, setActiveTab] = useState<TabKey>('description');
  const [activeImage, setActiveImage] = useState(0);

  // Monochrome floating buttons over the hero image: pure black on light mode,
  // pure white on dark mode — flips per theme so it always pops off the photo.
  const heroBtnBg = isDark ? '#FFFFFF' : '#000000';
  const heroBtnIcon = isDark ? '#000000' : '#FFFFFF';

  const product = PRODUCTS.find(p => p.id === id);

  if (!product) {
    return (
      <View style={[styles.notFound, { backgroundColor: colors.background }]}>
        <SvgIcon name="cube-outline" size={56} color={colors.mutedForeground} />
        <Text style={[styles.notFoundText, { color: colors.foreground }]}>Product not found</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.backLink, { color: colors.primary }]}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const isWishlisted = isInWishlist(product.id);
  const inCart = items.find(i => i.product.id === product.id);

  const handleImageScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const idx = Math.round(e.nativeEvent.contentOffset.x / SCREEN_W);
    if (idx !== activeImage) setActiveImage(idx);
  };

  const specs = [
    { key: 'Category', value: product.category.charAt(0).toUpperCase() + product.category.slice(1) },
    { key: 'Sold by', value: product.seller },
    { key: 'Rating', value: `${product.rating} / 5 (${product.reviewCount.toLocaleString()} reviews)` },
    { key: 'Discount', value: `${product.discount}% off` },
    { key: 'Express Delivery', value: product.isExpress ? 'Available' : 'Standard Only' },
    { key: 'In Stock', value: product.stock > 0 ? 'Yes' : 'Out of Stock' },
  ];

  const handleAddToCart = () => {
    addItem(product);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert('Added to Cart', `${product.name} added to your cart.`, [
      { text: 'View Cart', onPress: () => router.push('/cart') },
      { text: 'Continue Shopping', style: 'cancel' },
    ]);
  };

  const handleBuyNow = () => {
    addItem(product);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    router.push('/checkout');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} bounces>

        {/* ── Hero image — swipeable gallery ── */}
        <View style={{ height: HERO_HEIGHT }}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleImageScroll}
            style={{ height: HERO_HEIGHT }}
          >
            {HERO_SLIDES.map((slide, i) => (
              <View key={i} style={{ width: SCREEN_W, height: HERO_HEIGHT }}>
                <LinearGradient
                  colors={product.gradient as string[]}
                  style={StyleSheet.absoluteFill}
                  start={slide.start}
                  end={slide.end}
                />
                <View style={styles.heroCenter}>
                  <SvgIcon name={slide.icon} size={80} color="rgba(255,255,255,0.25)" />
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Back button — top-left, floating over image */}
          <View style={[styles.heroTopBar, { top: insets.top + 8 }]} pointerEvents="box-none">
            <TouchableOpacity
              style={[styles.heroBtn, { backgroundColor: heroBtnBg }]}
              onPress={() => router.back()}
            >
              <BackChevronIcon size={17} color={heroBtnIcon} />
            </TouchableOpacity>

            {/* Floating action buttons top-right */}
            <View style={styles.heroActions} pointerEvents="box-none">
              <TouchableOpacity
                style={[styles.heroBtn, { backgroundColor: heroBtnBg }]}
                onPress={() => { toggle(product); Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }}
              >
                <HeartIcon size={19} color={isWishlisted ? '#FF4D6D' : heroBtnIcon} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.heroBtn, { backgroundColor: heroBtnBg }]}>
                <SvgIcon name="share-outline" size={19} color={heroBtnIcon} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Swipe dots — sit 4px above where the bottom sheet overlaps the image */}
          <View style={[styles.dotsRow, { bottom: SHEET_RADIUS + 4 }]} pointerEvents="none">
            {HERO_SLIDES.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  {
                    width: i === activeImage ? 16 : 6,
                    backgroundColor: i === activeImage ? '#fff' : 'rgba(255,255,255,0.45)',
                  },
                ]}
              />
            ))}
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
              <SvgIcon name="flash" size={12} color="#fff" />
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
              <Text style={{ color: colors.primary, fontFamily: 'GoogleSans_600SemiBold' }}>
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
              <SvgIcon name="chevron-forward" size={14} color={colors.mutedForeground} />
            </TouchableOpacity>
          </View>

          {/* Price section — tinted strip */}
          <View style={[styles.priceStrip, { backgroundColor: colors.primary + '0C' }]}>
            <View style={styles.priceRow}>
              <Text style={[styles.price, { color: colors.foreground }]}>
                {formatPrice(product.price)}
              </Text>
              <Text style={[styles.originalPrice, { color: colors.mutedForeground }]}>
                {formatPrice(product.originalPrice)}
              </Text>
              <View style={[styles.discountPill, { backgroundColor: colors.success + '22' }]}>
                <Text style={[styles.discountPillText, { color: colors.success }]}>
                  {product.discount}% off
                </Text>
              </View>
            </View>
            <Text style={[styles.savingText, { color: colors.success }]}>
              You save {formatPrice(product.originalPrice - product.price)} 🎉
            </Text>
          </View>

          {/* Delivery / stock banners */}
          <View style={styles.sheetPad}>
            {!(product.stock > 0) && (
              <View style={[styles.infoBanner, { backgroundColor: colors.destructive + '14', borderColor: colors.destructive + '50' }]}>
                <SvgIcon name="close-circle" size={15} color={colors.destructive} />
                <Text style={[styles.infoBannerText, { color: colors.destructive }]}>Out of Stock</Text>
              </View>
            )}

            {/* Delivery & Returns */}
            <View style={[styles.drCard, { borderColor: colors.border }]}>
              <View style={styles.drRow}>
                <View style={[styles.drIcon, { backgroundColor: colors.muted }]}>
                  <SvgIcon name={product.isExpress ? 'flash' : 'bicycle-outline'} size={16} color={product.isExpress ? colors.accent : colors.mutedForeground} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.drTitle, { color: colors.foreground }]}>
                    {product.isExpress ? 'Express Delivery' : 'Standard Delivery'}
                  </Text>
                  <Text style={[styles.drSub, { color: colors.mutedForeground }]}>
                    {product.isExpress ? 'Arrives in 1-2 days' : 'Arrives in 3-5 days'}
                  </Text>
                </View>
              </View>
              <View style={[styles.drDivider, { backgroundColor: colors.border }]} />
              <View style={styles.drRow}>
                <View style={[styles.drIcon, { backgroundColor: colors.muted }]}>
                  <SvgIcon name="checkmark-done-circle-outline" size={16} color={colors.mutedForeground} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.drTitle, { color: colors.foreground }]}>Easy Returns</Text>
                  <Text style={[styles.drSub, { color: colors.mutedForeground }]}>7-day return & exchange policy</Text>
                </View>
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

      {/* ── Fixed footer — pinned to bottom like a bottom nav bar ── */}
      {product.stock > 0 && (
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
            style={[
              styles.cartBtn,
              isDark
                ? { backgroundColor: '#FFFFFF', borderColor: '#FFFFFF' }
                : { backgroundColor: colors.muted, borderColor: colors.primary },
            ]}
            onPress={handleAddToCart}
          >
            <SvgIcon name="bag-add-outline" size={19} color={isDark ? '#000000' : colors.primary} />
            <Text style={[styles.cartBtnText, { color: isDark ? '#000000' : colors.primary }]}>
              {inCart ? 'Add More' : 'Add to Cart'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.buyBtn,
              isDark
                ? { backgroundColor: '#000000', borderColor: colors.border, borderWidth: 1.5 }
                : { backgroundColor: colors.primary },
            ]}
            onPress={handleBuyNow}
          >
            <SvgIcon name="flash" size={19} color="#fff" />
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
  notFoundText: { fontSize: 18, fontFamily: 'GoogleSans_500Medium' },
  backLink: { fontSize: 15, fontFamily: 'GoogleSans_600SemiBold' },

  /* Hero */
  heroTopBar: { position: 'absolute', left: 14, right: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', zIndex: 10 },
  heroActions: { flexDirection: 'row', gap: 10 },
  heroBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  heroCenter: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  heroBadge: { position: 'absolute', bottom: SHEET_RADIUS + 10, left: 14, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  heroBadgeText: { fontSize: 13, fontFamily: 'GoogleSans_700Bold' },
  heroExpress: { position: 'absolute', bottom: SHEET_RADIUS + 10, right: 14, flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  heroExpressText: { fontSize: 10, fontFamily: 'GoogleSans_700Bold', color: '#fff' },
  dotsRow: { position: 'absolute', left: 0, right: 0, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 5 },
  dot: { height: 6, borderRadius: 3 },

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
  category: { fontSize: 11, fontFamily: 'GoogleSans_700Bold', letterSpacing: 1.4 },
  productName: { fontSize: 20, fontFamily: 'GoogleSans_700Bold', lineHeight: 28 },
  sellerText: { fontSize: 13, fontFamily: 'GoogleSans_400Regular' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2 },
  ratingNum: { fontSize: 14, fontFamily: 'GoogleSans_600SemiBold' },
  reviewCount: { fontSize: 12, fontFamily: 'GoogleSans_400Regular' },

  /* Price strip */
  priceStrip: { paddingHorizontal: 20, paddingVertical: 14, gap: 4 },
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: 10, flexWrap: 'wrap' },
  price: { fontSize: 26, fontFamily: 'GoogleSans_700Bold' },
  originalPrice: { fontSize: 16, fontFamily: 'GoogleSans_400Regular', textDecorationLine: 'line-through' },
  discountPill: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  discountPillText: { fontSize: 12, fontFamily: 'GoogleSans_700Bold' },
  savingText: { fontSize: 13, fontFamily: 'GoogleSans_600SemiBold' },

  /* Banners */
  infoBanner: { flexDirection: 'row', alignItems: 'center', gap: 7, padding: 10, borderRadius: 10, borderWidth: 1 },
  infoBannerText: { fontSize: 13, fontFamily: 'GoogleSans_600SemiBold' },

  /* Delivery & Returns */
  drCard: { borderWidth: 1, borderRadius: 12, overflow: 'hidden' },
  drRow: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12 },
  drIcon: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  drTitle: { fontSize: 13, fontFamily: 'GoogleSans_600SemiBold' },
  drSub: { fontSize: 12, fontFamily: 'GoogleSans_400Regular', marginTop: 1 },
  drDivider: { height: 1, marginLeft: 54 },

  /* Tabs */
  tabBar: { flexDirection: 'row', borderBottomWidth: 1, borderTopWidth: 1 },
  tabBtn: { flex: 1, paddingVertical: 14, alignItems: 'center', borderBottomWidth: 0 },
  tabText: { fontSize: 14, fontFamily: 'GoogleSans_600SemiBold' },
  tabContent: { padding: 20 },

  /* Description */
  description: { fontSize: 15, fontFamily: 'GoogleSans_400Regular', lineHeight: 25 },

  /* Specs */
  specRow: { flexDirection: 'row', paddingVertical: 12, paddingHorizontal: 4, borderBottomWidth: 1 },
  specKey: { flex: 1.1, fontSize: 13, fontFamily: 'GoogleSans_400Regular' },
  specVal: { flex: 1.5, fontSize: 13, fontFamily: 'GoogleSans_600SemiBold', textAlign: 'right' },

  /* Reviews */
  reviewsList: { gap: 16 },
  ratingSummary: { borderRadius: 14, padding: 20, alignItems: 'center', gap: 8 },
  ratingBig: { fontSize: 52, fontFamily: 'GoogleSans_700Bold' },
  ratingTotal: { fontSize: 12, fontFamily: 'GoogleSans_400Regular' },
  reviewCard: { paddingBottom: 16, borderBottomWidth: 1, gap: 10 },
  reviewHeader: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  reviewAvatar: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center' },
  reviewAvatarText: { fontSize: 16, fontFamily: 'GoogleSans_700Bold', color: '#fff' },
  reviewUser: { fontSize: 14, fontFamily: 'GoogleSans_600SemiBold' },
  reviewDate: { fontSize: 12, fontFamily: 'GoogleSans_400Regular', marginTop: 1 },
  reviewText: { fontSize: 14, fontFamily: 'GoogleSans_400Regular', lineHeight: 21 },

  /* Footer — fixed like a bottom nav bar */
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 8,
    elevation: 12,
  },
  cartBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 15, borderRadius: 14, borderWidth: 1.5 },
  cartBtnText: { fontSize: 14, fontFamily: 'GoogleSans_600SemiBold' },
  buyBtn: { flex: 1.3, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 15, borderRadius: 14 },
  buyBtnText: { fontSize: 15, fontFamily: 'GoogleSans_700Bold' },
});
