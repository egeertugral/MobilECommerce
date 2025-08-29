import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import {QuantityButtonProps} from './type';
import {styles} from './style';

export const QuantityButton: React.FC<QuantityButtonProps> = ({
  icon,
  onPress,
}) => (
  <Pressable onPress={onPress} style={styles.button}>
    <Text style={styles.icon}>{icon}</Text>
  </Pressable>
);
