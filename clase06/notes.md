# Chat en tiempo real
Veremos 2 protocolos
1. HTTP
Stateless osea sin estado
esto quiere decir que tenemos un recurso pero puede ser cacheable 
recursos : html, js, img, REST API
este es unidireccional

No es EventDriven

Es un protocolo de comunicacion que se basa entre intercambio de mensajes entre cliente y servidor y usa TCP como protocolo de transporte.

Una manera de hacer un chat aqui con http seria con una tecnica que se denomina polling que lo que haria es cada X segundos va y pregunta si existe nuevos mensajes

Aqui tambien existe lo que es los ServerEvents pero de igual forma son unidireccionales pero no son tan potentes como los websockets que son bidireccionales

2. Web Sockets
StateFull osea con estado
esto no deberia ser cacheable
recursos: realtime, info ida y vuelta, poca latencia, bidireccional

Este si es EventDriven osea basado en eventos

Es un protocolo de comunicacion que se basa entre intercambio de mensajes entre cliente y servidor y usa TCP como protocolo de transporte. La diferencia esque pueden intercambiar mensajes el cliente y servidor en cualquier momento


## Iniciando

npm init -y

Dependencias usadas

Express

npm install express -E

Para saber como funciona el servidor si algo falla para saber el tiempo de respuesta cuando esta tardando

npm install morgan -E

Morgan es un logger es una herramienta que guarda una traza de algo
esto no informara la peticion el estado y los milisegundos que tardo

Para utilizar los websockets estaremos con

socket.io

https://www.npmjs.com/package/socket.io
npm install socket.io -E


Para crear una base de datos usaremos TursoSQL
https://docs.turso.tech/quickstart

Para usar turso necesitaremos usar wsl
luego instalar una distro de linux
en nuestro caso Ubuntu
luego de eso usaremos 

https://docs.turso.tech/cli/introduction

curl -sSfL https://get.tur.so/install.sh | bash

turso auth login --headless

luego tendremos que entrar a la pagina que nos informa
https://api.turso.tech?redirect=false  

nos logeamos nos dara un token y ejecutamos el siguiente comando
export TURSO_API_TOKEN="<nuestro token>"

ahora ya podremos crear la base de datos en turso
    
    turso db create my-db

Y tambien 

    turso db show my-db
-------------------
aqui podremos ver que turso creara las bases de datos cerca de nuestra ubicacion
Name:           my-db
URL:            libsql://my-db-ignaccio7.turso.io
ID:             c9773a8d-c564-11ee-9386-e26d5524e301
Group:          default
Version:        0.22.16
Locations:      scl
Size:           4.1 kB
Sleeping:       No
Database Instances:
NAME     TYPE        LOCATION
scl      primary     scl
-------------------
scl por -> Santiago de chile
se podria decir que lo importante es la url porque nos servira para poder conectar nuestro cliente con la db

Para utilizar instalaremos 2 dependencias en nuestro proyecto

```
    npm install @libsql/client dotenv
```
Para trabajar con turso libsql
dotenv para leer variables de entorno

Ya al momento de hacer la conexion en nuestro index.js
importamos createClient de libsql y creamos un cliente pero necesitaremos un token de autentificacion para conectarnos con nuestra db esa la pedimos con 

```
    turso db tokens create my-db
```

Luego creamos nuestro archivo .env y colocamos nuestras credenciales
como ser 

DB_TOKEN=<my-token>

Si esque quisieramos interactuar con sql con la base de datos

    turso db shell my-db