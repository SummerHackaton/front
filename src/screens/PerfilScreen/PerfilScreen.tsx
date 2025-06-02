import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  Alert,
  Modal,
  Image,
} from 'react-native';
import api from '../../api/axiosInstance';
import { styles } from './PerfilStyles';
import { globalStyles } from './../styles';
import { Ionicons } from '@expo/vector-icons';
import { generateRandomCode } from '../../utils/codeGenerator';
import { Base64 } from 'js-base64';

const { width: screenWidth } = Dimensions.get('window');

type CartItem = {
  id: string;
  name: string;
  cost: number;
};

const CART_EXAMPLE: CartItem[] = [
  { id: '1', name: 'Coca Cola', cost: 2 },
  { id: '2', name: 'Sándwich', cost: 5 },
  { id: '3', name: 'Copa', cost: 8 },
  { id: '4', name: 'Nestea', cost: 2 },
  { id: '5', name: 'Perrito Caliente', cost: 5 },
  { id: '6', name: 'Pizza', cost: 5 },
];

const COIN_PACKS = [
  { id: 'pack1', coins: 10, price: 15 },
  { id: 'pack2', coins: 25, price: 30 },
  { id: 'pack3', coins: 60, price: 60 },
];

export default function PerfilScreen() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState<number>(0);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<CartItem[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPack, setSelectedPack] = useState<string | null>(null);
  const [redeemModalVisible, setRedeemModalVisible] = useState(false);
    const [qrUriState, setQrUriState] = useState<string>('');

  const [redemptionCode, setRedemptionCode] = useState<string>('');

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        const resCoins = await api.get<{ coins: number }>('/users/myCoins');
        const resCart = await api.get<CartItem[]>('/cart/items');

        if (!mounted) return;

        setCoins(resCoins.data.coins);
        setCartItems(resCart.data.length > 0 ? resCart.data : CART_EXAMPLE);
      } catch (err) {
        setCoins(20);
        setCartItems(CART_EXAMPLE);
        console.error('Error fetching Perfil data:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  const handleAddToSelected = useCallback(
    (item: CartItem) => {
      if (selectedItems.find((i) => i.id === item.id)) return;
      setSelectedItems((prev) => [...prev, item]);
      setCartItems((prev) => prev.filter((i) => i.id !== item.id));
    },
    [selectedItems]
  );

  const handleRedeem = useCallback(async () => {
    if (selectedItems.length === 0) return;

    // 1) Generar código único
    const newCode = generateRandomCode(12);
    setRedemptionCode(newCode);

    // 2) Construir el objeto qrData con los elementos actuales
    const qrDataObj = {
      userId: 'USER_ID_AQUI', // Aquí sí podrías sustituir por el ID real del usuario
      productsToRetrieve: selectedItems.map((item) => ({
        name: item.name,
        price: item.cost.toFixed(2),
      })),
    };

    // 3) Codificar qrData y generar URL del QR
    const qrDataString = JSON.stringify(qrDataObj);
    const encoded = Base64.encode(qrDataString);
    const uri = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
      `https://engaged-daring-moray.ngrok-free.app/api/1.0/automator/canjeador-demo/${encoded}`
    )}`;
    setQrUriState(uri);

    // 4) Mostrar modal del QR
    setRedeemModalVisible(true);

    // 5) Limpiar selección (¡OJO! Esto ocurre después de haber guardado `qrUriState`)
    setSelectedItems([]);

    // Si tuvieses que enviar al backend, lo harías aquí:
    // await api.post('/redemptions', { items: selectedItems, code: newCode });
  }, [selectedItems]);


  const handleBuyCoins = () => {
    if (!selectedPack) return;
    const pack = COIN_PACKS.find(p => p.id === selectedPack);
    if (pack) {
      setCoins(prev => prev + pack.coins);
      setModalVisible(false);
      setSelectedPack(null);
      Alert.alert('Compra realizada', `Has comprado ${pack.coins} monedas por ${pack.price}€`);
    }
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const renderCartItem = ({ item }: { item: CartItem }) => {
    const alreadySelected = Boolean(selectedItems.find((i) => i.id === item.id));
    return (
      <View style={styles.cartItemContainer}>
        <View style={[styles.cartItemInfo, { flexDirection: 'row', alignItems: 'center' }]}>
          <Text style={globalStyles.commonText}>{item.name}</Text>
          <Text style={[globalStyles.commonText, { color: '#00FFEA', marginLeft: 8 }]}>
            {item.cost} 🪙
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => handleAddToSelected(item)}
          disabled={alreadySelected}
          style={[
            styles.addButton,
            alreadySelected && { opacity: 0.4 },
          ]}
        >
          <Ionicons name="add-circle-outline" size={28} color="#00FFEA" />
        </TouchableOpacity>
      </View>
    );
  };

  const renderSelectedItem = ({ item }: { item: CartItem }) => (
    <View style={styles.selectedItemContainer}>
      <Text style={globalStyles.commonText}>{item.name}</Text>
      <Text style={[globalStyles.commonText, { color: '#00FFEA' }]}>
        {item.cost} 🪙
      </Text>
    </View>
  );

  // URL base para generar el QR usando el servicio de API externa
const qrData = JSON.stringify({
	userId: 'USER_ID_AQUI', // Reemplaza con el userId real si lo tienes
	productsToRetrieve: selectedItems.map(item => ({
		name: item.name,
		price: item.cost.toFixed(2), // Enviar como string decimal para BigDecimal en Java
	})),
});
const qrUri = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
  `https://engaged-daring-moray.ngrok-free.app/api/1.0/automator/canjeador-demo/${Base64.encode(qrData)}`
)}`;

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { paddingBottom: 80 }]}
      keyboardShouldPersistTaps="handled"
    >
      <View style={globalStyles.bgShape1} />
      <View style={globalStyles.bgShape2} />

      {/* Encabezado con nombre de usuario y botón añadir saldo */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 12,
        }}
      >
        <Text style={globalStyles.title}>💰 Tus Monedas: {coins}</Text>
        <TouchableOpacity
          style={{
            backgroundColor: '#00FFEA',
            paddingHorizontal: 14,
            paddingVertical: 8,
            borderRadius: 20,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="add-circle" size={22} color="#222" />
        </TouchableOpacity>
      </View>

      {/* Modal para packs de monedas */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(10,20,30,0.92)', // Fondo oscuro más opaco
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              backgroundColor: '#181f2a', // Fondo oscuro para el modal
              borderRadius: 16,
              padding: 24,
              width: '80%',
              alignItems: 'center',
              elevation: 8,
            }}
          >
            {/* Botón cerrar */}
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{
                position: 'absolute',
                top: 12,
                right: 12,
                zIndex: 2,
                padding: 4,
              }}
            >
              <Ionicons name="close-circle" size={28} color="#00FFEA" />
            </TouchableOpacity>
            <Text style={[globalStyles.title2, { marginBottom: 18, color: '#fff' }]}>
              Comprar monedas
            </Text>
            {COIN_PACKS.map((pack) => (
              <TouchableOpacity
                key={pack.id}
                onPress={() => setSelectedPack(pack.id)}
                style={{
                  borderWidth: 2,
                  borderColor: selectedPack === pack.id ? '#00FFEA' : '#222b3a',
                  borderRadius: 12,
                  padding: 14,
                  marginBottom: 12,
                  width: '100%',
                  alignItems: 'center',
                  backgroundColor: selectedPack === pack.id ? '#1e2a38' : '#222b3a',
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}>
                  {pack.coins} monedas - {pack.price}€
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              onPress={handleBuyCoins}
              disabled={!selectedPack}
              style={{
                marginTop: 10,
                backgroundColor: selectedPack ? '#00FFEA' : '#444c5c',
                paddingHorizontal: 24,
                paddingVertical: 10,
                borderRadius: 20,
                opacity: selectedPack ? 1 : 0.6,
              }}
            >
              <Text style={{ color: selectedPack ? '#222' : '#ccc', fontWeight: 'bold', fontSize: 16 }}>
                Comprar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal para canjear con QR */}
      <Modal
        visible={redeemModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setRedeemModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Botón cerrar */}
            <TouchableOpacity
              onPress={() => setRedeemModalVisible(false)}
              style={styles.closeButton}
            >
              <Ionicons name="close-circle" size={28} color="#00FFEA" />
            </TouchableOpacity>

            {/* Contenido del QR */}
            <View style={styles.qrContainer}>
              <Image
                source={{ uri: qrUriState }}
                style={{ width: 180, height: 180, marginBottom: 12 }}
              />
              <Text style={styles.codeText}>{redemptionCode}</Text>
              <Text style={styles.instructions}>
                Muestra este código en el punto de recogida
              </Text>
            </View>

            {/* Botón de acción */}
            <TouchableOpacity
              onPress={() => setRedeemModalVisible(false)}
              style={styles.actionButton}
            >
              <Text style={styles.actionButtonText}>Entendido</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Sección: Carrito de compra */}
      <View style={styles.sectionContainer}>
        <Text style={globalStyles.title2}>Tus compras</Text>
        {cartItems.length === 0 ? (
          <Text style={globalStyles.commonText}>
            No hay artículos en tu carrito.
          </Text>
        ) : (
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id + Math.random()}
            renderItem={renderCartItem}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            style={{ maxHeight: 150 }}
          />
        )}
      </View>

      {/* Sección: Artículos seleccionados para canjear */}
      <View style={styles.sectionContainer}>
        <Text style={globalStyles.title2}>Canjear</Text>
        {selectedItems.length === 0 ? (
          <Text style={globalStyles.commonText}>No has seleccionado nada.</Text>
        ) : (
          <FlatList
            data={selectedItems}
            keyExtractor={(item) => item.id + Math.random()}
            renderItem={renderSelectedItem}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            style={{ maxHeight: 175 }}
          />
        )}
      </View>

      <TouchableOpacity
        onPress={handleRedeem}
        disabled={selectedItems.length === 0}
        style={[
          styles.redeemButton,
          selectedItems.length === 0 && { opacity: 0.5 },
          { marginBottom: 24 },
        ]}
      >
        <Text style={styles.redeemButtonText}>
          Canjear Productos Seleccionados
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
