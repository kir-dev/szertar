var config = require('./config/config');
var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var requestlogger = require('./middlewares/generic/logRequest');
var session = require('express-session');
var passport = require('passport');

var main = require('./routes/main');
var auth = require('./routes/auth');
var item = require('./routes/item');
var user = require('./routes/user');

process.on('uncaughtException', function (error) {
    console.log('Uncaught exception in master thread. Terminating in 3 s.');
    console.log(error);
    setTimeout(function () {
        console.log('Exiting master.');
        process.exit(1);
    }, 3000);
});

app.use(session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.set('port', config.port);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

if (config.logrequests) {
    app.use(requestlogger.logrequest());
}
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.tpl = {};
    res.tpl.error = {};
    return next();
});

app.use(function (req, res, next) {
    res.locals.user = req.user || null;
    res.locals.active = req.url.split('/')[0];
    return next();
});

// routes
app.use('/', main);
app.use('/auth', auth);
app.use('/item', item);
app.use('/user', user);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(app.get('port'),
    () => console.log('App started on port ' + app.get('port'))
);