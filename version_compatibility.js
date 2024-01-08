// version_compatibility.js
// This module handles the compatibility checks for different versions of the OpenAI API.

const { OPENAI_API_VERSIONS } = require('./config.json');
const logger = require('./logger.js');

// Function to check if the current API version is compatible with the client's version
function isCompatible(clientVersion) {
  // Check if the client's version is in the list of supported versions
  return OPENAI_API_VERSIONS.includes(clientVersion);
}

// Function to suggest the closest compatible version if the client's version is not supported
function suggestVersion(clientVersion) {
  // If the client's version is higher than the highest supported version, suggest the highest supported version
  if (clientVersion > Math.max(...OPENAI_API_VERSIONS)) {
    return `The highest compatible version is ${Math.max(...OPENAI_API_VERSIONS)}. Please downgrade your client.`;
  }
  // If the client's version is lower than the lowest supported version, suggest the lowest supported version
  if (clientVersion < Math.min(...OPENAI_API_VERSIONS)) {
    return `The lowest compatible version is ${Math.min(...OPENAI_API_VERSIONS)}. Please upgrade your client.`;
  }
  // If the client's version is within the range but not supported, suggest the nearest supported version
  const sortedVersions = OPENAI_API_VERSIONS.sort((a, b) => a - b);
  for (let i = 0; i < sortedVersions.length; i++) {
    if (clientVersion < sortedVersions[i]) {
      return `The closest compatible version is ${sortedVersions[i]}. Please adjust your client version.`;
    }
  }
}

// Function to log and handle incompatible version issues
function handleIncompatibility(clientVersion) {
  const compatibilityMessage = isCompatible(clientVersion)
    ? 'Client version is compatible.'
    : suggestVersion(clientVersion);

  logger.log(`Version Compatibility Check: ${compatibilityMessage}`);
  return compatibilityMessage;
}

module.exports = {
  isCompatible,
  suggestVersion,
  handleIncompatibility,
};
