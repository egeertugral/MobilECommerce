import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export type searchBarType = {
  textInput?: string;
  textInputStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  isFilterActive?: boolean;
  onSearch?: (term: string) => void;
  onClear?: () => void;
  debounce?: number;
  defaultValue?: string;
  value: string;
  onChangeText: (t: string) => void;
};
