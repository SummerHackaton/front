import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation';
import { DropFilterProvider } from "./src/context/DropFilterContext";

export default function App() {
  return (
    <DropFilterProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </DropFilterProvider>
  );
}
