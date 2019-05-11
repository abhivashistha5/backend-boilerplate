let port;

if (process.env.NODE_ENV === 'dev') {
  port = '3000';
} else if (process.env.NODE_ENV === 'test') {
  port = '3000';
} else if (process.env.NODE_ENV === 'production') {
  port = '3000';
} else {
  port = '3000';
}


const config = {
  port: port,
}

module.exports = config;