import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, TextInput, useWindowDimensions, Button } from "react-native";
import CustomCheckbox from "../components/CustomCheckbox";
import BackendConnection from '../services/BackendConnection';
import VehicleInfo from "../components/CardVehicle";


const FilterSection = ({ title, options, onChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
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
      {isExpanded && (
        <View className="mt-2">
          {options.map((option) => (
            <CustomCheckbox
              key={option.label}
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

const BuyPage = () => {
  const { width } = useWindowDimensions();
  const isMobileView = width < 768; // Consideramos móvil si el ancho es menor a 768px

  const [filters, setFilters] = useState({
    marca: [
      { label: "Toyota", selected: false },
      { label: "Honda", selected: false },
      { label: "Ford", selected: false },
    ],
    anio: [
      { label: "2020", selected: false },
      { label: "2021", selected: false },
      { label: "2022", selected: false },
    ],
    transmision: [
      { label: "Automática", selected: false },
      { label: "Manual", selected: false },
    ],
    tipoMotor: [
      { label: "Gasolina", selected: false },
      { label: "Diesel", selected: false },
      { label: "Híbrido", selected: false },
    ],
    tipoVehiculo: [
      { label: "Sedán", selected: false },
      { label: "SUV", selected: false },
      { label: "Pick-up", selected: false },
    ],
    esNegociable: [
      { label: "Sí", selected: false },
      { label: "No", selected: false },
    ],
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [filtersVisible, setFiltersVisible] = useState(false);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await BackendConnection.get("/vehiclesWithPhotos");
        setVehicles(data);
        setFilteredVehicles(data);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchVehicles();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, searchQuery, vehicles]);

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

  const applyFilters = () => {
    let filtered = vehicles;

    // Aplicar filtros de marca
    const selectedMarcas = filters.marca.filter(option => option.selected).map(option => option.label);
    if (selectedMarcas.length > 0) {
      filtered = filtered.filter(vehicle => selectedMarcas.includes(vehicle.marca));
    }

    // Aplicar filtros de año
    const selectedAnios = filters.anio.filter(option => option.selected).map(option => option.label);
    if (selectedAnios.length > 0) {
      filtered = filtered.filter(vehicle => selectedAnios.includes(vehicle.anio.toString()));
    }

    // Aplicar filtros de transmisión
    const selectedTransmisiones = filters.transmision.filter(option => option.selected).map(option => option.label);
    if (selectedTransmisiones.length > 0) {
      filtered = filtered.filter(vehicle => selectedTransmisiones.includes(vehicle.transmision));
    }

    // Aplicar filtros de tipo de motor
    const selectedTiposMotor = filters.tipoMotor.filter(option => option.selected).map(option => option.label);
    if (selectedTiposMotor.length > 0) {
      filtered = filtered.filter(vehicle => selectedTiposMotor.includes(vehicle.tipoMotor));
    }

    // Aplicar filtros de tipo de vehículo
    const selectedTiposVehiculo = filters.tipoVehiculo.filter(option => option.selected).map(option => option.label);
    if (selectedTiposVehiculo.length > 0) {
      filtered = filtered.filter(vehicle => selectedTiposVehiculo.includes(vehicle.tipoVehiculo));
    }

    // Aplicar filtros de si es negociable
    const selectedEsNegociable = filters.esNegociable.filter(option => option.selected).map(option => option.label);
    if (selectedEsNegociable.length > 0) {
      filtered = filtered.filter(vehicle => selectedEsNegociable.includes(vehicle.esNegociable ? "Sí" : "No"));
    }

    // Aplicar búsqueda
    if (searchQuery) {
      filtered = filtered.filter(vehicle =>
        vehicle.marca.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.modelo.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredVehicles(filtered);
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
              title="Año"
              options={filters.anio}
              onChange={(option) => handleFilterChange("anio", option)}
            />
            <FilterSection
              title="Transmisión"
              options={filters.transmision}
              onChange={(option) => handleFilterChange("transmision", option)}
            />
            <FilterSection
              title="Tipo de Motor"
              options={filters.tipoMotor}
              onChange={(option) => handleFilterChange("tipoMotor", option)}
            />
            <FilterSection
              title="Tipo de Vehículo"
              options={filters.tipoVehiculo}
              onChange={(option) => handleFilterChange("tipoVehiculo", option)}
            />
            <FilterSection
              title="Es Negociable"
              options={filters.esNegociable}
              onChange={(option) => handleFilterChange("esNegociable", option)}
            />
          </View>
        ) : (
          // Mostrar botón para desplegar filtros en pantallas pequeñas
          <View className="w-full p-4 bg-gray-100">
            <Button title="Mostrar Filtros" onPress={() => setFiltersVisible(!filtersVisible)} />
            {filtersVisible && (
              <View className="absolute top-0 left-0 w-2/3 h-full bg-white p-4 shadow-lg z-50">
                <ScrollView>
                <Text className="text-lg font-bold text-gray-900 mb-4">Filtros</Text>
                <FilterSection
                  title="Marca"
                  options={filters.marca}
                  onChange={(option) => handleFilterChange("marca", option)}
                />
                <FilterSection
                  title="Año"
                  options={filters.anio}
                  onChange={(option) => handleFilterChange("anio", option)}
                />
                <FilterSection
                  title="Transmisión"
                  options={filters.transmision}
                  onChange={(option) => handleFilterChange("transmision", option)}
                />
                <FilterSection
                  title="Tipo de Motor"
                  options={filters.tipoMotor}
                  onChange={(option) => handleFilterChange("tipoMotor", option)}
                />
                <FilterSection
                  title="Tipo de Vehículo"
                  options={filters.tipoVehiculo}
                  onChange={(option) => handleFilterChange("tipoVehiculo", option)}
                />
                <FilterSection
                  title="Es Negociable"
                  options={filters.esNegociable}
                  onChange={(option) => handleFilterChange("esNegociable", option)}
                />
                <Button title="Cerrar" onPress={() => setFiltersVisible(false)} />
                </ScrollView>
              </View>
            )}
          <View className="flex-1 p-4">
          <TextInput
            className="p-2 mb-4 border border-gray-300 rounded-lg"
            placeholder="Buscar..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <ScrollView>
            <View className="p-4">
              {filteredVehicles.map((vehicle) => (
                <VehicleInfo key={vehicle.vehiculoId} vehicle={vehicle} />
              ))}
            </View>
          </ScrollView>
        </View>
        </View>
        )}
        <View className="flex-1 p-4">
          <TextInput
            className="p-2 mb-4 border border-gray-300 rounded-lg"
            placeholder="Buscar..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <ScrollView>
            <View className="p-4">
              {filteredVehicles.map((vehicle) => (
                <VehicleInfo key={vehicle.vehiculoId} vehicle={vehicle} />
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default BuyPage;