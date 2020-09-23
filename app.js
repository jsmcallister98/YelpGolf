const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelp_golf", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected to DB!'))
  .catch(error => console.log(error.message));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// Schema setup
const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

const campground = mongoose.model("Campground", campgroundSchema);

// campground.create(    
//     {
//         name: "Pebble Beach", 
//         image: "https://www.pebblebeach.com/content/uploads/20160811-cam-timeout.jpg",
//         description: "The greatest public golf course on earth"
//     },function(err, campground){
//         if(err){
//             console.log(err);
//         } else {
//             console.log("New Course: ");
//             console.log(campground);
//         }
//     });

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    // get all courses from db
    campground.find({}, function(err, campgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("index", {campgrounds:campgrounds});
        }
    });
});

app.post("/campgrounds", function(req, res){
    const name = req.body.name;
    const image = req.body.image;
    const desc = req.body.description;
    const newCampground = {name: name, image: image, description: desc}
    // create a new course and save to DB
    campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

app.get("/campgrounds/new", function(req, res){ 
    res.render("new");
});

app.get("/campgrounds/:id", function(req, res){
    // find course with provided id
    campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            // render show templte with that course
            res.render("show", {campground: foundCampground});
        }
    });
});

app.listen(3000, function() { 
    console.log('Server listening on port 3000'); 
  });