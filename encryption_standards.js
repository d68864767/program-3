/**
 * encryption_standards.js
 * This module handles the encryption standards used for securing data
 * in transit and at rest within the application.
 */

const crypto = require('crypto');

// Configuration for encryption standards
const encryptionConfig = {
  // Symmetric key encryption for data at rest (e.g., AES-256)
  dataAtRest: {
    algorithm: 'aes-256-cbc',
    keyLength: 32, // Key length for AES-256 is 32 bytes
    ivLength: 16, // IV length for AES is 16 bytes
  },
  // TLS configuration for data in transit
  dataInTransit: {
    minVersion: 'TLSv1.2',
    maxVersion: 'TLSv1.3',
    ciphers: [
      'TLS_AES_256_GCM_SHA384',
      'TLS_CHACHA20_POLY1305_SHA256',
      'TLS_AES_128_GCM_SHA256',
      'ECDHE-RSA-AES128-GCM-SHA256',
      // Add more ciphers as per security requirements
    ],
  },
};

/**
 * Encrypt data using the configured standards for data at rest.
 * @param {Buffer|string} data - The data to encrypt.
 * @returns {object} - The encrypted data with the IV.
 */
function encryptDataAtRest(data) {
  const iv = crypto.randomBytes(encryptionConfig.dataAtRest.ivLength);
  const key = crypto.randomBytes(encryptionConfig.dataAtRest.keyLength);
  const cipher = crypto.createCipheriv(encryptionConfig.dataAtRest.algorithm, key, iv);

  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return {
    iv: iv.toString('hex'),
    encryptedData: encrypted,
    key: key.toString('hex'), // In a real-world scenario, the key would be managed securely
  };
}

/**
 * Decrypt data using the configured standards for data at rest.
 * @param {object} payload - The payload containing the encrypted data, IV, and key.
 * @returns {string} - The decrypted data.
 */
function decryptDataAtRest(payload) {
  const { encryptedData, iv, key } = payload;
  const decipher = crypto.createDecipheriv(encryptionConfig.dataAtRest.algorithm, Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));

  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}

// Export the encryption functions and configuration
module.exports = {
  encryptDataAtRest,
  decryptDataAtRest,
  encryptionConfig,
};
