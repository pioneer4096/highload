const md5 = require('md5')
const jwt = require('jsonwebtoken')
const {jwtSecret} = require('../../config.js')
const Errors = require('../reference/Error.js')

class AuthConnector {
    constructor(db) {
        this.db = db
    }

    async register(first_name, second_name, birthdate, biography, city, password) {
        return this.db.register(first_name, second_name, birthdate, biography, city, md5(password))
    }

    async login(user_id, password) {
        const loginPair = await this.db.findProfileWithPasswordById(user_id)
        if (loginPair) {
            if (loginPair.password === md5(password)) {
                return this.generateToken(loginPair.user_id)
            }
            else {
                throw new Error(Errors.INVALID_LOGIN_PAIR)
            }
        }
        else {
            throw new Error(Errors.LOGIN_NOT_FOUND)
        }
    }

    generateToken(user_id) {
        return jwt.sign({ user_id }, jwtSecret)
    }
}

module.exports = AuthConnector