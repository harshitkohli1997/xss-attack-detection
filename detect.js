var xssAttack = require('./index');
var d = new xssAttack.xssAttackDetection();

console.log(d.detect(("hi how are  you")))