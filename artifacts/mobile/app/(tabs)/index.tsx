import React, { useEffect, useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SvgIcon from '@/components/SvgIcon';
import * as Haptics from 'expo-haptics';
import * as Location from 'expo-location';
import { useColors } from '@/hooks/useColors';
import { BANNERS, CATEGORIES, PRODUCTS, Product } from '@/constants/data';
import { useWishlist } from '@/context/WishlistContext';
import BannerCarousel from '@/components/BannerCarousel';
import CategoryCard from '@/components/CategoryCard';
import ProductCard from '@/components/ProductCard';

function renderGrid(products: Product[], toggle: (p: Product) => void, isInWishlist: (id: string) => boolean) {
  const pairs: Product[][] = [];
  for (let i = 0; i < products.length; i += 2) {
    pairs.push(products.slice(i, i + 2));
  }
  return pairs.map((pair, idx) => (
    <View key={idx} style={styles.row}>
      {pair.map(p => (
        <ProductCard
          key={p.id}
          product={p}
          onPress={() => router.push(`/product/${p.id}`)}
          isWishlisted={isInWishlist(p.id)}
          onWishlistToggle={() => { toggle(p); Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }}
          style={{ flex: 1 }}
        />
      ))}
      {pair.length === 1 && <View style={{ flex: 1 }} />}
    </View>
  ));
}

export default function HomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { toggle, isInWishlist } = useWishlist();
  const isWeb = Platform.OS === 'web';
  const topPad = isWeb ? 67 : insets.top;

  const [locationStr, setLocationStr] = useState('Detecting location...');
  const [locationIcon, setLocationIcon] = useState<'location' | 'location-outline'>('location-outline');

  const deals = PRODUCTS.slice(0, 8);
  const trending = PRODUCTS.filter(p => p.category === 'electronics');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          if (!cancelled) setLocationStr('India');
          return;
        }
        const loc = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        const results = await Location.reverseGeocodeAsync({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        });
        if (!cancelled && results.length > 0) {
          const r = results[0];
          const pincode = r.postalCode ?? '';
          const city = r.city ?? r.district ?? r.subregion ?? '';
          const country = r.country === 'India' ? 'India' : (r.isoCountryCode ?? r.country ?? '');
          if (pincode && city) {
            setLocationStr(`${pincode} ${city}/${country}`);
          } else if (pincode) {
            setLocationStr(`${pincode} ${country}`);
          } else if (city) {
            setLocationStr(`${city}, ${country}`);
          } else {
            setLocationStr(country || 'India');
          }
          setLocationIcon('location');
        }
      } catch {
        if (!cancelled) setLocationStr('India');
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
      {/* Brand Header */}
      <View style={[styles.header, { paddingTop: topPad + 8, backgroundColor: colors.primary }]}>
        <View style={styles.headerRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.brandName}>GRIPER</Text>
            <TouchableOpacity style={styles.locationRow} activeOpacity={0.75} onPress={async () => {
              const { status } = await Location.requestForegroundPermissionsAsync();
              if (status !== 'granted') return;
              const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
              const results = await Location.reverseGeocodeAsync({ latitude: loc.coords.latitude, longitude: loc.coords.longitude });
              if (results.length > 0) {
                const r = results[0];
                const pincode = r.postalCode ?? '';
                const city = r.city ?? r.district ?? '';
                const country = r.country === 'India' ? 'India' : (r.isoCountryCode ?? '');
                setLocationStr(pincode && city ? `${pincode} ${city}/${country}` : city ? `${city}, ${country}` : country || 'India');
                setLocationIcon('location');
              }
            }}>
              <SvgIcon name={locationIcon} size={12} color="rgba(255,255,255,0.9)" />
              <Text style={styles.location} numberOfLines={1}>{locationStr}</Text>
              <SvgIcon name="chevron-down" size={10} color="rgba(255,255,255,0.7)" />
            </TouchableOpacity>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconBtn} onPress={() => router.push('/wishlist')}>
              <SvgIcon name="heart-outline" size={22} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
              <SvgIcon name="notifications-outline" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.searchTouch, { backgroundColor: '#fff' }]}
          onPress={() => router.push('/search')}
          activeOpacity={0.88}
        >
          <SvgIcon name="search" size={18} color={colors.mutedForeground} />
          <Text style={[styles.searchHint, { color: colors.mutedForeground }]}>Search products, brands & more</Text>
          <SvgIcon name="mic-outline" size={18} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Offers stripe */}
      <View style={[styles.stripe, { backgroundColor: colors.accent }]}>
        <Text style={styles.stripeText}>FREE delivery on orders above ₹499  •  Use code GRIPER10 for 10% off</Text>
      </View>

      {/* Banner */}
      <BannerCarousel banners={BANNERS} />

      {/* Categories */}
      <View style={styles.section}>
        <View style={styles.sectionHead}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Shop by Category</Text>
          <TouchableOpacity>
            <Text style={[styles.seeAll, { color: colors.primary }]}>See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.catScroll}>
          {CATEGORIES.map(cat => (
            <CategoryCard
              key={cat.id}
              category={cat}
              onPress={() => router.push(`/category/${cat.slug}`)}
            />
          ))}
        </ScrollView>
      </View>

      {/* Today's Deals */}
      <View style={styles.section}>
        <View style={styles.sectionHead}>
          <View>
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Today's Deals</Text>
            <Text style={[styles.sectionSub, { color: colors.mutedForeground }]}>Limited time offers</Text>
          </View>
          <View style={[styles.dealBadge, { backgroundColor: colors.primary }]}>
            <Text style={styles.dealBadgeText}>LIVE</Text>
          </View>
        </View>
        <View style={styles.gridGap}>
          {renderGrid(deals, toggle, isInWishlist)}
        </View>
      </View>

      {/* Trending Electronics */}
      <View style={styles.section}>
        <View style={styles.sectionHead}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Trending Electronics</Text>
          <TouchableOpacity onPress={() => router.push('/category/electronics')}>
            <Text style={[styles.seeAll, { color: colors.primary }]}>See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScroll}>
          {trending.map(p => (
            <ProductCard
              key={p.id}
              product={p}
              onPress={() => router.push(`/product/${p.id}`)}
              isWishlisted={isInWishlist(p.id)}
              onWishlistToggle={() => { toggle(p); Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }}
              style={{ width: 170 }}
            />
          ))}
        </ScrollView>
      </View>

      {/* For You */}
      <View style={styles.section}>
        <View style={styles.sectionHead}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>For You</Text>
          <Text style={[styles.sectionSub, { color: colors.mutedForeground }]}>Based on your interests</Text>
        </View>
        <View style={styles.gridGap}>
          {renderGrid(PRODUCTS.slice(8, 16), toggle, isInWishlist)}
        </View>
      </View>

      <View style={{ height: isWeb ? 100 : 120 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 16, paddingBottom: 12, gap: 10 },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  brandName: { fontSize: 20, fontFamily: 'Inter_700Bold', color: '#fff', letterSpacing: 2 },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
  location: { fontSize: 12, fontFamily: 'GoogleSans_500Medium', color: 'rgba(255,255,255,0.9)', maxWidth: 180 },
  headerActions: { flexDirection: 'row', gap: 4 },
  iconBtn: { width: 38, height: 38, alignItems: 'center', justifyContent: 'center', borderRadius: 19 },
  searchTouch: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 10 },
  searchHint: { flex: 1, fontSize: 14, fontFamily: 'GoogleSans_400Regular' },
  stripe: { paddingVertical: 8, paddingHorizontal: 16 },
  stripeText: { color: '#fff', fontSize: 12, fontFamily: 'GoogleSans_500Medium', textAlign: 'center' },
  section: { padding: 16, gap: 14 },
  sectionHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sectionTitle: { fontSize: 18, fontFamily: 'GoogleSans_700Bold' },
  sectionSub: { fontSize: 12, fontFamily: 'GoogleSans_400Regular', marginTop: 2 },
  seeAll: { fontSize: 13, fontFamily: 'GoogleSans_600SemiBold' },
  dealBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  dealBadgeText: { color: '#fff', fontSize: 10, fontFamily: 'GoogleSans_700Bold', letterSpacing: 1 },
  catScroll: { gap: 12, paddingRight: 4 },
  hScroll: { gap: 12, paddingRight: 16 },
  gridGap: { gap: 12 },
  row: { flexDirection: 'row', gap: 12 },
});
