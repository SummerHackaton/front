import { StyleSheet } from 'react-native';
import { globalStyles } from './../styles';
import { getAccessToken } from '../../utils/tokenStore';


const token = getAccessToken();

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(10,20,30,0.96)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#181f2a',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 320,
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  qrContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginVertical: 15,
  },
  codeText: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 2,
    color: '#222',
  },
  instructions: {
    marginTop: 10,
    color: '#555',
    textAlign: 'center',
    fontSize: 14,
    maxWidth: 200,
  },
  actionButton: {
    marginTop: 20,
    backgroundColor: '#00FFEA',
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 30,
  },
  actionButtonText: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#080812', // Fondo oscuro
    padding: 16,
    paddingBottom: 40,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#080812', // Fondo oscuro también en loading
  },
  sectionContainer: {
    marginVertical: 16,
    backgroundColor: 'rgba(20,20,40,0.85)', // Más oscuro y opaco
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,200,255,0.5)',
    padding: 12,
  },
  cartItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartItemInfo: {
    flexDirection: 'column',
  },
  addButton: {
    padding: 4,
  },
  selectedItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(0,200,255,0.15)', // Más sutil en modo oscuro
    marginVertical: 8,
  },
  redeemButton: {
    marginTop: 24,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,255,234,1)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    shadowColor: 'rgba(0,255,234,0.3)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 12,
  },
  redeemButtonText: {
    color: '#080812', // Contraste con el fondo del botón
    fontSize: 16,
    fontWeight: 'bold',
  },
});