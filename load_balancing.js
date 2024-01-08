const { OpenAIClient } = require('./api_client');
const logger = require('./logger');

class LoadBalancer {
  constructor() {
    this.clients = [];
    this.currentIndex = 0;
  }

  addClient(apiKey) {
    const client = new OpenAIClient(apiKey);
    this.clients.push(client);
  }

  getNextClient() {
    if (this.clients.length === 0) {
      throw new Error('No API clients available for load balancing');
    }
    const client = this.clients[this.currentIndex];
    this.currentIndex = (this.currentIndex + 1) % this.clients.length;
    return client;
  }

  async makeBalancedRequest(data) {
    try {
      const client = this.getNextClient();
      const response = await client.makeRequest(data);
      return response;
    } catch (error) {
      logger.log('error', 'Error in making a balanced request', { error });
      throw error;
    }
  }
}

module.exports = { LoadBalancer };
