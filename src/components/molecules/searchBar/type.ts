import {StyleProp, TextStyle, ViewStyle} from 'react-native';

export type searchBarType = {
  textInput?: string;
  textInputStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  isFilterActive?: boolean;
};
