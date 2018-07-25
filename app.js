const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
let User = require('./models/user');

const mongoos = require('mongoose');
mongoos.connect('mongodb://localhost/test'); // MongoDB connection String
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

// BodyParser Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// LOGIN Page
app.get('/', function (req, res) {
    res.render('login');
});

// Router
let router = require('./routes/route');
app.use('/', router);

// Start App
app.listen(3000, function () {
    console.log('Server Running on port http://localhost:3000 ... ');
});