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
router.post("/", function(req, res){
    const name = req.body.name;
    const image = req.body.image;
    const desc = req.body.description;
    const newCampground = {name: name, image: image, description: desc}
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
router.get("/new", function(req, res){ 
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

module.exports = router;
