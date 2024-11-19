import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { UserContext } from '../context/UserContext';
import { useNavigation } from '@react-navigation/native';

export default function UserInfoPage() {
  const { user, setUser } = useContext(UserContext);
  const navigation = useNavigation();

  const handleLogout = () => {
    setUser(null);
    navigation.navigate('Registro'); // Redirigir a la página de registro
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 p-4">
      {user ? (
        <>
          <View className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <View className="flex-row items-center mb-4">
              <Text className="text-2xl font-bold ml-2">Información del Usuario</Text>
            </View>
            <View className="mb-4">
              <Text className="text-lg font-semibold">Id Usuario:</Text>
              <Text className="text-lg">{user.usuarioId}</Text>
            </View>
            <View className="mb-4">
              <Text className="text-lg font-semibold">Nombre:</Text>
              <Text className="text-lg">{user.nombre}</Text>
            </View>
            <View className="mb-4">
              <Text className="text-lg font-semibold">Primer Apellido:</Text>
              <Text className="text-lg">{user.apellido1}</Text>
            </View>
            <View className="mb-4">
              <Text className="text-lg font-semibold">Segundo Apellido:</Text>
              <Text className="text-lg">{user.apellido2}</Text>
            </View>
            <View className="mb-4">
              <Text className="text-lg font-semibold">Correo:</Text>
              <View className="flex-row items-center">
                <Text className="text-lg ml-2">{user.correo}</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={handleLogout}
              className="bg-red-500 py-2 px-4 rounded-md flex-row items-center justify-center mt-4"
            >
              <Text className="text-white text-center font-semibold ml-2">Cerrar Sesión</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text className="text-lg">No hay información del usuario disponible.</Text>
      )}
    </View>
  );
}