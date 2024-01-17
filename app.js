var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const bodyParser= require('body-parser')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const sendToUser = require('./routes/sendtouser')
const { inicializarWSP } = require('./config/inicializarWSP');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//  app.use(inicializarWSP());
;(async()=>{
  try {
    await inicializarWSP();
    console.log('WhatsApp initialized successfully!');
     // Delay the execution by 10 seconds
    setTimeout(() => {
      // Set up the route after the delay
      app.use('/sendtouser', sendToUser);
      console.log('Route set up successfully!');
  }, 10000); 
} catch (error) {
    console.error('Error initializing WhatsApp:', error);
    process.exit(1);
}

})()


app.use('/', indexRouter);
app.use('/users', usersRouter);

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
