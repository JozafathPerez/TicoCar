// App.js

import express from 'express';
import cors from 'cors';
import usersRoutes from './routes/users.routes.js';
import vehicleRoutes from './routes/vehicle.routes.js'; // Importar las rutas de vehículos
import dotenv from 'dotenv';
import verifyCedula from './controllers/verifyCedula.controllers.js';
import verifyPlate from './controllers/verifyPlate.controllers.js';

dotenv.config();

const app = express();

app.use(cors({
    origin: '*', // Permitir todas las conexiones para pruebas
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(express.json());

app.use(usersRoutes);
app.use(vehicleRoutes); // Usar las rutas de vehículos

app.get('/verifyCedula/:id', async (req, res) => {
    const id = req.params.id;
    const result = await verifyCedula(id);
    res.send(result);
});

app.get('/verifyPlate/:plate', async (req, res) => {
    const plate = req.params.plate;
    const result = await verifyPlate(plate);
    res.send(result);
});

// Middleware para manejar errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

export default app;