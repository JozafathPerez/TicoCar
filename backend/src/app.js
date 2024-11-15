import express from 'express';
import cors from 'cors';
import usersRoutes from './routes/users.routes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(usersRoutes);

export default app;