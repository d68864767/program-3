// data_retention_policies.js
// This module handles the data retention policies for the OpenAI API key usage

const config = require('./config.json');
const logger = require('./logger.js');

class DataRetentionPolicies {
  constructor() {
    this.retentionPeriod = config.dataRetentionPeriod || 90; // default retention period in days
  }

  // Sets the data retention period
  setRetentionPeriod(days) {
    if (typeof days !== 'number' || days <= 0) {
      throw new Error('Retention period must be a positive number of days.');
    }
    this.retentionPeriod = days;
    logger.log(`Data retention period updated to ${days} days.`);
  }

  // Retrieves the current data retention period
  getRetentionPeriod() {
    return this.retentionPeriod;
  }

  // Applies the retention policy to the stored data
  applyRetentionPolicy(dataStore) {
    const currentDate = new Date();
    const retentionDate = new Date(currentDate.getTime() - (this.retentionPeriod * 24 * 60 * 60 * 1000));

    dataStore.filter(record => {
      const recordDate = new Date(record.timestamp);
      return recordDate >= retentionDate;
    });

    logger.log('Data retention policy applied.');
  }

  // Logs the current retention policy details
  logRetentionPolicy() {
    logger.log(`Current data retention period is ${this.retentionPeriod} days.`);
  }
}

module.exports = DataRetentionPolicies;
