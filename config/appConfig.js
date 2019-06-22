let port;

if (process.env.NODE_ENV === 'dev') {
  port = '3001';
} else if (process.env.NODE_ENV === 'test') {
  port = '3001';
} else if (process.env.NODE_ENV === 'production') {
  port = '3001';
} else {
  port = '3001';
}


const config = {
  port: port,
  dbURI : 'mongodb://localhost/dev_local',
  multiSession: false,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  BCRYPT_SALT: parseInt(process.env.BCRYPT_SALT),
  redis_host: '127.0.0.1',
  redis_port: '6379'
}

Object.freeze(config);

module.exports = config;