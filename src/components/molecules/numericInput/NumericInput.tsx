import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {styles} from './style';
import {QuantityButton} from '../../atoms/quantityButton/quantityButton';
import {NumericInputProps} from './type';

export const NumericInput: React.FC<NumericInputProps> = ({
  onChange,
  initialValue = 1,
}) => {
  const [value, setValue] = useState(initialValue);

  const handleDecrase = () => {
    if (value > 1) {
      const newValue = value - 1;
      setValue(newValue);
      onChange(newValue);
    }
  };
  const handleIncrease = () => {
    const newValue = value + 1;
    setValue(newValue);
    onChange(newValue);
  };
  return (
    <View style={styles.container}>
      <QuantityButton icon="-" onPress={handleDecrase} />
      <Text style={styles.value}>{value}</Text>
      <QuantityButton icon="+" onPress={handleIncrease} />
    </View>
  );
};
