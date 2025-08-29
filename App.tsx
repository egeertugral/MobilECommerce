import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Uygulama ekranlarım
import HomePage from './src/components/pages/HomePage';
import ProductDetailPage from './src/components/pages/ProductDetailPage';

import type { RootStackParamList } from './src/navigation/type';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomePage" component={HomePage} />
      <Stack.Screen name="ProductDetailPage" component={ProductDetailPage} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
