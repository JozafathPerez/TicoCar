import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { UserContext } from '../context/UserContext';

export default function UserInfoPage() {
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <View className="flex-1 justify-center items-center bg-white p-4">
      {user ? (
        <>
          <Text className="text-2xl font-bold mb-4">Información del Usuario</Text>
          <Text className="text-lg mb-2">Id Usuario: {user.usuarioId}</Text>
          <Text className="text-lg mb-2">Nombre: {user.nombre}</Text>
          <Text className="text-lg mb-2">Primer Apellido: {user.apellido1}</Text>
          <Text className="text-lg mb-2">Segundo Apellido: {user.apellido2}</Text>
          <Text className="text-lg mb-2">Correo: {user.correo}</Text>
          <TouchableOpacity
            onPress={handleLogout}
            className="bg-red-500 py-2 px-4 rounded-md mt-4"
          >
            <Text className="text-white text-center font-semibold">Cerrar Sesión</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text className="text-lg">No hay información del usuario disponible.</Text>
      )}
    </View>
  );
}