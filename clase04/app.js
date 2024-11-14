import express, { json } from 'express' // require --> CommonJS

import { routerMovies } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'

const app = express()
app.disable('x-powered-by') // deshabilitar el header x-powered-by:Express
app.use(json()) // con este middleware express captura las request que se envian en json

app.get('/', (req, res) => {
    res.json({ message: 'hola mundo' })
})

// Todos los recursos que sean MOVIES se identifica con /movies
// app.get('/movies', (req, res) => {
//     res.json(movies)
// })

//el problema esque coloca todo con * acepta todo
// app.use(cors())
//para restringir de mejor manera
app.use(corsMiddleware())

// EN EL CORS TENEMOS METODOS NORMALES Y SE PODRIA DECIR COMPLEJOS
// metodos normales: GET/HEAD/POST
// metodos complejos: PUT/PATCH/DELETE

// lo que pasa con los metodos complejos esque piden CORS PRE-Flight
// estos requieren una peticion especial OPTIONS para verificar (una peticion previa)

app.use('/movies',routerMovies)

app.options('/movies/:id', (req, res) => {
    const origin = req.header('origin')
    if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
        res.header('Access-Control-Allow-Origin', origin)
        res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE')
    }
    res.send('200')
})


const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
})