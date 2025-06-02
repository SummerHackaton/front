import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

type Product = {
  id: string;
  cantidad: number;
  // …otros campos que definas en tu backend
};

type PaymentQRModalProps = {
  visible: boolean;
  onClose: () => void;
  products: Product[];
  userId: string;
};

/**
 * Modal que muestra un QR con la URL para activar el pago.
 * - El camarero, al escanear, hará GET a /api/1.0/payment/trigger?...
 */
export const PaymentQRModal: React.FC<PaymentQRModalProps> = ({
  visible,
  onClose,
  products,
  userId,
}) => {
  // Generar la URL codificada
  const productsJson = encodeURIComponent(JSON.stringify(products));
  const qrUrl = `https://TU_DOMINIO/api/1.0/payment/trigger?userId=${encodeURIComponent(
    userId
  )}&products=${productsJson}`;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Pago pendiente</Text>
          <Text style={styles.instruction}>
            Escanea este código para procesar el pago
          </Text>

          <View style={styles.qrWrapper}>
            <QRCode
              value={qrUrl}
              size={200}
              // color="#000" // no hace falta especificar color
              // backgroundColor="white"
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // semitransparente
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  instruction: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  qrWrapper: {
    marginBottom: 20,
    // opcional: darle sombra/redondeo al QR
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
