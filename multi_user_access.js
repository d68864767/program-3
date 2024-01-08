const { ApiClient } = require('./api_client');
const { ErrorHandler } = require('./error_handler');
const { Logger } = require('./logger');

class MultiUserAccess {
  constructor(apiKey) {
    this.apiClient = new ApiClient(apiKey);
    this.logger = new Logger();
  }

  async addUser(email, role) {
    try {
      const data = { email, role };
      const response = await this.apiClient.post('/users/add', data);
      this.logger.log(`User ${email} added with role ${role}.`);
      return response;
    } catch (error) {
      ErrorHandler.handle(error);
      this.logger.error(`Error adding user ${email}: ${error.message}`);
    }
  }

  async removeUser(userId) {
    try {
      const response = await this.apiClient.delete(`/users/remove/${userId}`);
      this.logger.log(`User ${userId} removed.`);
      return response;
    } catch (error) {
      ErrorHandler.handle(error);
      this.logger.error(`Error removing user ${userId}: ${error.message}`);
    }
  }

  async updateUserRole(userId, newRole) {
    try {
      const data = { newRole };
      const response = await this.apiClient.patch(`/users/update/${userId}`, data);
      this.logger.log(`User ${userId} role updated to ${newRole}.`);
      return response;
    } catch (error) {
      ErrorHandler.handle(error);
      this.logger.error(`Error updating user ${userId} role: ${error.message}`);
    }
  }

  async listUsers() {
    try {
      const response = await this.apiClient.get('/users/list');
      this.logger.log('User list retrieved.');
      return response;
    } catch (error) {
      ErrorHandler.handle(error);
      this.logger.error(`Error retrieving user list: ${error.message}`);
    }
  }
}

module.exports = { MultiUserAccess };
