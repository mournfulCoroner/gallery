var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fileUpload = require('express-fileupload')

const filePathMiddleware = require("./middleware/filepath.middleware")
const path = require('path')

var pingRouter = require('./routes/ping');
var usersRouter = require('./routes/users');
var categoriesRouter = require('./routes/categories');
var imagesRouter = require('./routes/images')
var questionsRouter = require('./routes/questions')

var app = express();
var router = express.Router();


app.use(fileUpload({}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

app.use(filePathMiddleware(path.resolve(__dirname, 'files')))

app.use('/files', express.static('./files'))

app.set('view engine', 'jade');


var router = express.Router();
router.use('/ping', pingRouter);
router.use('/users', usersRouter);
router.use('/categories', categoriesRouter);
router.use('/images', imagesRouter)
router.use('/questions', questionsRouter)

app.use('/api', router);

app.get('/**', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
