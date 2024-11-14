
import { Router } from "express";

import { MovieController } from "../controllers/movies.js";

export const routerMovies = Router()

routerMovies.get('/', MovieController.getAll)

routerMovies.get("/:id", MovieController.getById)

routerMovies.post('/', MovieController.create)

routerMovies.delete('/:id', MovieController.delete)

routerMovies.patch('/:id', MovieController.update)