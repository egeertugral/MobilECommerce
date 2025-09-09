import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export type BadgeType = {
  textStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
  cartItemCount: number; // Sepetteki ürün sayısı
  style?: StyleProp<ViewStyle>;
};
