// App.js

import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import NavigationBar from './navigation/NavigationBar'; // Barra de navegación
import HomePage from './pages/HomePage';
import BuyPage from './pages/BuyPage';
import SellPage from './pages/SellPage';
import ComparePage from './pages/ComparePage';
import LoginPage from './pages/LoginPage';

import NavigationMobile from './navigation/NavigationMobile';

import './global.css';

import { UserProvider } from './context/UserContext'; // Importar el UserProvider

const Stack = createStackNavigator();

export default function App() {
  return (
    <UserProvider> {/* Envolver la aplicación con UserProvider */}
      <SafeAreaProvider>
        <NavigationContainer>
          {/* Barra de navegación siempre visible */}
          <NavigationBar /> 
          {/* Contenido dinámico de las páginas */}
          <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false, }}>

            <Stack.Screen name="Home" component={HomePage} />
            <Stack.Screen name="Comprar" component={BuyPage} />
            <Stack.Screen name="Vender" component={SellPage} />
            <Stack.Screen name="Comparar" component={ComparePage} />
            <Stack.Screen name="Registro" component={LoginPage} />

            <Stack.Screen name="NavigationMobile" component={NavigationMobile} />

          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </UserProvider>
  );
}