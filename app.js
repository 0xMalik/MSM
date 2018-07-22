const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
let User = require('./models/user');

const mongoos = require('mongoose');
mongoos.connect('mongodb://localhost/test');

let db = mongoos.connection;
db.once('open',function () {
    console.log('connected to MongoDB');
});
db.on('error',function (err) {
   console.log(err);
});

//view engine
app.set('views', path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/',function (req,res) {
    res.render('login');
});
app.get('/index',function (req,res) {
    res.render('index');
});
app.get('/add-cust',function (req,res) {
    res.render('add-cust');
});
app.get('/list-cust',function (req,res) {
    res.render('list-cust');
});
app.get('/add-user',function (req,res) {
    res.render('add-user');
});
app.post('/add-user',function (req,res) {
    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;
    let newUser = new User({
        name:name,
        username:username,
        password:password
    });
});
app.get('/list-user',function (req,res) {
    res.render('list-user');
});

app.listen(3000, function () {
   console.log('Server Running on port http://localhost:3000 ... ');
});