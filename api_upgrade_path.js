// api_upgrade_path.js
// This module provides functionality to manage API version upgrades

const { getCurrentAPIVersion, getAvailableUpgrades, applyUpgrade } = require('./version_compatibility.js');
const logger = require('./logger.js');

class APIUpgradePath {
  constructor() {
    this.currentVersion = getCurrentAPIVersion();
    this.availableUpgrades = [];
  }

  // Fetches the available upgrades from the version compatibility service
  async fetchAvailableUpgrades() {
    try {
      this.availableUpgrades = await getAvailableUpgrades(this.currentVersion);
      logger.log('Available API upgrades fetched successfully.');
    } catch (error) {
      logger.error('Error fetching available API upgrades:', error);
      throw error;
    }
  }

  // Applies the specified upgrade to the API
  async upgradeAPI(targetVersion) {
    if (!this.availableUpgrades.includes(targetVersion)) {
      logger.error(`Upgrade to version ${targetVersion} is not available.`);
      return;
    }

    try {
      await applyUpgrade(targetVersion);
      this.currentVersion = targetVersion;
      logger.log(`API upgraded successfully to version ${targetVersion}.`);
    } catch (error) {
      logger.error(`Error upgrading API to version ${targetVersion}:`, error);
      throw error;
    }
  }

  // Displays the current API version and available upgrades
  displayUpgradeOptions() {
    logger.log(`Current API Version: ${this.currentVersion}`);
    logger.log('Available Upgrades:', this.availableUpgrades.join(', '));
  }
}

module.exports = APIUpgradePath;
