import { getConnection } from '../database/connection.js';
import sql from 'mssql';
export const getVehicles = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM Vehiculos');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).send(error.message);
    }
};