// src/components/pages/FavoritesPage.tsx
import React from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/type';
import ProductCard from '../organisms/ProductCard/ProductCard';
import { useFavoritesStore } from '../../store/favorites';

type Nav = NativeStackNavigationProp<RootStackParamList, 'FavoritesPage'>;

const FavoritesPage = () => {
  const navigation = useNavigation<Nav>();
  const items = useFavoritesStore(s => s.items);

  if (items.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyTitle}>Favori Listeniz Boş</Text>
        <Text style={styles.emptySub}>
          Beğendiklerinizi favorilere ekledikçe burada göreceksiniz
        </Text>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.navigate('HomePage')}
        >
          <Text style={styles.backBtnText}>Ana Sayfaya Dön</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 12, backgroundColor: '#f5f6f7' }}>
      <FlatList
        data={items}
        keyExtractor={it => it.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ gap: 12 }}
        contentContainerStyle={{ gap: 12, paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={{ flex: 1 }}>
            <ProductCard
              product={item}
              onPress={() =>
                navigation.navigate('ProductDetailPage', { product: item })
              }
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
    marginBottom: 6,
  },
  emptySub: {
    fontSize: 13,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 16,
  },
  backBtn: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 999,
  },
  backBtnText: { color: '#fff', fontWeight: '700' },
});

export default FavoritesPage;
