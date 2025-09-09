import { Pressable, View, Text } from 'react-native';
import { BadgeType } from './type';
import React from 'react';
export const Badge: React.FC<BadgeType> = props => {
  // 0, negatif veya undefined ise hiç render etme
  const count = props.cartItemCount ?? 0;
  if (count <= 0) return null;
  return (
    <Pressable style={props.style} onPress={props.onPress}>
      <Text style={props.textStyle}>{props.cartItemCount}</Text>
    </Pressable>
  );
};
