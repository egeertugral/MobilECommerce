import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  value: {
    minWidth: 24, // dar alanda kaybolmasın
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#111', // beyaz zeminde görünür
  },
});
