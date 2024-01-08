const { OpenAI } = require('./api_client');
const logger = require('./logger');

class UsageMonitoring {
  constructor(apiKey) {
    this.openAI = new OpenAI(apiKey);
    this.usageData = {};
  }

  async fetchUsage() {
    try {
      const usage = await this.openAI.getUsage();
      this.usageData = usage;
      logger.log('Usage data fetched successfully.');
      return usage;
    } catch (error) {
      logger.error('Error fetching usage data:', error);
      throw error;
    }
  }

  getUsageData() {
    return this.usageData;
  }

  monitorUsage() {
    setInterval(async () => {
      try {
        await this.fetchUsage();
        this.checkUsageThresholds();
      } catch (error) {
        logger.error('Error during usage monitoring:', error);
      }
    }, 60000); // Check every minute
  }

  checkUsageThresholds() {
    const { total_tokens, tokens_left } = this.usageData;
    const threshold = 0.8; // 80% usage threshold
    const currentUsage = (total_tokens - tokens_left) / total_tokens;

    if (currentUsage > threshold) {
      logger.warn(`Usage threshold exceeded: ${currentUsage * 100}% used.`);
      // Implement notification logic here, e.g., send an email or an alert
    }
  }
}

module.exports = UsageMonitoring;
