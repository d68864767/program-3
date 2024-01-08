// user_community.js
// This module handles the user community features such as forums, user groups, and community-driven support.

const config = require('./config.json');
const logger = require('./logger.js');

class UserCommunity {
    constructor(apiClient) {
        this.apiClient = apiClient;
    }

    // Fetches the latest community discussions and updates
    async fetchCommunityDiscussions() {
        try {
            const response = await this.apiClient.get(`${config.apiBaseUrl}/community/discussions`);
            return response.data;
        } catch (error) {
            logger.error('Error fetching community discussions', error);
            throw error;
        }
    }

    // Posts a new discussion topic to the community forum
    async postDiscussionTopic(topicDetails) {
        try {
            const response = await this.apiClient.post(`${config.apiBaseUrl}/community/discussions`, topicDetails);
            return response.data;
        } catch (error) {
            logger.error('Error posting new discussion topic', error);
            throw error;
        }
    }

    // Joins a user to a specific community group
    async joinCommunityGroup(groupId, userId) {
        try {
            const response = await this.apiClient.post(`${config.apiBaseUrl}/community/groups/${groupId}/join`, { userId });
            return response.data;
        } catch (error) {
            logger.error('Error joining community group', error);
            throw error;
        }
    }

    // Leaves a community group
    async leaveCommunityGroup(groupId, userId) {
        try {
            const response = await this.apiClient.post(`${config.apiBaseUrl}/community/groups/${groupId}/leave`, { userId });
            return response.data;
        } catch (error) {
            logger.error('Error leaving community group', error);
            throw error;
        }
    }

    // Retrieves the list of community groups
    async getCommunityGroups() {
        try {
            const response = await this.apiClient.get(`${config.apiBaseUrl}/community/groups`);
            return response.data;
        } catch (error) {
            logger.error('Error retrieving community groups', error);
            throw error;
        }
    }
}

module.exports = UserCommunity;
