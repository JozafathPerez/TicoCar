-- Crear la base de datos
CREATE DATABASE TicoCarBD;
GO

-- Usar la base de datos
USE TicoCarBD;
GO

-- Tabla de Usuarios
CREATE TABLE Usuarios (
    usuarioId INT IDENTITY(1,1) PRIMARY KEY, -- Identificador único del usuario
    tipoIdentificacion NVARCHAR(20) NOT NULL, -- Tipo de identificación: 'cédula', 'pasaporte', etc.
    numeroIdentificacion NVARCHAR(50) NOT NULL UNIQUE, -- Número de cédula o pasaporte
    nombre NVARCHAR(50) NOT NULL, -- Primer nombre del usuario
    apellido1 NVARCHAR(50) NOT NULL, -- Primer apellido
    apellido2 NVARCHAR(50) NOT NULL, -- Segundo apellido
    nacionalidad NVARCHAR(50), -- Nacionalidad del usuario
    fechaNacimiento DATE NOT NULL, -- Fecha de nacimiento
    correo NVARCHAR(100) NOT NULL UNIQUE, -- Correo electrónico, usado para el inicio de sesión
    contrasena NVARCHAR(255) NOT NULL, -- Contraseña segura para autenticación
    telefono NVARCHAR(20) NOT NULL, -- Número de teléfono del usuario
    provincia NVARCHAR(50), -- Provincia donde reside el usuario
    canton NVARCHAR(50), -- Cantón donde reside el usuario
    distrito NVARCHAR(50), -- Distrito donde reside el usuario
    idiomaInterfaz NVARCHAR(20) CHECK (idiomaInterfaz IN ('es-CR', 'en-US')) DEFAULT 'es-CR', -- Idioma preferido de la interfaz (español o inglés)
    estaVerificado BIT DEFAULT 0, -- 1 para verificado, 0 para no verificado (validación con Registro Civil)
    fechaRegistro DATETIME DEFAULT GETDATE(), -- Fecha de registro del usuario
);
GO

-- Tabla de Vehículos
CREATE TABLE Vehiculos (
    vehiculoId INT IDENTITY(1,1) PRIMARY KEY, -- Identificador único del vehículo
    usuarioId INT NOT NULL, -- Relación con el usuario que registra el vehículo
    marca NVARCHAR(50) NOT NULL, -- Marca del vehículo (ejemplo: Toyota)
    modelo NVARCHAR(50) NOT NULL, -- Modelo del vehículo (ejemplo: Corolla)
    anio INT NOT NULL, -- Año de fabricación del vehículo
    placa NVARCHAR(20) NOT NULL UNIQUE, -- Placa del vehículo, validada con COSEVI
    precioColones DECIMAL(10,2) NOT NULL, -- Precio del vehículo en colones
    esNegociable BIT DEFAULT 0, -- 1 para sí, 0 para no (indica si el precio es negociable)
    recibeOtrosVehiculos BIT DEFAULT 0, -- 1 para sí, 0 para no (indica si acepta intercambios)
    transmision NVARCHAR(20) NOT NULL, -- Tipo de transmisión del vehículo
    tipoVehiculo NVARCHAR(20) NOT NULL, -- Tipo de vehículo
    puertas INT, -- Cantidad de puertas del vehículo
    largo DECIMAL(5,2), -- Longitud del vehículo en metros
    ancho DECIMAL(5,2), -- Ancho del vehículo en metros
    alto DECIMAL(5,2), -- Altura del vehículo en metros
    materialAsientos NVARCHAR(20), -- Material de los asientos
    tipoMotor NVARCHAR(20), -- Tipo de motor del vehículo
    vidriosElectricos BIT DEFAULT 0, -- 1 para sí, 0 para no (indica si tiene vidrios eléctricos)
    espejosElectricos BIT DEFAULT 0, -- 1 para sí, 0 para no (indica si tiene espejos eléctricos)
    sensoresTraseros BIT DEFAULT 0, -- 1 para sí, 0 para no (indica si tiene sensores de proximidad traseros)
    sensoresDelanteros BIT DEFAULT 0, -- 1 para sí, 0 para no (indica si tiene sensores delanteros)
    camaraRetroceso BIT DEFAULT 0, -- 1 para sí, 0 para no (indica si tiene cámara de retroceso)
    camara360 BIT DEFAULT 0, -- 1 para sí, 0 para no (indica si tiene cámara 360)
    sensoresLaterales BIT DEFAULT 0, -- 1 para sí, 0 para no (indica si tiene sensores laterales)
    tableroMando NVARCHAR(20), -- Tipo de tablero de mando
    tapizado NVARCHAR(20), -- Material del tapizado interior
    sistemaSonido NVARCHAR(20), -- Tipo de sistema de sonido
    condicion INT NOT NULL, -- Condición del vehículo (1 es excelente, 5 muy dañado)
    estaEnLeasing BIT DEFAULT 0, -- 1 para sí, 0 para no (indica si el vehículo está asociado a un leasing)
    estaPublicado BIT DEFAULT 0, -- 1 para sí, 0 para no (indica si el vehículo está publicado)
    fechaCreacion DATETIME DEFAULT GETDATE(), -- Fecha de registro del vehículo
    fechaActualizacion DATETIME DEFAULT GETDATE(), -- Fecha de última actualización del vehículo
    FOREIGN KEY (usuarioId) REFERENCES Usuarios(usuarioId) -- Relación con la tabla Usuarios
);
GO

