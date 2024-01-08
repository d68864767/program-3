// api_endpoints.js
// This module defines the API endpoints and provides functions to interact with the OpenAI API.

const BASE_URL = 'https://api.openai.com';

// Define the API endpoints
const ENDPOINTS = {
  models: `${BASE_URL}/v1/models`,
  completions: (model) => `${BASE_URL}/v1/models/${model}/completions`,
  search: (model) => `${BASE_URL}/v1/models/${model}/search`,
  classifications: `${BASE_URL}/v1/classifications`,
  answers: `${BASE_URL}/v1/answers`,
  // Add more endpoints as needed
};

// Function to get the list of available models
async function listModels(apiKey) {
  try {
    const response = await fetch(ENDPOINTS.models, {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching models:', error);
    throw error;
  }
}

// Function to create a completion using a specific model
async function createCompletion(apiKey, model, prompt, options = {}) {
  try {
    const response = await fetch(ENDPOINTS.completions(model), {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt, ...options })
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error creating completion with model ${model}:`, error);
    throw error;
  }
}

// Add more functions to interact with other endpoints as needed

module.exports = {
  listModels,
  createCompletion,
  // Export other functions as needed
};
