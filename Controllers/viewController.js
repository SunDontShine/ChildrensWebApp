
module.exports = {
  
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
                        console.log("Sent "+ reqFile);
                    }
                });  
    }
    
};