-- Recrear la tabla FotosVehiculos sin restricciones CHECK
CREATE TABLE FotosVehiculos (
    fotoId INT IDENTITY(1,1) PRIMARY KEY, -- Identificador único de la foto
    vehiculoId INT NOT NULL, -- Relación con el vehículo al que pertenece la foto
    urlFoto NVARCHAR(255) NOT NULL, -- Ruta o URL de la foto
    tipoFoto NVARCHAR(20) CHECK (tipoFoto IN ('interior', 'exterior')), -- Tipo de foto: interior o exterior
    FOREIGN KEY (vehiculoId) REFERENCES Vehiculos(vehiculoId) -- Relación con la tabla Vehiculos
);
GO

-- Tabla de Reservas de Vehículos
CREATE TABLE ReservasVehiculos (
    reservaId INT IDENTITY(1,1) PRIMARY KEY, -- Identificador único de la reserva
    usuarioId INT NOT NULL, -- Usuario que realiza la reserva
    vehiculoId INT NOT NULL, -- Vehículo reservado
    precioDolares DECIMAL(10,2), -- Precio del vehículo convertido a dólares
    fechaReserva DATETIME DEFAULT GETDATE(), -- Fecha en que se realiza la reserva
    estado NVARCHAR(20) CHECK (estado IN ('pendiente', 'confirmada', 'cancelada')) DEFAULT 'pendiente', -- Estado de la reserva
    metodoPago NVARCHAR(20) CHECK (metodoPago IN ('sinpe', 'paypal', 'tarjetaCredito')) NOT NULL, -- Método de pago utilizado
    montoPago DECIMAL(10,2) DEFAULT 2000.00, -- Monto fijo de pago por cita
    lugarCita NVARCHAR(50) CHECK (lugarCita IN ('Cartago', 'San José', 'Heredia', 'Alajuela')) NOT NULL, -- Lugar de la cita de revisión
    fechaCita DATETIME NOT NULL, -- Fecha y hora de la cita de revisión
    FOREIGN KEY (usuarioId) REFERENCES Usuarios(usuarioId), -- Relación con la tabla Usuarios
    FOREIGN KEY (vehiculoId) REFERENCES Vehiculos(vehiculoId) -- Relación con la tabla Vehiculos
);
GO

-- Tabla de Historial de Consultas
CREATE TABLE HistorialConsultas (
    consultaId INT IDENTITY(1,1) PRIMARY KEY,
    usuarioId INT,
    terminoConsulta NVARCHAR(255) NOT NULL, -- Ejemplo: "Toyota SUV 2020"
    fechaConsulta DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (usuarioId) REFERENCES Usuarios(usuarioId)
);
GO

