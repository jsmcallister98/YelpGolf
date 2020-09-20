const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

let campgrounds = [
    {name: "Pebble Beach", image: "https://www.pebblebeach.com/content/uploads/20160811-cam-timeout.jpg"},
    {name: "Pasatiempo", image: "https://www.pasatiempo.com/images/uploads/newhome1.png"},
    {name: "Half Moon Bay", image: "https://www.visithalfmoonbay.org/sites/default/files/inline-images/Old%20Course_Ritz_photo1.jpg"},
    {name: "Pebble Beach", image: "https://www.pebblebeach.com/content/uploads/20160811-cam-timeout.jpg"},
    {name: "Pasatiempo", image: "https://www.pasatiempo.com/images/uploads/newhome1.png"},
    {name: "Half Moon Bay", image: "https://www.visithalfmoonbay.org/sites/default/files/inline-images/Old%20Course_Ritz_photo1.jpg"},
    {name: "Pebble Beach", image: "https://www.pebblebeach.com/content/uploads/20160811-cam-timeout.jpg"},
    {name: "Pasatiempo", image: "https://www.pasatiempo.com/images/uploads/newhome1.png"},
    {name: "Half Moon Bay", image: "https://www.visithalfmoonbay.org/sites/default/files/inline-images/Old%20Course_Ritz_photo1.jpg"}
]

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds:campgrounds});
});

app.post("/campgrounds", function(req, res){
    const name = req.body.name;
    const image = req.body.image;
    const newCampground = {name: name, image: image}
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){ 
    res.render("new");
});

app.listen(3000, function() { 
    console.log('Server listening on port 3000'); 
  });