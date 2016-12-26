var fs = require('fs')
var path = require('path')
var dbModel = require('../Model/dbModel.js');

module.exports = {
    
 loadPage: function(req,res, reqPath){
    fs.readFile('./Views/header.html',function(err,data){//header
        var msg = data.toString();
        var pageTitle = path.basename(reqPath);
        console.log("Loading  : " +pageTitle);
       if(pageTitle == 'subjectQuiz'){
                    var subj = req.query.subject;
                    var timed = req.query.timed;
            var grade = 2;
            var difficulty = 1;
            var count =2;
            var core = (/[+-\/X].test(subj)/?  "Math": "English"); //Math if contains operators
            dbModel.getProblems(res,core,subj,count,grade,difficulty);
                    
       }else{ fs.readFile("./Views/"+pageTitle+".html",'utf8',function(err,data){//body
            msg += data;
                
            fs.readFile("./Views/footer.html",'utf8',msg,function(err,data){//footer
                    msg+=data;
                    msg = msg.replace('{{title}}', pageTitle +' - Smart Kids');
                    res.setHeader("Content-Type","text/html");
                    res.end(msg);       
                });
        })
            }
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