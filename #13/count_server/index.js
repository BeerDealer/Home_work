const express = require("express");
const RedisDb = require("./middlewares/database");

const PORT = process.env.PORT || 3000;
const REDIS_URL = process.env.REDIS_URL;

const routers = ["add_count", "get_count"];

const app = express();

const redis = new RedisDb(REDIS_URL);
app.use(redis.handle.bind(redis));

routers.forEach((router) => {
  const route = require(`./routers/${router}`);
  app.use("/counter", route);
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
