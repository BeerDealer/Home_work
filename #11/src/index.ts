import express, { Application } from "express";
import mongoose from "mongoose";
import apiRouters from "./routers/api";
import viewRouters from "./routers/views";
import middlewares from "./middlewares";

const PORT: number = parseInt(process.env.PORT!) || 3000;
const URL_DB: string = process.env.URL_DB!;

const start = async (port: number, url: string, app: Application) => {
  try {
    await mongoose.connect(url, {
      dbName: "books",
    });
    app.listen(port, () => {
      console.log(`App starts on ${port}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1);
  }
};

const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");

console.log(typeof apiRouters);
apiRouters.forEach((router) => {
  app.use("/api", router);
});

viewRouters.forEach((router) => {
  app.use("/", router);
});

middlewares.forEach((middleware) => {
  console.log(middleware);
  app.use(middleware);
});

start(PORT, URL_DB, app);
