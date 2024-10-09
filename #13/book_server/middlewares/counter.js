class Counter {
  constructor(url) {
    this.url = url;
  }

  handle(req, res, next) {
    req.counterUrl = this.url;
    next();
  }
}

module.exports = Counter;
