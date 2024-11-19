import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import BackendConnection from '../services/BackendConnection';
import { UserContext } from '../context/UserContext';

export default function ReservePage() {
  const route = useRoute();
  const navigation = useNavigation(); // Asegúrate de definir navigation
  const { vehicle } = route.params;
  const { user } = useContext(UserContext);
  const [lugarCita, setLugarCita] = useState('');
  const [metodoPago, setMetodoPago] = useState('');
  const [fechaCita, setFechaCita] = useState('');
  const [horaCita, setHoraCita] = useState('');

  useEffect(() => {
    if (!user) {
      navigation.navigate('UserOut');
    }
  }, [user, navigation]);

  const handleReserva = async () => {
    const reserva = {
      usuarioId: user.usuarioId, 
      vehiculoId: vehicle.vehiculoId,
      precioDolares: (vehicle.precioColones / 550).toFixed(2),
      metodoPago,
      montoPago: 2000.00,
      lugarCita,
      fechaCita: `2024-11-20 14:30:00`
    };

    try {
      const response = await BackendConnection.post('/reservas', reserva);

      if (response) {
        Alert.alert('Reserva realizada', 'Su reserva ha sido registrada exitosamente.', [
          { text: 'OK', onPress: () => navigation.navigate('Home') }
        ]);
      } else {
        Alert.alert('Error', 'Hubo un problema al registrar su reserva.');
      }
    } catch (error) {
      console.error('Error al registrar la reserva:', error);
      Alert.alert('Error', 'Hubo un problema al registrar su reserva.');
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16, backgroundColor: '#f9f9f9' }}>
      <View className="w-full max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <View className="mb-6">
          <Text className="text-3xl font-bold mb-2">Reserva de Vehículo</Text>
          <Text className="text-gray-600">Complete los detalles para reservar una cita.</Text>
        </View>
        <View className="space-y-6">
          <View>
            <Text className="text-lg font-medium">Precio del vehículo</Text>
            <Text>Colones: ₡{vehicle.precioColones}</Text>
            <Text>Dólares: ${(vehicle.precioColones / 550).toFixed(2)}</Text>
          </View>
          <View className="space-y-4">
            <View className="space-y-2">
              <Text className="font-medium">Fecha de cita</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-2"
                placeholder="YYYY-MM-DD"
                value={fechaCita}
                onChangeText={setFechaCita}
                required
              />
            </View>
            <View className="space-y-2">
              <Text className="font-medium">Hora de cita</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-2"
                placeholder="HH:MM"
                value={horaCita}
                onChangeText={setHoraCita}
                required
              />
            </View>
            <View className="space-y-2">
              <Text className="font-medium">Lugar de cita</Text>
              <Picker
                selectedValue={lugarCita}
                onValueChange={(itemValue) => setLugarCita(itemValue)}
                className="border border-gray-300 rounded-lg p-2"
              >
                <Picker.Item label="Seleccione un lugar" value="" />
                <Picker.Item label="Cartago" value="cartago" />
                <Picker.Item label="San José" value="san-jose" />
                <Picker.Item label="Heredia" value="heredia" />
                <Picker.Item label="Alajuela" value="alajuela" />
              </Picker>
            </View>
            <View className="space-y-2">
              <Text className="font-medium">Método de pago para la cuota de revisión (₡2,000.00)</Text>
              <Picker
                selectedValue={metodoPago}
                onValueChange={(itemValue) => setMetodoPago(itemValue)}
                className="border border-gray-300 rounded-lg p-2"
              >
                <Picker.Item label="Seleccione un método de pago" value="" />
                <Picker.Item label="SINPE Móvil" value="sinpe" />
                <Picker.Item label="PayPal" value="paypal" />
                <Picker.Item label="Tarjeta de crédito" value="tarjeta" />
              </Picker>
            </View>
            <Button title="Reservar y Pagar" onPress={handleReserva} className="w-full bg-blue-500 text-white p-4 rounded-lg" />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}