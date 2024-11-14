
const http = require("node:http");

const { findAvailablePort } = require("./11.free-port.js");

const server = http.createServer((request, response) => {
    console.log("Request received");
    response.end("Hola mundo");
});

// findAvailablePort(3000)
//     .then((port) => {
//         server.listen(port, () => {
//             console.log(`Server listening on port: http://localhost:${server.address().port}`);
//         })
//     });

const desiredPort = process.env.PORT ?? 3000;
//PORT=3000 node 12.http-findAvailablePort.js 
findAvailablePort(desiredPort)
    .then((port) => {
        server.listen(port, () => {
            console.log(`Server listening on port: http://localhost:${server.address().port}`);
        })
    });
