const config = require('./config.json');
const logger = require('./logger.js');
const ErrorHandler = require('./error_handler.js');

class BillingAndPayments {
    constructor(apiClient) {
        this.apiClient = apiClient;
    }

    async getBillingInfo() {
        try {
            const response = await this.apiClient.get('/billing-info');
            logger.log('Billing info retrieved successfully.');
            return response.data;
        } catch (error) {
            logger.error('Error retrieving billing info.');
            ErrorHandler.handle(error);
        }
    }

    async updatePaymentMethod(paymentDetails) {
        try {
            const response = await this.apiClient.post('/update-payment-method', paymentDetails);
            logger.log('Payment method updated successfully.');
            return response.data;
        } catch (error) {
            logger.error('Error updating payment method.');
            ErrorHandler.handle(error);
        }
    }

    async getInvoiceList() {
        try {
            const response = await this.apiClient.get('/invoices');
            logger.log('Invoice list retrieved successfully.');
            return response.data;
        } catch (error) {
            logger.error('Error retrieving invoice list.');
            ErrorHandler.handle(error);
        }
    }

    async getInvoiceDetails(invoiceId) {
        try {
            const response = await this.apiClient.get(`/invoices/${invoiceId}`);
            logger.log('Invoice details retrieved successfully.');
            return response.data;
        } catch (error) {
            logger.error('Error retrieving invoice details.');
            ErrorHandler.handle(error);
        }
    }

    async payInvoice(invoiceId) {
        try {
            const response = await this.apiClient.post(`/pay-invoice/${invoiceId}`);
            logger.log('Invoice paid successfully.');
            return response.data;
        } catch (error) {
            logger.error('Error paying invoice.');
            ErrorHandler.handle(error);
        }
    }
}

module.exports = BillingAndPayments;
