import { Pressable, View, Text, Modal, TextInput } from 'react-native';
import { BottomSheetType } from './type';
import { BottomSheetStyle } from './style';
import { Button } from '../../atoms/button/button';
import { useState } from 'react';

export const BottomSheet: React.FC<BottomSheetType> = props => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleFilter = () => {
    // En az bir alan dolu olmalı
    if (!minPrice && !maxPrice) {
      setShowError(true);
      return;
    }
    // String -> number dönüşümleri (boşsa null)

    const min = minPrice ? parseFloat(minPrice) : null;
    const max = maxPrice ? parseFloat(maxPrice) : null;
    props.onFilterApply(min, max);
    // Filtre aktif oldu, hata mesajını gizle, modalı kapat
    setIsFilterActive(true);
    setShowError(false);
    props.onClose();
  };
  console.log(props.visibility);

  const handleClearFilter = () => {
    setMinPrice('');
    setMaxPrice('');
    setIsFilterActive(false);
    setShowError(false);
  };
  return (
    <Modal
      visible={props.visibility} // Modal açık/kapalı durumu
      animationType="slide"
      transparent
      onRequestClose={props.onClose}
    >
      <View style={BottomSheetStyle.modalOverlay}>
        <View style={BottomSheetStyle.modalContent}>
          <Text style={BottomSheetStyle.modalTitle}>Filtrele</Text>

          {/* Minimum fiyat alanı */}
          <TextInput
            style={BottomSheetStyle.modalInput}
            placeholder="En Düşük Fiyat"
            keyboardType="numeric"
            value={minPrice}
            onChangeText={setMinPrice}
          />
          {/* Maksimum fiyat alanı */}
          <TextInput
            style={BottomSheetStyle.modalInput}
            placeholder="En Yüksek Fiyat"
            keyboardType="numeric"
            value={maxPrice}
            onChangeText={setMaxPrice}
          />

          {showError && (
            <Text style={BottomSheetStyle.errorText}>
              ❗ En Az Bir Filtreleme Yapmalısınız
            </Text>
          )}

          {/* Alt buton grubu */}
          <View style={BottomSheetStyle.modalButtons}>
            {isFilterActive ? (
              <Pressable
                style={BottomSheetStyle.cancelButton}
                onPress={handleClearFilter}
              >
                <Text style={BottomSheetStyle.cancelButtonText}>Temizle</Text>
              </Pressable>
            ) : (
              <Button
                style={BottomSheetStyle.cancelButton}
                onPress={() => {
                  setShowError(false);
                  props.onClose();
                }}
                title="Vazgeç"
                titleStyle={BottomSheetStyle.cancelButtonText}
              ></Button>
            )}
            {/* Filtrele butonu validasyon +  modalı kapatır */}
            <Button
              style={BottomSheetStyle.filterButton}
              title="Filtrele"
              titleStyle={BottomSheetStyle.filterButtonText}
              onPress={handleFilter}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};
