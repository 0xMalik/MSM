const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
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
        // let user = new User();
        const name = req.body.name;
        const username = req.body.username;
        const password = req.body.password;
        const password2 = req.body.password2;

        req.checkBody('name', 'Name is required').notEmpty();
        req.checkBody('username', 'Username is required').notEmpty();
        req.checkBody('password', 'Password is required').notEmpty();
        req.checkBody('password2', 'Password do not match').equals(req.body.password);

        let errors = req.validationErrors();
        if (errors) {
            res.render('add-user ', {
                errors: errors
            });
        } else {
            let newUser = new User({
                name: name,
                username: username,
                password: password
            });
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(newUser.password, salt, function (err, hash) {
                    if (err) {
                        console.log(err)
                    }
                    newUser.password = hash;
                    newUser.save(function (err) {
                        if (err) {
                            console.log(err);
                            return;
                        } else {
                            req.flash('Success','You are Registered');
                            res.redirect('add-user');
                        }
                    })
                })
            });
        }

        /*user.save(function (err) {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/add-user');
            }
        });*/
    }
);
router.get('/list-user', function (req, res) {
    res.render('list-user');
});

module.exports = router;