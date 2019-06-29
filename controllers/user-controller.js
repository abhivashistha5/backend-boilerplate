const DAO = require('../lib/DAOManager');
const MODELS = require('../models');
const bcrypt = require('bcrypt');
const logger = require('../lib/logger');
const config = require('../config/appConfig');
const auth = require('../lib/auth');

async function createUser(data) {
  logger.log(data);

  const passwordHash = await bcrypt.hash(data.password, config.BCRYPT_SALT);
  
  const user = {
    name: data.name,
    email: data.email,
    password: passwordHash,
  };

  return DAO.saveData(MODELS.user, user);
}

async function loginUser(user) {
  logger.log(user);

  const userInfo = await DAO.findOne(MODELS.user, { email: user.email }, {email: 1, password: 1});

  if (userInfo) {
    const passwordMatch = await bcrypt.compare(user.password, userInfo.password);
    if (passwordMatch) {
      token = await auth.setSession(userInfo);
      return {
        token,
      };
    } else {
      throw new Error('password not matched');
    }
  } else {
    throw new Error('User not found');
  } 
}

async function logoutUser(sessionData) {
  await auth.removeSession(sessionData._id);
}

module.exports = {
  createUser,
  loginUser,
  logoutUser,
}