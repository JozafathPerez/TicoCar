import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import BackendConnection from '../services/BackendConnection';

export default function ComparePage() {
  const [placas, setPlacas] = useState(['', '', '']);
  const [autos, setAutos] = useState([null, null, null]);

  const handleInputChange = (index, value) => {
    const newPlacas = [...placas];
    newPlacas[index] = value;
    setPlacas(newPlacas);
  };

  const handleCompare = async () => {
    try {
      const autoData = await Promise.all(
        placas.map(async (placa) => {
          if (placa) {
            const response = await BackendConnection.get(`/vehiculos/placa/${placa}`);
            return response;
          }
          return null;
        })
      );
      setAutos(autoData);
    } catch (error) {
      console.error('Error al obtener los datos del vehículo:', error);
      alert('Error', 'Hubo un problema al obtener los datos del vehículo.');
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      <Text className="text-2xl font-bold text-center mb-4">Comparar Autos</Text>
      <View className="flex-row justify-between mb-4">
        {placas.map((placa, index) => (
          <View key={index} className="flex-1 mx-2">
            <TextInput
              value={placa}
              placeholder={`Placa ${index + 1}`}
              className="p-2 border rounded mb-4"
              onChangeText={(value) => handleInputChange(index, value)}
            />
          </View>
        ))}
      </View>
      <TouchableOpacity onPress={handleCompare} className="bg-blue-500 py-2 px-4 rounded mb-4">
        <Text className="text-white text-center">Comparar</Text>
      </TouchableOpacity>
      <View className="flex-row justify-between">
        {autos.map((auto, index) => (
          <View key={index} className="flex-1 mx-2 bg-white p-4 rounded-lg shadow-md">
            {auto ? (
              <>
                <Text className="text-lg font-bold">{auto.marca} {auto.modelo}</Text>
                <Text>Año: {auto.anio}</Text>
                <Text>Placa: {auto.placa}</Text>
                <Text>Precio: {auto.precioColones} CRC</Text>
                <Text>Transmisión: {auto.transmision}</Text>
                <Text>Motor: {auto.tipoMotor}</Text>
                <Text>Condición: {auto.condicion}</Text>
                {/* Agrega más detalles del auto según sea necesario */}
              </>
            ) : (
              <Text className="text-gray-500">Ingrese la placa para comparar</Text>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    margin: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  cardText: {
    fontSize: 14,
    marginBottom: 5,
  },
});