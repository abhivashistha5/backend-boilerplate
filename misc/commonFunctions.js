function successResponse(response) {
  return {
    status: response && response.status ? response.status : 200,
    message: response && response.message ? response.message : 'SUCCESS',
    data: response && response.data ? response.data : {},
  }
}

function errorResponse(response) {
  return {
    status: response && response.status ? response.status : 400,
    message: response && response.status ? response.message : 'ERROR',
    data: response && response.status ? response.data : {},
  }
}

module.exports = {
  successResponse,
  errorResponse,
}