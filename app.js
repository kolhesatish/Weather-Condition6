//jshint esversion:6

const express = require("express");
const https = require("https");
const parser = require("body-parser");

const app = express();
app.use(parser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
const query = req.body.cityName;
const apiKey = "e92da444bb0a45241c98472d3291ba12";
const units = "metric";

const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&lat=44.34&lon=10.99&appid="+ apiKey +"&units=" + units;
https.get(url, function(resp){
    resp.on("data", function(data){
        console.log(resp.statusCode);
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imgUrl = " https://openweathermap.org/img/wn/" +icon+"@2x.png"
        res.write("<p>The Weather is currently " + description + "</p>");
        res.write("<h1> The Temperature in "+ query +" is " + temp + " Degrees Celcius.</h1>");
        res.write("<img src="+imgUrl+">");
        res.send();
    });
});
});

app.listen(3000, function(){
    console.log("Server has started 3000");
});