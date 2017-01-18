var mongodb = require('mongodb');
var fs = require('fs');
function loadData(fileName, subject){
    mongodb.connect("mongodb://localhost:27017/ChildrensWebApp",function(err,db){
        if(err){return console.dir(err);};
        var collection = (subject == "Math" ? db.collection("elementaryMath"): db.collection("elementaryEnglish"));
        
        fs.readFile(fileName, function(err,data){
            var body ="";
            body+=data;
            //if math
            
            //if english 
        })
    })

}