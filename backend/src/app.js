import express from 'express';
import cors from 'cors';
import usersRoutes from './routes/users.routes.js';
import dotenv from 'dotenv';
import verifyCedula from './controllers/verifyCedula.controllers.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(usersRoutes);

app.get('/verifyCedula/:id', async (req, res) => {
    const id = req.params.id;
    const result = await verifyCedula(id);
    res.send(result);
});

export default app;