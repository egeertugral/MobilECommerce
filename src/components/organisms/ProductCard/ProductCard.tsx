// src/components/organisms/ProductCard/ProductCard.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import type { Product } from '../../../apı/models/Products';
import { useFavoritesStore } from '../../../store/favorites';

type Props = {
  product: Product;
  onPress?: () => void;
};

const ProductCard: React.FC<Props> = ({ product, onPress }) => {
  const isFav = useFavoritesStore(s => s.isFavorite(product.id));
  const toggle = useFavoritesStore(s => s.toggle);

  return (
    <View style={styles.card}>
      <View>
        <Image source={{ uri: product.images[0] }} style={styles.img} />

        {/* KALP: boyanabilir Unicode – E M O J I  D E Ğ İ L */}
        <TouchableOpacity
          style={styles.heartBtn}
          onPress={() => toggle(product)}
        >
          <Text
            style={[styles.heartText, { color: isFav ? '#ef4444' : '#9ca3af' }]}
          >
            {isFav ? '\u2665' : '\u2661'}
            {/* ♥ (U+2665) dolu, ♡ (U+2661) boş */}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.price}>{product.price} ₺</Text>
      <Text style={styles.title} numberOfLines={1}>
        {product.title}
      </Text>

      <TouchableOpacity style={styles.cta} onPress={onPress}>
        <Text style={styles.ctaText}>İncele</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 170,
    borderRadius: 12,
    backgroundColor: '#fff',
    padding: 10,
    margin: 8,
    elevation: 2,
  },
  img: { width: '100%', height: 110, borderRadius: 10 },
  heartBtn: {
    position: 'absolute',
    right: 8,
    top: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ffffffcc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartText: {
    fontSize: 14,
    fontWeight: '700',
    includeFontPadding: false,
    textAlignVertical: 'center',
    // DİKKAT: burada **color tanımı yok**
  },
  price: { marginTop: 8, fontSize: 12, fontWeight: '700', color: '#111' },
  title: { fontSize: 14, color: '#000000ff' },
  cta: {
    marginTop: 8,
    backgroundColor: '#ef4444',
    paddingVertical: 8,
    borderRadius: 999,
    alignItems: 'center',
  },
  ctaText: { color: '#fff', fontWeight: '700' },
});

export default ProductCard;
