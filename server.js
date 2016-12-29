var fs = require('fs')
var path = require('path')
var express = require('express')
var app = express();
var url = require('url')
var views="/Views/"
var vc = require('./Controllers/viewController.js');
var prc = require('./Controllers/postRequestController.js');
var qs = require('querystring');
app.get('/', function(req,res){
    res.redirect(302,'/main/login')
})
//TODO: Set generic getter, regexp for path, sends to corresponding file if exists
//contains images
//contains views/*.html

//request including basic 'home template' layout
app.get(/\/main/,function(req,res){
    
     var reqPath = url.parse(req.url).pathname;
    var reqFile = path.basename(reqPath);

    
        fs.readdir(__dirname+views,'utf8',function(err,data){
            if(data.includes(reqFile+'.html')){
                    vc.loadPage(req,res,reqPath);              
            }else{
                res.writeHead(404,"Path not found ");
                res.write("<h2>Error 404: Page Not Found :( <h2>" + reqPath);
                res.end();
            }
        })
    
});

app.get(/\/Model\/functions.js/,function(req,res){
    res.sendFile(__dirname+'/Model/functions.js');
})
app.get(/\/Views\/subj\//,function(req,res){
    var reqPath = url.parse(req.url).pathname;

            res.sendFile(__dirname+reqPath);
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

app.listen(3002, function(){
    console.log("Example App Listening on port 3002!");
});

app.post(/\/main\//,function(req,res){
    var reqPath = path.basename(req.path);
    console.log("POST request path : " + reqPath);
    
    var body="";
    req.on('data',function(data){
               body+=data;
    });
    req.on('end',function(){
        var postData = qs.parse(body);
        prc.handlePostRequest(req,res,postData,reqPath);
    })
    
});

