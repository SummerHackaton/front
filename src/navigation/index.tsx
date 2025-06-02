import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import InicioScreen from '../screens/InicioScreen';
import LoginScreen from '../screens/LoginScreen';
import FeedScreen from '../screens/FeedScreen/FeedScreen';
import PerfilScreen from '../screens/PerfilScreen/PerfilScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CustomHeader } from '../utils/CustomHeader';
import { customTabBarStyles } from '../utils/BottomBarStyles';

export type RootStackParamList = {
  Inicio: undefined;
  Login: undefined;
  MainTabs: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function Tabs() {
return (
	<Tab.Navigator
		screenOptions={({ route }) => ({
			header: () => <CustomHeader currentScreen={route.name} />,
			tabBarStyle: customTabBarStyles.tabBar,
			tabBarItemStyle: customTabBarStyles.tabBarItem,
			tabBarActiveTintColor: '#00f5ff',
			tabBarInactiveTintColor: 'rgba(224, 232, 255, 0.5)',
			tabBarLabelStyle: customTabBarStyles.label,
			tabBarIcon: ({ focused, color, size }) => {
				let iconName;
				if (route.name === 'Feed')
					iconName = focused ? 'home' : 'home-outline';
				else if (route.name === 'Perfil')
					iconName = focused ? 'person' : 'person-outline';

				return <Ionicons name={iconName} size={size} color={color} style={customTabBarStyles.icon} />;
			},
		})}>
		<Tab.Screen name="Feed" component={FeedScreen} />
		<Tab.Screen name="Perfil" component={PerfilScreen} />
	</Tab.Navigator>
);
}

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Inicio" component={InicioScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="MainTabs" component={Tabs} />
    </Stack.Navigator>
  );
}
