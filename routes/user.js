const router = require('express').Router();
const logger = require('../lib/logger');
const controller = require('../controllers/user-controller');
const authMiddleware = require('../middleware/authenticate');
const commonFunc = require('../misc/commonFunctions');
const MESSAGES = require('../config/messages');

router.post('/register', async (req, res) => {
  try {
    await controller.createUser(req.body);
    res.send(commonFunc.successResponse({
      message: MESSAGES.getSuccessMessage('USER_REGISTERED'),
      data: {}
    }));
  } catch (err) {
    logger.error(err);
    res.send(commonFunc.errorResponse({
      message: MESSAGES.getErrorMessage('REGISTRATION_ERROR'),
      data: {},
    }));
  }

});

router.post('/login', async (req, res) => {
  try {
    try {
      const user = await controller.loginUser(req.body);
      res.send(commonFunc.successResponse({
        data: {
          token: user.token
        }
      }));
    } catch (err) {
      res.send(commonFunc.errorResponse({
        message: err.message,
      }));
    }
  } catch (err) {
    logger.error(err);
    res.send(commonFunc.errorResponse());
  }
});

router.post('/authtest', authMiddleware.autenticate, async (req, res) => {
  res.send('Authenticated');
});

router.post('/logout', authMiddleware.autenticate, async (req, res) => {
  try {
    await controller.logoutUser(req.session);
    res.json({ status: 200, message: 'logout success' });
  } catch (error) {
    logger.error(err);
    res.send('opps something went wrong');
  }
});

module.exports = router;