CREATE VIEW VistaVehiculoConFotos AS
SELECT 
    V.vehiculoId,
    V.usuarioId,
    V.marca,
    V.modelo,
    V.anio,
    V.placa,
    V.precioColones,
    V.esNegociable,
    V.recibeOtrosVehiculos,
    V.transmision,
    V.tipoVehiculo,
    V.puertas,
    V.largo,
    V.ancho,
    V.alto,
    V.materialAsientos,
    V.tipoMotor,
    V.vidriosElectricos,
    V.espejosElectricos,
    V.sensoresTraseros,
    V.sensoresDelanteros,
    V.camaraRetroceso,
    V.camara360,
    V.sensoresLaterales,
    V.tableroMando,
    V.tapizado,
    V.sistemaSonido,
    V.condicion,
    V.estaEnLeasing,
    V.estaPublicado,
    V.fechaCreacion,
    V.fechaActualizacion,
    -- Imágenes externas e internas
    (SELECT STRING_AGG(F.urlFoto, ', ') 
     FROM FotosVehiculos F 
     WHERE F.vehiculoId = V.vehiculoId AND F.tipoFoto = 'exterior') AS imagenesExternas,
    (SELECT STRING_AGG(F.urlFoto, ', ') 
     FROM FotosVehiculos F 
     WHERE F.vehiculoId = V.vehiculoId AND F.tipoFoto = 'interior') AS imagenesInternas
FROM 
    Vehiculos V;
GO

select * from VistaVehiculoConFotos