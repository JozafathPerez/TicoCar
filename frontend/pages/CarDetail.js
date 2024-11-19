import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Image, ScrollView, Button } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import BackendConnection from '../services/BackendConnection';
import ImageCarousel from '../components/ImageCarousel';

export default function CarDetail() {
  const route = useRoute();
  const navigation = useNavigation();
  const { vehiculoId } = route.params;
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      try {
        const data = await BackendConnection.get(`/vehiculos/${vehiculoId}`);
        setVehicle(data);
      } catch (error) {
        console.error("Error fetching vehicle details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleDetails();
  }, [vehiculoId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!vehicle) {
    return (
      <View>
        <Text>Error al cargar los detalles del vehículo.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16, backgroundColor: '#f9f9f9' }}>
      <Text className="text-3xl font-bold mx-10 my-5">{vehicle.marca} {vehicle.modelo}</Text>
      <ImageCarousel
        images={[
          vehicle.foto1 || vehicle.imagenesExternas.split(', ')[0],
          vehicle.foto2 || vehicle.imagenesInternas.split(', ')[0],
        ]}
      />
      <Text className="text-xl font-bold text-green-600 mx-10 mt-5">Precio: ₡{vehicle.precioColones}</Text>
      
      {/* Contenedor de tablas en dos columnas */}
      <View className="flex-row justify-between flex-wrap p-10">
        
        {/* Tabla de Especificaciones */}
        <View className="bg-white p-4 rounded-lg shadow-md w-full sm:w-[48%] mb-4">
          <Text className="text-2xl font-bold mb-2">Especificaciones del Auto</Text>
          {[
            { label: 'Año', value: vehicle.anio },
            { label: 'Transmisión', value: vehicle.transmision },
            { label: 'Tipo de Vehículo', value: vehicle.tipoVehiculo },
            { label: 'Tipo de Motor', value: vehicle.tipoMotor },
            { label: 'Es Negociable', value: vehicle.esNegociable ? "Sí" : "No" },
            { label: 'Recibe Otros Vehículos', value: vehicle.recibeOtrosVehiculos ? "Sí" : "No" },
            { label: 'Puertas', value: vehicle.puertas },
            { label: 'Largo', value: `${vehicle.largo} cm` },
            { label: 'Ancho', value: `${vehicle.ancho} cm` },
            { label: 'Alto', value: `${vehicle.alto} cm` },
            { label: 'Material de Asientos', value: vehicle.materialAsientos },
            { label: 'Vidrios Eléctricos', value: vehicle.vidriosElectricos ? "Sí" : "No" },
            { label: 'Espejos Eléctricos', value: vehicle.espejosElectricos ? "Sí" : "No" },
            { label: 'Sensores Traseros', value: vehicle.sensoresTraseros ? "Sí" : "No" },
            { label: 'Sensores Delanteros', value: vehicle.sensoresDelanteros ? "Sí" : "No" },
            { label: 'Cámara de Retroceso', value: vehicle.camaraRetroceso ? "Sí" : "No" },
            { label: 'Cámara 360', value: vehicle.camara360 ? "Sí" : "No" },
            { label: 'Sensores Laterales', value: vehicle.sensoresLaterales ? "Sí" : "No" },
            { label: 'Tablero de Mando', value: vehicle.tableroMando },
            { label: 'Tapizado', value: vehicle.tapizado },
            { label: 'Sistema de Sonido', value: vehicle.sistemaSonido },
            { label: 'Condición', value: vehicle.condicion },
            { label: 'Está en Leasing', value: vehicle.estaEnLeasing ? "Sí" : "No" },
            { label: 'Está Publicado', value: vehicle.estaPublicado ? "Sí" : "No" },
          ].map((spec, index) => (
            <View key={index} className="flex-row justify-between mb-2 border-b pb-2">
              <Text className="font-bold">{spec.label}:</Text>
              <Text>{spec.value}</Text>
            </View>
          ))}
        </View>
        {/* Tabla de Contacto */}
        <View className="bg-white p-4 rounded-lg shadow-md w-full sm:w-[48%] mb-4 max-h-32 ">
          <Text className="text-2xl font-bold mb-2">Info de Contacto</Text>
          <Text>Propietario: {vehicle.propietarioNombre} {vehicle.propietarioApellido1} {vehicle.propietarioApellido2}</Text>
          <Text>Correo del Propietario: {vehicle.propietarioCorreo}</Text>
          <Text>Teléfono del Propietario: {vehicle.propietarioTelefono}</Text>
          <View className="m-8">
            <Button title="Realizar una Reserva" onPress={() => navigation.navigate('Reserve', { vehicle })} />
          </View>
          
      </View>
      </View>
    </ScrollView>
  );
}