import { Router } from 'express';
import { insertarVehiculo, modificarVehiculo, eliminarVehiculo, obtenerVehiculos, obtenerVehiculosPorUsuario, obtenerVehiculosConFotos } from '../controllers/vehicle.controllers.js';

const router = Router();

router.post('/vehiculos', insertarVehiculo);
router.put('/vehiculos', modificarVehiculo);
router.delete('/vehiculos/:vehiculoId', eliminarVehiculo);
router.get('/vehiculos', obtenerVehiculos);
router.get('/vehiculos/usuario/:usuarioId', obtenerVehiculosPorUsuario);
router.get("/vehiclesWithPhotos", obtenerVehiculosConFotos);


export default router;