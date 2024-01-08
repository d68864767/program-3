const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Assuming there's a JSON file to store feature requests
const FEATURE_REQUESTS_FILE = path.join(__dirname, 'feature_requests.json');

// Helper function to read the current feature requests
function readFeatureRequests() {
  if (!fs.existsSync(FEATURE_REQUESTS_FILE)) {
    return [];
  }
  const data = fs.readFileSync(FEATURE_REQUESTS_FILE);
  return JSON.parse(data);
}

// Helper function to save feature requests
function saveFeatureRequests(requests) {
  const data = JSON.stringify(requests, null, 2);
  fs.writeFileSync(FEATURE_REQUESTS_FILE, data);
}

// Create a new feature request
function createFeatureRequest(description, user) {
  const requests = readFeatureRequests();
  const newRequest = {
    id: uuidv4(),
    description,
    status: 'pending',
    createdBy: user,
    createdAt: new Date().toISOString()
  };
  requests.push(newRequest);
  saveFeatureRequests(requests);
  return newRequest;
}

// Get all feature requests
function getAllFeatureRequests() {
  return readFeatureRequests();
}

// Update a feature request status
function updateFeatureRequestStatus(requestId, status) {
  const requests = readFeatureRequests();
  const requestIndex = requests.findIndex(req => req.id === requestId);
  if (requestIndex === -1) {
    throw new Error('Feature request not found');
  }
  requests[requestIndex].status = status;
  saveFeatureRequests(requests);
}

// Delete a feature request (if needed)
function deleteFeatureRequest(requestId) {
  let requests = readFeatureRequests();
  requests = requests.filter(req => req.id !== requestId);
  saveFeatureRequests(requests);
}

module.exports = {
  createFeatureRequest,
  getAllFeatureRequests,
  updateFeatureRequestStatus,
  deleteFeatureRequest
};
