// support_troubleshooting.js

const logger = require('./logger');
const apiClient = require('./api_client');
const errorHandler = require('./error_handler');

/**
 * Provides support and troubleshooting services for OpenAI API key related issues.
 */
class SupportTroubleshooting {
  /**
   * Initializes the support and troubleshooting module.
   */
  constructor() {
    // Load configuration settings if necessary
  }

  /**
   * Contacts OpenAI support with a given issue.
   * @param {string} apiKey - The API key associated with the user's account.
   * @param {string} issueDescription - A description of the issue encountered.
   * @returns {Promise<Object>} - The response from the support team.
   */
  async contactSupport(apiKey, issueDescription) {
    try {
      const supportTicket = {
        apiKey: apiKey,
        description: issueDescription,
        timestamp: new Date().toISOString(),
      };

      // Log the attempt to contact support
      logger.log('Contacting OpenAI support with issue:', supportTicket);

      // Send the support ticket to OpenAI support system
      const response = await apiClient.post('/support', supportTicket);

      // Log the successful contact
      logger.log('Support contacted successfully:', response);

      return response;
    } catch (error) {
      // Handle any errors that occur during the contact process
      errorHandler.handleError(error);
      throw error;
    }
  }

  /**
   * Provides troubleshooting steps for common issues.
   * @param {string} issueType - The type of issue encountered.
   * @returns {string[]} - An array of troubleshooting steps.
   */
  getTroubleshootingSteps(issueType) {
    const troubleshootingSteps = {
      'rate-limit': [
        'Verify your current usage against your rate limit.',
        'Consider optimizing your requests to reduce frequency.',
        'If necessary, request a rate limit adjustment from OpenAI.',
      ],
      'authentication-error': [
        'Ensure that your API key is correct and has not expired.',
        'Check for any recent security updates that may affect authentication.',
        'Try regenerating a new API key from your OpenAI dashboard.',
      ],
      // Add more issue types and their respective troubleshooting steps
    };

    // Log the troubleshooting request
    logger.log(`Retrieving troubleshooting steps for issue: ${issueType}`);

    return troubleshootingSteps[issueType] || ['Contact OpenAI support for further assistance.'];
  }
}

module.exports = new SupportTroubleshooting();
