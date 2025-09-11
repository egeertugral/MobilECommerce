import { searchBarType } from './type';
import {
  Pressable,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import { styles } from './style';
import React from 'react';

export const SearchBar: React.FC<searchBarType> = ({
  value,
  onChangeText,
  onPress,
  isFilterActive,
  onSearch,
  onClear,
  debounce = 500,
}) => {
  React.useEffect(() => {
    const id = setTimeout(() => {
      const term = value.trim();

      if (term.length >= 2) {
        // 2 ve üzeri karakterse arama bildir
        onSearch?.(term);
      } else {
        // 0 veya 1 karakterse arama temizlensin
        onClear?.();
      }
    }, debounce);
    // text/debounce değiştiğinde önceki timer iptal edilir
    return () => clearTimeout(id);
  }, [value, debounce, onSearch, onClear]);

  return (
    <View style={styles.searchWrapper}>
      <TextInput
        style={styles.searchInput}
        placeholder="Ara..."
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
      />
      {/* Sağdaki filtre butonu */}
      <TouchableOpacity onPress={onPress} style={styles.filterIconWrapper}>
        <Text style={styles.filterIcon}>⚙️</Text>
        {isFilterActive && (
          <View style={styles.filterBadge}>
            <Text style={styles.filterBadgeText}>•</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};
