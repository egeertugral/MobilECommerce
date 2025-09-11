import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import { BottomSheet } from '../organisms/BottomSheet/BottomSheet';
import { SearchBar } from '../molecules/searchBar/searchBar';
import useProductService from '../../apı/ProductService';
import ProductCard from '../organisms/ProductCard/ProductCard';
import type { Product } from '../../apı/models/Products';

//Navigasyonlar sayfalar arası geçiş için
import { useNavigation } from '@react-navigation/native';
import type { RootStackParamList } from '../../navigation/type';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useBasketStore } from '../../store/basketStore';
import { Badge } from '../molecules/badge/badge';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';

const HomePage = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [visible, setVisible] = useState(false);
  // 🔎 arama state'i
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [searchText, setSearchText] = React.useState('');
  // filteredProducts: Arama/filtre sonucu gösterilecek ürün listesi
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // sepetteki toplam ürün adedi
  const cartCount = useBasketStore(s =>
    s.items.reduce((sum, ci) => sum + ci.qty, 0),
  );
  // products: API’den gelen tüm ürünler
  // getProducts: ürünleri çeken fonksiyon
  const { products, getProducts } = useProductService();
  console.log('Gelen ürünler:', products);
  // products değiştiğinde filteredProducts’u güncellemek için useEffect
  useEffect(() => {
    if (products) {
      setFilteredProducts(products);
    }
  }, [products]);

  // Sayfa yüklendiğinde ürünleri çek
  useEffect(() => {
    getProducts();
  }, []); // Boş bağımlılık dizisi olduğundan  sadece ilk renderda çalışacak

  // handleFilterApply: Fiyat aralığına göre listeyi filtreler
  const handleFilterApply = (min: number | null, max: number | null) => {
    const filtered =
      products?.filter(product => {
        const price = product.price;
        if (min !== null && max !== null) {
          return price >= min && price <= max;
        } else if (min !== null) {
          return price >= min;
        } else if (max !== null) {
          return price <= max;
        }
        return true;
      }) || []; // products undifined dönerse boş liste atasın diye yaptım

    setFilteredProducts(filtered);
  };

  const handleSearch = (term: string) => {
    setIsSearching(true);
    const filtered =
      products?.filter(p =>
        `${p.title} ${p.description}`
          .toLowerCase()
          .includes(term.toLowerCase()),
      ) ?? [];
    setFilteredProducts(filtered);
  };

  const handleClearSearch = () => {
    setSearchText(''); // <-- inputu gerçekten boşaltır
    setIsSearching(false);
    setFilteredProducts(products ?? []);
  };
  const listData =
    searchText.trim().length >= 2 ? filteredProducts : products ?? [];
  //Header, SearchBar ve ürün grid’i (FlatList)
  return (
    <View style={styles.container}>
      <View style={styles.divider} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('FavoritesPage')}>
          <Text style={styles.icon}>❤️</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Passo E-Commerce</Text>
        <TouchableOpacity onPress={() => navigation.navigate('BasketPage')}>
          <View style={styles.cartWrapper}>
            <Text style={styles.icon}>🛒</Text>
          </View>
          {/* Badge sadece sepet doluysa çıkar */}
          <Badge
            cartItemCount={cartCount}
            style={{
              position: 'absolute',
              right: -10,
              top: -6,
              backgroundColor: 'red',
              borderRadius: 10,
              paddingHorizontal: 5,
              paddingVertical: 2,
            }}
            textStyle={{ color: '#fff', fontSize: 10, fontWeight: 'bold' }}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      <SearchBar
        value={searchText} // <-- controlled value
        onChangeText={setSearchText} // <-- controlled setter
        onPress={() => setVisible(true)}
        isFilterActive={filteredProducts.length !== products?.length}
        onSearch={handleSearch}
        onClear={handleClearSearch}
        debounce={500}
      />
      {isSearching && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 12,
            marginBottom: 8,
          }}
        >
          <Text style={{ fontWeight: '700', color: '#111' }}>
            Bulunan Sonuçlar
          </Text>
          <TouchableOpacity onPress={handleClearSearch}>
            <Text style={{ color: '#2563eb', fontWeight: '600' }}>
              Aramayı Temizle
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        data={listData}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={{ flex: 1, margin: 6 }}>
            <ProductCard
              product={item}
              onPress={() => {
                //Kart tıklanınca detay sayfasına navigation ile geçiş oluyor.
                navigation.navigate('ProductDetailPage', { product: item });
              }}
            />
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 4 }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        showsVerticalScrollIndicator={false}
      />

      <BottomSheet
        visibility={visible}
        title="Filtrele"
        onClose={() => setVisible(false)} // ==> Filtre paneli (min-max fiyat)
        onFilterApply={handleFilterApply}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0eb',
    marginVertical: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 4,
  },
  icon: {
    fontSize: 20,
    color: 'red',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    flex: 1,
  },
  cartWrapper: {
    flex: 1,
    marginBottom: 16,
    marginHorizontal: 4,
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -10,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  badgeText: {
    color: 'white',
    fontSize: 9,
    fontWeight: 'bold',
  },
  searchWrapper: {
    position: 'relative',
    marginTop: 16,
  },
  searchInput: {
    padding: 10,
    paddingRight: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  filterIconWrapper: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  filterIcon: {
    fontSize: 18,
    color: '#444',
  },
  filterBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: 'red',
    width: 12,
    height: 12,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterBadgeText: {
    color: '#fff',
    fontSize: 8,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
    marginBottom: 24,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    marginBottom: 12,
    marginLeft: 6,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    gap: 12,
  },
  cancelButton: {
    paddingVertical: 12,
    backgroundColor: 'transparent',
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 25,
    flex: 1,
  },
  cancelButtonText: {
    color: 'red',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  filterButton: {
    paddingVertical: 12,
    backgroundColor: 'red',
    borderRadius: 25,
    flex: 1,
  },
  filterButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardWrapper: {
    width: '48%',
    marginBottom: 12,
  },
});

export default HomePage;
