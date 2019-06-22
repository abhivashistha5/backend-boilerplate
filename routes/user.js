const router = require('express').Router();
const logger = require('../lib/logger');
const controller = require('../controllers/user-controller');
const authMiddleware = require('../middleware/authenticate');

router.post('/register', async (req, res) => {
  try {
    await controller.createUser(req.body);
    res.send('user created');
  } catch (err) {
    logger.error(err);
    res.send('user not created');
  }
  
});

router.post('/login', async (req, res) => {
  try {
    const user = await controller.loginUser(req.body);
    res.send(user);
  } catch (err) {
    logger.error(err);
    res.send('opps something went wrong');
  }
});

router.post('/authtest', authMiddleware.autenticate, async (req, res) => {
  res.send('Authenticated');
});

router.post('/logout', authMiddleware.autenticate, async (req, res) => {
  try {
    await controller.logoutUser(req.session);
    res.json({ status: 200, message: 'logout success'});
  } catch(error) {
    logger.error(err);
    res.send('opps something went wrong');
  }
});

module.exports = router;