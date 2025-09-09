import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { styles } from './style';
import { QuantityButton } from '../../atoms/quantityButton/quantityButton';
import { NumericInputProps } from './type';

export const NumericInput: React.FC<NumericInputProps> = ({
  value,
  onChange,
  initialValue = 1,
  min = 1,
}) => {
  const [internal, setInternal] = useState(initialValue);
  // kontrollü mü? (value prop’u gelmişse)
  const controlled = typeof value === 'number';
  // ekranda gösterilecek anlık sayı
  const current = controlled ? (value as number) : internal;
  // dışarıdan initialValue değişirse (ve kontrollü değilsek) local’i güncelle
  useEffect(() => {
    if (!controlled) setInternal(initialValue);
  }, [initialValue, controlled]);

  const setVal = (v: number) => {
    if (!controlled) setInternal(v);
    onChange(v);
  };

  const handleDecrease = () => {
    if (current > min) setVal(current - 1);
  };
  const handleIncrease = () => {
    setVal(current + 1);
  };
  return (
    <View style={styles.container}>
      <QuantityButton icon="-" onPress={handleDecrease} />
      <Text style={styles.value}>{value}</Text>
      <QuantityButton icon="+" onPress={handleIncrease} />
    </View>
  );
};
