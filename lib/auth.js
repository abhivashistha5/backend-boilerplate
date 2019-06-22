const JWT = require('jsonwebtoken');
const mongoose = require('mongoose');
const config = require('../config/appConfig');
const logger = require('./logger');
const MODELS = require('../models');
const DAO = require('./DAOManager');

function generateToken(tokenData) {
  return new Promise((resolve, reject) => {
    JWT.sign(tokenData, config.JWT_SECRET_KEY, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  })
}

function decodeToken(token) {
  return new Promise((resolve, reject) => {
    JWT.verify(token, config.JWT_SECRET_KEY, (err, decodedData) => {
      if (err) {
        reject(err);
      } else {
        resolve(decodedData);
      }
    });
  });
}

async function setSession(user) {
  if (!config.multiSession) {
    // delete any old session
    await DAO.deleteMany(MODELS.session, { user: user._id });
  }

  const sessionData = {
    user: user._id,
  };  
  const session = await DAO.saveData(MODELS.session, sessionData);


  const tokenData = {
    userId: user._id.toString(),
    sessionId: session._id.toString(),
    loginTime: Date.now(),
  };

  const token = await generateToken(tokenData);

  return token;
}

async function validateSession(sessionToken) {
  const decodedData = await decodeToken(sessionToken);

  const session = await DAO.findOne(MODELS.session, { _id: mongoose.Types.ObjectId(decodedData.sessionId) });

  if (!session) {
    throw new Error('Invalid session');
  }

  return session;
} 

async function removeSession(sessionId) {
  await DAO.deleteOne(MODELS.session, { _id: mongoose.Types.ObjectId(sessionId)});
}

async function removeAllSession(userId) {
  await DAO.deleteMany(MODELS.session, { _id: mongoose.Types.ObjectId(userId)})
}

module.exports = {
  setSession,
  validateSession,
  removeSession,
  removeAllSession,
};
