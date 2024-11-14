import { MovieModel } from "../models/mongodb/movie.js"
import { validateMovie, validatePartialMovie } from "../schemas/movies.js"

export class MovieController {

  static async getAll(req, res) {
    // aqui utilizamos un filtro por query string
    const { genre } = req.query
    let movies = await MovieModel.getAll({ genre })
    res.json(movies)
  }

  static async getById(req, res){
    const { id } = req.params
    // const movie = movies.find(movie => movie.id === id)
    const movie = await MovieModel.getById({ id })

    // si tenemos la pelicula
    if (movie) return res.json(movie)
    // si no la encontramos
    res.status(404).json({ message: 'Movie not found' })
  }

  static async create(req, res){
    const result = validateMovie(req.body)

    // if (!result.success) {
    if (result.error) {
        // 422 Unprocessable Entity el servidor entendio la request pero la sintaxis esta mal | 400 Bad request error del cliente
        return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newMovie = await MovieModel.create({ input: result.data })

    res.status(201).json(newMovie) // aveces es interesante devolver el mismo recurso para actualizar la cache del cliente
    // res.send('abc')
  }

  static async delete (req, res) {

    const { id } = req.params
    const result = await MovieModel.delete({ id })

    if (result === false) {
        return res.status(404).json({ message: 'Movie Not found' })
    }    

    return res.json({ message: 'Movie deleted' })
  }

  static async update (req, res) {
    // console.log(req.body);
    const result = validatePartialMovie(req.body)
    if (!result.success) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params

    const updateMovie = await MovieModel.update({ id, input: result.data })

    res.status(201).json(updateMovie)
    // return res.status(200).json({message:'success'})
  }


}