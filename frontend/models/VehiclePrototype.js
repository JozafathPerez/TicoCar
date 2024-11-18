// VehiclePrototype.js
class VehiclePrototype {
    constructor(vehicle) {
      this.tipo = vehicle.tipo;
      this.marca = vehicle.marca;
      this.modelo = vehicle.modelo;
      this.anio = vehicle.anio;
      this.placa = vehicle.placa;
      this.precio = vehicle.precio;
      this.negociable = vehicle.negociable;
      this.recibeVehiculo = vehicle.recibeVehiculo;
      this.transmision = vehicle.transmision;
      this.puertas = vehicle.puertas;
      this.dimensiones = vehicle.dimensiones;
      this.materialAsientos = vehicle.materialAsientos;
      this.motor = vehicle.motor;
      this.vidriosElectricos = vehicle.vidriosElectricos;
      this.espejosElectricos = vehicle.espejosElectricos;
      this.sensoresProximidad = vehicle.sensoresProximidad;
      this.camaras = vehicle.camaras;
      this.tableroMando = vehicle.tableroMando;
      this.tapizado = vehicle.tapizado;
      this.sistemaSonido = vehicle.sistemaSonido;
      this.estado = vehicle.estado;
      this.leasing = vehicle.leasing;
      this.fotos = vehicle.fotos;
    }
  
    clone() {
      return new VehiclePrototype(this);
    }
  }
  
  export default VehiclePrototype;