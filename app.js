const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const config = require('./config/database');

const mongoos = require('mongoose');
mongoos.connect(config.database); // MongoDB connection String
let db = mongoos.connection;
db.once('open', function () {
    console.log('connected to MongoDB');
});
db.on('error', function (err) {
    console.log(err);
});

//view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Public Folder
app.use(express.static(path.join(__dirname, 'public')));

// BodyParser Middle-ware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// Express Session Middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

// Express Validator Middleware
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.')
            , root = namespace.shift()
            , formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

// Passport Config
require('./config/passport')(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Router
let router = require('./routes/route');
app.use('/', router);

// LOGIN Page
app.get('/', function (req, res) {
    res.render('login');
});

//Login Process
app.post('/', function (req, res, next) {
    passport.authenticate('local', {
        successRedirect: '/index',
        failureRedirect: '/',
        failureFlash: true
    })(req, res, next);
});

// Start App
app.listen(3000, function () {
    console.log('Server Running on port http://localhost:3000 ... ');
});