const MESSAGES = {
  en: {
    SUCCESS: {
      USER_REGISTERED: 'User Registration Successful'
    },
    ERROR: {
      REGISTRATION_ERROR: 'Oops! There seems to be some problem with registration'
    }
  }
}

function getSuccessMessage(key, language) {
  if (language && MESSAGES[language]) {
    return MESSAGES[language].SUCCESS[key] || 'SUCCESS'
  }
  
  return MESSAGES['en'].SUCCESS[key] || 'SUCCESS'
}

function getErrorMessage(key, language) {
  if (language && MESSAGES[language]) {
    return MESSAGES[language].SUCCESS[key] || 'SUCCESS'
  }
  
  return MESSAGES['en'].SUCCESS[key] || 'SUCCESS'
}

module.exports = {
  getSuccessMessage,
  getErrorMessage,
}