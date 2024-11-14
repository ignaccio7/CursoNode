import express from 'express'
import logger from 'morgan'
import dotenv from 'dotenv'
import { createClient } from '@libsql/client'

import { Server } from 'socket.io'
import { createServer } from 'node:http'

dotenv.config()

// aqui haremos la conexion con nuestra base de datos
const db = createClient({
  url: 'libsql://my-db-ignaccio7.turso.io',
  authToken: process.env.DB_TOKEN
})
// lo primero que haremos es crear una tabla
await db.execute(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT,
    user TEXT
  )
`)


const port = process.env.PORT ?? 3007

const app = express()
const server = createServer(app)
const io = new Server(server, {
  connectionStateRecovery: {
    // esto para que cuando se vaya la conexion de algun usuario no se pierda la informacion
    // lo malo es que es costoso y el servidor ira acumulando informacion para enviarle al usuario
    maxDisconnectionDuration:{}
  }
})

io.on('connection', async (socket) => {
  console.log('a user has connected!');

  socket.on('disconnect', () => {
    console.log('a user has disconnected!');
  })

  socket.on('chat message',async (msg) => {
    console.log(`message:${msg}`);
    
    // lo que haremos es que cada vez que nos llegue un mensaje guardarlo en la Base de datos
    const user = socket.handshake.auth.user ?? 'anonymous'
    console.log(`user:${user}`);
    
    let result 
    try {

      result = await db.execute({
        sql: 'INSERT INTO messages(content,user) VALUES (:message, :username)',
        args: { message: msg, username: user }
      })
    } catch (e) {
      console.error(e)
      return
    }

    // con io emit enviariamos este mensaje a todos los users conectados como un broadcast
    // io.emit('chat message', msg)
    // con esto emitiremos el mensaje mas del resultado el id de la ultima fila en la tabla messages
    io.emit('chat message', msg, result.lastInsertRowid.toString(), user)
  })

  // console.log('auth:⬇️');
  // console.log(socket.handshake.auth);

  // esto para recuperar los mensajes sin conexion
  // esto quiere decir si se ah conectado un nuevo cliente y nose ah recuperado de una desconexion
  if (!socket.recovered) {
    try {
      const results = await db.execute({
        sql: 'SELECT id,content,user FROM messages WHERE id > ?',
        args: [ socket.handshake.auth.serverOffset ?? 0 ]
      })

      results.rows.forEach(row => {
        socket.emit('chat message', row.content, row.id.toString(), row.user)
      })

    } catch (error) {
      console.log(error);
    }    
  }

})

app.use(logger('dev'))

app.get('/', (req, res) => {
  // res.send('<h1>Este es el chat</h1>')
  res.sendFile(process.cwd() + '/client/index.html')
})

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})