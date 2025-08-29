import {LinkButtonType} from './type';
import {Pressable, View, Text} from 'react-native';

export const LinkButton: React.FC<LinkButtonType> = props => {
  return (
    <Pressable style={props.style} onPress={props.onPress}>
      <Text
        style={{
          fontSize: 16,
          color: 'blue',
          marginLeft: 10,
          textDecorationLine: 'underline',
        }}>
        {' '}
        Aramayı Temizle{' '}
      </Text>
    </Pressable>
  );
};
