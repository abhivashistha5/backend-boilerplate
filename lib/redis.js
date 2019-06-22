const redis = require('redis');
const logger = require('./logger');
const config = require('../config/appConfig');

try {
  const redisClient = redis.createClient({
    host: config.redis_host,
    port: config.redis_port,
  });

  module.exports = redisClient;
} catch (err) {
  logger.err(err);
  process.exit(0);
}


