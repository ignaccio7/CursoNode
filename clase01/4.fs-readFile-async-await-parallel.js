//Esta es la cuarta forma Asincrona que tenemos para leer archivos
const fs = require('node:fs/promises');


//De esta manera podemos hacer que lean ambos archivos en parallelo y que nos entregue la respuesta cuando se haya completado ambas proemsas
console.log("Leyendo el primer y segundo archivo...");

Promise.all([
    fs.readFile('./archivo1.txt', 'utf-8'),
    fs.readFile('./archivo2.txt', 'utf-8')
])
.then(([firstText, secondText])=>{
    console.log("Primer archivo:", firstText);    
    console.log("Segundo archivo:", secondText);
})


/* ------ IMPRIMIRA ASI 
Leyendo el primer y segundo archivo...
Primer archivo: Soy el primer archivo
Segundo archivo: Soy el segundo archivo

ESTA MANERA CON PROMISE ALL LO HACEMOS Y PODEMOS VER QUE SI BIEN NO BLOQUEA EXACTAMENTE EL HILO DE EJECUCION 
PUES ESPERA LA RESPUESTA DE LA LECTURA DE AMBOS ARCHIVOS
OSEA QUE NO BLOQUEA EL HILO DE EJECUCION 
*/

