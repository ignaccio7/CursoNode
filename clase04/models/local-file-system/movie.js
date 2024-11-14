
// import movies from './movies.json'
// import fs from 'node:fs'
// const movies = JSON.parse(fs.readFileSync('./movies.json','utf8'))
import { readJSON } from '../../utils/utils.js'

import { randomUUID } from 'node:crypto' // nos permitira crear IDs unicas

const movies = readJSON('./movies.json')

export class MovieModel {

  static async getAll({ genre }) {
    if (genre) {
      // const moviesFiltered = movies.filter(movie=>movie.genre.includes(genre)) esto no es caseSensitive porque si colocamos action no reconoce Action
      const moviesFiltered = movies.filter(
        movie => movie.genre.some(gen => gen.toLowerCase() === genre.toLowerCase()))
      return moviesFiltered
    }
    return movies
  }

  static async getById({ id }) {
    const movie = movies.find(movie => movie.id === id)
    return movie
  }

  static async create({ input }) {
    const newMovie = {
      id: randomUUID(),
      ...input,
      created: Date.now()
    }

    // Esto no seria REST porque estamos guardando el estado de la app en memoria
    // pero para entender mientras esto
    movies.push(newMovie)

    return newMovie
  }

  static async update({ id, input }) {
    const movieIndex = movies.findIndex(movie => movie.id === id)

    if (movieIndex === -1) {
      return false
    }
    const updateMovie = {
      ...movies[movieIndex],
      ...input
    }

    movies[movieIndex] = updateMovie
    return updateMovie
  }

  static async delete({ id }){
    const movieIndex = movies.findIndex(movie => movie.id === id)

    if (movieIndex === -1) {
        return false
    }

    movies.splice(movieIndex, 1)
    return true
  }

}