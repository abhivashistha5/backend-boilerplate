function home() {
  return new Promise((resolve, reject) => {
    resolve('Hello world!');
  });
}

module.exports = {
  home: home
}
