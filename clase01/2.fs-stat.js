/*
Manejaremos el modulo nativo que nos permitira manejar los archivos

*/

const fs = require("node:fs"); //a partir de Node 16 se recomienda poner (node:antes)

//programa sincrono
const stats = fs.statSync('./archivo1.txt');

console.log(
    stats.isFile(), //si es un fichero
    stats.isDirectory(), //saber si es directorio
    stats.isSymbolicLink(), //si es un enlace simbolico
    stats.size, //tamaño del archivo en bytes
);




