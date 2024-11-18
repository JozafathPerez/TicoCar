// UserOut.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function UserOut() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 justify-center items-center bg-white p-4">
      <Text className="text-xl font-bold mb-4">Acceso Restringido</Text>
      <Text className="text-lg mb-4">Debe iniciar sesión o registrarse para acceder a esta funcionalidad.</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Registro')}
        className="bg-blue-500 py-2 px-4 rounded"
      >
        <Text className="text-white">Iniciar Sesión / Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
}