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
         this.batchResult = {};
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

      classifyBatch = (arr) => {
         if(!Array.isArray(arr)){
            return new Error('Expected an array as parameter')
         }

      }
   }
}



