var express = require('express');
var router = express.Router();
    http = require('http'),
    path = require('path'),
    mongoose = require('mongoose'),
    hash = require('../pass').hash;

var app = require('../app');


/*
 Database and Models
 */
mongoose.connect("mongodb://localhost/gomall");
var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    salt: String,
    hash: String
});

var User = mongoose.model('users', UserSchema);


/*
 Helper Functions
 */
function authenticate(name, pass, fn) {
    if (!module.parent) console.log('authenticating %s:%s', name, pass);

    User.findOne({
            username: name
        },

        function (err, user) {
            if (user) {
                if (err) return fn(new Error('cannot find user'));
                hash(pass, user.salt, function (err, hash) {
                    if (err) return fn(err);
                    if (hash == user.hash) return fn(null, user);
                    fn(new Error('invalid password'));
                });
            } else {
                return fn(new Error('cannot find user'));
            }
        });

}

function requiredAuthentication(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        req.session.error = 'Access denied!';
        res.redirect('/welcome/login');
    }
}

function userExist(req, res, next) {
    User.count({
        username: req.body.username
    }, function (err, count) {
        if (count === 0) {
            next();
        } else {
            req.session.error = "User Exist"
            res.redirect("/welcome/signup");
        }
    });
}

/*
 Routes
 */
router.get("/", function (req, res) {

    if (req.session.user) {
        res.send("Welcome " + req.session.user.username + "<br>" + "<a href='/welcome/logout'>logout</a>");
    } else {
        res.send("<a href='/welcome/login'> Login</a>" + "<br>" + "<a href='/welcome/signup'> Sign Up</a>");
    }
});

router.get("/signup", function (req, res) {
    if (req.session.user) {
        res.redirect("/welcome");
    } else {
        res.render("signup");
    }
});

router.post("/signup", userExist, function (req, res) {
    var password = req.body.password;
    var username = req.body.username;

    hash(password, function (err, salt, hash) {
        if (err) throw err;
        var user = new User({
            username: username,
            salt: salt,
            hash: hash,
        }).save(function (err, newUser) {
            if (err) throw err;
            authenticate(newUser.username, password, function(err, user){
                if(user){
                    req.session.regenerate(function(){
                        req.session.user = user;
                        req.session.success = 'Authenticated as ' + user.username + ' click to <a href="/welcome/logout">logout</a>. ' + ' You may now access <a href="/welcome/restricted">/restricted</a>.';
                        res.redirect('/welcome');
                    });
                }
            });
        });
    });
});

router.get("/login", function (req, res) {
    res.render("login");
});

router.post("/login", function (req, res) {
    authenticate(req.body.username, req.body.password, function (err, user) {
        if (user) {

            req.session.regenerate(function () {

                req.session.user = user;
                req.session.success = 'Authenticated as ' + user.username + ' click to <a href="/welcome/logout">logout</a>. ' + ' You may now access <a href="/welcome/restricted">/restricted</a>.';
                res.redirect('/welcome');
            });
        } else {
            req.session.error = 'Authentication failed, please check your ' + ' username and password.';
            res.redirect('/welcome/login');
        }
    });

});

router.get('/logout', function (req, res) {
    req.session.destroy(function () {
        res.redirect('/welcome');
    });
});

router.get('/profile', requiredAuthentication, function (req, res) {
    res.send('Profile page of '+ req.session.user.username +'<br>'+' click to <a href="/welcome/logout">logout</a>');
});


module.exports = router;
