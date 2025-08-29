import {StyleProp, TextStyle, ViewStyle} from 'react-native';

export type LinkButtonType = {
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};
