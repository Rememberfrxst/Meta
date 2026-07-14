import React, { useState } from 'react';
import { Alert, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useColors } from '@/hooks/useColors';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { formatPrice, Address } from '@/constants/data';

const PAYMENT_METHODS = [
  { key: 'cod', label: 'Cash on Delivery', icon: 'cash-outline', sub: 'Pay when your order arrives' },
  { key: 'upi', label: 'UPI Payment', icon: 'qr-code-outline', sub: 'GPay, PhonePe, Paytm, BHIM' },
  { key: 'razorpay', label: 'Razorpay', icon: 'card-outline', sub: 'Cards, Net Banking, Wallets' },
] as const;

type PaymentMethod = typeof PAYMENT_METHODS[number]['key'];

const GUEST_ADDRESS: Address = {
  id: 'guest',
  name: 'Guest User',
  phone: '+91 99999 00000',
  line1: '123, MG Road',
  city: 'Mumbai',
  state: 'Maharashtra',
  pincode: '400001',
  isDefault: true,
};

export default function CheckoutScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { subtotal, deliveryFee, discountAmount, total, items, placeOrder, coupon } = useCart();
  const { user } = useAuth();
  const isWeb = Platform.OS === 'web';
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [upiId, setUpiId] = useState('');
  const [placing, setPlacing] = useState(false);

  const address = user?.addresses.find(a => a.isDefault) || user?.addresses[0] || GUEST_ADDRESS;

  if (items.length === 0) {
    return (
      <View style={[styles.empty, { backgroundColor: colors.background }]}>
        <Ionicons name="bag-outline" size={48} color={colors.mutedForeground} />
        <Text style={[styles.emptyText, { color: colors.foreground }]}>Nothing in cart</Text>
        <TouchableOpacity style={[styles.shopBtn, { backgroundColor: colors.primary }]} onPress={() => router.replace('/')}>
          <Text style={[styles.shopBtnText, { color: colors.primaryForeground }]}>Start Shopping</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handlePlaceOrder = async () => {
    if (paymentMethod === 'upi' && !upiId.includes('@')) {
      Alert.alert('Invalid UPI ID', 'Please enter a valid UPI ID (e.g. name@upi)');
      return;
    }
    setPlacing(true);
    try {
      if (paymentMethod === 'razorpay') {
        // Simulated Razorpay flow
        await new Promise(res => setTimeout(res, 1500));
      } else if (paymentMethod === 'upi') {
        await new Promise(res => setTimeout(res, 1000));
      }
      const order = placeOrder(paymentMethod, address);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      router.replace({ pathname: '/checkout/success', params: { orderId: order.id } });
    } catch {
      Alert.alert('Error', 'Failed to place order. Please try again.');
    } finally {
      setPlacing(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Delivery Address */}
        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <View style={styles.sectionHead}>
            <Ionicons name="location" size={18} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Delivery Address</Text>
          </View>
          <View style={[styles.addressCard, { backgroundColor: colors.muted, borderColor: colors.primary }]}>
            <View style={[styles.defaultBadge, { backgroundColor: colors.primary }]}>
              <Text style={[styles.defaultText, { color: colors.primaryForeground }]}>DEFAULT</Text>
            </View>
            <Text style={[styles.addrName, { color: colors.foreground }]}>{address.name}</Text>
            <Text style={[styles.addrLine, { color: colors.mutedForeground }]}>{address.line1}{address.line2 ? `, ${address.line2}` : ''}</Text>
            <Text style={[styles.addrLine, { color: colors.mutedForeground }]}>{address.city}, {address.state} - {address.pincode}</Text>
            <Text style={[styles.addrPhone, { color: colors.mutedForeground }]}>{address.phone}</Text>
          </View>
          <TouchableOpacity style={[styles.changeAddr, { borderColor: colors.border }]}>
            <Ionicons name="add-circle-outline" size={18} color={colors.primary} />
            <Text style={[styles.changeAddrText, { color: colors.primary }]}>Add / Change Address</Text>
          </TouchableOpacity>
        </View>

        {/* Payment */}
        <View style={[styles.section, { backgroundColor: colors.card, marginTop: 8 }]}>
          <View style={styles.sectionHead}>
            <Ionicons name="card" size={18} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Payment Method</Text>
          </View>
          {PAYMENT_METHODS.map(pm => (
            <TouchableOpacity
              key={pm.key}
              style={[styles.paymentRow, { borderColor: paymentMethod === pm.key ? colors.primary : colors.border, backgroundColor: paymentMethod === pm.key ? colors.primary + '10' : colors.background }]}
              onPress={() => setPaymentMethod(pm.key)}
            >
              <View style={[styles.paymentIcon, { backgroundColor: paymentMethod === pm.key ? colors.primary + '20' : colors.muted }]}>
                <Ionicons name={pm.icon as any} size={22} color={paymentMethod === pm.key ? colors.primary : colors.mutedForeground} />
              </View>
              <View style={styles.paymentInfo}>
                <Text style={[styles.paymentLabel, { color: colors.foreground }]}>{pm.label}</Text>
                <Text style={[styles.paymentSub, { color: colors.mutedForeground }]}>{pm.sub}</Text>
              </View>
              <View style={[styles.radio, { borderColor: paymentMethod === pm.key ? colors.primary : colors.border }]}>
                {paymentMethod === pm.key && <View style={[styles.radioFill, { backgroundColor: colors.primary }]} />}
              </View>
            </TouchableOpacity>
          ))}
          {paymentMethod === 'upi' && (
            <View style={styles.upiInput}>
              <TextInput
                style={[styles.upiField, { backgroundColor: colors.input, color: colors.foreground, borderColor: colors.border, fontFamily: 'Inter_400Regular' }]}
                placeholder="Enter UPI ID (e.g. name@upi)"
                placeholderTextColor={colors.mutedForeground}
                value={upiId}
                onChangeText={setUpiId}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>
          )}
          {paymentMethod === 'razorpay' && (
            <View style={[styles.razorpayNote, { backgroundColor: colors.muted }]}>
              <Ionicons name="shield-checkmark" size={16} color={colors.success} />
              <Text style={[styles.razorpayText, { color: colors.mutedForeground }]}>Secure payment powered by Razorpay</Text>
            </View>
          )}
        </View>

        {/* Order Summary */}
        <View style={[styles.section, { backgroundColor: colors.card, marginTop: 8 }]}>
          <View style={styles.sectionHead}>
            <Ionicons name="receipt" size={18} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Order Summary</Text>
          </View>
          {items.map(item => (
            <View key={item.product.id} style={styles.summaryItem}>
              <Text style={[styles.summaryItemName, { color: colors.foreground }]} numberOfLines={1}>{item.product.name} x{item.quantity}</Text>
              <Text style={[styles.summaryItemPrice, { color: colors.foreground }]}>{formatPrice(item.product.price * item.quantity)}</Text>
            </View>
          ))}
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryKey, { color: colors.mutedForeground }]}>Subtotal</Text>
            <Text style={[styles.summaryVal, { color: colors.foreground }]}>{formatPrice(subtotal)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryKey, { color: colors.mutedForeground }]}>Delivery</Text>
            <Text style={[styles.summaryVal, { color: deliveryFee === 0 ? colors.success : colors.foreground }]}>{deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}</Text>
          </View>
          {discountAmount > 0 && (
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryKey, { color: colors.success }]}>Coupon ({coupon})</Text>
              <Text style={[styles.summaryVal, { color: colors.success }]}>-{formatPrice(discountAmount)}</Text>
            </View>
          )}
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <View style={styles.summaryRow}>
            <Text style={[styles.totalKey, { color: colors.foreground }]}>Total Amount</Text>
            <Text style={[styles.totalVal, { color: colors.foreground }]}>{formatPrice(total)}</Text>
          </View>
        </View>

        <View style={{ height: 100 + (isWeb ? 34 : insets.bottom) }} />
      </ScrollView>

      {/* Place Order */}
      <View style={[styles.footer, { backgroundColor: colors.card, borderTopColor: colors.border, borderTopWidth: 1, paddingBottom: isWeb ? 16 : insets.bottom + 12 }]}>
        <View>
          <Text style={[styles.footerTotal, { color: colors.foreground }]}>{formatPrice(total)}</Text>
          <Text style={[styles.footerMethod, { color: colors.mutedForeground }]}>via {PAYMENT_METHODS.find(p => p.key === paymentMethod)?.label}</Text>
        </View>
        <TouchableOpacity
          style={[styles.placeBtn, { backgroundColor: placing ? colors.muted : colors.primary }]}
          onPress={handlePlaceOrder}
          disabled={placing}
        >
          {placing ? (
            <Text style={[styles.placeBtnText, { color: colors.primaryForeground }]}>Processing...</Text>
          ) : (
            <>
              <Text style={[styles.placeBtnText, { color: colors.primaryForeground }]}>Place Order</Text>
              <Ionicons name="arrow-forward" size={18} color={colors.primaryForeground} />
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 },
  emptyText: { fontSize: 18, fontFamily: 'Inter_500Medium' },
  shopBtn: { paddingHorizontal: 28, paddingVertical: 14, borderRadius: 12 },
  shopBtnText: { fontSize: 15, fontFamily: 'Inter_600SemiBold' },
  section: { padding: 16 },
  sectionHead: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 14 },
  sectionTitle: { fontSize: 16, fontFamily: 'Inter_700Bold' },
  addressCard: { borderRadius: 12, padding: 14, borderWidth: 1.5, gap: 4 },
  defaultBadge: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4, marginBottom: 6 },
  defaultText: { fontSize: 9, fontFamily: 'Inter_700Bold', letterSpacing: 1 },
  addrName: { fontSize: 15, fontFamily: 'Inter_600SemiBold' },
  addrLine: { fontSize: 13, fontFamily: 'Inter_400Regular' },
  addrPhone: { fontSize: 13, fontFamily: 'Inter_500Medium', marginTop: 4 },
  changeAddr: { flexDirection: 'row', alignItems: 'center', gap: 6, borderRadius: 10, borderWidth: 1, padding: 12, marginTop: 12, justifyContent: 'center' },
  changeAddrText: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
  paymentRow: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderRadius: 12, borderWidth: 1.5, marginBottom: 10 },
  paymentIcon: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  paymentInfo: { flex: 1 },
  paymentLabel: { fontSize: 15, fontFamily: 'Inter_600SemiBold' },
  paymentSub: { fontSize: 12, fontFamily: 'Inter_400Regular', marginTop: 2 },
  radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  radioFill: { width: 10, height: 10, borderRadius: 5 },
  upiInput: { marginBottom: 8 },
  upiField: { height: 44, borderRadius: 10, paddingHorizontal: 12, borderWidth: 1, fontSize: 14 },
  razorpayNote: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 12, borderRadius: 10 },
  razorpayText: { fontSize: 12, fontFamily: 'Inter_400Regular' },
  summaryItem: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  summaryItemName: { flex: 1, fontSize: 13, fontFamily: 'Inter_400Regular', marginRight: 8 },
  summaryItemPrice: { fontSize: 13, fontFamily: 'Inter_500Medium' },
  divider: { height: 1, marginVertical: 10 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  summaryKey: { fontSize: 14, fontFamily: 'Inter_400Regular' },
  summaryVal: { fontSize: 14, fontFamily: 'Inter_500Medium' },
  totalKey: { fontSize: 16, fontFamily: 'Inter_700Bold' },
  totalVal: { fontSize: 18, fontFamily: 'Inter_700Bold' },
  footer: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 16 },
  footerTotal: { fontSize: 20, fontFamily: 'Inter_700Bold' },
  footerMethod: { fontSize: 12, fontFamily: 'Inter_400Regular' },
  placeBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 16, borderRadius: 14 },
  placeBtnText: { fontSize: 16, fontFamily: 'Inter_600SemiBold' },
});
