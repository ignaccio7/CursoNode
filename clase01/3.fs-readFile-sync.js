//Esta es la forma sincrona que tenemos para leer archivos
const fs = require('node:fs');

//Si lo dejamos aqui esto nos devolvera un buffer un espacio de memoria y para poder sacar el contenido debemos decirle que la codificacion que queramos que tenga al leer el archivo sea ,'utf-8'
// const text = fs.readFileSync('./archivo1.txt');

console.log("Leyendo el primer archivo...");
const text = fs.readFileSync('./archivo1.txt','utf-8');

console.log(text);

console.log("Haciendo cosas mientras lees el archivo");

console.log("Leyendo el segundo archivo...");
const text2 = fs.readFileSync('./archivo2.txt','utf-8');

console.log(text2);

