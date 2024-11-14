import crypto from 'node:crypto'

import bcrypt from 'bcrypt'
import { SALT_ROUNDS } from './config.js'

import DBLocal from 'db-local'
// aqui le indicamos donde queremos guardar los datos
const { Schema } = new DBLocal({ path: './db' })
// aqui el esquema que seguira para el registro de los datos
const User = Schema('User', {
  _id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true }
})

export class UserRepository {
  static async create ({ username, password }) {
    // 1. Validaciones del username y password
    Validation.username(username)
    Validation.password(password)

    // 2. Asegurarse que el username no existe
    const user = User.findOne({ username })
    if (user) throw new Error('username already exists')

    // 3. Crear usuario
    const id = crypto.randomUUID()

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

    User.create({
      _id: id,
      username,
      password: hashedPassword
    }).save()

    return id
  }

  static async login ({ username, password }) {
    // 1. Validaciones del username y password
    Validation.username(username)
    Validation.password(password)

    const user = User.findOne({ username })
    if (!user) throw new Error('Username does not exist')

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) throw new Error('Incorrect password')

    const { password: _, ...publicUser } = user

    return publicUser
  }
}

class Validation {
  static async username (username) {
    if (typeof username !== 'string') throw new Error('Username must be a string')
    if (username.length < 3) throw new Error('Username must be a 3 characters to long')
  }

  static async password (password) {
    if (typeof password !== 'string') throw new Error('Password must be a string')
    if (password.length < 5) throw new Error('Password must be a 5 characters to long')
  }
}
