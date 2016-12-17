var fs = require('fs')
var path = require('path')

module.exports = {
    

 loadToolbarPage: function(res, reqPath){
     //if request for 'Home Page'
    fs.readFile('./Views/header.html',function(err,data){
        var msg = data.toString();
        var pageTitle = path.basename(reqPath);
        console.log("Loading  : " +pageTitle);
        fs.readFile("./Views/"+pageTitle+".html",'utf8',function(err,data){
            msg += data;
                fs.readFile("./Views/footer.html",'utf8',msg,function(err,data){
                    msg+=data;
                    msg = msg.replace('{{title}}', pageTitle +' - Smart Kids');
                    res.setHeader("Content-Type","text/html");
                    res.end(msg);       
                });
        })
                
    })      
 },    
  
 getStyles : function(res,reqFile){
     var options={
                root:'./Views/styles/',
                headers:{
                    'Content-Type':'text/css'
                }
            };

                res.sendFile(reqFile,options,function(err){
                    if(err){
                        console.log(err);
                        res.status(err.status).end();
                    }
                    else {
                    }
                });  
    },
    
    getScripts : function(res,reqFile){
     var options={
                root:'.',
                headers:{
                    'Content-Type':'text/javascript'
                }
            };

                res.sendFile(reqFile,options,function(err){
                    if(err){
                        console.log(err);
                        res.status(err.status).end();
                    }
                    else {
                    }
                });  
    }
    
};