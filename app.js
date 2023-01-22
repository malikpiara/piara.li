var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

// Allowing POST requests from everywhere, including localhost.
// Warning: Using the wildcard to allow all sites to access a private API is a bad idea.
// TODO: Change this approach.
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(allowCrossDomain);
app.use('/', indexRouter);

const urlKeys = new Map([
  ['upf', 'upframe.io'],
  ['mw','moonwith.com'],
  ['t', 'telegram.me/malikpiara'],
  ['wa', 'wa.me/+351962119084'],
  ['l', 'linkedin.com/in/malikpiara'],
  ['ig', 'instagram.com/malikpiara'],
  ['earnest', 'play.google.com/store/apps/details?id=com.glenncoding.earnestcards'],
  ['book', 'calendar.app.google/ncTkKc7MsvyEqTJq8'],
  ['berlin', 't.me/+OGAZMUob59w1OTJk'],
  ['joni', 'jonathanfreiberger.de/'],
  ['camelstripe', 'form.typeform.com/to/Z2hgSqGJ'],
  ['meet', 'upframe.whereby.com/team'],
  ['notion', 'https://www.notion.so/upframed/Dschool-Team-4-Dashboard-223f3946aced45e5923779999cd13e84'],
  ['zoom', 'https://zoom.us/j/91085992701?pwd=RS8xKzhwbUtYcHcrTGc1SzVDWDVndz09'],
  ['miro', 'https://miro.com/app/board/uXjVP_n4xb0=/?moveToWidget=3458764539805612586&cot=14'],
  ['nathalie', 'https://upframed.notion.site/Lisbon-Guide-For-Nathalie-4dafbc600f0c42cf96cd588e312a408a']
]);

let urlKeysToJson = JSON.stringify(Object.fromEntries(urlKeys));
// Accessing a key.
// let json = JSON.parse(urlKeysToJson);

// JSON endpoint
app.get('/api', function(req, res) {
  res.send(urlKeysToJson);
});

app.get('/:id', function(req, res) {
  if (urlKeys.get(req.params.id)) {
  res.redirect('https://' + urlKeys.get(req.params.id));
  } else {
    res.redirect('https://moonwith.com/');
  }
});


/* // catch 404 and forward to error handler
app.use(function(req, res, next) {
  // next(createError(404));
  res.redirect('https://moonwith.com/');
}); */

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
