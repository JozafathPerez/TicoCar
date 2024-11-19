import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import BackendConnection from '../services/BackendConnection';
import { UserContext } from '../context/UserContext';

export default function LoginPage() {
  const { setUser } = useContext(UserContext);
  const navigation = useNavigation();
  const [view, setView] = useState('login'); // Alterna entre login y registro
  const [loading, setLoading] = useState(false);
  const [isCedulaVerified, setIsCedulaVerified] = useState(false); // Estado para verificar cédula

  const [form, setForm] = useState({
    idType: 'cedula',
    idNumber: '',
    firstName: '',
    lastName1: '',
    lastName2: '',
    nationality: '',
    birthDate: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    province: '',
    canton: '',
    district: '',
    language: 'es-CR', // Idioma preferido por defecto
  });

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleCedulaVerification = async () => {
    if (!form.idNumber) {
      alert('Por favor, ingrese el número de identificación.');
      return;
    }
  
    setLoading(true); // Inicia la animación de carga
    try {
      // Llama al endpoint de la API para verificar la cédula
      const response = await BackendConnection.get(`/verifyCedula/${form.idNumber}`);
      if (response) {
        // Actualiza los campos del formulario con los datos obtenidos de la API
        setForm((prevForm) => ({
          ...prevForm,
          idNumber: response.cedula, // Número de identificación
          firstName: response.nombreCompleto.split(' ')[0], // Extrae el primer nombre
          lastName1: response.nombreCompleto.split(' ')[1], // Primer apellido
          lastName2: response.nombreCompleto.split(' ')[2], // Segundo apellido
          birthDate: response.fechaNacimiento, // Fecha de nacimiento
          nationality: response.nacionalidad, // Nacionalidad
        }));
        setIsCedulaVerified(true); // Marca que la cédula fue verificada correctamente
        alert('Datos obtenidos exitosamente.');
      } else {
        alert('No se pudo validar la cédula. Intente nuevamente.');
      }
    } catch (error) {
      console.error('Error al verificar la cédula:', error);
      alert('Error al conectar con la API. Por favor, intente más tarde.');
    } finally {
      setLoading(false); // Detiene la animación de carga
    }
  };

  const handleSubmit = async () => {
    if (view === 'login') {
      if (!form.email || !form.password) {
        alert('Por favor, complete todos los campos.');
        return;
      }

      setLoading(true);
      try {
        const response = await BackendConnection.post('/users/validate', {
          correo: form.email,
          contrasena: form.password,
        });

        if (response) {
          setUser(response); // Guardar la información del usuario en el contexto
          alert('Inicio de sesión exitoso.');
          console.log('Usuario', response);
          navigation.navigate('UserInfo'); // Redirigir a la página de información del usuario
        } else {
          alert('Esta picha no sirve.');
        }
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        alert('Correo o contraseña incorrectos.');
      } finally {
        setLoading(false);
      }
    } else {
      console.log('Formulario de registro:', form);

      if (
        !form.idType ||
        !form.idNumber ||
        !form.firstName ||
        !form.lastName1 ||
        !form.email ||
        !form.password ||
        form.password !== form.confirmPassword
      ) {
        alert('Por favor, complete todos los campos correctamente.');
        return;
      }

      setLoading(true);
      try {
        const response = await BackendConnection.post('/users', {
          tipoIdentificacion: form.idType,
          numeroIdentificacion: form.idNumber,
          nombre: form.firstName,
          apellido1: form.lastName1,
          apellido2: form.lastName2,
          nacionalidad: form.nationality,
          fechaNacimiento: form.birthDate,
          correo: form.email,
          contrasena: form.password,
          telefono: form.phone,
          provincia: form.province,
          canton: form.canton,
          distrito: form.district,
          idiomaInterfaz: form.language,
        });

        setUser(response); // Guardar la información del usuario en el contexto
        alert('Registro exitoso.');
        navigation.navigate('UserInfo'); // Redirigir a la página de información del usuario
      } catch (error) {
        console.error('Error al registrar el usuario:', error);
        alert('Error al conectar con la API. Por favor, intente más tarde.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      {/* Título principal */}
      <Text className="text-2xl font-bold mb-4 text-center">
        {view === 'login' ? 'Empieza ahora.' : 'Regístrate ahora.'}
      </Text>

      <Text className="text-center mb-4">
        {view === 'login' ? (
          <>
            ¿No tienes una cuenta?{' '}
            <TouchableOpacity onPress={() => setView('register')}>
              <Text className="text-blue-500">Regístrate</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            ¿Ya tienes cuenta?{' '}
            <TouchableOpacity onPress={() => setView('login')}>
              <Text className="text-blue-500">Iniciar sesión</Text>
            </TouchableOpacity>
          </>
        )}
      </Text>

      {/* Formulario */}
      <View className="bg-white rounded-lg shadow-md p-6 w-full max-w-3xl self-center">
        {view === 'login' ? (
          <>
            {/* Email */}
            <Text className="text-lg font-semibold mb-2">Correo Electrónico</Text>
            <TextInput
              placeholder="Ingrese su correo"
              value={form.email}
              onChangeText={(value) => handleInputChange('email', value)}
              className="bg-gray-100 border border-gray-300 rounded-md mb-4 p-2"
              keyboardType="email-address"
            />

            {/* Contraseña */}
            <Text className="text-lg font-semibold mb-2">Contraseña</Text>
            <TextInput
              placeholder="********"
              value={form.password}
              onChangeText={(value) => handleInputChange('password', value)}
              className="bg-gray-100 border border-gray-300 rounded-md mb-4 p-2"
              secureTextEntry
            />
          </>
        ) : (
          <>
            {/* Tipo y Número de Identificación */}
            <View className="flex-col sm:flex-row sm:space-x-4 mb-4">
              <View className="flex-1">
                <Text className="text-lg font-semibold mb-2">Tipo de Identificación</Text>
                <Picker
                  selectedValue={form.idType}
                  onValueChange={(value) => handleInputChange('idType', value)}
                  className="bg-gray-100 border border-gray-300 rounded-md p-1"
                >
                  <Picker.Item label="Cédula" value="cedula" />
                  <Picker.Item label="Pasaporte" value="pasaporte" />
                </Picker>
              </View>

              <View className="flex-1">
                <Text className="text-lg font-semibold mb-2">Número de Identificación</Text>
                <TextInput
                  placeholder="Ingrese su número de identificación"
                  value={form.idNumber}
                  onChangeText={(value) => handleInputChange('idNumber', value)}
                  className="bg-gray-100 border border-gray-300 rounded-md p-2"
                  keyboardType="numeric"
                />
              </View>
            </View>

            {/* Nombre y Apellidos */}
            <View className="flex-col sm:flex-row sm:space-x-4 mb-4">
              <View className="flex-1">
                <Text className="text-lg font-semibold mb-2">Nombre</Text>
                <TextInput
                  placeholder="Ingrese su nombre"
                  value={form.firstName}
                  onChangeText={(value) => handleInputChange('firstName', value)}
                  className="bg-gray-100 border border-gray-300 rounded-md p-2"
                />
              </View>

              <View className="flex-1">
                <Text className="text-lg font-semibold mb-2">Primer Apellido</Text>
                <TextInput
                  placeholder="Ingrese su primer apellido"
                  value={form.lastName1}
                  onChangeText={(value) => handleInputChange('lastName1', value)}
                  className="bg-gray-100 border border-gray-300 rounded-md p-2"
                />
              </View>

              <View className="flex-1">
                <Text className="text-lg font-semibold mb-2">Segundo Apellido</Text>
                <TextInput
                  placeholder="Ingrese su segundo apellido"
                  value={form.lastName2}
                  onChangeText={(value) => handleInputChange('lastName2', value)}
                  className="bg-gray-100 border border-gray-300 rounded-md p-2"
                />
              </View>
            </View>

            {/* Nacionalidad */}
            <Text className="text-lg font-semibold mt-4 mb-2">Nacionalidad</Text>
            <TextInput
              placeholder="Ingrese su nacionalidad"
              value={form.nationality}
              onChangeText={(value) => handleInputChange('nationality', value)}
              className="bg-gray-100 border border-gray-300 rounded-md mb-4 p-2"
            />

            {/* Provincia, Cantón, Distrito */}
            <View className="flex-col sm:flex-row sm:space-x-4 mb-4">
              <View className="flex-1">
                <Text className="text-lg font-semibold mb-2">Provincia</Text>
                <TextInput
                  placeholder="Provincia"
                  value={form.province}
                  onChangeText={(value) => handleInputChange('province', value)}
                  className="bg-gray-100 border border-gray-300 rounded-md p-2"
                />
              </View>

              <View className="flex-1">
                <Text className="text-lg font-semibold mb-2">Cantón</Text>
                <TextInput
                  placeholder="Cantón"
                  value={form.canton}
                  onChangeText={(value) => handleInputChange('canton', value)}
                  className="bg-gray-100 border border-gray-300 rounded-md p-2"
                />
              </View>

              <View className="flex-1">
                <Text className="text-lg font-semibold mb-2">Distrito</Text>
                <TextInput
                  placeholder="Distrito"
                  value={form.district}
                  onChangeText={(value) => handleInputChange('district', value)}
                  className="bg-gray-100 border border-gray-300 rounded-md p-2"
                />
              </View>
            </View>

            {/* Nacionalidad */}
            <Text className="text-lg font-semibold mt-4 mb-2">Teléfono</Text>
            <TextInput
              placeholder="Ingrese su número de teléfono"
              value={form.phone}
              onChangeText={(value) => handleInputChange('phone', value)}
              className="bg-gray-100 border border-gray-300 rounded-md mb-4 p-2"
            />


            {/* Idioma */}
            <Text className="text-lg font-semibold mt-4 mb-2">Idioma de la Interfaz</Text>
            <Picker
              selectedValue={form.language}
              onValueChange={(value) => handleInputChange('language', value)}
              className="bg-gray-100 border border-gray-300 rounded-md mb-4 p-1"
            >
              <Picker.Item label="Español (es-CR)" value="es-CR" />
              <Picker.Item label="Inglés (en-US)" value="en-US" />
            </Picker>

            {/* Email y Contraseñas */}
            <Text className="text-lg font-semibold mt-4 mb-2">Correo Electrónico</Text>
            <TextInput
              placeholder="Ingrese su correo"
              value={form.email}
              onChangeText={(value) => handleInputChange('email', value)}
              className="bg-gray-100 border border-gray-300 rounded-md mb-4 p-2"
              keyboardType="email-address"
            />

            {/* Contraseña */}
            <Text className="text-lg font-semibold mb-2">Contraseña</Text>
            <TextInput
              placeholder="********"
              value={form.password}
              onChangeText={(value) => handleInputChange('password', value)}
              className="bg-gray-100 border border-gray-300 rounded-md mb-4 p-2"
              secureTextEntry
            />

            {/* Confirmación de Contraseña */}
            <Text className="text-lg font-semibold mb-2">Confirmar Contraseña</Text>
            <TextInput
              placeholder="********"
              value={form.confirmPassword}
              onChangeText={(value) => handleInputChange('confirmPassword', value)}
              className="bg-gray-100 border border-gray-300 rounded-md mb-4 p-2"
              secureTextEntry
            />
          </>
        )}

        {/* Botón de acción */}
        <TouchableOpacity
          onPress={view === 'login' ? handleSubmit : isCedulaVerified ? handleSubmit : handleCedulaVerification}
          className={`bg-blue-500 py-2 rounded-md mt-4 ${loading ? 'opacity-50' : ''}`}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white text-center font-semibold">
              {view === 'login' ? 'Iniciar sesión' : isCedulaVerified ? 'Registrarse' : 'Verificar Cédula'}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}