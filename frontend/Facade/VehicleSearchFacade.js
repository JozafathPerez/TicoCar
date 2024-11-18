// VehicleSearchFacade.js
class VehicleSearchFacade {
    constructor(vehicleService) {
      this.vehicleService = vehicleService;
    }
  
    async searchVehicles(criteria) {
      const { tipo, marca, modelo, anio, precioMin, precioMax, ...otherCriteria } = criteria;
      let results = await this.vehicleService.getAllVehicles();
  
      if (tipo) {
        results = results.filter(vehicle => vehicle.tipo === tipo);
      }
      if (marca) {
        results = results.filter(vehicle => vehicle.marca === marca);
      }
      if (modelo) {
        results = results.filter(vehicle => vehicle.modelo === modelo);
      }
      if (anio) {
        results = results.filter(vehicle => vehicle.anio === anio);
      }
      if (precioMin !== undefined) {
        results = results.filter(vehicle => vehicle.precioColones >= precioMin);
      }
      if (precioMax !== undefined) {
        results = results.filter(vehicle => vehicle.precioColones <= precioMax);
      }
  
      // Aplicar otros criterios de búsqueda
      for (const [key, value] of Object.entries(otherCriteria)) {
        results = results.filter(vehicle => vehicle[key] === value);
      }
  
      return results;
    }
  }
  
  // Uso del patrón Fachada
  const vehicleService = new VehicleService();
  const vehicleSearchFacade = new VehicleSearchFacade(vehicleService);
  
  const handleSearch = async (criteria) => {
    const results = await vehicleSearchFacade.searchVehicles(criteria);
    console.log('Resultados de la búsqueda:', results);
  };