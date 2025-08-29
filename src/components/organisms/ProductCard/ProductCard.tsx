import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from '../../atoms/button/button';
import { ProductCardProps } from './type';
import { styles } from './style';

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  price,
  image,
  onPress,
}) => {
  //  console.log('Gelen image:', image);
  const [isFavorite, setIsFavorite] = useState(false);
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    console.log('isFavorite:', !isFavorite);
  };

  return (
    <View style={styles.card}>
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="cover"
        />
        <TouchableOpacity style={styles.heartIcon} onPress={toggleFavorite}>
          <Text style={{ fontSize: 18 }}>{isFavorite ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>

        <View style={styles.priceTag}>
          <Text style={styles.price}>{price} ₺</Text>
        </View>
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>
        A description, description, description.
      </Text>
      <Button
        style={styles.button}
        title="İncele"
        titleStyle={styles.buttonText}
        onPress={onPress}
      />
    </View>
  );
};

export default ProductCard;
