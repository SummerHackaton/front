import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080812', // Fondo oscuro
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    marginBottom: 16,
    alignItems: 'center',
  },
  festivalName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00FFEA', // Color llamativo sobre fondo oscuro
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#00FFEA',
  },
  storeListContainer: {
    marginBottom: 16,
  },
  storeItem: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(20,20,40,0.85)', // Oscuro y opaco
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,200,255,0.15)',
  },
  storeItemSelected: {
    backgroundColor: 'rgba(0,255,234,0.15)',
    borderColor: '#00FFEA',
    borderWidth: 1.5,
  },
  storeName: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  stockContainer: {
    marginTop: 16,
    padding: 12,
    backgroundColor: 'rgba(20,20,40,0.85)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,200,255,0.15)',
  },
  stockHeader: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 12,
    color: '#00FFEA',
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0,200,255,0.10)',
  },
  productName: {
    flex: 2,
    fontSize: 15,
    color: '#FFFFFF',
  },
  productType: {
    flex: 1,
    fontSize: 14,
    color: '#00FFEA',
    textAlign: 'center',
  },
  productPrice: {
    flex: 1,
    fontSize: 15,
    color: '#FFFFFF',
    textAlign: 'right',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#080812',
  },
  errorText: {
    fontSize: 16,
    color: '#FF5A5F',
  },
});
