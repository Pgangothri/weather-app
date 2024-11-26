const express=require("express");
const bodyparser=require("body-parser");
const https=require("https");
const req=require("request");
const app=express();
app.use(bodyparser.urlencoded({extended:true}));
app.get('/',function(req,res){
    // res.send("port is running");
  res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
    console.log(req.body.cityName);
    const query=req.body.cityName;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=d5dfb00949012edf127c406905341711&unit=metric";
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            // console.log(data);
            const weatherData=JSON.parse(data);
            console.log(weatherData);
            const call=weatherData.main.temp;
            const des=weatherData.weather[0].description
             const icon=weatherData.weather[0].icon
             const imageURL="http://openweathermap.org/img/wn"+icon+"@2x.png"
            res.write("<p>The weather is currently "+des+"</p>");
            res.write("<h1> The temperature in "+query+" is "+call+" degree celsius.</h1>");
            res.write("<img src="+imageURL+">");
            res.send()

             //console.log(temp);
            //var object={
              //  name:"gangothri",

            //}
            //console.log(JSON.stringify(object));
        });


    });
});

app.listen(3000,function(){
    console.log("port started");
})