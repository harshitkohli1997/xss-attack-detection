const BayesClassifier = require('bayes-classifier');

var classifier = new BayesClassifier()
var storedClassifier = require('./model.json');
classifier.restore(storedClassifier);

module.exports = {
   xssAttackDetection:class xssAttackDetection {
      constructor(){
         this.singleResult = {
            confidenceFactor:0,
            suspicionFactor:0
         };
         this.batchResult = [];
         this.maliciousCount = 0;
         this.benignCount = 0;
      }
      
      detect = (str) =>{
         if(Array.isArray(str)){
            return  new Error('Expected a string but got an array')
         }
         var ans = classifier.getClassifications(str);
         
         if(ans[0].value > ans[1].value){
            this.singleResult.gist = ans[0].label;
            this.singleResult.confidenceFactor = ((ans[0].value/(ans[0].value+ans[1].value))*100).toFixed(20)*1;
            this.singleResult.suspicionFactor = 100- this.singleResult.confidenceFactor
         } else {
            this.singleResult.gist = ans[0].label;
            this.singleResult.confidenceFactor = ((ans[1].value/(ans[0].value+ans[1].value))*100).toFixed(20)*1;
            this.singleResult.suspicionFactor = 100- this.singleResult.confidenceFactor
         }
         
         return this.singleResult;
      }

      classifyBatch = (inputArr,primaryKey,fieldsToCheck) => {
          let keys = [];

         if(!Array.isArray(inputArr)){
            return new Error('Input must be an arrau to classify it')
         }
         if(fieldsToCheck && !Array.isArray(fieldsToCheck)){
            return new Error('fields to check in object array must be an array to classify it');
         }
         if(!primaryKey && ((fieldsToCheck && fieldsToCheck.length))){
             console.warn('Without primary key it would be difficult to identify the records');
         }
         if(inputArr && !inputArr.length){
             return new Error('input must contain atleast one record');
         }

         if(typeof(inputArr[0]) =='object'){
             keys = Object.keys(inputArr[0]);
         }
         if(fieldsToCheck && fieldsToCheck.length){
            keys = keys.filter(key => {
                return fieldsToCheck.indexOf(key) != -1;
               });
         }
         
        if(!keys.length && fieldsToCheck && fieldsToCheck.length){
            return new Error('no matching fields found in input');
        }

        inputArr.map(input => {
            var obj = {};

            if(keys.length){
                keys.map((key,i) => {
                   if(typeof(input[key]) =='string'){

                    var ans = classifier.getClassifications(input[key]?input[key]:'');
                    var obj1 = {};
                    if(ans[0].value > ans[1].value){
                        obj1.gist = ans[0].label;
                        obj1.confidenceFactor = ((ans[0].value/(ans[0].value+ans[1].value))*100).toFixed(20)*1;
                       
                    } else {
                        obj1.gist = ans[0].label;
                        obj1.confidenceFactor = ((ans[1].value/(ans[0].value+ans[1].value))*100).toFixed(20)*1;
                    }
                    obj[key] = obj1;
                } else {
                    console.warn('warning:Only string type fields will be evaluated');
                }
                })
                if(primaryKey){
                    obj["primaryKey"] = input[primaryKey];
                }
             } else {
                 if(typeof(input) =='string'){
                var ans = classifier.getClassifications(input);
         
                if(ans[0].value > ans[1].value){
                   obj.gist = ans[0].label;
                   obj.confidenceFactor = ((ans[0].value/(ans[0].value+ans[1].value))*100).toFixed(20)*1;
                } else {
                   obj.gist = ans[0].label;
                   obj.confidenceFactor = ((ans[1].value/(ans[0].value+ans[1].value))*100).toFixed(20)*1;
                }
            } else {
                console.warn('warning:Only string type fields will be evaluated');
            }
             }
             this.batchResult.push(obj);
             
        })

        return this.batchResult;

      }
   }
}



