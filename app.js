////모듈 추가할때마다 여기도 추가//////////////////////////////////////////////////////////
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const nunjucks = require("nunjucks");
const { sequelize } = require("./models");
const dotenv = require("dotenv");
const passport = require("passport");
const session = require("express-session");
const passportConfig = require("./passport");
dotenv.config();
////라우터 추가할때마다 여기도 추가//////////////////////////////////////////////////////////
const mainRouter = require("./routes/main");
const clubRouter = require("./routes/club");
const clubUploadRouter = require("./routes/clubupload");
const infoMountainRouter = require("./routes/infomountain");
const loginRouter = require("./routes/login");
const signupRouter = require("./routes/signup");
const mypageRouter = require("./routes/mypage");
const findInfoRouter = require("./routes/findinfo");
const communityRouter = require("./routes/community");
const writeRouter = require("./routes/write");
const logoutRouter = require("./routes/logout");
const viewRouter = require("./routes/view");
const followuserRouter = require("./routes/followuser");

////////////////////////////////////////////////////////////////
const app = express();
passportConfig(); // 패스포트 설정

// view engine setup
app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});
sequelize
  .sync({ focus: true })
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });
////미들웨어 추가할때마다 여기도 추가//////////////////////////////
app.use(logger("dev"));
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
////라우터 추가할때마다 여기도 추가//////////////////////////////////////////////////////////
app.use("/", mainRouter);
app.use("/club", clubRouter);
app.use("/clubupload", clubUploadRouter);
app.use("/infomountain", infoMountainRouter);

app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/signup", signupRouter);
app.use("/mypage", mypageRouter);
app.use("/findinfo", findInfoRouter);
app.use("/followuser", followuserRouter);

app.use("/community", communityRouter);
app.use("/write", writeRouter);
app.use("/view", viewRouter);

////////////////////////////////////////////////////////////////
// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });
/* 404 처리 */
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

/* error 처리 */
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
