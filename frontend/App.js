// App.js
import React from 'react';
import { View, Text, Button } from 'react-native';
import './tailwind.css';

export default function App() {
  return (
      <View className="flex-1 justify-center items-center bg-blue-100">
        <Text className="text-2xl font-bold text-blue-900">
          ¡Bienvenido a mi App con Tailwind CSS!
        </Text>
        <Text className="text-base text-gray-700 mt-4">
          Este es un texto de ejemplo utilizando Tailwind CSS en React Native.
        </Text>
        <View className="mt-6">
          <Button title="Presióname" onPress={() => alert('¡Botón presionado!')} />
        </View>
      </View>
  );
}
