class TranslationService {
    constructor() {
      this.translations = {
        'es-CR': {
          welcome: 'Bienvenido',
          login: 'Iniciar Sesión',
          register: 'Registrarse',
          compare: 'Comparar Autos',
          // Agrega más traducciones según sea necesario
        },
        'en-US': {
          welcome: 'Welcome',
          login: 'Login',
          register: 'Register',
          compare: 'Compare Cars',
          // Add more translations as needed
        },
      };
    }
  
    translate(key, language) {
      return this.translations[language][key] || key;
    }
  }
  
  export default new TranslationService();