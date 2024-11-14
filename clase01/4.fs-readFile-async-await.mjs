//Esta es la tercera forma Asincrona que tenemos para leer archivos
import fs from 'node:fs/promises';
//que pasa si existen modulos que no tienen el /promises asi tenemos una alternativa  solo se utiliza cuando no tenemos el por defecto
// const { promisify } = require("node:util");
// const readFilePromise = promisify(fs.readFile);

//Esta manera de usar el await se le denomita top level await
console.log("Leyendo el primer archivo...");

const response = await fs.readFile('./archivo1.txt', 'utf-8');
console.log("Primer archivo:",response);

console.log("Haciendo cosas mientras lees el archivo");

console.log("Leyendo el segundo archivo...");
const text = await fs.readFile('./archivo2.txt', 'utf-8');    
console.log("Segundo archivo:",text);

/* ------ IMPRIMIRA ASI 
Leyendo el primer archivo...
Primer archivo: Soy el primer archivo
Haciendo cosas mientras lees el archivo
Leyendo el segundo archivo...
Segundo archivo: Soy el segundo archivo

ESTA MANERA CON AWAIT LO HACEMOS Y PODEMOS VER QUE SI BIEN NO BLOQUEA EXACTAMENTE EL HILO DE EJECUCION 
PUES ESPERA LA RESPUESTA DE LA LECTURA DEL ARCHIVO 
OSEA LO QUE ESTA HACIENDO ES QUE EL CODIGO SEA SECUENCIAL
*/

