const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");

// index route
router.get("/", function(req, res){
    // get all courses from db
    Campground.find({}, function(err, campgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds:campgrounds});
        }
    });
});

// create route
router.post("/", isLoggedIn, function(req, res){
    let name = req.body.name;
    let image = req.body.image;
    let desc = req.body.description;
    let author = {
        id: req.user._id,
        username: req.user.username
    }
    let newCampground = {name: name, image: image, description: desc, author: author}
    // create a new course and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

// new route
router.get("/new", isLoggedIn, function(req, res){ 
    res.render("campgrounds/new");
});

// show route
router.get("/:id", function(req, res){
    // find course with provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            // render show templte with that course
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
