import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-datepicker';

export default function ReservePage() {
  const route = useRoute();
  const { vehicle } = route.params;
  const [lugarCita, setLugarCita] = useState('');
  const [metodoPago, setMetodoPago] = useState('');

  const handleReserva = (e) => {
    e.preventDefault();
    console.log('Reserva realizada', { lugarCita, metodoPago });
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
                placeholder="Seleccione una fecha"
                type="date"
                required
              />
            </View>
            <View className="space-y-2">
              <Text className="font-medium">Hora de cita</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-2"
                placeholder="Seleccione una hora"
                type="time"
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
            </View>
            <Button title="Reservar y Pagar" onPress={handleReserva} className="w-full bg-blue-500 text-white p-4 rounded-lg" />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}