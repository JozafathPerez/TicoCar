import { getConnection } from '../database/connection.js';
import sql from 'mssql';

export const insertarVehiculo = async (req, res) => {
    try {
        const pool = await getConnection();
        const {
            usuarioId, marca, modelo, anio, placa, precioColones, esNegociable, recibeOtrosVehiculos,
            transmision, tipoVehiculo, puertas, largo, ancho, alto, materialAsientos, tipoMotor,
            vidriosElectricos, espejosElectricos, sensoresTraseros, sensoresDelanteros, camaraRetroceso,
            camara360, sensoresLaterales, tableroMando, tapizado, sistemaSonido, condicion, estaEnLeasing,
            fotosInternas, fotosExternas
        } = req.body;
        console.log('Info entrante:', req.body);
        const result = await pool.request()
            .input('usuarioId', sql.Int, usuarioId)
            .input('marca', sql.NVarChar(50), marca)
            .input('modelo', sql.NVarChar(50), modelo)
            .input('anio', sql.Int, anio)
            .input('placa', sql.NVarChar(20), placa)
            .input('precioColones', sql.Decimal(10, 2), precioColones)
            .input('esNegociable', sql.Bit, esNegociable)
            .input('recibeOtrosVehiculos', sql.Bit, recibeOtrosVehiculos)
            .input('transmision', sql.NVarChar(20), transmision)
            .input('tipoVehiculo', sql.NVarChar(20), tipoVehiculo)
            .input('puertas', sql.Int, puertas)
            .input('largo', sql.Decimal(5, 2), largo)
            .input('ancho', sql.Decimal(5, 2), ancho)
            .input('alto', sql.Decimal(5, 2), alto)
            .input('materialAsientos', sql.NVarChar(20), materialAsientos)
            .input('tipoMotor', sql.NVarChar(20), tipoMotor)
            .input('vidriosElectricos', sql.Bit, vidriosElectricos)
            .input('espejosElectricos', sql.Bit, espejosElectricos)
            .input('sensoresTraseros', sql.Bit, sensoresTraseros)
            .input('sensoresDelanteros', sql.Bit, sensoresDelanteros)
            .input('camaraRetroceso', sql.Bit, camaraRetroceso)
            .input('camara360', sql.Bit, camara360)
            .input('sensoresLaterales', sql.Bit, sensoresLaterales)
            .input('tableroMando', sql.NVarChar(20), tableroMando)
            .input('tapizado', sql.NVarChar(20), tapizado)
            .input('sistemaSonido', sql.NVarChar(20), sistemaSonido)
            .input('condicion', sql.Int, condicion)
            .input('estaEnLeasing', sql.Bit, estaEnLeasing)
            .input('fotosInternas', sql.NVarChar(sql.MAX), fotosInternas)
            .input('fotosExternas', sql.NVarChar(sql.MAX), fotosExternas)
            .execute('InsertarVehiculo');

        console.log('Resultado:', result);

        if (result.recordset && result.recordset.length > 0) {
            res.status(201).json({ success: true, message: 'Vehículo insertado correctamente', vehiculoId: result.recordset[0].vehiculoId });
        } else {
            res.status(201).json({ success: true, message: 'Vehículo insertado correctamente, pero no se devolvió el ID del vehículo' });
        }
    } catch (err) {
        console.log('Error al insertar vehículo:', err);
        res.status(500).json({ success: false, message: err.message });
    }
};

