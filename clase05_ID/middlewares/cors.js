
// para arreglar el problema del cors
import cors from 'cors'

const ACCEPTED_ORIGINS = [
    'http://127.0.0.1:5500',
    'http://localhost:1234',
    'http://midominio.com'
]

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => {
    return cors({
        origin: (origin, callback) => {

            if (acceptedOrigins.includes(origin)) {
                return callback(null, true)
            }
            if (!origin) {
                return callback(null, true)
            }

            return callback(new Error('Not allowed by CORS'))
        }
    })
}