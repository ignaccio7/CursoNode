/*
nos informara acerca del path de los archivos
osea construir nuevas rutas - saber si tiene un extension - crear rutas etc
 */

const path = require("node:path");

/**
 * Nunca deberiamos crear una ruta como
    /content/subfolder/test.txt  XXXX
    esta prohibido porque las barras en --> unix / pero en windows --> \
 */
console.log(path.sep); //devuelve \
//la manera en la que debemos crear las rutas es

const filePath = path.join("content","subfolder","test.txt");

console.log(filePath);

//para obtener el nombre del fichero --> de una ruta completa obtendremos el nombre del fichero
const base = path.basename("/tmp/secrets-files/password.txt"); 
console.log(base);//password.txt
const base2 = path.basename("/tmp/secrets-files/password.txt",".txt"); 
console.log(base2);//password

const extension = path.extname('image.jpg'); 
console.log(extension);//.jpg
const extension2 = path.extname('my.super.image.jpg'); //.jpg
console.log(extension2);//.jpg





