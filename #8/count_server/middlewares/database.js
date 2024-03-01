const redis = require("redis");

class DataBaseMiddleware {
  constructor(url) {
    this.client = redis.createClient({ url: url });
    (async () => {
      await this.client.connect();
    })();
  }
  handle(req, res, next) {
    req.database = this.client;
    next();
  }
}

module.exports = DataBaseMiddleware;
