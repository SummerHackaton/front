import { StyleSheet, Dimensions, Platform } from 'react-native';

export const customHeaderStyles = StyleSheet.create({
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
    backdropFilter: 'blur(18px)',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#e0e8ff',
    textShadowColor: '#005577',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
  pickerContainer: {
	alignSelf: 'center',
    paddingHorizontal: 12,
    backgroundColor: 'rgba(20, 20, 40, 0.4)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(0, 200, 255, 0.6)',
    shadowColor: 'rgba(0, 200, 255, 0.7)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 4,
    justifyContent: 'center',
  },
  picker: {
    height: 10,
    color: '#00f5ff',
    backgroundColor: 'transparent',
  },
  pickerItem: {

    color: '#e0e8ff',
    backgroundColor: 'rgba(15, 15, 30, 0.9)'
  },
});
export const pickerSelectStyles = StyleSheet.create({
	inputIOS: {
	  fontSize: 16,
	  paddingVertical: 10,
	  paddingHorizontal: 12,
	  borderRadius: 14,
	  color: '#00f5ff',
	  backgroundColor: 'rgba(20, 20, 40, 0.4)',
	  borderWidth: 1,
	  borderColor: 'rgba(0, 200, 255, 0.6)',
	  shadowColor: 'rgba(0, 200, 255, 0.7)',
	  shadowOffset: { width: 0, height: 0 },
	  shadowOpacity: 0.8,
	  shadowRadius: 8,
	},
	inputAndroid: {
	  fontSize: 16,
	  paddingVertical: 10,
	  paddingHorizontal: 12,
	  borderRadius: 14,
	  color: '#00f5ff',
	  backgroundColor: 'rgba(20, 20, 40, 0.9)',
	  borderWidth: 1,
	  borderColor: 'rgba(0, 200, 255, 0.6)',
	  elevation: 4,
	},
	placeholder: {
	  color: '#888',
	},
  });
