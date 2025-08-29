import React from 'react';
import {View, Text, Image} from 'react-native';
import {ProductDetailProps} from './type';
import {styles} from './style';

export const ProductDetail: React.FC<ProductDetailProps> = ({product}) => {
  return (
    <View style={styles.container}>
      <Image
        source={{uri: product.images[0]}}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>{product.price}₺</Text>
      <Text style={styles.description}>{product.description}</Text>
    </View>
  );
};
