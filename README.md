<h1>Xss-attack-detection</h1>
# Description
This package helps to filter the input text that is malicious and intended to attack the server.it contains model that is trained on data set of around 6k xss-attack scripts to classify the input into 2 pre defined labels i.e malicious and benign and this package has the ability to deal with different types of input like JSON Objects, string array, singular string,Object Array that could be helpful to filter malicious data present in database.

#Install
```
npm install --save xss-attack-detection
```
#Usage
#example 1 when input is simple string
```
const attackDetection = require('../index');
const detect = new attackDetection.xssAttackDetection();



```
