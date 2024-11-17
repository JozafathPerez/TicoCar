import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import CustomCheckbox from "../components/CustomCheckbox"; // Asegúrate de importar el componente

const FilterSection = ({ title, options, onChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View className="mb-4">
      {/* Título del filtro */}
      <TouchableOpacity
        className="flex-row justify-between items-center p-2 bg-gray-200 rounded-lg"
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <Text className="text-black font-semibold">{title}</Text>
        <Text>{isExpanded ? "-" : "+"}</Text>
      </TouchableOpacity>

      {/* Opciones del filtro */}
      {isExpanded && (
        <View className="mt-2 p-2 bg-white border rounded-lg">
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
  // Opciones de ejemplo para cada filtro
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

  // Función para manejar cambios en los checkboxes
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
      {/* Área de filtros */}
      <ScrollView className="p-4 bg-white shadow-md">
        <Text className="text-lg font-bold text-black mb-4">Filtros</Text>

        {/* Secciones de Filtros */}
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
      </ScrollView>
    </View>
  );
}
