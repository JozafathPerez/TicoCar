import React from "react";

// Componente base
const VehicleInfo = ({ name, type, price }) => {
  return (
    <div className="vehicle-card border p-4 rounded-lg shadow-lg max-w-md">
      <h2 className="text-xl font-bold">{name}</h2>
      <p className="text-gray-600">Tipo: {type}</p>
      <p className="text-green-600 font-semibold">Precio: ${price}</p>
    </div>
  );
};

// Decorador que agrega un distintivo
const withBadge = (WrappedComponent, badgeText) => {
  return (props) => (
    <div className="relative">
      <WrappedComponent {...props} />
      {badgeText && (
        <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          {badgeText}
        </div>
      )}
    </div>
  );
};

// Ejemplo de uso
const VehicleWithBadge = withBadge(VehicleInfo, "Negociable"); // Puedes cambiar "Negociable" por "Reservado", etc.

const App = () => {
  return (
    <div className="app-container p-8">
      <VehicleWithBadge name="Toyota Corolla" type="Sedán" price="15000" />
      <VehicleWithBadge name="Ford Ranger" type="Pickup" price="35000" />
    </div>
  );
};

export default App;
