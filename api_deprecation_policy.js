/**
 * api_deprecation_policy.js
 * 
 * This module handles the deprecation policy for the API. It ensures that users are
 * informed in advance about any API features that will be deprecated and provides
 * tools to help them transition to newer versions or alternatives.
 */

const { sendNotificationToUsers, logDeprecation } = require('./logger.js');
const { getDeprecatedEndpoints, getReplacementEndpoints } = require('./api_endpoints.js');

class APIDeprecationPolicy {
  constructor() {
    this.deprecationSchedule = {};
  }

  /**
   * Adds a deprecation notice to the schedule.
   * @param {string} endpoint - The API endpoint that is being deprecated.
   * @param {Date} removalDate - The date when the endpoint will be removed.
   * @param {string} replacement - The recommended replacement endpoint, if available.
   */
  scheduleDeprecation(endpoint, removalDate, replacement = '') {
    this.deprecationSchedule[endpoint] = { removalDate, replacement };
    logDeprecation(endpoint, removalDate, replacement);
  }

  /**
   * Notifies users about the deprecation of an endpoint.
   * @param {string} endpoint - The API endpoint that is being deprecated.
   */
  notifyUsersOfDeprecation(endpoint) {
    if (this.deprecationSchedule[endpoint]) {
      const { removalDate, replacement } = this.deprecationSchedule[endpoint];
      const message = `The API endpoint ${endpoint} is scheduled for deprecation on ${removalDate}.` +
                      (replacement ? ` Please migrate to ${replacement} as soon as possible.` : '');
      sendNotificationToUsers(message);
    }
  }

  /**
   * Checks if there are any endpoints scheduled for deprecation and notifies users.
   */
  checkAndNotifyDeprecations() {
    const deprecatedEndpoints = getDeprecatedEndpoints();
    deprecatedEndpoints.forEach(endpoint => {
      this.notifyUsersOfDeprecation(endpoint);
    });
  }

  /**
   * Provides a list of endpoints that have replacements.
   * @returns {Object} An object with deprecated endpoints as keys and their replacements as values.
   */
  getDeprecationReplacements() {
    return getReplacementEndpoints();
  }
}

// Export the APIDeprecationPolicy class for use in other modules
module.exports = APIDeprecationPolicy;
