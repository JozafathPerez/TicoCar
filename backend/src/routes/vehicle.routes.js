import { Router } from 'express';
import { insertarVehiculo, modificarVehiculo, eliminarVehiculo, obtenerVehiculos } from '../controllers/vehicle.controllers.js';

const router = Router();

router.post('/vehiculos', insertarVehiculo);
router.put('/vehiculos', modificarVehiculo);
router.delete('/vehiculos/:vehiculoId', eliminarVehiculo);
router.get('/vehiculos', obtenerVehiculos);

export default router;