-- Tabla de Comparaciones de Vehículos
CREATE TABLE ComparacionesVehiculos (
    comparacionId INT IDENTITY(1,1) PRIMARY KEY,
    usuarioId INT NOT NULL,
    vehiculoId1 INT NOT NULL,
    vehiculoId2 INT NOT NULL,
    vehiculoId3 INT,
    FOREIGN KEY (usuarioId) REFERENCES Usuarios(usuarioId),
    FOREIGN KEY (vehiculoId1) REFERENCES Vehiculos(vehiculoId),
    FOREIGN KEY (vehiculoId2) REFERENCES Vehiculos(vehiculoId),
    FOREIGN KEY (vehiculoId3) REFERENCES Vehiculos(vehiculoId)
);
GO

-- Tabla de Logs de Actividades
CREATE TABLE LogsActividades (
    logId INT IDENTITY(1,1) PRIMARY KEY,
    usuarioId INT NOT NULL,
    tipoActividad NVARCHAR(50) NOT NULL, -- Ejemplo: "registroVehiculo", "reservaCita"
    descripcionActividad NVARCHAR(MAX),
    fechaActividad DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (usuarioId) REFERENCES Usuarios(usuarioId)
);
GO

CREATE OR ALTER PROCEDURE InsertarUsuario
    @tipoIdentificacion NVARCHAR(20),
    @numeroIdentificacion NVARCHAR(50),
    @nombre NVARCHAR(50),
    @apellido1 NVARCHAR(50),
    @apellido2 NVARCHAR(50),
    @nacionalidad NVARCHAR(50),
    @fechaNacimiento DATE,
    @correo NVARCHAR(100),
    @contrasena NVARCHAR(255),
    @telefono NVARCHAR(20),
    @provincia NVARCHAR(50),
    @canton NVARCHAR(50),
    @distrito NVARCHAR(50),
    @idiomaInterfaz NVARCHAR(20) = 'es-CR'
AS
BEGIN
    INSERT INTO Usuarios (
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
    )
    VALUES (
        @tipoIdentificacion,
        @numeroIdentificacion,
        @nombre,
        @apellido1,
        @apellido2,
        @nacionalidad,
        @fechaNacimiento,
        @correo,
        @contrasena,
        @telefono,
        @provincia,
        @canton,
        @distrito,
        @idiomaInterfaz
    );
END;
GO

CREATE OR ALTER PROCEDURE ValidarUsuario
    @correo NVARCHAR(100),
    @contrasena NVARCHAR(255)
AS
BEGIN
    SELECT usuarioId, nombre, apellido1, apellido2, correo
    FROM Usuarios
    WHERE correo = @correo AND contrasena = @contrasena;
END;
GO

CREATE OR ALTER PROCEDURE InsertarVehiculo
    @usuarioId INT,
    @marca NVARCHAR(50),
    @modelo NVARCHAR(50),
    @anio INT,
    @placa NVARCHAR(20),
    @precioColones DECIMAL(10,2),
    @esNegociable BIT,
    @recibeOtrosVehiculos BIT,
    @transmision NVARCHAR(20),
    @tipoVehiculo NVARCHAR(20),
    @puertas INT,
    @largo DECIMAL(5,2),
    @ancho DECIMAL(5,2),
    @alto DECIMAL(5,2),
    @materialAsientos NVARCHAR(20),
    @tipoMotor NVARCHAR(20),
    @vidriosElectricos BIT,
    @espejosElectricos BIT,
    @sensoresTraseros BIT,
    @sensoresDelanteros BIT,
    @camaraRetroceso BIT,
    @camara360 BIT,
    @sensoresLaterales BIT,
    @tableroMando NVARCHAR(20),
    @tapizado NVARCHAR(20),
    @sistemaSonido NVARCHAR(20),
    @condicion INT,
    @estaEnLeasing BIT,
    @fotosInternas NVARCHAR(MAX),
    @fotosExternas NVARCHAR(MAX)
