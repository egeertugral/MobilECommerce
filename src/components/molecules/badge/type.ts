import {StyleProp, TextStyle, ViewStyle} from 'react-native';

export type BadgeType = {
  text: string;
  textStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
  cartItemCount: string;
  style?: StyleProp<ViewStyle>;
};
