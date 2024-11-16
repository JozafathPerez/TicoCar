import React from 'react';
import { View, Text } from 'react-native';

export default function HomePage() {
  return (
    <View className="flex-0 bg-gray-100 pt-4"> {/* Cambiar pt-16 a pt-8 o un valor menor */}
      <Text className="text-center text-2xl">Bienvenido a la Página Principal</Text>
    </View>
  );
}
