import {Pressable, View, Text} from 'react-native';
import {BadgeType} from './type';

export const Badge: React.FC<BadgeType> = props => {
  return (
    <Pressable style={props.style} onPress={props.onPress}>
      <Text style={props.textStyle}>{props.cartItemCount}</Text>
    </Pressable>
  );
};
