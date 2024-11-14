/**------------- CONNECTION TO DATABASE */
/**  se recomienda este paquete porque el otro solo mysql esta desactualizado y esta va mas rapido https://www.npmjs.com/package/mysql2 
 * npm install --save mysql2
*/

import mysql from 'mysql2/promise'

const config = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '',
    database: 'moviesdb'
}

const connection = await mysql.createConnection(config)

/**------------- CREATE CLASS */

export class MovieModel {

    static async getAll({ genre }) {
        if (genre) {
            const lowerCaseGenre = genre.toLowerCase()
            // get genre ids from database table using genre names
            const [genres] = await connection.query(
                "SELECT id FROM genre WHERE LOWER(name) = ?;", [lowerCaseGenre]
            )

            // no genre found
            if (genres.length === 0) return []

            // get the id from the first genre result
            const [{ id }] = genres

            //get all movies ids from database table
            const [movies] = await connection.query(
                "SELECT m.title, m.year, m.director, m.duration, m.poster, m.rate, BIN_TO_UUID(m.id) FROM movie m, movie_genres mg WHERE genre_id = (SELECT id FROM genre WHERE id = ?) AND m.id = mg.movie_id;",
                [id]
            )
            return movies
        }

        const [movies, tableInfo] = await connection.query(
            "SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) FROM movie;"
        )
        // console.log(movies);
        return movies
    }

    static async getById({ id }) {
        const [movies] = await connection.query(
            "SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) FROM movie WHERE id = UUID_TO_BIN(?);",
            [id]
        )
        // console.log(movies);
        if (movies.length === 0) {
            return []
        }
        // console.log(movies);
        return movies[0]
    }

    static async create({ input }) {
        const {
            genre, // genre is an array
            title,
            year,
            director,
            duration,
            poster,
            rate } = input

        console.log(genre);

        const [uuidResult] = await connection.query("SELECT UUID() uuid;")
        const [{ uuid }] = uuidResult

        // insert movie
        try {
            await connection.query(`
            INSERT INTO movie (id, title, year, director, duration, poster, rate) 
            VALUES(UUID_TO_BIN("${uuid}") ,?, ?, ?, ?, ?, ?);
            `,
                [title, year, director, duration, poster, rate])
        } catch (error) {
            // este error nunca debe llegarle al usuario ya que puede ver informacion sensible
            throw new Error('Error creating movie')
            // enviar la traza a un servicio interno
            // sendLog(e)
        }
        // insert genre
        try {
            for (const gen of genre) {
                const [queryGenre] = await connection.query(`SELECT id FROM genre WHERE LOWER(name) = ?;`, [gen.toLowerCase()])
                const idGenre = queryGenre[0].id
                if (idGenre) {
                    await connection.query(`
                    INSERT INTO movie_genres(movie_id, genre_id)
                    VALUES(UUID_TO_BIN("${uuid}"),${idGenre});
                    `)
                }
            }
        } catch (error) {
            console.log(error);
            throw new Error('Error creating genre to movie')
        }
        // aqui usamos collate porque al querer comparar dos datos que son de tipo uuid para que lo compare utilizamos el utf8ci que significa case-insensitive 
        const [movie] = await connection.query(`
        SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) FROM movie WHERE BIN_TO_UUID(id) COLLATE utf8mb4_general_ci = (?);`, [uuid])
        console.log(movie[0]);
        return movie[0]
    }

    static async delete({ id }) {
        try {
            // delete movies
            const [deleteMG] = await connection.query(`DELETE FROM movie_genres WHERE movie_id = UUID_TO_BIN(?);`, [id])
            const [deleteM] = await connection.query(`DELETE FROM movie WHERE id = UUID_TO_BIN(?);`, [id])

            // console.log(result.affectedRows);
            if (deleteMG.affectedRows === 0 && deleteM.affectedRows === 0) {
                return false
            }
            return true
        } catch (error) {
            console.log(error);
        }
    }

    static async update({ id, input }) {
        try {
            let columns = []; let values = []
            Object.entries(input).map(([column, value]) => {
                columns.push(`${column}=?`); 
                values.push(value);
            })
            const query = `UPDATE movie SET ${columns.join(',')} WHERE id = UUID_TO_BIN(?)`

            const [result] = await connection.query(query,[ ...values, id ])
            // console.log(result);
            if (result.affectedRows !== 0) {
                const updatedMovie = await connection.query('SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) FROM movie WHERE id = UUID_TO_BIN(?);',[id])
                return [updatedMovie[0]]
            }else{
                return []                
            }

        } catch (error) {
            console.log(error);
            return []
        }
    }

}

