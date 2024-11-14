const express = require('express') // require --> CommonJS
const movies = require('./movies.json')
const crypto = require('node:crypto') // nos permitira crear IDs unicas
const { validateMovie, validatePartialMovie } = require('./schemas/movies')

// para arreglar el problema del cors
const cors = require('cors')


const app = express()
app.disable('x-powered-by') // deshabilitar el header x-powered-by:Express
app.use(express.json()) // con este middleware express captura las request que se envian en json

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
app.use(cors({
    origin:(origin, callback)=>{
        const ACCEPTED_ORIGINS = [
            'http://127.0.0.1:5500',
            'http://localhost:1234',
            'http://midominio.com'
        ]

        if (ACCEPTED_ORIGINS.includes(origin)) {
            return callback(null, true)
        }
        if (!origin) {
            return callback(null, true)            
        }

        return callback(new Error('Not allowed by CORS'))
    }
}))

const ACCEPTED_ORIGINS = [
    'http://127.0.0.1:5500',
    'http://localhost:1234',
    'http://midominio.com'
]
// EN EL CORS TENEMOS METODOS NORMALES Y SE PODRIA DECIR COMPLEJOS
// metodos normales: GET/HEAD/POST
// metodos complejos: PUT/PATCH/DELETE

// lo que pasa con los metodos complejos esque piden CORS PRE-Flight
// estos requieren una peticion especial OPTIONS para verificar (una peticion previa)

app.get('/movies', (req, res) => {
    //con esta linea de codigo podriamos arreglar el acceso de cors
    // con * admitimos cualquier origen
    // res.header('Access-Control-Allow-Origin','*')
    // tambien podriamos poner el origen que vamos a aceptar --> esa es la ip con el puerto que nos levanta el liveserver de la pagina index.html
    // res.header('Access-Control-Allow-Origin','http://127.0.0.1:5500')
    //NOTA: el navegador no te envia la cabecera de origin cuando hacemos la peticion de la misma ip y puerto ejem. http://localhost:1234->http://localhost:1234
    const origin = req.header('origin')
    if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
        res.header('Access-Control-Allow-Origin', origin)
    }

    // aqui utilizamos un filtro por query string
    const { genre } = req.query
    if (genre) {
        // const moviesFiltered = movies.filter(movie=>movie.genre.includes(genre)) esto no es caseSensitive porque si colocamos action no reconoce Action
        const moviesFiltered = movies.filter(
            movie => movie.genre.some(gen => gen.toLowerCase() === genre.toLowerCase()))
        return res.json(moviesFiltered)
    }
    res.json(movies)
})

// --> como recuperamos los parametros de la url
// app.get('/movies/:id/:mas/:otro',(req, res)=>{ // path to regexp
//     const { id, mas, otro } = req.params
app.get('/movies/:id', (req, res) => { // path to regexp
    const { id } = req.params
    const movie = movies.find(movie => movie.id === id)
    // si tenemos la pelicula
    if (movie) return res.json(movie)
    // si no la encontramos
    res.status(404).json({ message: 'Movie not found' })
})

// --> para crear una pelicula con POST
app.post('/movies', (req, res) => {
    // console.log(req.body);
    // const {
    //     title,
    //     year,
    //     director,
    //     duration,
    //     poster,
    //     genre,
    //     rate
    // } = req.body

    // const newMovie = {
    //     id: crypto.randomUUID(), //un uuid es un identificador unico universal, con esto creamos un id unico v4
    //     title,
    //     year,
    //     director,
    //     duration,
    //     poster,
    //     genre,
    //     rate: rate ?? 0
    // }
    // console.log(newMovie);

    const result = validateMovie(req.body)

    // if (!result.success) {
    if (result.error) {
        // 422 Unprocessable Entity el servidor entendio la request pero la sintaxis esta mal | 400 Bad request error del cliente
        return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newMovie = {
        id: crypto.randomUUID(),
        ...result.data,
        created: Date.now()
    }

    // Esto no seria REST porque estamos guardando el estado de la app en memoria
    // pero para entender mientras esto
    movies.push(newMovie)

    res.status(201).json(newMovie) // aveces es interesante devolver el mismo recurso para actualizar la cache del cliente
    // res.send('abc')
})

app.patch('/movies/:id', (req, res) => {
    // console.log(req.body);
    const result = validatePartialMovie(req.body)
    if (!result.success) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params

    const movieIndex = movies.findIndex(movie => movie.id === id)

    if (movieIndex === -1) {
        return res.status(404).json({ message: 'Movie not found' })
    }
    const updateMovie = {
        ...movies[movieIndex],
        ...result.data
    }

    movies[movieIndex] = updateMovie

    res.status(200).json(updateMovie)
    // return res.status(200).json({message:'success'})
})

app.delete('/movies/:id', (req, res) => {
    const origin = req.header('origin')
    if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
        res.header('Access-Control-Allow-Origin',origin)
    }

    const { id } = req.params
    const movieIndex = movies.findIndex(movie => movie.id === id)

    if (movieIndex === -1) {
        return res.status(404).json({ message: 'Movie Not found' })
    }

    movies.splice(movieIndex, 1)

    return res.json({ message: 'Movie deleted' })
})

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