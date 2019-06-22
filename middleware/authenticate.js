const auth = require('../lib/auth');
const logger = require('../lib/logger');

function autenticate(req, res, next) {
  const token = req.headers['token'];

  auth.validateSession(token).then((session) => {
    req.session = session;
    next();
  }).catch((error) => {
    res.send({ status: 401, message: 'You are not authorized' });
  });
}

module.exports = {
  autenticate
};