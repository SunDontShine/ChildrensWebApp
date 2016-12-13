var fs = require('fs')
var path = require('path')
var express = require('express')
var app = express();
var url = require('url')
var views="/Views/"
app.get('/', function(req,res){
    res.redirect(301,'/header')
})

app.get('/welcomePage',function(req,res){
     
    fs.readFile(__dirname+views+"header.html",function(err,data){
        var msg = data.toString();
        msg = msg.replace('{{title}}','Welcome - Smart Kids');
        res.setHeader("Content-Type","text/html");
        res.end(msg);
    })
})

app.get('/styles/template.css',function(req,res){
    var options={
        root:__dirname+'/Views/styles/',
        headers:{
            'Content-Type':'text/css'
        }
    };
            res.sendFile("template.css",options,function(err){
                if(err){
                    console.log(err);
                    res.status(err.status).end();
                }
                else {
                    console.log("Sent template.css");
                }
            });         
})



app.listen(3000, function(){
    console.log("Example App Listening on port 3000!");
});