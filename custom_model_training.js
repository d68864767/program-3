const { OpenAIApiClient } = require('./api_client');
const { ErrorHandler } = require('./error_handler');
const { Logger } = require('./logger');

class CustomModelTraining {
  constructor(apiKey, modelConfig) {
    this.apiClient = new OpenAIApiClient(apiKey);
    this.modelConfig = modelConfig;
    this.logger = new Logger();
  }

  async trainModel() {
    try {
      this.logger.log('Starting custom model training...');
      const trainingResponse = await this.apiClient.trainModel(this.modelConfig);

      if (trainingResponse.status === 'succeeded') {
        this.logger.log('Model training succeeded.');
        return trainingResponse.model;
      } else {
        this.logger.log('Model training failed.', trainingResponse);
        throw new Error('Model training did not succeed.');
      }
    } catch (error) {
      ErrorHandler.handle(error);
      throw error;
    }
  }

  async listTrainedModels() {
    try {
      this.logger.log('Fetching list of trained models...');
      const modelsList = await this.apiClient.listTrainedModels();
      this.logger.log(`Retrieved ${modelsList.length} models.`);
      return modelsList;
    } catch (error) {
      ErrorHandler.handle(error);
      throw error;
    }
  }

  async getModelDetails(modelId) {
    try {
      this.logger.log(`Fetching details for model: ${modelId}`);
      const modelDetails = await this.apiClient.getModelDetails(modelId);
      this.logger.log(`Details for model ${modelId}:`, modelDetails);
      return modelDetails;
    } catch (error) {
      ErrorHandler.handle(error);
      throw error;
    }
  }

  async deleteModel(modelId) {
    try {
      this.logger.log(`Deleting model: ${modelId}`);
      const deleteResponse = await this.apiClient.deleteModel(modelId);
      if (deleteResponse.status === 'succeeded') {
        this.logger.log(`Model ${modelId} deleted successfully.`);
      } else {
        this.logger.log(`Failed to delete model ${modelId}.`, deleteResponse);
        throw new Error(`Failed to delete model ${modelId}.`);
      }
    } catch (error) {
      ErrorHandler.handle(error);
      throw error;
    }
  }
}

module.exports = { CustomModelTraining };
