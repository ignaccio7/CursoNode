
const http = require("node:http");

const server = http.createServer((request, response) => {
    console.log("Request received");
    //cuando reciba una peticion voy a responder y terminar la comunicacion
    response.end("Hola mundo");
});

//asi definimos un puerto por defecto 
// server.listen(9090,()=>{
//     console.log("Server listening on port 9090");
// });

/*cuando abrimos en el navegador http://localhost:9090/ podemos ver que se realizan 2 peticiones
 1 la peticion 2 el favicon que intenta sacar
*/

//como cambiamos a que se asigne automaticamente un puerto libre efimero
server.listen(0, () => {
    console.log(`Server listening on port http://localhost:${server.address().port}`);
});





