const { OpenAIKeyManager } = require('./api_client.js');
const logger = require('./logger.js');

class KeyRotation {
  constructor() {
    this.keyManager = new OpenAIKeyManager();
  }

  async rotateKey(currentKeyId) {
    try {
      // Invalidate the current key
      await this.keyManager.invalidateKey(currentKeyId);

      // Generate a new key
      const newKey = await this.keyManager.generateNewKey();

      // Log the key rotation
      logger.log(`Key rotation successful. New key ID: ${newKey.id}`);

      // Return the new key information
      return newKey;
    } catch (error) {
      // Log the error
      logger.error('Key rotation failed', error);

      // Re-throw the error for further handling
      throw error;
    }
  }
}

module.exports = KeyRotation;
