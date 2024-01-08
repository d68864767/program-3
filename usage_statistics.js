const fs = require('fs');
const path = require('path');
const logger = require('./logger.js');

// Assuming config.json contains relevant configuration such as file paths
const config = require('./config.json');

class UsageStatistics {
    constructor() {
        this.statsFilePath = path.join(__dirname, config.usageStatsPath);
        this.stats = this.loadStatistics();
    }

    loadStatistics() {
        try {
            const data = fs.readFileSync(this.statsFilePath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            logger.error('Error loading usage statistics:', error);
            return {};
        }
    }

    saveStatistics() {
        try {
            const data = JSON.stringify(this.stats, null, 2);
            fs.writeFileSync(this.statsFilePath, data, 'utf8');
            logger.info('Usage statistics saved successfully.');
        } catch (error) {
            logger.error('Error saving usage statistics:', error);
        }
    }

    recordApiCall(endpoint) {
        const date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD format
        if (!this.stats[date]) {
            this.stats[date] = {};
        }
        if (!this.stats[date][endpoint]) {
            this.stats[date][endpoint] = 0;
        }
        this.stats[date][endpoint] += 1;
        this.saveStatistics();
    }

    getStatistics() {
        return this.stats;
    }

    getDailyStatistics(date) {
        return this.stats[date] || {};
    }

    getEndpointStatistics(endpoint) {
        return Object.keys(this.stats).reduce((acc, date) => {
            if (this.stats[date][endpoint]) {
                acc[date] = this.stats[date][endpoint];
            }
            return acc;
        }, {});
    }
}

module.exports = new UsageStatistics();
