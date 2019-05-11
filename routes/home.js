const router = require('express').Router();
const controller = require('../controllers/home-controller');

router.get('/', (req, res) => {
  controller.home().then((data) => {
    res.send(data);
  }).catch((error) => {
    console.log('error');
    res.send('Oops! something went wrong');
  })
});

module.exports = router;