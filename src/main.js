const path = require("path");
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const appConfig = require("./config/app.config");
const mongoDB = require("./mongo/mongo");
const routes = require("./routes/index.routes");
const ErrorHandlerMiddleware = require("./middlewares/error-handler");
const CheckAuthGuard = require("./guards/check-auth.guard");

const app = express();

// // File yuklash uchun papkasini statik qilamiz
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// // Middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// // Mongo db ga ulanish
mongoDB()
  .then(() => console.log("MongoDb Connected"))
  .catch((err) => console.log(err));


// app.use(CheckAuthGuard(true));

// // Routes
app.use("/api/v1", routes);

// // Error Handler Middleware
app.use(ErrorHandlerMiddleware);

// // O'zimizni routlardan boshqa rout kiritilsa bloklash
app.all("*", (req, res) => {
  res.status(404).send({
    message: `Berilgan ${req.url} endpoint mavjud emas !!!`,
  });
});

app.listen(appConfig.port, appConfig.host, () => {
  console.log(`listening on ${appConfig.port}`);
});
