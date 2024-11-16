import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function NavigationMobile() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const menuItems = [
    { name: 'Inicio', route: 'Home' },
    { name: 'Comprar', route: 'Comprar' },
    { name: 'Vender', route: 'Vender' },
    { name: 'Comparar', route: 'Comparar' },
    { name: 'Registro', route: 'Registro' },
  ];

  return (
    <ScrollView style={{ paddingTop: insets.top, backgroundColor: 'white' }}>
      <View className="flex items-center mt-8">
        {/* Ícono de usuario */}
        <Image
          source={require('../assets/icon.png')}
          style={{ width: 60, height: 60, tintColor: 'black' }}
        />
        <Text className="text-black text-lg mt-4">Ingresar</Text>
      </View>

      <View className="mt-8">
        {/* Opciones del menú */}
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate(item.route)}
            className="flex-row items-center p-4 border-b border-gray-300"
          >
            <Image source={item.icon} style={{ width: 24, height: 24, tintColor: 'gray' }} />
            <Text className="text-black text-lg ml-4">{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
