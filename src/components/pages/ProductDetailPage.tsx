import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
// Nvigasyon Tipleri ve Hookları
import type { RouteProp } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RootStackParamList } from '../../navigation/type';
import { useFavoritesStore } from '../../store/favorites';
import { useQtyStore } from '../../store/qtyStore';
import { NumericInput } from '../molecules/numericInput/NumericInput';
import { useBasketStore } from '../../store/basketStore';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Bu sayfa `RootStackParamList` içindeki "ProductDetailPage" param tipini kullanıyor.
type ProductDetailRouteProp = RouteProp<
  RootStackParamList,
  'ProductDetailPage'
>;

const ProductDetailPage = () => {
  const addToBasket = useBasketStore(s => s.add); // Sepete ekleme fonksiyonu

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<ProductDetailRouteProp>();

  const product = route.params?.product;
  const toggle = useFavoritesStore(s => s.toggle);
  const isFav = useFavoritesStore(s => s.isFavorite(product.id));
  // Adet bilgisini global store’dan alıyorrrrr.
  const qty = useQtyStore(s => s.getQty(product.id));
  const setQty = useQtyStore(s => s.setQty);
  //Toplam fiyatı performans için useMemo hooku ile hesaplıyor.
  const total = useMemo(() => product.price * qty, [product.price, qty]);

  const handleAddToCart = () => {
    addToBasket(product, qty); // ürünü/adedini sepete yazzzz
    navigation.navigate('BasketPage'); // Sepet sayfasına gider
  };

  return (
    //Üstte "geri" ve "favori" butonları absolute konumlu
    <View style={styles.root}>
      <View style={styles.topBar}>
        <TouchableOpacity
          accessibilityRole="button"
          onPress={() => navigation.goBack()}
          style={styles.circleBtn}
        >
          <Text style={styles.circleBtnIcon}>←</Text>
        </TouchableOpacity>

        <TouchableOpacity
          accessibilityRole="button"
          onPress={() => toggle(product)}
          style={styles.circleBtn}
        >
          <Text
            style={[
              styles.circleBtnIcon,
              { color: isFav ? '#e11d48' : '#9ca3af' }, // 🔁 her render store’a bakar
            ]}
          >
            {isFav ? '\u2665' : '\u2661'} {/* ♥ / ♡ */}
          </Text>
        </TouchableOpacity>
      </View>
      {/* Ürün görseli, başlık ve açıklama */}
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        <Image source={{ uri: product.images[0] }} style={styles.image} />

        <Text style={styles.title}>{product.title}</Text>

        <Text style={styles.desc} numberOfLines={3}>
          {product.description}
        </Text>
        {/* ✅ Footer’dan biraz yukarıda adet seçici */}
        <View style={styles.qtyBar}>
          <NumericInput
            value={qty}
            onChange={v => setQty(product.id, v)}
            min={1}
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.qtyArea}></View>
        {/* Toplam fiyat alanı */}
        <View style={styles.totalArea}>
          <Text style={styles.totalLabel}>Toplam</Text>
          <Text style={styles.totalPrice}>
            {total.toFixed(2)} <Text style={styles.currency}>₺</Text>
          </Text>
        </View>
        {/* Satın Al butonu */}
        <TouchableOpacity
          accessibilityRole="button"
          activeOpacity={0.8}
          onPress={handleAddToCart}
          style={styles.buyBtn}
        >
          <Text style={styles.buyBtnText}>Satın Al</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },

  image: {
    width: '100%',
    height: 280,
    resizeMode: 'cover',
    borderRadius: 12,
    marginTop: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  desc: {
    fontSize: 14,
    lineHeight: 20,
    color: '#6b7280',
    marginBottom: 16,
  },
  qtyBar: {
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 24,
  },
  topBar: {
    position: 'absolute',
    top: 10,
    left: 12,
    right: 12,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  circleBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ffffffdd',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  circleBtnIcon: { fontSize: 16, fontWeight: '700', color: '#111' },

  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 18,
    backgroundColor: '#fff',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#e5e7eb',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  qtyArea: { flexShrink: 0 },
  totalArea: { flex: 1 },
  totalLabel: { fontSize: 12, color: '#6b7280', marginBottom: 2 },
  totalPrice: { fontSize: 18, fontWeight: '700', color: '#111827' },
  currency: { fontSize: 14, fontWeight: '600', color: '#6b7280' },
  buyBtn: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 999,
  },
  buyBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});

export default ProductDetailPage;
