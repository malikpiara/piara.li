var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// Temporary comments data structure. To be moved to another API soon.
const mwComments = new Object(
  [
    {
      'author': 'John Green',
      'content': 'Always on point, needed a jolt here as I feel in between two of these jobs, just need to embrace where I am and keep learning and growing.',
    },
    {
      'author': 'Hank Green',
      'content': 'Always on point, needed a bolt here as I feel in between two of these jobs, just need to embrace where I am and keep learning and thriving.',
    }
  ]
);

const urlKeys = new Map([
  ['upf', 'upframe.io'],
  ['mw','moonwith.com'],
  ['t', 'telegram.me/malikpiara'],
  ['wa', 'wa.me/+351962119084'],
  ['l', 'linkedin.com/in/malikpiara'],
  ['ig', 'instagram.com/malikpiara'],
  ['earnest', 'play.google.com/store/apps/details?id=com.glenncoding.earnestcards'],
  ['book', 'moonwith.com/book'],
  ['berlin', 't.me/+OGAZMUob59w1OTJk'],
  ['joni', 'jonathanfreiberger.de/'],
  ['camelstripe', 'form.typeform.com/to/Z2hgSqGJ'],
  ['meet', 'upframe.whereby.com/team']
]);

let urlKeysToJson = JSON.stringify(Object.fromEntries(urlKeys));
// Accessing a key.
// let json = JSON.parse(urlKeysToJson);

// JSON endpoint
app.get('/api', function(req, res) {
  res.send(urlKeysToJson);
});

// Endpoint for Comments. TODO: Move to another API.
app.get('/comments', function(req, res) {
  res.send(mwComments);
});

app.get('/:id', function(req, res) {
  if (urlKeys.get(req.params.id)) {
  res.redirect('https://' + urlKeys.get(req.params.id));
  } else {
    res.redirect('https://moonwith.com/');
  }
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // next(createError(404));
  res.redirect('https://moonwith.com/');
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