var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('./authentication/authenticate').passport;
var config = require('./config');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var seatsRouter = require('./routes/seatsRouter');
var moviesRoueter = require('./routes/moivesRouter');
var cinemaHallRouter = require('./routes/cinemaHallsRouter');
var showTimesRouter = require('./routes/showTimesRouter');
var sectionsRouter = require('./routes/sectionsRouter');

//Set up mongoose connection
const mongoose = require('mongoose');
const url = config.mongoUrl;
mongoose.connect(url)
  .then((db) =>{
    console.log('Connected to the mongoDB server');
  }, (err)=> { console.log(err) });


// Set up app
var app = express();

// Secure traffic only
app.all('*', (req, res, next) => {
  if (req.secure) {
    return next();
  }
  else {
    res.redirect(307, 'https://' + req.hostname + ':' + app.get('secPort') + req.url);
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/showTimes',showTimesRouter);
app.use('/seats', seatsRouter);
app.use('/movies',moviesRoueter);
app.use('/cinemaHalls',cinemaHallRouter);
app.use('/sections',sectionsRouter);

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
