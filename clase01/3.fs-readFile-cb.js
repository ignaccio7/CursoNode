//Esta es la primera forma Asincrona que tenemos para leer archivos
const fs = require('node:fs');

//Si lo dejamos aqui esto nos devolvera un buffer un espacio de memoria y para poder sacar el contenido debemos decirle que la codificacion que queramos que tenga al leer el archivo sea ,'utf-8'
// const text = fs.readFileSync('./archivo1.txt');

console.log("Leyendo el primer archivo...");
fs.readFile('./archivo1.txt','utf-8',(err,text)=>{ //Ejecutas esta callback cuando termines de leer el archivo
    console.log(text);
});

console.log("Haciendo cosas mientras lees el archivo");

console.log("Leyendo el segundo archivo...");
fs.readFile('./archivo2.txt','utf-8',(err, text)=>{
    console.log(text);
});

/* ------ PUEDE IMPRIMIR ASI 
Leyendo el primer archivo...
Haciendo cosas mientras lees el archivo
Leyendo el segundo archivo...
Soy el primer archivo
Soy el segundo archivo

------ O PUEDE IMPRIMIR ASI 
Leyendo el primer archivo...
Haciendo cosas mientras lees el archivo
Leyendo el segundo archivo...
Soy el segundo archivo
Soy el primer archivo

ESTAS CALLBACKS SE EJECUTARAN CUANDO TENGAN LA INFORMACION DEL ARCHIVO Y NO BLOQUEARAN EL HILO DE TRABAJO EN JS
*/

