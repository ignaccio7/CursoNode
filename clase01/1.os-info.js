
/**
 * NodeJS al ser un entorno de ejecucion nos da una biblioteca de modulos nativos que nos da acceso al SO a los archivos a internet a todo basicamente
 * 
 */

//El primer sistema de modulo nativo que veremos es el del sistema

const { log } = require('node:console');
const os = require('node:os');

console.log("Informacion del Sistema Operativo:");
console.log("---------------------------");

console.log("Nombre del Sistema Operativo :",os.platform());
console.log("Version del Sistema Operativo :",os.release());
console.log("Arquitectura:", os.arch());
console.log("CPUs:",os.cpus());
console.log("Memoria Libre:",os.freemem()/1024/1024);
console.log("Memoria Total:",os.totalmem()/1024/1024);
console.log("Uptime (horas encendido):",os.uptime()/60/60);






