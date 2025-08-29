import { ButtonType } from './type';
import { Pressable, View, Text } from 'react-native';

export const Button: React.FC<ButtonType> = props => {
  return (
    <Pressable style={props.style} onPress={props.onPress}>
      <Text style={props.titleStyle}>{props.title}</Text>
    </Pressable>
  );
};
