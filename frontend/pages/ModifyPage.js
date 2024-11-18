import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import BackendConnection from '../services/BackendConnection';
import { UserContext } from '../context/UserContext';

export default function ModifyPage({ route, navigation }) {
  const { vehiculo } = route.params;
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({ ...vehiculo });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = async () => {
    try {
      const data = {
        vehiculoId: formData.vehiculoId,
        usuarioId: user.usuarioId,
        marca: formData.marca,
        modelo: formData.modelo,
        anio: parseInt(formData.anio),
        placa: formData.placa,
        precioColones: parseFloat(formData.precioColones),
        esNegociable: formData.esNegociable,
        recibeOtrosVehiculos: formData.recibeOtrosVehiculos,
        transmision: formData.transmision,
        tipoVehiculo: formData.tipoVehiculo,
        puertas: parseInt(formData.puertas),
        largo: parseFloat(formData.largo),
        ancho: parseFloat(formData.ancho),
        alto: parseFloat(formData.alto),
        materialAsientos: formData.materialAsientos,
        tipoMotor: formData.tipoMotor,
        vidriosElectricos: formData.vidriosElectricos,
        espejosElectricos: formData.espejosElectricos,
        sensoresTraseros: formData.sensoresTraseros,
        sensoresDelanteros: formData.sensoresDelanteros,
        camaraRetroceso: formData.camaraRetroceso,
        camara360: formData.camara360,
        sensoresLaterales: formData.sensoresLaterales,
        tableroMando: formData.tableroMando,
        tapizado: formData.tapizado,
        sistemaSonido: formData.sistemaSonido,
        condicion: parseInt(formData.condicion),
        estaEnLeasing: formData.estaEnLeasing,
        fotosInternas: formData.fotosInternas,
        fotosExternas: formData.fotosExternas,
      };

      await BackendConnection.put('/vehiculos', data);
      console.log('Vehículo modificado:', data);
      alert('Modificado', 'El vehículo ha sido modificado correctamente.');
      navigation.goBack();
    } catch (error) {
      console.error('Error al modificar el vehículo:', error);
      alert('Error', 'Hubo un problema al modificar el vehículo.');
    }
  };

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <TouchableOpacity
        onPress={() => navigation.navigate('Editar')}
        className="bg-gray-500 py-2 px-4 rounded"
        >
        <Text className="text-white">Volver a Editar Vehículos</Text>
      </TouchableOpacity>
      <Text className="text-2xl font-bold text-center mb-4">Modificar Vehículo</Text>
      <TextInput
        value={formData.marca}
        placeholder="Marca"
        className="p-2 border rounded mb-4"
        onChangeText={(value) => handleInputChange('marca', value)}
      />
      <TextInput
        value={formData.modelo}
        placeholder="Modelo"
        className="p-2 border rounded mb-4"
        onChangeText={(value) => handleInputChange('modelo', value)}
      />
      <TextInput
        value={formData.anio.toString()}
        placeholder="Año"
        className="p-2 border rounded mb-4"
        keyboardType="numeric"
        onChangeText={(value) => handleInputChange('anio', value)}
      />
      <TextInput
        value={formData.placa}
        placeholder="Placa"
        className="p-2 border rounded mb-4"
        onChangeText={(value) => handleInputChange('placa', value)}
      />
      <TextInput
        value={formData.precioColones.toString()}
        placeholder="Precio en colones"
        className="p-2 border rounded mb-4"
        keyboardType="numeric"
        onChangeText={(value) => handleInputChange('precioColones', value)}
      />
      <Picker
        selectedValue={formData.tipoVehiculo}
        onValueChange={(value) => handleInputChange('tipoVehiculo', value)}
        className="p-2 border rounded mb-4"
      >
        <Picker.Item label="Seleccione el tipo de vehículo" value="" />
        <Picker.Item label="Sedán" value="sedan" />
        <Picker.Item label="Camioneta" value="camioneta" />
        <Picker.Item label="Sedán de lujo" value="sedan_lujo" />
        <Picker.Item label="SUV" value="suv" />
        <Picker.Item label="Miniván" value="minivan" />
      </Picker>
      <TextInput
        value={formData.transmision}
        placeholder="Transmisión (Manual, Automático)"
        className="p-2 border rounded mb-4"
        onChangeText={(value) => handleInputChange('transmision', value)}
      />
      <TextInput
        value={formData.puertas.toString()}
        placeholder="Cantidad de puertas"
        className="p-2 border rounded mb-4"
        keyboardType="numeric"
        onChangeText={(value) => handleInputChange('puertas', value)}
      />
      <TextInput
        value={formData.largo.toString()}
        placeholder="Dimensiones (Largo)"
        className="p-2 border rounded mb-4"
        keyboardType="numeric"
        onChangeText={(value) => handleInputChange('largo', value)}
      />
      <TextInput
        value={formData.ancho.toString()}
        placeholder="Dimensiones (Ancho)"
        className="p-2 border rounded mb-4"
        keyboardType="numeric"
        onChangeText={(value) => handleInputChange('ancho', value)}
      />
      <TextInput
        value={formData.alto.toString()}
        placeholder="Dimensiones (Alto)"
        className="p-2 border rounded mb-4"
        keyboardType="numeric"
        onChangeText={(value) => handleInputChange('alto', value)}
      />
      <TextInput
        value={formData.materialAsientos}
        placeholder="Material de los asientos (Cuero, Tela)"
        className="p-2 border rounded mb-4"
        onChangeText={(value) => handleInputChange('materialAsientos', value)}
      />
      <TextInput
        value={formData.tipoMotor}
        placeholder="Motor (Gasolina, Diesel, Gas licuado, Eléctrico, Híbrido)"
        className="p-2 border rounded mb-4"
        onChangeText={(value) => handleInputChange('tipoMotor', value)}
      />
      <View className="flex-row justify-between mb-4">
        <Text className="text-lg">Precio Negociable</Text>
        <Switch
          value={formData.esNegociable}
          onValueChange={(value) => handleInputChange('esNegociable', value)}
        />
      </View>
      <View className="flex-row justify-between mb-4">
        <Text className="text-lg">Recibe Vehículo</Text>
        <Switch
          value={formData.recibeOtrosVehiculos}
          onValueChange={(value) => handleInputChange('recibeOtrosVehiculos', value)}
        />
      </View>
      <View className="flex-row justify-between mb-4">
        <Text className="text-lg">Vidrios Eléctricos</Text>
        <Switch
          value={formData.vidriosElectricos}
          onValueChange={(value) => handleInputChange('vidriosElectricos', value)}
        />
      </View>
      <View className="flex-row justify-between mb-4">
        <Text className="text-lg">Espejos Eléctricos</Text>
        <Switch
          value={formData.espejosElectricos}
          onValueChange={(value) => handleInputChange('espejosElectricos', value)}
        />
      </View>
      <View className="flex-row justify-between mb-4">
        <Text className="text-lg">Sensores de Proximidad Traseros</Text>
        <Switch
          value={formData.sensoresTraseros}
          onValueChange={(value) => handleInputChange('sensoresTraseros', value)}
        />
      </View>
      <View className="flex-row justify-between mb-4">
        <Text className="text-lg">Sensores de Proximidad Delanteros</Text>
        <Switch
          value={formData.sensoresDelanteros}
          onValueChange={(value) => handleInputChange('sensoresDelanteros', value)}
        />
      </View>
      <View className="flex-row justify-between mb-4">
        <Text className="text-lg">Cámara de Retroceso</Text>
        <Switch
          value={formData.camaraRetroceso}
          onValueChange={(value) => handleInputChange('camaraRetroceso', value)}
        />
      </View>
      <View className="flex-row justify-between mb-4">
        <Text className="text-lg">Cámara 360</Text>
        <Switch
          value={formData.camara360}
          onValueChange={(value) => handleInputChange('camara360', value)}
        />
      </View>
      <View className="flex-row justify-between mb-4">
        <Text className="text-lg">Sensores de Proximidad Laterales</Text>
        <Switch
          value={formData.sensoresLaterales}
          onValueChange={(value) => handleInputChange('sensoresLaterales', value)}
        />
      </View>
      <View className="flex-row justify-between mb-4">
        <Text className="text-lg">Leasing</Text>
        <Switch
          value={formData.estaEnLeasing}
          onValueChange={(value) => handleInputChange('estaEnLeasing', value)}
        />
      </View>
      <Picker
        selectedValue={formData.tableroMando}
        onValueChange={(value) => handleInputChange('tableroMando', value)}
        className="p-2 border rounded mb-4"
      >
        <Picker.Item label="Seleccione el tipo de tablero de mando" value="" />
        <Picker.Item label="100% Táctil" value="tactil" />
        <Picker.Item label="Análogo" value="analogico" />
        <Picker.Item label="Ambos" value="ambos" />
      </Picker>
      <Picker
        selectedValue={formData.transmision}
        onValueChange={(value) => handleInputChange('transmision', value)}
        className="p-2 border rounded mb-4"
      >
        <Picker.Item label="Seleccione el tipo de transmisión" value="" />
        <Picker.Item label="Manual" value="manual" />
        <Picker.Item label="Automático" value="automatico" />
        <Picker.Item label="Dual" value="dual" />
      </Picker>
      <Picker
        selectedValue={formData.tapizado}
        onValueChange={(value) => handleInputChange('tapizado', value)}
        className="p-2 border rounded mb-4"
      >
        <Picker.Item label="Seleccione el tipo de tapizado" value="" />
        <Picker.Item label="Cuero" value="cuero" />
        <Picker.Item label="Plástico" value="plastico" />
        <Picker.Item label="Tela" value="tela" />
      </Picker>
      <Picker
        selectedValue={formData.sistemaSonido}
        onValueChange={(value) => handleInputChange('sistemaSonido', value)}
        className="p-2 border rounded mb-4"
      >
        <Picker.Item label="Seleccione el sistema de sonido" value="" />
        <Picker.Item label="Estéreo 7.1" value="estereo_7_1" />
        <Picker.Item label="Estándar" value="estandar" />
      </Picker>
      <Picker
        selectedValue={formData.condicion}
        onValueChange={(value) => handleInputChange('condicion', value)}
        className="p-2 border rounded mb-4"
      >
        <Picker.Item label="Seleccione el estado del vehículo" value="" />
        <Picker.Item label="1 - Excelente" value="1" />
        <Picker.Item label="2 - Bueno" value="2" />
        <Picker.Item label="3 - Regular" value="3" />
        <Picker.Item label="4 - Malo" value="4" />
        <Picker.Item label="5 - Muy Dañado" value="5" />
      </Picker>
      <TouchableOpacity
        onPress={handleSave}
        className="bg-blue-500 py-2 px-4 rounded"
      >
        <Text className="text-white">Guardar Cambios</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}