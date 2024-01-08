const fs = require('fs');
const path = require('path');
const { OpenAIUsageMonitor } = require('./usage_monitoring');
const { logger } = require('./logger');

class UsageReports {
  constructor(apiClient) {
    this.apiClient = apiClient;
    this.usageMonitor = new OpenAIUsageMonitor(apiClient);
    this.reportsDirectory = path.join(__dirname, 'reports');
    this.ensureReportsDirectoryExists();
  }

  ensureReportsDirectoryExists() {
    if (!fs.existsSync(this.reportsDirectory)) {
      fs.mkdirSync(this.reportsDirectory);
    }
  }

  async generateReport() {
    try {
      const usageData = await this.usageMonitor.getUsageData();
      const reportContent = this.formatReport(usageData);
      const reportPath = this.getReportPath();
      fs.writeFileSync(reportPath, reportContent);
      logger.info(`Usage report generated: ${reportPath}`);
    } catch (error) {
      logger.error('Failed to generate usage report', error);
      throw error;
    }
  }

  formatReport(usageData) {
    // You can customize this method to format the report content as needed
    return JSON.stringify(usageData, null, 2);
  }

  getReportPath() {
    const date = new Date();
    const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD format
    return path.join(this.reportsDirectory, `usage-report-${dateString}.json`);
  }
}

module.exports = { UsageReports };
