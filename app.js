const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function (req,res) {

    res.sendFile(__dirname+"/index.html");

});

app.post("/",function (req,res) {
    // console.log();
    const query = req.body.cityName;
    const apiID="2be7e1030641a02ca6b1e6a5e86f778e";
    const units="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiID+"&units="+units;



    https.get(url,function (responce){

    // console.log(responce.statusCode);

    responce.on("data",function (data) {


        const weatherData = JSON.parse(data);
        const temp= weatherData.main.temp;
        const description = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";

        console.log(weatherData);
        console.log(temp);
        console.log(description);

        res.write("<h1>Temp in "+query+" is "+temp+" degree celcius.</h1>");
        res.write("<h3>weather discription : "+description+"</h3>");
        res.write("<img src="+imageURL+">");

        res.send();
    });

});
});







app.listen(3000,function (req,res) {
  console.log("Sever running on port 3000 .");
});