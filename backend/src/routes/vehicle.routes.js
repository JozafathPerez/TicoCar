import { Router } from 'express';
import { insertarVehiculo, modificarVehiculo, eliminarVehiculo, obtenerVehiculos, obtenerVehiculosPorUsuario, obtenerVehiculosConFotos, obtenerVehiculoPorId, obtenerVehiculoPorPlaca } from '../controllers/vehicle.controllers.js';

const router = Router();

router.post('/vehiculos', insertarVehiculo);
router.put('/vehiculos', modificarVehiculo);
router.delete('/vehiculos/:vehiculoId', eliminarVehiculo);
router.get('/vehiculos', obtenerVehiculos);
router.get('/vehiculos/usuario/:usuarioId', obtenerVehiculosPorUsuario);
router.get("/vehiclesWithPhotos", obtenerVehiculosConFotos);
router.get('/vehiculos/:vehiculoId', obtenerVehiculoPorId);
router.get('/vehiculos/placa/:placa', obtenerVehiculoPorPlaca); // Nueva ruta

export default router;