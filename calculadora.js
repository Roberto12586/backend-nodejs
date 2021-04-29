'use strict'

var param = process.argv.slice(2);      //recibir desde node calculadora.js 1 2 3

var numero1 = parseFloat(param[0]);
var numero2 = parseFloat(param[1]);

var plantilla = `
La suma es ${numero1+numero2}
`;

console.log(numero1);
console.log(numero2);
console.log(plantilla);