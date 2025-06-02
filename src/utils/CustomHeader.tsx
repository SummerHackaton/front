import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { DropFilterContext } from '../context/DropFilterContext';

type Props = {
  currentScreen: string;
};

export const CustomHeader = ({ currentScreen }: Props) => {
  const { filtro, setFiltro } = useContext(DropFilterContext);
  const [open, setOpen] = useState(false);


  // Para que el ancho se adapte (opcional):
  const [pickerWidth, setPickerWidth] = useState(175);

  useEffect(() => {
    // aquí podrías medir el label actual y ajustar pickerWidth
  }, [filtro]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{currentScreen}</Text>

      {currentScreen === 'Feed' && (
        <View style={{ width: pickerWidth }}>
          
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 50 : 40,
    paddingBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgb(0, 0, 60)',
    borderBottomWidth: 1,
    borderBottomColor: 'hsla(193, 100%, 67.8%, 0.55)',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#e0e8ff',
    textShadowColor: '#005577',
    textShadowRadius: 6,
  },
  dropdown: {
    backgroundColor: 'rgba(20, 20, 40, 0.4)',
    borderColor: 'rgba(0, 200, 255, 0.6)',
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 40,
  },
  dropdownContainer: {
    backgroundColor: 'rgba(15, 15, 30, 0.9)',  // <-- tu color de fondo aquí
    borderColor: 'rgba(0, 200, 255, 0.6)',
    borderRadius: 14,
    marginTop: 4,
  },
  text: {
    color: '#00f5ff',
    fontSize: 16,
  },
});
