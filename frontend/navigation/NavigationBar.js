import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Bars3Icon, XMarkIcon, UserIcon, LogoutIcon } from 'react-native-heroicons/outline';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { UserContext } from '../context/UserContext';

export default function NavigationBar() {
  const { user, setUser } = useContext(UserContext);
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions(); // Obtener el ancho de la pantalla
  const isLargeScreen = width >= 768; // Para pantallas más grandes

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMobileMenu = () => {
    setIsMenuOpen(true); // Abrir el menú
    navigation.navigate('NavigationMobile'); // Navegar a la pantalla móvil
  };

  const handleLogout = () => {
    setUser(null);
    navigation.navigate('LoginPage');
  };

  return (
    <View style={{ paddingTop: insets.top, backgroundColor: 'white' }}>
      {/* Barra de navegación */}
      <View className="flex-row justify-between items-center p-4 bg-white md:p-8">
        {/* LOGO */}
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text className="text-[#394FB8] text-3xl font-bold">
            <Text className="text-[#394FB8]">TICO</Text>
            <Text className="text-black">CR</Text>
          </Text>
        </TouchableOpacity>

        {/* Menú para pantallas grandes */}
        {isLargeScreen ? (
          <View className="flex-row justify-center flex-1 space-x-8">
            {['Comprar', 'Vender', 'Comparar'].map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate(item)}
                className="p-2 rounded-md"
              >
                <Text className="text-black text-xl">{item}</Text>
              </TouchableOpacity>
            ))}
            {user ? (
              <>
                <TouchableOpacity onPress={() => navigation.navigate('UserInfo')} className="p-2 rounded-md">
                  <Text className="text-black text-xl">Mi Perfil</Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity onPress={() => navigation.navigate('Registro')} className="p-2 rounded-md">
                <Text className="text-black text-xl">Iniciar Sesión </Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          // Menú móvil
          <TouchableOpacity onPress={handleMobileMenu}>
            {isMenuOpen ? (
              <Bars3Icon className="w-12 h-12 text-black" />
            ) : (
              <Bars3Icon className="w-12 h-12 text-black" />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}