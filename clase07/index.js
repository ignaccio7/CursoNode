import express from 'express'
import { PORT } from './config.js'
import { UserRepository } from './user-repository.js'

const app = express()

// Para usar el sistema de plantillas de ejs
app.set('view engine', 'ejs')

app.use(express.json())

app.get('/', (req, res) => {
  // res.send('hola mundo!!!')
  res.render('example', { name: 'Nirodev' }) // aqui lo renderizamos
})

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await UserRepository.login({ username, password })
    res.send({ user })
  } catch (error) {
    console.log(error)
    res.status(401).send(error.message)
  }
})

app.post('/register', async (req, res) => {
  const { username, password } = req.body
  try {
    const id = await UserRepository.create({ username, password })
    res.send({ id })
  } catch (error) {
    res.status(400).send(error.message)
  }
})

app.get('/logout', (req, res) => {})

app.get('/protected', (req, res) => {})

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})
