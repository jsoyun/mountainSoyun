// ////모듈 추가할때마다 여기도 추가//////////////////////////////////////////////////////////
// const createError = require("http-errors");
// const express = require("express");
// const path = require("path");
// const cookieParser = require("cookie-parser");
// const logger = require("morgan");
// const nunjucks = require("nunjucks");
// const { sequelize } = require("./models");
// // 소윤추가
// const morgan = require("morgan");
// const session = require("express-session");
// const dotenv = require("dotenv");
// const passport = require("passport");

// dotenv.config();

// ////라우터 추가할때마다 여기도 추가//////////////////////////////////////////////////////////
// const indexRouter = require("./routes");
// // 소윤추가

// const authRouter = require("./routes/auth");
// // const postRouter = require("./routes/post");
// const userRouter = require("./routes/user");
// // const { sequelize } = require("./models");
// const passportConfig = require("./passport");

// ////////////////////////////////////////////////////////////////
// const app = express();
// // 소윤추가
// passportConfig(); //패스포트 설정
// app.set("port", process.env.PORT || 8001);

// // view engine setup
// app.set("view engine", "html");
// nunjucks.configure("views", {
//   express: app,
//   watch: true,
// });
// sequelize
//   .sync({ focus: false })
//   .then(() => {
//     console.log("db 연결 성공");
//   })
//   .catch((err) => {
//     console.error(err);
//   });
// ////미들웨어 추가할때마다 여기도 추가//////////////////////////////
// app.use(logger("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// // app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));
// // 소윤추가
// app.use(morgan("dev"));
// app.use("/img", express.static(path.join(__dirname, "uploads")));
// app.use(cookieParser(process.env.COOKIE_SECRET));
// app.use(
//   session({
//     resave: false,
//     saveUninitialized: false,
//     secret: process.env.COOKIE_SECRET,
//     cookie: {
//       httpOnly: true,
//       secure: false,
//     },
//   })
// );

// ////라우터 추가할때마다 여기도 추가//////////////////////////////////////////////////////////
// app.use("/", indexRouter);
// // 소윤추가
// app.use(passport.initialize());
// app.use(passport.session());

// app.use("/auth", authRouter);
// app.use("/user", userRouter);

// ////////////////////////////////////////////////////////////////
// // catch 404 and forward to error handler
// // app.use(function (req, res, next) {
// //   next(createError(404));
// // });
// app.use((req, res, next) => {
//   const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
//   error.status = 404;
//   next(error);
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

// module.exports = app;

// //소윤추가
// app.listen(app.get("port"), () => {
//   console.log(app.get("port"), "번 포트에서 대기중");
// });

const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const nunjucks = require("nunjucks");
const dotenv = require("dotenv");
const passport = require("passport");

dotenv.config();
const pageRouter = require("./routes/page");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const indexRouter = require("./routes/index");
const { sequelize } = require("./models");
const passportConfig = require("./passport");

// const { initialize, Passport } = require("passport");

const app = express();
passportConfig(); //패스포트 설정
app.set("port", process.env.PORT || 8001);
app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/img", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use("/", pageRouter);
app.use("/auth", authRouter);
app.use("/post", postRouter);
app.use("/user", userRouter);
app.use("/index", indexRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});
