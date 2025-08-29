import {searchBarType} from './type';
import {Pressable, View, Text, TouchableOpacity, TextInput} from 'react-native';

import {styles} from './style';
import React from 'react';

export const SearchBar: React.FC<searchBarType> = props => {
  const [text, setText] = React.useState('');

  const handleFilter = () => {};

  return (
    <View style={styles.searchWrapper}>
      <TextInput
        style={styles.searchInput}
        placeholder="Ara..."
        placeholderTextColor="#999"
        value={text}
        onChangeText={setText}
      />
      <TouchableOpacity
        onPress={() => props.onPress && props.onPress()}
        style={styles.filterIconWrapper}>
        <Text style={styles.filterIcon}>⚙️</Text>
        {props.isFilterActive && (
          <View style={styles.filterBadge}>
            <Text style={styles.filterBadgeText}>•</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};
