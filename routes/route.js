const express = require('express');
const router = express.Router();
let User = require('../models/user');

router.get('/index', function (req, res) {
    res.render('index');
});
router.get('/add-cust', function (req, res) {
    res.render('add-cust');
});
router.get('/list-cust', function (req, res) {
    res.render('list-cust');
});
router.get('/add-user', function (req, res) {
    res.render('add-user');
});
router.get('/add-pack', function (req, res) {
    res.render('add-pack');
});
router.get('/list-pack', function (req, res) {
    res.render('list-pack');
});
router.get('/logs', function (req, res) {
    res.render('logs');
});
/*app.post('/add-user',function (req,res) {
    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;
    let newUser = new User({
        name:name,
        username:username,
        password:password
    });
});*/
router.post('/add-user', (req, res) => {
        let user = new User();
        user.name = req.body.name;
        user.username = req.body.username;
        user.password = req.body.password;
        user.password = req.body.password;
        user.save(function (err) {
            if(err){
                console.log(err);
            } else {
                res.redirect('/add-user');
            }
        });
    }
);
router.get('/list-user', function (req, res) {
    res.render('list-user');
});

module.exports = router;