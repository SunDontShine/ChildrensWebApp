var fs = require('fs')
var path = require('path')

module.exports = {
    
    handlePostRequest : function(req,res,post,Data,reqPath){
        
        if(reqPath == 'createAccount'){
            console.log("create account request");
        }else if(reqPath =='validateAccount'){
            console.log("validate account request");
        }else{
            //request not found
        }
    },
    currentUser : function(req,res,reqPath){
        
    }
    
};