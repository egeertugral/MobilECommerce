import {StyleProp, TextStyle, ViewStyle} from 'react-native';

export type BottomSheetType = {
  title: string;
  titleStyle?: StyleProp<TextStyle>;
  textInput1?: string;
  textInput2?: string;
  style?: StyleProp<ViewStyle>;
  visibility?: boolean;
  onClose: () => void;
  onFilterApply: (min: number | null, max: number | null) => void;
};
