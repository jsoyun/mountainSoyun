////모듈 추가할때마다 여기도 추가//////////////////////////////////////////////////////////
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const nunjucks = require("nunjucks");
const { sequelize } = require("./models");
////라우터 추가할때마다 여기도 추가//////////////////////////////////////////////////////////
const mainRouter = require("./routes/main");
const clubRouter = require("./routes/club");
const clubUploadRouter = require("./routes/clubupload");
const infoMountainRouter = require("./routes/infomountain");
const boardRouter = require("./routes/board");
const loginRouter = require("./routes/login");
const signupRouter = require("./routes/signup");
const mypageRouter = require("./routes/mypage");
const findInfoRouter = require("./routes/findinfo");
const postRouter = require("./routes/post");
const communityRouter = require("./routes/community");

////////////////////////////////////////////////////////////////
const app = express();

// view engine setup
app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});
sequelize
  .sync({ focus: false })
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });
////미들웨어 추가할때마다 여기도 추가//////////////////////////////
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/img", express.static(path.join(__dirname, "uploads")));
////라우터 추가할때마다 여기도 추가//////////////////////////////////////////////////////////
app.use("/", mainRouter);
app.use("/club", clubRouter);
app.use("/clubupload", clubUploadRouter);
app.use("/infomountain", infoMountainRouter);
app.use("/board", boardRouter);
app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/mypage", mypageRouter);
app.use("/findinfo", findInfoRouter);

app.use("/", indexRouter);
app.use("/post", postRouter);
app.use("/community", communityRouter);

app.get("/post", (req, res, next) => {
  res.render('write-community', { title: "업로드" });
});


////////////////////////////////////////////////////////////////
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
