import React from 'react';
import { View, ActivityIndicator, StyleSheet, Modal } from 'react-native';
import useLoaderStore from '../../store/loaderStore';

const Loader = () => {
  const loading = useLoaderStore(state => state.loading); // Sadece loading state'ini alıyorum.

  return (
    // eğer loading true ise modal görünecek
    <Modal visible={loading} transparent>
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color="#6495ED" />
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  overlay: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#00000040', // Yarı saydam siyah arka plan
  },
});

export default Loader;
