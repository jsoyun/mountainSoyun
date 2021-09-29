////모듈 추가할때마다 여기도 추가//////////////////////////////////////////////////////////
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const nunjucks = require('nunjucks');
const { sequelize } = require('./models')
////라우터 추가할때마다 여기도 추가//////////////////////////////////////////////////////////
const indexRouter = require('./routes');


////////////////////////////////////////////////////////////////
const app = express();

// view engine setup
app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app,
  watch: true,
})
sequelize.sync({ focus: false })
  .then(() => {
    console.log('db 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });
////미들웨어 추가할때마다 여기도 추가//////////////////////////////
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

////라우터 추가할때마다 여기도 추가//////////////////////////////////////////////////////////
app.use('/', indexRouter);


////////////////////////////////////////////////////////////////
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
