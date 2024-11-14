
const fs = require("node:fs");

//esta funcion lo que hace es leer el directorio
//por defecto le estamos poniendo el directorio actual "."
//en la callback el error siempre es el 1er parametro para que lo manejemos
fs.readdir(".", (err, files) => {
    if (err) {
        console.log('Error al leer el directorio:', err);
        return;
    }

    files.forEach(file => {
        console.log(file);
    });

});

//si quisieramos verificar la existencia de un archivo la poedmos hacer con el stat
