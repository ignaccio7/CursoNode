const express = require('express')
const dittoJSON = require('./ditto.json')

const PORT = process.env.PORT ?? '1234'
const app = express()

app.use(express.json())
// todo lo de abajo se puede cambiar gracias a express por app.use(express.json()) --> se debe inicializar arriba antes de hacer cualquier accion

/**
 * En express tenemos middlewares
 * el middleware es una funcion que se ejecuta entre la peticion y la respuesta
 */
// por defecto puede afectar a todas
// app.use((req, res, next) => {
// o las podemos filtrar por endpoint todas las urls que empiecen por pokemon
// app.use('/pokemon/*',(req, res, next) => {
// o solamente al home
// app.use('/', (req, res, next) => {
// tambien podriamos hacer para una accion en concreto en este caso solo para los gets
// app.get('/', (req, res, next) => {
// app.use((req, res, next) => {
//   console.log('Mi primer middleware')
//   // trackear la request a la base de datos
//   // revisar si el user tiene cookies

//   // siempre necesita el next() para decirle que continue
//   next()
// })

// app.use((request, response, next) => {
//   if (request.method !== 'POST') return next()
//   if (request.headers['content-type'] !== 'application/json') return next()

//   console.log('Mi primer middleware')
//   // aqui solo llegan request que son POST y que tienen el header application/json
//   let body = ''
//   // escuchar el evento data --> que es mientras esta recibiendo la informacion
//   request.on('data', (chunk) => {
//     body += chunk.toString()
//   })
//   // cuando sabemos que llego toda la informacion
//   request.on('end', () => {
//     const data = JSON.parse(body)
//     data.created = Date.now()
//     // response.end(JSON.stringify(data))
//     // response.status(201).json(data)
//     request.body = data
//     next()
//   })
// })

// -----------------------------------------------

// por defecto express al hacer un envio post podemos ver una cabecera que nos indica que estamos utilizando esta tecnologia para quitarla
// por temas de seguridad se la quita ya que en caso tuviera la version que no la tiene pero si tuviera pues habia une version de express con un bug terrible de seguridad
app.disable('x-powered-by')

app.get('/', (request, response) => {
  // podemos ver que detecta automaticamente el content type que estas enviando tambien podriamos quitar el status que es por defecto
  // response.status(200).send('<h1>Mi página</h1>')
  //   response.send('<h1>Mi página</h1>')
  response.json({ message: 'hola mundo' })
})

app.get('/pokemon/ditto', (request, response) => {
  response.json(dittoJSON)
})

// app.post('/pokemon/ditto', (request, response) => {
//   let body = ''
//   // escuchar el evento data --> que es mientras esta recibiendo la informacion
//   request.on('data', (chunk) => {
//     body += chunk.toString()
//   })
//   // cuando sabemos que llego toda la informacion
//   request.on('end', () => {
//     const data = JSON.parse(body)
//     data.created = Date.now()
//     // response.end(JSON.stringify(data))
//     response.status(201).json(data)
//   })
// })

app.post('/pokemon/ditto', (request, response) => {
//   let body = ''
//   // escuchar el evento data --> que es mientras esta recibiendo la informacion
//   request.on('data', (chunk) => {
//     body += chunk.toString()
//   })
//   // cuando sabemos que llego toda la informacion
//   request.on('end', () => {
//     const data = JSON.parse(body)
//     data.created = Date.now()
//     // response.end(JSON.stringify(data))
//     response.status(201).json(data)
//   })
  response.status(201).json(request.body)
})

// para hacer el 404 debemos ponerla al final porque ira en orden la busqueda de peticiones que hara
// con .use es hace referencia a todas las acciones .get.post.options es como poner un *
app.use((req, res) => {
  res.status(404).send('<h1>404</h1>')
})

app.listen(PORT, () => {
  console.log(`server listening on port: http://localhost:${PORT}`)
})
