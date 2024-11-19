import React from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function CarDetail() {
  const route = useRoute();
  const { vehiculoId } = route.params;

  return (
    <View>
      <Text>CarDetail</Text>
      <Text>ID del Vehículo: {vehiculoId}</Text>
    </View>
  );
}