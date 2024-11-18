// ReservationFacade.js
class ReservationFacade {
    constructor(vehicleService, paymentService, appointmentService) {
      this.vehicleService = vehicleService;
      this.paymentService = paymentService;
      this.appointmentService = appointmentService;
    }
  
    async reserveVehicle(userId, vehicleId, paymentDetails, appointmentDetails) {
      const vehicle = await this.vehicleService.getVehicleById(vehicleId);
      if (!vehicle) {
        return { success: false, message: 'Vehículo no encontrado' };
      }
  
      if (!vehicle.available) {
        return { success: false, message: 'Vehículo no disponible' };
      }
  
      const paymentResult = await this.paymentService.processPayment(paymentDetails);
      if (!paymentResult.success) {
        return { success: false, message: 'Error en el pago' };
      }
  
      const appointmentResult = await this.appointmentService.scheduleAppointment(userId, vehicleId, appointmentDetails);
      if (!appointmentResult.success) {
        return { success: false, message: 'Error al programar la cita' };
      }
  
      return { success: true, message: 'Reserva completada con éxito' };
    }
  }
  
  // Uso del patrón Fachada
  const vehicleService = new VehicleService();
  const paymentService = new PaymentService();
  const appointmentService = new AppointmentService();
  const reservationFacade = new ReservationFacade(vehicleService, paymentService, appointmentService);
  
  const handleReservation = async (userId, vehicleId, paymentDetails, appointmentDetails) => {
    const result = await reservationFacade.reserveVehicle(userId, vehicleId, paymentDetails, appointmentDetails);
    if (result.success) {
      console.log('Reserva completada con éxito');
    } else {
      console.error(result.message);
    }
  };