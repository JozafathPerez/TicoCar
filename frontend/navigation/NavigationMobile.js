import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../context/UserContext';

export default function NavigationMobile() {
  const { user, setUser } = useContext(UserContext);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const menuItems = [
    { name: 'Inicio', route: 'Home' },
    { name: 'Comprar', route: 'Comprar' },
    { name: 'Vender', route: 'Vender' },
    { name: 'Comparar', route: 'Comparar' },
  ];

  const handleLogout = () => {
    setUser(null);
    navigation.navigate('LoginPage');
  };

  return (
    <ScrollView style={{ paddingTop: insets.top, backgroundColor: 'white' }}>
      <View className="flex items-center mt-8">
        {/* Ícono de usuario */}
        <Image
          source={require('../assets/icon.png')}
          style={{ width: 60, height: 60, tintColor: 'black' }}
        />
        {user ? (
          <>
            <Text className="text-black text-lg mt-4">{user.nombre}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('UserInfo')} className="flex-row items-center mt-4">
              <Text className="ml-2">Mi Perfil</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity onPress={() => navigation.navigate('Registro')} className="flex-row items-center mt-4">
            <Text className="ml-2">Iniciar Sesión </Text>
          </TouchableOpacity>
        )}
      </View>

      <View className="mt-8">
        {/* Opciones del menú */}
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate(item.route)}
            className="flex-row items-center p-4 border-b border-gray-300"
          >
            <Text className="text-black text-lg ml-4">{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}