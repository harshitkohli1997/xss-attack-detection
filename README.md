<h1>Xss-attack-detection</h1>

## Description

This package helps to filter the input text that is malicious and intended to attack the server.It contains model that is trained on a dataset of around 6k XSS-attack scripts to classify the input into 2 pre-defined labels i.e malicious and benign and this package has the ability to deal with different types of input like JSON Objects, string array, singular string, Object Array that could be helpful to filter malicious data present in database.

## Install

```
npm install --save xss-attack-detection
```

## Usage

```
const attackDetection = require('xss-attack-detection');
const xss_detect = new attackDetection.xssAttackDetection();
```

## 1. When input is simple string

```

console.log(xss_detect.detect("<script onload="alert()"></script>"));

// Expected Output
{ gist: 'malicious', confidenceFactor: 99.99999997227279 },

```

## 2. When input is array of string.

```
// To Deal with array as input we have different method named as classifyBatch.

console.log(xss_detect.classifyBatch(["<script onload="alert()"></script>","Hello, how are you"));

// Expected Output
[
{ gist: 'malicious', confidenceFactor: 99.99999997227279 },
{ gist: 'benign', confidenceFactor: 99.98769997227279 },
]
```

## 3. When input is array of object

```
var testingDocs = [
 {
   "input": "<script draggable=\"true\" ondragstart=\"alert(1)\">test</script>",
   "anotherField":'lets go ',
   "k":2
 },
 {
     "input": "Go until script jurong point, crazy.. Available only in bugis n great world la e buffet... Cine there got  amore wat...",
     "anotherField":'Hello how are you',
     "k": 6
   },

   ];

   console.log(d.classifyBatch(test,"k")); // k is primary key

//expected Outlet
[
 {
   input: { gist: 'malicious', confidenceFactor: 99.99999999285946 },
   anotherField: { gist: 'benign', confidenceFactor: 98.41886759120219 },
   primaryKey: 2
 },
 {
   input: { gist: 'benign', confidenceFactor: 99.99999999834742 },
   anotherField: { gist: 'benign', confidenceFactor: 91.66666666666666 },
   primaryKey: 6
 }
]

```

## Extra/Optional Arguments

<table>
  <tr>
    <th>S.no </th>
    <th>Name</th>
    <th>Type</th>
    <th>How it Works</th>
  </tr>
  <tr>
    <td>1</td>
    <td>primary key</td>
    <td>String</td>
    <td>this will help in adding new key to result which can uniquely identify the document in array.It can be passed as second argument in classifyBatch function</td>
  </tr>
  <tr>
    <td>2</td>
    <td>Fields to Check</td>
    <td>Array</td>
    <td>this will help is saving time by avoiding brute force checking to only specific fields checking. it can be passed as third argument in classifyBatch function </td>
  </tr>
</table>

## Contributors Details

<table>
  <tr>
    <th>S.no </th>
    <th>Name</th>
    <th>Contact Info</th>
  </tr>
  <tr>
    <td>1</td>
    <td>Harshit Kohli</td>
    <td>harshit.kohli1997@gmail.com</td>
  </tr>
  <tr>
    <td>2</td>
    <td>Sagar Bilwal</td>
    <td>bilwal.sagar@gmail.com</td>
  </tr>
  <tr>
    <td>3</td>
    <td>Abhinav Jain</td>
    <td>jabhi678@gmail.com</td>
  </tr>
  <tr>
    <td>4</td>
    <td>Pranay Anand</td>
    <td>pranayanand123@gmail.com</td>
  </tr>
</table>

## License

ISC
