// UserManagementFacade.js
class UserManagementFacade {
    constructor(userService, verificationService) {
      this.userService = userService;
      this.verificationService = verificationService;
    }
  
    async registerUser(userData) {
      const verificationResult = await this.verificationService.verifyUser(userData.idType, userData.idNumber);
      if (!verificationResult.valid) {
        return { success: false, message: verificationResult.message };
      }
  
      const user = await this.userService.createUser(userData);
      return { success: true, user };
    }
  
    async updateUser(userId, userData) {
      const user = await this.userService.updateUser(userId, userData);
      return { success: true, user };
    }
  
    async verifyUser(idType, idNumber) {
      return await this.verificationService.verifyUser(idType, idNumber);
    }
  }
  
  // Uso del patrón Fachada
  const userService = new UserService();
  const verificationService = new VerificationService();
  const userManagementFacade = new UserManagementFacade(userService, verificationService);
  
  const handleUserRegistration = async (userData) => {
    const result = await userManagementFacade.registerUser(userData);
    if (result.success) {
      console.log('Usuario registrado con éxito');
    } else {
      console.error(result.message);
    }
  };