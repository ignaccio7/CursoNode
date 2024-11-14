
const fs = require("node:fs/promises");
const path = require("node:path");

const folder = process.argv[2] ?? '.';

// fs.readdir(folder)
//     .then(files => {
//         files.forEach(file => {
//             console.log(file);
//         });
//     })lll
//     .catch(err => {
//         console.log("Error al leer el directorio:", err);
//         return;
//     });

async function ls(folder) {
    let files;
    //LEEMOS LOS ARCHIVOS EN EL DIRECTORIO
    try {
        files = await fs.readdir(folder);
    } catch {
        console.error(`No se pudo leer el directorio: ${folder}`);
        process.exit(1);
    }

    //console.log(files);
    
    //aqui hacer notar que el map no para el proceso en el async asi que no para el proceso en secuencial
    //lo resuelve todo en asincrono el mapeo ocurre en paralelo
    //para hacerlo secuencial deberiamos usar el for of
    const filesPromises = files.map(async file =>{
        const filePath = path.join(folder,file);
        // console.log("----");
        let stats;

        try{
            stats = await fs.stat(filePath); // status - informacion del archivo
            // console.log("stats");
            // console.log(stats);
        }catch{
            console.error(`Nose pudo leer el archivo ${filePath}`);
            process.exit(1);
        }
        //el map como tal es asincrono y se resuelve asi pero todo lo que se ejecute adentro se resuelve de manera secuencial
        // console.log("aa");

        const isDirectory = stats.isDirectory();
        const fileType = isDirectory ? 'D' : 'F';
        const fileSize = stats.size.toString();
        const fileModified = stats.mtime.toLocaleString();

        // return `${fileType} ${file} ${fileSize} ${fileModified}`;
        return `${fileType} ${file.padEnd(20)} ${fileSize.padStart(10)} ${fileModified}`;

    });

    // console.log("espera a que termine de ejecutarse filesPromises");
    const filesInfo = await Promise.all(filesPromises);
    // console.log("recien ejecuta espera2");

    filesInfo.forEach(fileInfo => console.log(fileInfo));

}

ls(folder);


