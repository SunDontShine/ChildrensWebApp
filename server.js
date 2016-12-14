var fs = require('fs')
var path = require('path')
var express = require('express')
var app = express();
var url = require('url')
var views="/Views/"
var vc = require('./Controllers/viewController.js');

app.get('/', function(req,res){
    res.redirect(301,'/welcomePage')
})
//TODO: Set generic getter, regexp for path, sends to corresponding file if exists
//contains images
//contains views/styles
//contains views/*.html

app.get('/welcomePage',function(req,res){

     var reqPath = url.parse(req.url).pathname;
    console.log(reqPath);
    
    fs.readFile(__dirname+views+"header.html",function(err,data){
        var msg = data.toString();
        msg = msg.replace('{{title}}','Welcome - Smart Kids');
        res.setHeader("Content-Type","text/html");
        res.end(msg);
    })

})

app.get(/\/Views\/styles\//,function(req,res){
    var reqPath = url.parse(req.url).pathname;
    var reqFile = path.basename(reqPath); // the requested file
    
    fs.readdir(__dirname+views+'styles','utf8',function(err,data){
        if(data.includes(reqFile)){
            vc.getStyles(res,reqFile);
        }  
    });
});

app.listen(3000, function(){
    console.log("Example App Listening on port 3000!");
});