AS
BEGIN
    DECLARE @vehiculoId INT;

    INSERT INTO Vehiculos (
        usuarioId, marca, modelo, anio, placa, precioColones, esNegociable, recibeOtrosVehiculos, transmision, tipoVehiculo, puertas, largo, ancho, alto, materialAsientos, tipoMotor, vidriosElectricos, espejosElectricos, sensoresTraseros, sensoresDelanteros, camaraRetroceso, camara360, sensoresLaterales, tableroMando, tapizado, sistemaSonido, condicion, estaEnLeasing
    )
    VALUES (
        @usuarioId, @marca, @modelo, @anio, @placa, @precioColones, @esNegociable, @recibeOtrosVehiculos, @transmision, @tipoVehiculo, @puertas, @largo, @ancho, @alto, @materialAsientos, @tipoMotor, @vidriosElectricos, @espejosElectricos, @sensoresTraseros, @sensoresDelanteros, @camaraRetroceso, @camara360, @sensoresLaterales, @tableroMando, @tapizado, @sistemaSonido, @condicion, @estaEnLeasing
    );

    SET @vehiculoId = SCOPE_IDENTITY();

    -- Insertar fotos internas
    INSERT INTO FotosVehiculos (vehiculoId, urlFoto, tipoFoto)
    SELECT @vehiculoId, value, 'interior'
    FROM STRING_SPLIT(@fotosInternas, ',');

    -- Insertar fotos externas
    INSERT INTO FotosVehiculos (vehiculoId, urlFoto, tipoFoto)
    SELECT @vehiculoId, value, 'exterior'
    FROM STRING_SPLIT(@fotosExternas, ',');
END;
GO
CREATE OR ALTER PROCEDURE ModificarVehiculo
    @vehiculoId INT,
    @marca NVARCHAR(50),
    @modelo NVARCHAR(50),
    @anio INT,
    @placa NVARCHAR(20),
    @precioColones DECIMAL(10,2),
    @esNegociable BIT,
    @recibeOtrosVehiculos BIT,
    @transmision NVARCHAR(20),
    @tipoVehiculo NVARCHAR(20),
    @puertas INT,
    @largo DECIMAL(5,2),
    @ancho DECIMAL(5,2),
    @alto DECIMAL(5,2),
    @materialAsientos NVARCHAR(20),
    @tipoMotor NVARCHAR(20),
    @vidriosElectricos BIT,
    @espejosElectricos BIT,
    @sensoresTraseros BIT,
    @sensoresDelanteros BIT,
    @camaraRetroceso BIT,
    @camara360 BIT,
    @sensoresLaterales BIT,
    @tableroMando NVARCHAR(20),
    @tapizado NVARCHAR(20),
    @sistemaSonido NVARCHAR(20),
    @condicion INT,
    @estaEnLeasing BIT,
    @fotosInternas NVARCHAR(MAX),
    @fotosExternas NVARCHAR(MAX)
AS
BEGIN
    UPDATE Vehiculos
    SET
        marca = @marca,
        modelo = @modelo,
        anio = @anio,
        placa = @placa,
        precioColones = @precioColones,
        esNegociable = @esNegociable,
        recibeOtrosVehiculos = @recibeOtrosVehiculos,
        transmision = @transmision,
        tipoVehiculo = @tipoVehiculo,
        puertas = @puertas,
        largo = @largo,
        ancho = @ancho,
        alto = @alto,
        materialAsientos = @materialAsientos,
        tipoMotor = @tipoMotor,
        vidriosElectricos = @vidriosElectricos,
        espejosElectricos = @espejosElectricos,
        sensoresTraseros = @sensoresTraseros,
        sensoresDelanteros = @sensoresDelanteros,
        camaraRetroceso = @camaraRetroceso,
        camara360 = @camara360,
        sensoresLaterales = @sensoresLaterales,
        tableroMando = @tableroMando,
        tapizado = @tapizado,
        sistemaSonido = @sistemaSonido,
        condicion = @condicion,
        estaEnLeasing = @estaEnLeasing,
        fechaActualizacion = GETDATE()
    WHERE vehiculoId = @vehiculoId;

    -- Eliminar fotos existentes
    DELETE FROM FotosVehiculos WHERE vehiculoId = @vehiculoId;

    -- Insertar nuevas fotos internas
    INSERT INTO FotosVehiculos (vehiculoId, urlFoto, tipoFoto)
    SELECT @vehiculoId, value, 'interior'
    FROM STRING_SPLIT(@fotosInternas, ',');

    -- Insertar nuevas fotos externas
    INSERT INTO FotosVehiculos (vehiculoId, urlFoto, tipoFoto)
    SELECT @vehiculoId, value, 'exterior'
    FROM STRING_SPLIT(@fotosExternas, ',');
