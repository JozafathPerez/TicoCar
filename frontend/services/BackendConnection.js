// BackendConnection.js
class BackendConnection {
    static instance;
  
    constructor(baseURL) {
      if (BackendConnection.instance) {
        return BackendConnection.instance; // Retorna la misma instancia si ya existe
      }
  
      this.baseURL = baseURL; // La URL base del backend
      BackendConnection.instance = this; // Asigna la instancia a una propiedad estática
    }
  
    async get(endpoint) {
      try {
        console.log(`${this.baseURL}${endpoint}`);
        const response = await fetch(`${this.baseURL}${endpoint}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        return await response.json(); // Devuelve los datos en formato JSON
      } catch (error) {
        console.error(`Error en GET ${endpoint}:`, error);
        throw error; // Propaga el error para manejarlo en el componente
      }
    }
  
    async post(endpoint, data) {
      try {
        const response = await fetch(`${this.baseURL}${endpoint}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        return await response.json(); // Devuelve los datos en formato JSON
      } catch (error) {
        console.error(`Error en POST ${endpoint}:`, error);
        throw error; // Propaga el error para manejarlo en el componente
      }
    }
  }
  
  // Exporta la instancia única de la conexión al backend
  export default new BackendConnection("http://localhost:3000");
  