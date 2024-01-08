const { EventEmitter } = require('events');
const logger = require('./logger.js');

class RealTimeMonitoring extends EventEmitter {
  constructor(apiClient) {
    super();
    this.apiClient = apiClient;
    this.monitoringInterval = null;
    this.intervalDuration = 5000; // Monitor every 5 seconds by default
  }

  startMonitoring() {
    if (this.monitoringInterval) {
      logger.log('Real-time monitoring is already running.');
      return;
    }

    this.monitoringInterval = setInterval(async () => {
      try {
        const status = await this.apiClient.getAPIStatus();
        this.emit('status', status);

        if (!status.ok) {
          this.emit('error', new Error('API status is not OK.'));
        }
      } catch (error) {
        this.emit('error', error);
      }
    }, this.intervalDuration);

    logger.log('Real-time monitoring started.');
  }

  stopMonitoring() {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
      logger.log('Real-time monitoring stopped.');
    } else {
      logger.log('Real-time monitoring is not running.');
    }
  }

  setIntervalDuration(duration) {
    if (typeof duration === 'number' && duration > 0) {
      this.intervalDuration = duration;
      logger.log(`Monitoring interval set to ${duration} ms.`);
    } else {
      throw new Error('Invalid duration. Must be a positive number.');
    }
  }
}

module.exports = RealTimeMonitoring;