END;
GO
CREATE OR ALTER PROCEDURE EliminarVehiculo
    @vehiculoId INT
AS
BEGIN
    -- Eliminar fotos del vehículo
    DELETE FROM FotosVehiculos WHERE vehiculoId = @vehiculoId;

    -- Eliminar el vehículo
    DELETE FROM Vehiculos WHERE vehiculoId = @vehiculoId;
END;
GO

CREATE OR ALTER PROCEDURE ObtenerVehiculosPorUsuario
    @usuarioId INT
AS
BEGIN
    SELECT 
        v.vehiculoId,
        v.usuarioId,
        v.marca,
        v.modelo,
        v.anio,
        v.placa,
        v.precioColones,
        v.esNegociable,
        v.recibeOtrosVehiculos,
        v.transmision,
        v.tipoVehiculo,
        v.puertas,
        v.largo,
        v.ancho,
        v.alto,
        v.materialAsientos,
        v.tipoMotor,
        v.vidriosElectricos,
        v.espejosElectricos,
        v.sensoresTraseros,
        v.sensoresDelanteros,
        v.camaraRetroceso,
        v.camara360,
        v.sensoresLaterales,
        v.tableroMando,
        v.tapizado,
        v.sistemaSonido,
        v.condicion,
        v.estaEnLeasing,
        v.estaPublicado,
        v.fechaCreacion,
        v.fechaActualizacion,
        STRING_AGG(f.urlFoto, ',') WITHIN GROUP (ORDER BY f.tipoFoto) AS fotos,
        STRING_AGG(f.tipoFoto, ',') WITHIN GROUP (ORDER BY f.tipoFoto) AS tiposFotos
    FROM 
        Vehiculos v
    LEFT JOIN 
        FotosVehiculos f ON v.vehiculoId = f.vehiculoId
    WHERE 
        v.usuarioId = @usuarioId
    GROUP BY
        v.vehiculoId,
        v.usuarioId,
        v.marca,
        v.modelo,
        v.anio,
        v.placa,
        v.precioColones,
        v.esNegociable,
        v.recibeOtrosVehiculos,
        v.transmision,
        v.tipoVehiculo,
        v.puertas,
        v.largo,
        v.ancho,
        v.alto,
        v.materialAsientos,
        v.tipoMotor,
        v.vidriosElectricos,
        v.espejosElectricos,
        v.sensoresTraseros,
        v.sensoresDelanteros,
        v.camaraRetroceso,
        v.camara360,
        v.sensoresLaterales,
        v.tableroMando,
        v.tapizado,
        v.sistemaSonido,
        v.condicion,
        v.estaEnLeasing,
        v.estaPublicado,
        v.fechaCreacion,
        v.fechaActualizacion;
END;
GO

--Procedimiento para guardar una reserva
CREATE PROCEDURE RegistrarReserva
    @usuarioId INT,
    @vehiculoId INT,
    @precioDolares DECIMAL(10,2),
    @metodoPago NVARCHAR(20),
    @montoPago DECIMAL(10,2),
    @lugarCita NVARCHAR(50),
    @fechaCita DATETIME
AS
BEGIN
    INSERT INTO ReservasVehiculos (usuarioId, vehiculoId, precioDolares, metodoPago, montoPago, lugarCita, fechaCita)
    VALUES (@usuarioId, @vehiculoId, @precioDolares, @metodoPago, @montoPago, @lugarCita, GETDATE());
END;
GO
