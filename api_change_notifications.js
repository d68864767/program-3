const EventEmitter = require('events');
const logger = require('./logger.js');

class APIChangeNotifications extends EventEmitter {
  constructor() {
    super();
    this.subscribers = [];
  }

  // Subscribe a client to the API change notifications
  subscribe(client) {
    if (this.subscribers.indexOf(client) === -1) {
      this.subscribers.push(client);
      logger.log(`Subscribed client ${client.id} to API change notifications.`);
    } else {
      logger.log(`Client ${client.id} is already subscribed to API change notifications.`);
    }
  }

  // Unsubscribe a client from the API change notifications
  unsubscribe(client) {
    const index = this.subscribers.indexOf(client);
    if (index !== -1) {
      this.subscribers.splice(index, 1);
      logger.log(`Unsubscribed client ${client.id} from API change notifications.`);
    } else {
      logger.log(`Client ${client.id} is not subscribed to API change notifications.`);
    }
  }

  // Notify all subscribed clients about an API change
  notifyChange(apiChangeInfo) {
    this.subscribers.forEach(client => {
      client.receiveNotification(apiChangeInfo);
    });
    logger.log('Notified all subscribed clients about API change.');
    this.emit('apiChange', apiChangeInfo);
  }
}

// Example usage:
// const apiChangeNotifications = new APIChangeNotifications();
// apiChangeNotifications.subscribe(clientA);
// apiChangeNotifications.notifyChange({ version: '2.0', changes: ['New endpoints', 'Deprecated methods'] });

module.exports = APIChangeNotifications;
