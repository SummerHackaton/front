import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('window');

export const customTabBarStyles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    left: width * 0.02,
    right: width * 0.02,
    bottom: Platform.OS === 'ios' ? 25 : 15,
    height: 60,
    borderRadius: 20,
    backgroundColor: 'rgba(53, 53, 108, 0.46)',
    borderTopWidth: 0,
  },
  tabBarItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  label: {
    fontSize: 12,
    marginTop: 4,
    color: '#00f5ff',
    textShadowColor: 'rgba(0, 245, 255, 0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
  },
});