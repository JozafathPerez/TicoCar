import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, useWindowDimensions, Switch, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'react-native-image-picker'; 
import BackendConnection from '../services/BackendConnection';
import VehiclePrototype from '../models/VehiclePrototype';
import { UserContext } from '../context/UserContext';

export default function VehicleRegistrationWizard({ navigation }) {
  const { user, setUser } = useContext(UserContext);

  if (!user) {
    navigation.navigate('UserOut');
    return null;
  }


  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(new VehiclePrototype({
    tipo: 'sedan',
    marca: 'Toyota',
    modelo: 'Corolla',
    anio: '2020',
    placa: 'ABC123',
    precio: '15000000',
    negociable: true,
    recibeVehiculo: true,
    transmision: 'manual', 
    puertas: '4',
    dimensiones: { largo: '4.6', ancho: '1.8', alto: '1.4' },
    materialAsientos: 'cuero',
    motor: 'gasolina',
    vidriosElectricos: true,
    espejosElectricos: true,
    sensoresProximidad: { traseros: true, delanteros: false, laterales: false },
    camaras: { retroceso: true, camara360: false },
    tableroMando: 'analogico',
    tapizado: 'cuero',
    sistemaSonido: 'estereo7.1',
    estado: '1', // Ejemplo: 1 para "nuevo"
    leasing: false,
    fotos: { internas: ["https://photos.encuentra24.com/t_or_fh_l/f_auto/v1/cr/29/25/53/07/29255307_f25b72"], externas: ["https://photos.encuentra24.com/t_or_fh_l/f_auto/v1/cr/29/25/53/07/29255307_77bfa2"] },
  }));

  const { width } = useWindowDimensions(); // Obtén el ancho actual de la pantalla
  const isMobileView = width < 768; // Consideramos móvil si el ancho es menor a 768px

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const resetForm = () => {
    setFormData(new VehiclePrototype({
      tipo: 'sedan',
      marca: '',
      modelo: '',
      anio: '',
      placa: '',
      precio: '',
      negociable: true,
      recibeVehiculo: true,
      transmision: 'manual', 
      puertas: '',
      dimensiones: { largo: '', ancho: '', alto: '' },
      materialAsientos: '',
      motor: '',
      vidriosElectricos: true,
      espejosElectricos: true,
      sensoresProximidad: { traseros: true, delanteros: false, laterales: false },
      camaras: { retroceso: true, camara360: false },
      tableroMando: '',
      tapizado: '',
      sistemaSonido: '',
      estado: '1', // Ejemplo: 1 para "nuevo"
      leasing: false,
      fotos: { internas: [], externas: [] },
    }));
    setCurrentStep(1);
  };

  const handleNextStep = async () => {
    if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
    } else {
        try {
            const data = {
                usuarioId: user.usuarioId, // Asume un usuarioId fijo para la prueba
                marca: formData.marca,
                modelo: formData.modelo,
                anio: parseInt(formData.anio),
                placa: formData.placa,
                precioColones: parseFloat(formData.precio),
                esNegociable: formData.negociable,
                recibeOtrosVehiculos: formData.recibeVehiculo,
                transmision: formData.transmision,
                tipoVehiculo: formData.tipo,
                puertas: parseInt(formData.puertas),
                largo: parseFloat(formData.dimensiones.largo),
                ancho: parseFloat(formData.dimensiones.ancho),
                alto: parseFloat(formData.dimensiones.alto),
                materialAsientos: formData.materialAsientos,
                tipoMotor: formData.motor,
                vidriosElectricos: formData.vidriosElectricos,
                espejosElectricos: formData.espejosElectricos,
                sensoresTraseros: formData.sensoresProximidad.traseros,
                sensoresDelanteros: formData.sensoresProximidad.delanteros,
                camaraRetroceso: formData.camaras.retroceso,
                camara360: formData.camaras.camara360,
                sensoresLaterales: formData.sensoresProximidad.laterales,
                tableroMando: formData.tableroMando,
                tapizado: formData.tapizado,
                sistemaSonido: formData.sistemaSonido,
                condicion: parseInt(formData.estado),
                estaEnLeasing: formData.leasing,
                fotosInternas: formData.fotos.internas.join(','),
                fotosExternas: formData.fotos.externas.join(','),
            };
            console.log('Data to send:', data);
            const response = await BackendConnection.post('/vehiculos', data);
            console.log('Response from backend:', response.success);

            if (response.success) {
                console.log('Registro completo');
                alert('Registro completado exitosamente');
                resetForm(); 
                
            } else {
                alert('Error', 'Hubo un problema al registrar el vehículo.');
            }
        } catch (error) {
            console.error('Error al registrar el vehículo:', error);
            alert('Error', 'Hubo un problema al registrar el vehículo.');
        }
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSelectPhoto = (type) => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 800,
        maxHeight: 800,
        quality: 0.8,
      },
      (response) => {
        if (response.didCancel) {
          alert('Operación cancelada', 'No se seleccionó ninguna foto.');
        } else if (response.errorCode) {
          alert('Error', 'Hubo un problema al seleccionar la foto.');
        } else {
          const uri = response.assets[0].uri;
          setFormData((prevState) => {
            const updatedPhotos = [...prevState.fotos[type], uri];
            if (updatedPhotos.length > 4) {
              alert('Límite alcanzado', 'Solo puedes subir hasta 4 fotos por tipo.');
              return prevState;
            }
            return {
              ...prevState,
              fotos: { ...prevState.fotos, [type]: updatedPhotos },
            };
          });
        }
      }
    );
  };

  const handleRemovePhoto = (type, index) => {
    setFormData((prevState) => {
      const updatedPhotos = prevState.fotos[type].filter((_, i) => i !== index);
      return {
        ...prevState,
        fotos: { ...prevState.fotos, [type]: updatedPhotos },
      };
    });
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from(new Array(50), (val, index) => currentYear - index);

  return (
    <View className={`flex-1 bg-white ${isMobileView ? 'p-4' : 'flex-row'}`}>
      {/* Botón de Editar en la parte superior para móviles */}
      {isMobileView && (
        <TouchableOpacity
          onPress={() => navigation.navigate('Editar')} // Redirige a la página de edición
          className="bg-blue-500 rounded flex items-center justify-center mb-4"
          style={{
            width: '100%', // Ocupa todo el ancho
            height: 50,
          }}
        >
          <Text className="text-white font-bold text-lg">Edita tu auto</Text>
        </TouchableOpacity>
      )}

      {!isMobileView && (
        <View className="w-1/2 bg-white p-4 justify-center items-center relative">
          <Image
            source={require('../assets/VentaV.jpg')} // Reemplaza con la ruta de tu imagen
            className="w-3/4 h-3/4"
            resizeMode="contain"
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('Editar')} // Redirige a la página de edición
            className="bg-blue-500 rounded absolute flex items-center justify-center"
            style={{
              top: '87%',
              left: '20%',
              width: '40%',
              height: 50,
              zIndex: 1,
            }}
          >
            <Text className="text-white font-bold text-lg">Edita tu auto</Text>
          </TouchableOpacity>
          <Text
            className="absolute text-gray-500 text-sm text-center"
            style={{
              top: '93%',
              left: '10%',
              width: '60%',
            }}
          >
            *Si ya tienes un auto en venta, puedes editarlo.*
          </Text>
        </View>
      )}

      {/* Formulario por pasos */}
      <ScrollView className={isMobileView ? 'flex-1' : 'w-1/2 p-6'}>
        <View className="flex-row justify-between mb-4">
          <Text
            className={`${
              currentStep === 1 ? 'text-blue-500' : 'text-gray-500'
            } font-bold`}
          >
            Información General
          </Text>
          <Text
            className={`${
              currentStep === 2 ? 'text-blue-500' : 'text-gray-500'
            } font-bold`}
          >
            Transacción
          </Text>
          <Text
            className={`${
              currentStep === 3 ? 'text-blue-500' : 'text-gray-500'
            } font-bold`}
          >
            Fotos
          </Text>
        </View>

        {/* Contenido del paso actual */}
        {currentStep === 1 && (
          <View>
            <Text className="text-lg mb-2">Datos Generales del Vehículo</Text>
            <Picker
              selectedValue={formData.tipo}
              onValueChange={(value) => handleInputChange('tipo', value)}
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
            <Picker
              selectedValue={formData.anio}
              onValueChange={(value) => handleInputChange('anio', value)}
              className="p-2 border rounded mb-4"
            >
              <Picker.Item label="Seleccione el año" value="" />
              {years.map((year) => (
                <Picker.Item key={year} label={year.toString()} value={year.toString()} />
              ))}
            </Picker>
            <TextInput
              value={formData.placa}
              placeholder="Placa"
              className="p-2 border rounded mb-4"
              onChangeText={(value) => handleInputChange('placa', value)}
            />
            <TextInput
              value={formData.precio}
              placeholder="Precio en colones"
              className="p-2 border rounded mb-4"
              keyboardType="numeric"
              onChangeText={(value) => handleInputChange('precio', value)}
            />
            <TextInput
              value={formData.transmision}
              placeholder="Transmisión (Manual, Automático)"
              className="p-2 border rounded mb-4"
              onChangeText={(value) => handleInputChange('transmision', value)}
            />
            <TextInput
              value={formData.puertas}
              placeholder="Cantidad de puertas"
              className="p-2 border rounded mb-4"
              keyboardType="numeric"
              onChangeText={(value) => handleInputChange('puertas', value)}
            />
            <TextInput
              value={formData.dimensiones.largo}
              placeholder="Dimensiones (Largo)"
              className="p-2 border rounded mb-4"
              keyboardType="numeric"
              onChangeText={(value) => handleInputChange('dimensiones', { ...formData.dimensiones, largo: value })}
            />
            <TextInput
              value={formData.dimensiones.ancho}
              placeholder="Dimensiones (Ancho)"
              className="p-2 border rounded mb-4"
              keyboardType="numeric"
              onChangeText={(value) => handleInputChange('dimensiones', { ...formData.dimensiones, ancho: value })}
            />
            <TextInput
              value={formData.dimensiones.alto}
              placeholder="Dimensiones (Alto)"
              className="p-2 border rounded mb-4"
              keyboardType="numeric"
              onChangeText={(value) => handleInputChange('dimensiones', { ...formData.dimensiones, alto: value })}
            />
            <TextInput
              value={formData.materialAsientos}
              placeholder="Material de los asientos (Cuero, Tela)"
              className="p-2 border rounded mb-4"
              onChangeText={(value) => handleInputChange('materialAsientos', value)}
            />
            <TextInput
              value={formData.motor}
              placeholder="Motor (Gasolina, Diesel, Gas licuado, Eléctrico, Híbrido)"
              className="p-2 border rounded mb-4"
              onChangeText={(value) => handleInputChange('motor', value)}
            />
          </View>
        )}

        {currentStep === 2 && (
          <View>
            <View className="flex-row justify-between mb-4">
              <Text className="text-lg">Precio Negociable</Text>
              <Switch
                value={formData.negociable}
                onValueChange={(value) => handleInputChange('negociable', value)}
              />
            </View>
            <View className="flex-row justify-between mb-4">
              <Text className="text-lg">Recibe Vehículo</Text>
              <Switch
                value={formData.recibeVehiculo}
                onValueChange={(value) => handleInputChange('recibeVehiculo', value)}
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
                value={formData.sensoresProximidad.traseros}
                onValueChange={(value) => handleInputChange('sensoresProximidad', { ...formData.sensoresProximidad, traseros: value })}
              />
            </View>
            <View className="flex-row justify-between mb-4">
              <Text className="text-lg">Sensores de Proximidad Delanteros</Text>
              <Switch
                value={formData.sensoresProximidad.delanteros}
                onValueChange={(value) => handleInputChange('sensoresProximidad', { ...formData.sensoresProximidad, delanteros: value })}
              />
            </View>
            <View className="flex-row justify-between mb-4">
              <Text className="text-lg">Cámara de Retroceso</Text>
              <Switch
                value={formData.camaras.retroceso}
                onValueChange={(value) => handleInputChange('camaras', { ...formData.camaras, retroceso: value })}
              />
            </View>
            <View className="flex-row justify-between mb-4">
              <Text className="text-lg">Cámara 360</Text>
              <Switch
                value={formData.camaras.camara360}
                onValueChange={(value) => handleInputChange('camaras', { ...formData.camaras, camara360: value })}
              />
            </View>
            <View className="flex-row justify-between mb-4">
              <Text className="text-lg">Sensores de Proximidad Laterales</Text>
              <Switch
                value={formData.sensoresProximidad.laterales}
                onValueChange={(value) => handleInputChange('sensoresProximidad', { ...formData.sensoresProximidad, laterales: value })}
              />
            </View>
            <View className="flex-row justify-between mb-4">
              <Text className="text-lg">Leasing</Text>
              <Switch
                value={formData.leasing}
                onValueChange={(value) => handleInputChange('leasing', value)}
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
              selectedValue={formData.estado}
              onValueChange={(value) => handleInputChange('estado', value)}
              className="p-2 border rounded mb-4"
            >
              <Picker.Item label="Seleccione el estado del vehículo" value="" />
              <Picker.Item label="1 - Excelente" value="1" />
              <Picker.Item label="2 - Bueno" value="2" />
              <Picker.Item label="3 - Regular" value="3" />
              <Picker.Item label="4 - Malo" value="4" />
              <Picker.Item label="5 - Muy Dañado" value="5" />
            </Picker>
          </View>
        )}

        {currentStep === 3 && (
          <View>
            <Text className="text-lg mb-2">Subir Fotos</Text>
            <Text className="text-sm text-gray-500 mb-4">
              Puedes agregar hasta 4 fotos internas y 4 externas del vehículo.
            </Text>
            <TouchableOpacity
              className="bg-blue-500 py-2 px-4 rounded mb-4"
              onPress={() => handleSelectPhoto('internas')}
            >
              <Text className="text-white">Subir Fotos Internas</Text>
            </TouchableOpacity>

            <ScrollView horizontal className="mb-4">
              {formData.fotos.internas.map((uri, index) => (
                <View key={index} style={{ position: 'relative', marginRight: 8 }}>
                  <Image
                    source={{ uri }}
                    style={{ width: 100, height: 100, borderRadius: 8 }}
                  />
                  <TouchableOpacity
                    onPress={() => handleRemovePhoto('internas', index)}
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      backgroundColor: 'red',
                      borderRadius: 8,
                      padding: 4,
                    }}
                  >
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>X</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>

            <TouchableOpacity
              className="bg-green-500 py-2 px-4 rounded mb-4"
              onPress={() => handleSelectPhoto('externas')}
            >
              <Text className="text-white">Subir Fotos Externas</Text>
            </TouchableOpacity>

            <ScrollView horizontal className="mb-4">
              {formData.fotos.externas.map((uri, index) => (
                <View key={index} style={{ position: 'relative', marginRight: 8 }}>
                  <Image
                    source={{ uri }}
                    style={{ width: 100, height: 100, borderRadius: 8 }}
                  />
                  <TouchableOpacity
                    onPress={() => handleRemovePhoto('externas', index)}
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      backgroundColor: 'red',
                      borderRadius: 8,
                      padding: 4,
                    }}
                  >
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>X</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Navegación entre pasos */}
        <View className="flex-row justify-between mt-6">
          {currentStep > 1 && (
            <TouchableOpacity
              onPress={handlePreviousStep}
              className="bg-gray-500 py-2 px-4 rounded"
            >
              <Text className="text-white">Atrás</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={handleNextStep}
            className="bg-blue-500 py-2 px-4 rounded"
          >
            <Text className="text-white">
              {currentStep === 3 ? 'Finalizar' : 'Siguiente'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}