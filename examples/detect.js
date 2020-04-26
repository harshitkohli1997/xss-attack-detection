var xssAttack = require('../index');
var d = new xssAttack.xssAttackDetection();

var test = [   {
    "label": "Malicious",
    "input": "<applet draggable=\"true\" ondragleave=\"alert(1)\">test</applet>",
    "anotherField":'Yeah its done',
    "k":1
  },
  {
    "label": "Malicious",
    "input": "<script draggable=\"true\" ondragstart=\"alert(1)\">test</script>",
    "anotherField":'lets go ',
    "k":2
  },
  {
    "label": "Malicious",
    "input": "<script id=x tabindex=1 onactivate=alert(1)></script>",
    "anotherField":'amazing work',
    "k":3
  },
  {
    "label": "Malicious",
    "input": "<applet id=x tabindex=1 onbeforeactivate=alert(1)></applet>",
    "anotherField":'<script alert=(1)><script>',
    "k":4,
  },
  {
    "label": "Malicious",
    "input": "<applet id=x tabindex=1 onbeforedeactivate=alert(1)></applet><input autofocus>",
    "anotherField":'<script></script>',
    "k":5,
  },
  {
      "label": "benign",
      "input": "Go until script jurong point, crazy.. Available only in bugis n great world la e buffet... Cine there got amore wat...",
      "anotherField":'Hello how are you',
      "k": 6
    },
    {
      "label": "benign",
      "input": "hi How Are You",
      "anotherField":'hello done completed',
      "k": 7
}]

console.log(d.classifyBatch(test,"k"));