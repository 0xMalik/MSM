const express = require('express');
const path = require('path');
const app = express();
//view engine
app.set('views', path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');

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

app.listen(3000, function () {
   console.log('Server Running on port http://localhost:3000 ... ');
});