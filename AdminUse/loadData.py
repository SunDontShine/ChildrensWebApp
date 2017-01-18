from pymongo import MongoClient
from ast import literal_eval

client = MongoClient()#default to localhost interface and port 27017

db = client['ChildrensWebApp']  #access this DB

collection = db['elementaryMath'] #add_problems collection

#Math format
#//operation,grade,difficulty,operands,incorrect,solution

#+ 2 1 [3,7] [4,11,8,14] 10
fileName = input("Enter the name of the file to enter it's data to the  elementaryMath db : ")

file = open(fileName,'r')
for line in file:
    dataArray = line.split()
    collection.insert_one(
        {"operation":str(dataArray[0]),
         "grade":literal_eval(dataArray[1]),
         "difficulty":literal_eval(dataArray[2]),
        "operands":literal_eval(dataArray[3]),
         "incorrect":literal_eval(dataArray[4]),
         "solution":int(dataArray[5])
        }            
    )
file.close()

