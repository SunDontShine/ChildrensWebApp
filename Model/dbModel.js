var mongodb = require('mongodb').MongoClient;
var fs=require('fs');
module.exports = {
    

 getProblems : function(res,core,subj,count,reqgrade,reqdiff){
        mongodb.connect("mongodb://localhost:27017/ChildrensWebApp",function(err,db){
            if(err){return console.dir(err);}
                console.log("CORE : " +core + "\nSUBJECT : " +subj + " \nGET request for \nCOUNT : " + count + " problems from database");
            var topic = "";
            switch(subj){
                case '+':
                    topic = "Addition";
                    break;
                case '-':
                    topic = "Subtraction";
                    break;
                case 'X':
                    topic = "Multiplication";
                    break;
                case '/' :
                    topic ="Division";
                    break;
            }
                var collection = (core=="Math" ? db.collection('elementaryMath'): db.collection('elementaryEnglish'));
            collection.find({operation:subj}).toArray(function(err,items){ //.limit(count)
                   // console.log(items);
                    sendQuizPage(res,core,topic,items);
                    db.close();
                })
        })
},

 
}

function sendQuizPage(res,core,topic,items){
    console.log("MADEIT");
fs.readFile("./Views/subjectQuiz.html",function(err,data){
        var file="";
        file+=data;
        file = file.replace('{{coreTopic}}', core);
        file = file.replace('{{topic}}', topic);
        var table="<form action='gradeProblems' method='GET'>\n";
    //need to randomize values in radio buttons
    items.forEach(function(question,pos){
        table+=`${question.operands[0]} ${question.operation} ${question.operands[1]}= ?<br>`;
        
    for(var i =0; i < 4; i++){
        var incQuestion = question.incorrect[i];
        table+=`<input type='radio' name='${pos}' value='${incQuestion}'>${incQuestion}<br>`;
    }
        table+=`<input type='radio' name='${pos}',value='${question.solution}'>${question.solution} <br>`;
    });
        table+="<button type='submit'>Submit</button</form>"
        file = file.replace('{{body}}',table);
    res.end(file);
        
        
    })

}