import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import BackendConnection from '../services/BackendConnection';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../context/UserContext';

export default function EditPage() {
  const { user, refreshVehicles, setRefreshVehicles } = useContext(UserContext);
  const [vehiculos, setVehiculos] = useState([]);
  const navigation = useNavigation();

  const fetchVehiculos = async () => {
    try {
      const response = await BackendConnection.get(`/vehiculos/usuario/${user.usuarioId}`);
      setVehiculos(response);
    } catch (error) {
      console.error('Error al obtener los vehículos:', error);
      alert('Error', 'Hubo un problema al obtener los vehículos.');
    }
  };

  useEffect(() => {
    fetchVehiculos();
  }, [user.usuarioId, refreshVehicles]);

  useEffect(() => {
    if (refreshVehicles) {
      fetchVehiculos();
      setRefreshVehicles(false);
    }
  }, [refreshVehicles]);

  const handleDelete = async (vehiculoId) => {
    try {
      await BackendConnection.delete(`/vehiculos/${vehiculoId}`);
      alert('Eliminado', 'El vehículo ha sido eliminado correctamente.');
      setVehiculos(vehiculos.filter((vehiculo) => vehiculo.vehiculoId !== vehiculoId));
      console.log('Vehículo eliminado ', vehiculoId);
    } catch (error) {
      console.error('Error al eliminar el vehículo:', error);
      alert('Error', 'Hubo un problema al eliminar el vehículo.');
    }
  };

  const handleEdit = (vehiculo) => {
    navigation.navigate('Modificar', { vehiculo });
  };

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      <Text className="text-2xl font-bold text-center mb-4">Editar Vehículos</Text>
      {vehiculos.map((vehiculo) => (
        <View key={vehiculo.vehiculoId} className="bg-white rounded-lg shadow-md p-4 mb-4">
          <Text className="text-lg font-bold">{vehiculo.marca} {vehiculo.modelo}</Text>
          <Text>Año: {vehiculo.anio}</Text>
          <Text>Placa: {vehiculo.placa}</Text>
          <Text>Precio: {vehiculo.precioColones} CRC</Text>
          <View className="flex-row justify-between mt-4">
            <TouchableOpacity
              onPress={() => handleEdit(vehiculo)}
              className="bg-blue-500 py-2 px-4 rounded-md"
            >
              <Text className="text-white">Modificar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDelete(vehiculo.vehiculoId)}
              className="bg-red-500 py-2 px-4 rounded-md"
            >
              <Text className="text-white">Eliminar</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}