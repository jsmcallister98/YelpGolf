const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

// root route
router.get("/", function(req, res){
    res.render("landing");
});

// ===============
// auth routes
// ===============
// show register form
router.get("/register", function(req, res){
    res.render("register");
});

// register logic
router.post("/register", function(req, res){
    let newUser = new User({username: req.body.username})
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            return res.render("register", {"error": err.message});
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome" + user.username + "!");
            res.redirect("/campgrounds");
        });
    });
});

// login routes
// show login form
router.get("/login", function(req, res){
    res.render("login");
});

router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){
});

// logout route
router.get("/logout", function(req, res){
    req.logOut();
    req.flash("success", "Logged Out")
    res.redirect("/campgrounds");
});

module.exports = router;