import { getConnection } from '../database/connection.js';
import sql from 'mssql';

export const registrarReserva = async (req, res) => {
    const {
        usuarioId,
        vehiculoId,
        precioDolares,
        metodoPago,
        montoPago,
        lugarCita,
        fechaCita
    } = req.body;

    console.log('Datos recibidos para registrar reserva:', {
        usuarioId,
        vehiculoId,
        precioDolares,
        metodoPago,
        montoPago,
        lugarCita,
        fechaCita
    });

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('usuarioId', sql.Int, usuarioId)
            .input('vehiculoId', sql.Int, vehiculoId)
            .input('precioDolares', sql.Decimal(10, 2), precioDolares)
            .input('metodoPago', sql.NVarChar, metodoPago)
            .input('montoPago', sql.Decimal(10, 2), montoPago)
            .input('lugarCita', sql.NVarChar, lugarCita)
            .input('fechaCita', sql.DateTime, fechaCita)
            .execute('RegistrarReserva');
        console.log('Reserva registrada exitosamente:', result);
        res.status(201).json({ message: 'Reserva registrada exitosamente' });
    } catch (error) {
        console.error('Error al registrar reserva:', error);
        res.status(500).json({ error: error.message });
    }
};