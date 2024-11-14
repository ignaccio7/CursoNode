
const z = require('zod') // para las validaciones

const moviesSchema = z.object({
    title: z.string({
        invalid_type_error: 'Movie title must be a string',
        required_error: 'Movie title is required'
    }),
    year: z.number().int().positive().min(1900).max(2024),
    director: z.string(),
    duration: z.number().int().positive(),
    rate: z.number().min(0).max(10).default(5.5),
    poster: z.string().url({
        message:'Poster must be a valir URL'
    }),
    genre: z.array(
        z.enum(['Action','Adventure','Comedy','Drama','Fantasy','Horror','Thriller','Sci-Fi']),
        {
            required_error:'Movie genre is required',
            invalid_type_error: 'Movie genre must be an array of enum Genre'
        }
    )
})

// para validar cuando quieran CREAR una nueva pelicula
function validateMovie(object){
    // return moviesSchema.parse(object) puede ser este o bien usar el metodo
    // safeParse este que te devuelve un objeto result que te dice si hay error o si hay datos
    return moviesSchema.safeParse(object)
}

// para validar cuando quieran MODIFICAR una pelicula
// esto validara parcialmente porque aqui usamos el metodo PATCH que solo se deberia usar para validar parcialmente el recurso y con partial estamos indicando que los atributos del schema son opcionales
function validatePartialMovie(object){
    return moviesSchema.partial().safeParse(object)
}

module.exports = {
    validateMovie,
    validatePartialMovie
}
