var mongodb = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var qs = require('querystring');
var fs=require('fs');

module.exports = {
    
 getProblems : function(res,core,subj,count,reqgrade,reqdiff){
        mongodb.connect("mongodb://localhost:27017/ChildrensWebApp",function(err,db){
            if(err){return console.dir(err);}
               // console.log("CORE : " +core + "\nSUBJECT : " +subj + " \nGET request for \nCOUNT : " + count + " problems from database");
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
                    sendQuizPage(res,core,topic,items);
                    db.close();
                })
        })
},

gradeQuestions : function(query,res){
        var userAnswers= [];
        var objIds =[];
        var userSubmission="";
        var qid="";
        var usrAnswer ="";
        
        for(var key in query){
            userSubmission=query[key].split(',')
            qid=userSubmission[0];
            objIds.push(new ObjectID(qid));
            usrAnswer = userSubmission[1];
            
            var jsonObj = qid+","+usrAnswer+"";
                        userAnswers.push(jsonObj);
        }
    sendAnswerPage(res,userAnswers,objIds);
}
}
function sendAnswerPage(res,userSubmission, objIds){
        mongodb.connect("mongodb://localhost:27017/ChildrensWebApp",function(err,db){
        if(err){return console.dir(err);}
            var collection = db.collection('elementaryMath'); //subject
 
            
            collection.find({_id:{$in:objIds}}).toArray(function(err,items){
                var body="<!DOCTYPE HTML><html><head><title>Answers</title><head><body><a href='/main/home'>Home</a><br>";
                var totalCorrect = 0;
                for(var item in userSubmission){ //user submitted objid, and selected answer
                    var usrObjId = userSubmission[item].split(',')[0];
                    var usrAnswer = userSubmission[item].split(',')[1];
                    
                    for(var item in items){ //all matching DB documents with matching _id in objIds array
                    var dbObj = items[item];
                    var dbObjId = dbObj._id;
                    var dbSolution = dbObj.solution;
                        if(dbObjId == usrObjId){
                            body+=`${dbObj.operands[0]} ${dbObj.operation} ${dbObj.operands[1]} = ? <br>You selected ${usrAnswer}`
                            if(dbSolution == usrAnswer){
                                body+=`\t<span style="background-color:#0dd828">Correct</span><br><br>`
                                totalCorrect++;
                                break;
                            }else{
                                body+=`\t<span style="background-color:red"> Incorrect</span> Correct Answer : ${dbSolution}<br><br>`
                            }
                        }
                    }

                }
                body+="</body></html>";
                res.end(body);
                
            });                                      
    })
}
function sendQuizPage(res,core,topic,items){
fs.readFile("./Views/subjectQuiz.html",function(err,data){
        var file="";
        file+=data;
        file = file.replace('{{coreTopic}}', core);
        file = file.replace('{{topic}}', topic);
        var table="<form action='gradeProblems' method='GET'>\n<h3>Answer the questions below, and press submit to view your results</h3>\n";
    items.forEach(function(question,pos){
        var options = question.incorrect;
        var obj = question._id;
        options.push(question.solution);    
        table+=`${question.operands[0]} ${question.operation} ${question.operands[1]}= ?<br>`;
        
    for(var i =0; i < 5; i++){
        var option = options.splice(Math.floor((Math.random() * (options.length))),1);
        table+=`<input type='radio' name='key${pos}' value='${obj},${option}'>${option}<br>`;
    }
    });
        table+=`<button type='submit'>Submit</button</form>`
        file = file.replace('{{body}}',table);
        res.end(file);
        
        
    })

}