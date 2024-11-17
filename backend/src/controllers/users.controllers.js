import { getConnection } from '../database/connection.js';
import sql from 'mssql';

export const getUsers = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM Usuarios');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const createUser = async (req, res) => {
    const {
        tipoIdentificacion,
        numeroIdentificacion,
        nombre,
        apellido1,
        apellido2,
        nacionalidad,
        fechaNacimiento,
        correo,
        contrasena,
        telefono,
        provincia,
        canton,
        distrito,
        idiomaInterfaz
    } = req.body;

    console.log('Datos recibidos para crear usuario:', {
        tipoIdentificacion,
        numeroIdentificacion,
        nombre,
        apellido1,
        apellido2,
        nacionalidad,
        fechaNacimiento,
        correo,
        contrasena,
        telefono,
        provincia,
        canton,
        distrito,
        idiomaInterfaz
    });

    // Convertir fechaNacimiento al formato YYYY-MM-DD
    const [day, month, year] = fechaNacimiento.split('/');
    const formattedFechaNacimiento = `${year}-${month}-${day}`;

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('tipoIdentificacion', sql.NVarChar, tipoIdentificacion)
            .input('numeroIdentificacion', sql.NVarChar, numeroIdentificacion)
            .input('nombre', sql.NVarChar, nombre)
            .input('apellido1', sql.NVarChar, apellido1)
            .input('apellido2', sql.NVarChar, apellido2)
            .input('nacionalidad', sql.NVarChar, nacionalidad)
            .input('fechaNacimiento', sql.Date, formattedFechaNacimiento) // Usar la fecha formateada
            .input('correo', sql.NVarChar, correo)
            .input('contrasena', sql.NVarChar, contrasena)
            .input('telefono', sql.NVarChar, telefono)
            .input('provincia', sql.NVarChar, provincia)
            .input('canton', sql.NVarChar, canton)
            .input('distrito', sql.NVarChar, distrito)
            .input('idiomaInterfaz', sql.NVarChar, idiomaInterfaz)
            .execute('InsertarUsuario');
        console.log('Usuario creado exitosamente:', result);
        res.status(201).json({ message: 'Usuario creado exitosamente' }); // Enviar respuesta en formato JSON
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ error: error.message }); // Enviar respuesta en formato JSON
    }
};

export const validateUser = async (req, res) => {
    const { correo, contrasena } = req.body;

    console.log('Datos recibidos para validar usuario:', {
        correo,
        contrasena
    });

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('correo', sql.NVarChar, correo)
            .input('contrasena', sql.NVarChar, contrasena)
            .execute('ValidarUsuario');
        if (result.recordset.length > 0) {
            res.json(result.recordset[0]);
        } else {
            res.status(401).json({ message: 'Correo o contraseña incorrectos' }); // Enviar respuesta en formato JSON
        }
    } catch (error) {
        res.status(500).json({ error: error.message }); // Enviar respuesta en formato JSON
    }
};