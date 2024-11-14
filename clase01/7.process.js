
/**
 * el objeto process es un objeto global que proporciona informacion
 * y control sobre el proceso actual de ejecucion
 * Tiene props y metodos para interactuar en nodejs
 */

//argumentos de entrada a la hora de ejecutar el proceso
//argv argumentos que esta recibiendo en la linea de comandos
console.log(process.argv);

//tambien podemos controlar el proceso y su salida
//process.exit(0); //indica que todo fue bien y que ahi termina el proceso

//process.exit(1); //indica que ocurrio un error y queremos que salga

//Como controlar eventos del proceso
// process.on("exit",()=>{
//     //limpiar los recursos
// });


//current working directory
console.log(process.cwd()); //saber desde que directorio estamos ejecutando el archivo

//algo importante son las variables de entorno
console.log(process.env.SALUDO);
//para hacer correr: SALUDO=hello node .\7.process.js
//si es en powershell para establecer una variable de entorno
//$env:SALUDO="hello"; node .\7.process.js


