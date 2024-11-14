
import { Router } from "express";

import { MovieController } from "../controllers/movies.js";

export const createMovieRouter = ({ movieModel }) => {

    const routerMovies = Router()

    const movieController = new MovieController({ movieModel })

    routerMovies.get('/', movieController.getAll)
    routerMovies.post('/', movieController.create)

    routerMovies.get("/:id", movieController.getById)
    routerMovies.delete('/:id', movieController.delete)
    routerMovies.patch('/:id', movieController.update)

    return routerMovies
}