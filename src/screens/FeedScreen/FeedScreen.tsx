import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import api from '../../api/axiosInstance';
import { styles } from './feedStyles';
import { globalStyles } from './../styles';
import { getAccessToken } from '../../utils/tokenStore';


const token = getAccessToken();

type Product = {
  id: string;
  name: string;
  type: string;
  price: number;
};

type Store = {
  id: string;
  name: string;
  owner: string;
  stock: Product[];
};

type Festival = {
  id: string;
  name: string;
  startDate: [number, number, number];
  endDate: [number, number, number];
  stores: Store[];
};

export default function FestivalStoresScreen() {
  const [loading, setLoading] = useState<boolean>(true);
  const [festival, setFestival] = useState<Festival | null>(null);
  const [stores, setStores] = useState<Store[]>([]);
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);
  const [tokenLoaded, setTokenLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Esperar a que el token esté almacenado antes de disparar la llamada
  useEffect(() => {
    let mounted = true;

    const waitForTokenAndFetch = async () => {
      try {
        const token = getAccessToken();
        if (!mounted) return;

        if (!token) {
          setError('No se encontró el token. Asegúrate de haber iniciado sesión correctamente.');
          setLoading(false);
          return;
        }

        // Opcional: si tu instancia de axios no establece el header automáticamente,
        // puedes asignarlo aquí:
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        setTokenLoaded(true);

        // Una vez tenemos el token listo, hacemos la llamada al endpoint
        const res = await api.post<Festival>('/api/1.0/festival/findByLocation', {
          x: 40.415000,
          y: -3.702500,
        });

        if (!mounted) return;

        const fetchedFestival = res.data;
        setFestival(fetchedFestival);
        setStores(fetchedFestival.stores || []);
      } catch (err) {
        console.error('Error fetching festival data:', err);
        setError('Error al obtener los datos del festival. Intenta nuevamente más tarde.');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    waitForTokenAndFetch();

    return () => {
      mounted = false;
    };
  }, []);

  const handleSelectStore = useCallback((storeId: string) => {
    setSelectedStoreId((prev) => (prev === storeId ? null : storeId));
  }, []);

  const renderStoreItem = ({ item }: { item: Store }) => {
    const isSelected = item.id === selectedStoreId;
    return (
      <TouchableOpacity
        onPress={() => handleSelectStore(item.id)}
        style={[
          styles.storeItem,
          isSelected && styles.storeItemSelected,
        ]}
      >
        <Text style={styles.storeName}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const renderProductRow = (product: Product) => (
    <View style={styles.productRow} key={product.id}>
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productType}>{product.type}</Text>
      <Text style={styles.productPrice}>{product.price} €</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#00FFEA" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!festival) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>No se encontró información del festival.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Encabezado: Nombre del Festival */}
      <View style={styles.header}>
        <Text style={styles.festivalName}>{festival.name}</Text>
      </View>

      {/* Sección de Tiendas */}
      <View style={styles.storeListContainer}>
        <Text style={styles.sectionTitle}>Tiendas Disponibles</Text>
        {stores.length === 0 ? (
          <Text style={globalStyles.commonText}>No hay tiendas disponibles.</Text>
        ) : (
          <FlatList
            data={stores}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={renderStoreItem}
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>

      {/* Sección de Productos de la Tienda Seleccionada */}
      {selectedStoreId && (
        <View style={styles.stockContainer}>
          <Text style={styles.stockHeader}>Productos en &quot;{stores.find(s => s.id === selectedStoreId)?.name}&quot;</Text>
          {stores
            .find((s) => s.id === selectedStoreId)
            ?.stock.map((prod) => renderProductRow(prod))}
        </View>
      )}
    </ScrollView>
  );
}
