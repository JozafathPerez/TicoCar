import { Router } from 'express';
import { insertarVehiculo, modificarVehiculo, eliminarVehiculo, obtenerVehiculos, obtenerVehiculosPorUsuario } from '../controllers/vehicle.controllers.js';

const router = Router();

router.post('/vehiculos', insertarVehiculo);
router.put('/vehiculos', modificarVehiculo);
router.delete('/vehiculos/:vehiculoId', eliminarVehiculo);
router.get('/vehiculos', obtenerVehiculos);
router.get('/vehiculos/usuario/:usuarioId', obtenerVehiculosPorUsuario); // Nueva ruta

export default router;