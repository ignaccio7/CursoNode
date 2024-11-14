// DE MANERA LOCAL
// import { MovieModel } from "../models/local-file-system/movie.js"
// CON MONGODB
// import { MovieModel } from "../models/mongodb/movie.js"
// CON MYSQL
// import { MovieModel } from "../models/mysql/movie.js"

import { validateMovie, validatePartialMovie } from "../schemas/movies.js"

export class MovieController {

  constructor({ movieModel }){
    this.movieModel = movieModel
  }

  getAll = async (req, res) => {
    // aqui utilizamos un filtro por query string
    const { genre } = req.query
    let movies = await this.movieModel.getAll({ genre })
    res.json(movies)
  }

  getById = async (req, res) => {
    const { id } = req.params
    // const movie = movies.find(movie => movie.id === id)
    const movie = await this.movieModel.getById({ id })

    // si tenemos la pelicula
    if (movie) return res.json(movie)
    // si no la encontramos
    res.status(404).json({ message: 'Movie not found' })
  }

  create = async (req, res)=> {
    const result = validateMovie(req.body)

    // if (!result.success) {
    if (result.error) {
        // 422 Unprocessable Entity el servidor entendio la request pero la sintaxis esta mal | 400 Bad request error del cliente
        return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    try {
      const newMovie = await this.movieModel.create({ input: result.data })

      res.status(201).json(newMovie) // aveces es interesante devolver el mismo recurso para actualizar la cache del cliente
      // res.send('abc') 
    } catch (error) {
      console.error(error);

      // Aquí puedes ajustar el mensaje de error según tus necesidades
      res.status(500).json({ error: 'Internal Server Error' });
    }    
  }

  delete = async (req, res) => {

    const { id } = req.params
    const result = await this.movieModel.delete({ id })

    if (result === false) {
        return res.status(404).json({ message: 'Movie Not found' })
    }    

    return res.json({ message: 'Movie deleted' })
  }

  update = async (req, res) => {
    // console.log(req.body);
    const result = validatePartialMovie(req.body)
    if (!result.success) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params

    const updateMovie = await this.movieModel.update({ id, input: result.data })

    res.status(201).json(updateMovie)
    // return res.status(200).json({message:'success'})
  }


}