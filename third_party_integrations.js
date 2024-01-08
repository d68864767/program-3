const axios = require('axios');
const { API_KEY, INTEGRATION_SERVICE_URL } = require('./config.json');
const logger = require('./logger.js');

class ThirdPartyIntegrations {
  constructor() {
    this.apiKey = API_KEY;
    this.integrationServiceUrl = INTEGRATION_SERVICE_URL;
  }

  async integrateWithService(serviceName, integrationData) {
    try {
      const response = await axios.post(`${this.integrationServiceUrl}/${serviceName}`, integrationData, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        logger.log('Integration successful', serviceName);
        return response.data;
      } else {
        logger.error('Integration failed', serviceName, response.status);
        throw new Error(`Integration failed with status: ${response.status}`);
      }
    } catch (error) {
      logger.error('Integration error', serviceName, error);
      throw error;
    }
  }

  async removeIntegration(serviceName) {
    try {
      const response = await axios.delete(`${this.integrationServiceUrl}/${serviceName}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });

      if (response.status === 200) {
        logger.log('Integration removal successful', serviceName);
        return response.data;
      } else {
        logger.error('Integration removal failed', serviceName, response.status);
        throw new Error(`Integration removal failed with status: ${response.status}`);
      }
    } catch (error) {
      logger.error('Integration removal error', serviceName, error);
      throw error;
    }
  }

  async listIntegrations() {
    try {
      const response = await axios.get(`${this.integrationServiceUrl}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });

      if (response.status === 200) {
        logger.log('Retrieved integrations list successfully');
        return response.data;
      } else {
        logger.error('Failed to retrieve integrations list', response.status);
        throw new Error(`Failed to retrieve integrations list with status: ${response.status}`);
      }
    } catch (error) {
      logger.error('Error retrieving integrations list', error);
      throw error;
    }
  }
}

module.exports = ThirdPartyIntegrations;
