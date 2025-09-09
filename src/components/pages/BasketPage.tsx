// src/components/pages/BasketPage.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useBasketStore } from '../../store/basketStore';
import { NumericInput } from '../molecules/numericInput/NumericInput';

const BasketPage = () => {
  const navigation = useNavigation();
  const items = useBasketStore(s => s.items);
  const total = useBasketStore(s => s.total());
  const remove = useBasketStore(s => s.remove);
  const setQty = useBasketStore(s => s.setQty);

  // "Geri" her zaman ana sayfaya dönsün
  const goHome = () =>
    navigation.reset({ index: 0, routes: [{ name: 'HomePage' as never }] });

  if (items.length === 0) {
    return (
      <View style={[styles.root, { justifyContent: 'center', padding: 24 }]}>
        <Text style={{ fontSize: 18, fontWeight: '700', textAlign: 'center' }}>
          Sepet boş
        </Text>
        <TouchableOpacity
          onPress={goHome}
          style={{ marginTop: 16, alignSelf: 'center', padding: 12 }}
        >
          <Text style={{ color: '#ef4444', fontWeight: '700' }}>
            Ana sayfaya dön
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goHome} style={styles.backBtn}>
          <Text style={{ fontSize: 16 }}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sepet</Text>
        <View style={{ width: 36 }} />
      </View>

      <View style={styles.divider} />

      {/* Liste */}
      <FlatList
        data={items}
        keyExtractor={it => String(it.product.id)}
        contentContainerStyle={{ padding: 16, paddingBottom: 140 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{ uri: item.product.images[0] }}
              style={styles.thumb}
            />

            <View style={{ flex: 1, paddingLeft: 12 }}>
              <Text style={styles.title}>{item.product.title}</Text>
              <Text style={styles.desc} numberOfLines={2}>
                {item.product.description}
              </Text>

              {/* Adet kontrolü */}
              <View style={{ marginTop: 8 }}>
                <NumericInput
                  value={item.qty} // <-- kontrollü
                  initialValue={1}
                  onChange={v => setQty(item.product.id, v)}
                />
              </View>

              {/* Fiyat + Sil */}
              <View style={styles.rowBetween}>
                <Text style={styles.price}>
                  {(item.product.price * item.qty).toFixed(2)} TL
                </Text>
                <TouchableOpacity onPress={() => remove(item.product.id)}>
                  <Text style={{ color: '#2e3137ff' }}>Sil</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />

      {/* Sticky footer */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.totalLabel}>Toplam</Text>
          <Text style={styles.totalPrice}>
            {total.toFixed(2)} <Text style={styles.currency}>₺</Text>
          </Text>
        </View>

        <TouchableOpacity style={styles.buyBtn} activeOpacity={0.9}>
          <Text style={styles.buyBtnText}>Satın Al</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },

  header: {
    paddingTop: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f4f6',
  },
  headerTitle: { fontSize: 16, fontWeight: '700' },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#e5e7eb',
    marginTop: 10,
  },

  card: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#b0c0ffff',
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
  },
  thumb: { width: 90, height: 90, borderRadius: 8 },
  title: { fontSize: 14, fontWeight: '700', color: '#111827' },
  desc: { fontSize: 12, color: '#6b7280', marginTop: 2 },

  rowBetween: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: { fontSize: 14, fontWeight: '700', color: '#111827' },

  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 18,
    backgroundColor: '#fff',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#e5e7eb',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  totalLabel: { fontSize: 12, color: '#6b7280', marginBottom: 2 },
  totalPrice: { fontSize: 18, fontWeight: '700', color: '#111827' },
  currency: { fontSize: 14, fontWeight: '600', color: '#6b7280' },
  buyBtn: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 999,
    marginLeft: 'auto',
  },
  buyBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});

export default BasketPage;
