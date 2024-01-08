const config = require('./config.json');
const logger = require('./logger.js');
const error_handler = require('./error_handler.js');

class RateLimiter {
    constructor() {
        this.rateLimits = config.rateLimits || {
            windowMs: 15 * 60 * 1000, // 15 minutes
            maxRequests: 100 // limit each IP to 100 requests per windowMs
        };
    }

    checkRateLimit(req, res, next) {
        const ip = req.ip;
        const currentTime = Date.now();

        if (!this.requests) {
            this.requests = {};
        }

        if (!this.requests[ip]) {
            this.requests[ip] = [];
        }

        const requests = this.requests[ip];
        const windowStartTimestamp = currentTime - this.rateLimits.windowMs;

        // Filter out any requests that happened before the current window
        const recentRequests = requests.filter(timestamp => timestamp > windowStartTimestamp);
        this.requests[ip] = recentRequests;

        if (recentRequests.length >= this.rateLimits.maxRequests) {
            logger.log(`Rate limit exceeded for IP: ${ip}`);
            res.status(429).send('Error: Rate limit exceeded. Please try again later.');
            return;
        }

        // Log the new request timestamp
        recentRequests.push(currentTime);
        next();
    }
}

module.exports = new RateLimiter();
