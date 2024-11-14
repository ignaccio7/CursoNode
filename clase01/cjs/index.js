
//console.log(window);//error
//console.log(global);
//console.log(globalThis);
/*En nodejs no tenemos la variable global window al igual que en el navegador
en node la variable global es global
pero tenemos ya una variable que asemeja a las 2 segun el entorno que utilicemos y es globalThis que apuntara a la variable global segun el entorno que se ejecute*/

/* 
En nodeJS tenemos un patron de diseño orientado a modulos ya que no tendremos solamente todo nuestro codigo en un unico archivo

Existen dos tipos clasicos de modulos
CommonJS --> es el clasico antiguo
ModuleJS --> es el nuevo

*/

/*function sum(a, b){
    return a+b;
}

console.log(sum(1,2));
*/

//CommonJS require module

//de esta manera estariamos requiriendo o importando la funcion suma cuando es por default
/*const unNombreX = require('./sum.js');
console.log(unNombreX(1,2));*/

//cuando nos restringe enviandolo como objeto entonces
const {sum} = require('./sum.js');
console.log(sum(1,2));





/* */
