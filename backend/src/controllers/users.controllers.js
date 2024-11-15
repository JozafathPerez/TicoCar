import {getConnection} from '../database/connection.js';
import sql from 'mssql';

export const getUsers = async (req, res) => {
    try {
        // Obtener la conexión a la base de datos
        const pool = await getConnection();

        // Realizar la consulta SQL para obtener todos los usuarios
        const result = await pool.request()
            .query('SELECT * FROM [Users]'); // Consulta para obtener todos los usuarios

        // Enviar los resultados como respuesta
        res.json(result.recordset); // `recordset` contiene los resultados de la consulta
    } catch (error) {
        // En caso de error, enviar el error como respuesta
        console.log(error);
        res.status(500).json({ message: 'Error al obtener los usuarios' });
    }
};