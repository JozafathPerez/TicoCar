import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';

export default function HomePage() {
  return (
    <ScrollView className="flex-1 bg-gray-100">
      {/* Sección con fondo personalizado */}
      <View className="w-full bg-[#EEF1FB] items-center pb-10 pt-6">
        {/* Título principal */}
        <Text className="text-4xl font-bold text-black mt-4">Compra Y Vende Autos</Text>
        <Text className="text-lg text-gray-600 mt-2 text-center w-4/5">
          Encuentra El Auto De Tus Sueños O Vende El Tuyo De Forma Rápida Y Segura
        </Text>

        {/* Contenedor de búsqueda */}
        <View className="flex-row items-center bg-white rounded-full shadow-md mt-6 px-4 py-2 w-11/12">
          <TouchableOpacity className="bg-blue-500 rounded-full px-6 py-2 ml-2">
            <Text className="text-white font-bold">Buscar</Text>
          </TouchableOpacity>
        </View>

        {/* Imagen del auto */}
        <Image
          source={require('../assets/HomeCar.png')} // Actualiza con la ubicación real de tu imagen
          style={{ width: 1166, height: 150, resizeMode: 'contain', marginTop: 20 }}
        />
      </View>

      {/* Sección "Vende tu auto en minutos" */}
      <View className="w-full bg-white items-center py-10">
        <Text className="text-3xl font-bold text-black">Vende tu auto en minutos</Text>
        <Text className="text-lg text-gray-600 mt-2 text-center w-4/5">
          Publica tu anuncio de forma rápida y sencilla, y llega a miles de compradores potenciales
        </Text>
        <TouchableOpacity className="bg-green-600 rounded-full px-6 py-3 mt-6">
          <Text className="text-white font-bold text-lg">Publica tu anuncio →</Text>
        </TouchableOpacity>
      </View>

      {/* Sección "Lo que dicen nuestros usuarios" */}
      <View className="w-full items-center py-10 bg-gray-100">
        <Text className="text-2xl font-bold text-black mb-6">LO QUE DICEN NUESTROS USUARIOS</Text>

        {/* Reseñas */}
        <View className="flex-row justify-center flex-wrap">
          {/* Reseña 1 */}
          <View className="bg-white rounded-lg shadow-md p-4 m-2 w-72">
            <Text className="text-lg font-bold">Oscar Roni Ordoñez</Text>
            <Text className="text-yellow-500 text-lg">★★★★★</Text>
            <Text className="text-gray-700 mt-2">
              "Excelente experiencia comprando mi auto en CRAutos. El proceso fue rápido y seguro."
            </Text>
          </View>

          {/* Reseña 2 */}
          <View className="bg-white rounded-lg shadow-md p-4 m-2 w-72">
            <Text className="text-lg font-bold">Cristian Paz Campos</Text>
            <Text className="text-yellow-500 text-lg">★★★★★</Text>
            <Text className="text-gray-700 mt-2">
              "Vender mi auto fue increíblemente fácil. En menos de 24 horas, recibí varias ofertas y lo vendí al mejor precio. ¡Recomendado 100%!"
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
