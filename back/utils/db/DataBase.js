const Pool = require('pg').Pool
const {v4} = require('uuid');
const config = require('../../config.js')

// HAND MADE ORM
class DataBase {
    constructor() {
        this.pool = new Pool(config)
    }

    async register(first_name, second_name, birthdate, biography, city, password) {
        const uuidGen = v4()
        const response = await this.pool.query('INSERT into profiles (user_id, first_name, second_name, birthdate, biography, city, password) values ($1, $2, $3, $4, $5, $6, $7) returning user_id',
            [uuidGen, first_name, second_name, birthdate, biography, city, password])
        return response.rows[0].user_id
    }

    findAccount(login) {

    }

    async findProfileById(id) {
        return this.pool.query('SELECT user_id, first_name, second_name, birthdate, biography, city FROM profiles where user_id = $1', [id])
    }

    async getAll() {
        return this.pool.query('SELECT user_id, first_name, second_name, birthdate, biography, city FROM profiles ORDER BY id ASC')
    }


    destroy() {
        if (this.pool) {
            this.pool.end();
        }
    }

}

module.exports = DataBase