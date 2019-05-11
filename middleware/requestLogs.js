function requestlogs(event, input, data, err) {
  var log = {
    event: event,
    input: input,
    response: data,
  }
  console.log(JSON.stringify(log));
};

module.exports = (req, res, next) => {
  let response = res;
  response.send2 = res.send
  response.send = function (resp) {
    response.send2(resp);
    try {
      resp = JSON.parse(resp);
    } catch (error) {
      // do nothing
    } finally {
      var input = (req.method == "GET") ? req.query : req.body;
      requestlogs(req.originalUrl, input, resp);
    }
  }
  next();
}