export const modificarVehiculo = async (req, res) => {
    try {
        const pool = await getConnection();
        const {
            vehiculoId, marca, modelo, anio, placa, precioColones, esNegociable, recibeOtrosVehiculos,
            transmision, tipoVehiculo, puertas, largo, ancho, alto, materialAsientos, tipoMotor,
            vidriosElectricos, espejosElectricos, sensoresTraseros, sensoresDelanteros, camaraRetroceso,
            camara360, sensoresLaterales, tableroMando, tapizado, sistemaSonido, condicion, estaEnLeasing,
            fotosInternas, fotosExternas
        } = req.body;
        
        await pool.request()
            .input('vehiculoId', sql.Int, vehiculoId)
            .input('marca', sql.NVarChar(50), marca)
            .input('modelo', sql.NVarChar(50), modelo)
            .input('anio', sql.Int, anio)
            .input('placa', sql.NVarChar(20), placa)
            .input('precioColones', sql.Decimal(10, 2), precioColones)
            .input('esNegociable', sql.Bit, esNegociable)
            .input('recibeOtrosVehiculos', sql.Bit, recibeOtrosVehiculos)
            .input('transmision', sql.NVarChar(20), transmision)
            .input('tipoVehiculo', sql.NVarChar(20), tipoVehiculo)
            .input('puertas', sql.Int, puertas)
            .input('largo', sql.Decimal(5, 2), largo)
            .input('ancho', sql.Decimal(5, 2), ancho)
            .input('alto', sql.Decimal(5, 2), alto)
            .input('materialAsientos', sql.NVarChar(20), materialAsientos)
            .input('tipoMotor', sql.NVarChar(20), tipoMotor)
            .input('vidriosElectricos', sql.Bit, vidriosElectricos)
            .input('espejosElectricos', sql.Bit, espejosElectricos)
            .input('sensoresTraseros', sql.Bit, sensoresTraseros)
            .input('sensoresDelanteros', sql.Bit, sensoresDelanteros)
            .input('camaraRetroceso', sql.Bit, camaraRetroceso)
            .input('camara360', sql.Bit, camara360)
            .input('sensoresLaterales', sql.Bit, sensoresLaterales)
            .input('tableroMando', sql.NVarChar(20), tableroMando)
            .input('tapizado', sql.NVarChar(20), tapizado)
            .input('sistemaSonido', sql.NVarChar(20), sistemaSonido)
            .input('condicion', sql.Int, condicion)
            .input('estaEnLeasing', sql.Bit, estaEnLeasing)
            .input('fotosInternas', sql.NVarChar(sql.MAX), fotosInternas)
            .input('fotosExternas', sql.NVarChar(sql.MAX), fotosExternas)
            .execute('ModificarVehiculo');

        res.status(200).json({ message: 'Vehículo modificado correctamente' });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export const eliminarVehiculo = async (req, res) => {
    try {
        const pool = await getConnection();
        const { vehiculoId } = req.params;

        await pool.request()
            .input('vehiculoId', sql.Int, vehiculoId)
            .execute('EliminarVehiculo');

        res.status(200).json({ message: 'Vehículo eliminado correctamente' });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export const obtenerVehiculosPorUsuario = async (req, res) => {
    try {
        const { usuarioId } = req.params;
        const pool = await getConnection();
        const result = await pool.request()
            .input('usuarioId', sql.Int, usuarioId)
            .execute('ObtenerVehiculosPorUsuario');

        res.status(200).json(result.recordset);
    } catch (err) {
        console.error('Error al obtener vehículos por usuario:', err);
        res.status(500).json({ success: false, message: err.message });
    }
};

export const obtenerVehiculos = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM Vehiculos');
        res.status(200).json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export const obtenerVehiculosConFotos = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM VistaVehiculoConFotos');
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error('Error al obtener vehículos con fotos:', err);
        res.status(500).json({ success: false, message: err.message });
    }
};

export const obtenerVehiculoPorId = async (req, res) => {
    try {
      const { vehiculoId } = req.params;
      const pool = await getConnection();
      const result = await pool.request()
        .input('vehiculoId', vehiculoId)
        .query('SELECT * FROM VistaVehiculoConPropietario WHERE vehiculoId = @vehiculoId');
      res.status(200).json(result.recordset[0]);
    } catch (err) {
      console.error('Error al obtener el vehículo por ID:', err);
      res.status(500).json({ success: false, message: err.message });
    }
};