import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Button, useWindowDimensions } from "react-native";
import CustomCheckbox from "../components/CustomCheckbox";
import BackendConnection from '../services/BackendConnection';

const FilterSection = ({ title, options, onChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  // Realizar una solicitud GET
  BackendConnection.get('/users')
  .then(data => console.log(data))
  .catch(error => console.error(error));
  return (
    <View className="mb-4">
      {/* Título del filtro */}
      <TouchableOpacity
        className="flex-row justify-between items-center p-3 bg-gray-200 rounded-lg border border-gray-300"
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <Text className="font-semibold text-gray-800">{title}</Text>
        <Text className="font-bold text-gray-500">{isExpanded ? "-" : "+"}</Text>
      </TouchableOpacity>

      {/* Opciones del filtro */}
      {isExpanded && (
        <View className="mt-2 p-3 bg-white rounded-lg border border-gray-300">
          {options.map((option, index) => (
            <CustomCheckbox
              key={index}
              label={option.label}
              selected={option.selected}
              onChange={() => onChange(option)}
            />
          ))}
        </View>
      )}
    </View>
  );
};


export default function BuyPage() {
  const [showFilters, setShowFilters] = useState(false);
  const { width } = useWindowDimensions();
  const [filters, setFilters] = useState({
    marca: [
      { label: "Toyota", selected: false },
      { label: "Ford", selected: false },
      { label: "Honda", selected: false },
    ],
    modelo: [
      { label: "Corolla", selected: false },
      { label: "Ranger", selected: false },
      { label: "Civic", selected: false },
    ],
    año: [
      { label: "2020", selected: false },
      { label: "2021", selected: false },
      { label: "2022", selected: false },
    ],
    precio: [
      { label: "Menos de $20,000", selected: false },
      { label: "$20,000 - $30,000", selected: false },
      { label: "Más de $30,000", selected: false },
    ],
  });

  const handleFilterChange = (filterType, changedOption) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: prevFilters[filterType].map((option) =>
        option.label === changedOption.label
          ? { ...option, selected: !option.selected }
          : option
      ),
    }));
  };

  return (
    <View className="flex-1 bg-gray-100">
      <View className="flex-1 flex-row">
        {width > 768 ? (
          // Mostrar área de filtros en pantallas grandes
          <View className="w-1/6 p-4 bg-gray-100">
            <Text className="text-lg font-bold text-gray-900 mb-4">Filtros</Text>
            <FilterSection
              title="Marca"
              options={filters.marca}
              onChange={(option) => handleFilterChange("marca", option)}
            />
            <FilterSection
              title="Modelo"
              options={filters.modelo}
              onChange={(option) => handleFilterChange("modelo", option)}
            />
            <FilterSection
              title="Año"
              options={filters.año}
              onChange={(option) => handleFilterChange("año", option)}
            />
            <FilterSection
              title="Precio"
              options={filters.precio}
              onChange={(option) => handleFilterChange("precio", option)}
            />
          </View>
        ) : (
          // Mostrar botón para desplegar filtros en pantallas pequeñas
          <View className="w-full p-4 bg-gray-100">
            <Button title="Mostrar Filtros" onPress={() => setShowFilters(!showFilters)} />
            {showFilters && (
              <View className="p-4 bg-gray-100">
                <Text className="text-lg font-bold text-gray-900 mb-4">Filtros</Text>
                <FilterSection
                  title="Marca"
                  options={filters.marca}
                  onChange={(option) => handleFilterChange("marca", option)}
                />
                <FilterSection
                  title="Modelo"
                  options={filters.modelo}
                  onChange={(option) => handleFilterChange("modelo", option)}
                />
                <FilterSection
                  title="Año"
                  options={filters.año}
                  onChange={(option) => handleFilterChange("año", option)}
                />
                <FilterSection
                  title="Precio"
                  options={filters.precio}
                  onChange={(option) => handleFilterChange("precio", option)}
                />
              </View>
            )}
          </View>
        )}
  
        {/* Área de contenido principal (centro) */}
        <ScrollView className="flex-1 p-4">
          <Text className="text-xl font-bold mb-4">Vehículos Disponibles</Text>
          {/* Aquí irían los vehículos filtrados */}
          <Text>Contenido principal aquí...</Text>
        </ScrollView>
      </View>
    </View>
  );
}
