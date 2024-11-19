import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';

const VehicleInfo = ({ vehicle }) => {
  const navigation = useNavigation();
  const { vehiculoId, marca, modelo, precioColones, transmision, anio, imagenesExternas } = vehicle;
  const exteriorImages = imagenesExternas ? imagenesExternas.split(', ') : [];
  
  const handleCardClick = () => {
    navigation.navigate('CarDetail', { vehiculoId });
  };

  return (
    <TouchableOpacity className="border border-gray-300 rounded-lg p-4 mb-4 bg-white shadow-md flex-row" onPress={handleCardClick}>
      {exteriorImages.length > 0 && (
        <Image source={{ uri: exteriorImages[0] }} className="w-24 h-24 rounded-lg mr-4" />
      )}
      <View className="flex-1">
        <Text className="text-xl font-bold">{marca} {modelo}</Text>
        <Text className="text-gray-600">Transmisión: {transmision}</Text>
        <Text className="text-gray-600">Año: {anio}</Text>
        <Text className="text-green-600 font-bold">Precio: ₡{precioColones}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default VehicleInfo;