//Esta es la segunda forma Asincrona que tenemos para leer archivos
const fs = require('node:fs/promises');
//que pasa si existen modulos que no tienen el /promises asi tenemos una alternativa  solo se utiliza cuando no tenemos el por defecto
// const { promisify } = require("node:util");
// const readFilePromise = promisify(fs.readFile);


console.log("Leyendo el primer archivo...");
fs.readFile('./archivo1.txt', 'utf-8')
    .then(response => {
        console.log("Primer archivo:",response);
    });

console.log("Haciendo cosas mientras lees el archivo");

console.log("Leyendo el segundo archivo...");
fs.readFile('./archivo2.txt', 'utf-8')
    .then(text => {
        console.log("Segundo archivo:",text);
    });

/* ------ PUEDE IMPRIMIR ASI 
Leyendo el primer archivo...
Haciendo cosas mientras lees el archivo
Leyendo el segundo archivo...
Segundo archivo: Soy el segundo archivo
Primer archivo: Soy el primer archivo

------ O PUEDE IMPRIMIR ASI 
Leyendo el primer archivo...
Haciendo cosas mientras lees el archivo
Leyendo el segundo archivo...
Primer archivo: Soy el primer archivo
Segundo archivo: Soy el segundo archivo

DE LA MISMA MANERA QUE EN LOS CALLBACKS SE EJECUTARAN CUANDO TENGAN LA INFORMACION DEL ARCHIVO Y NO BLOQUEARAN EL HILO DE TRABAJO EN JS 
POR ESO PUEDE EJECUTARSE EL SEGUNDO ANTES QUE EL PRIMERO
*/

