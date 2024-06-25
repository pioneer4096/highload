const Pool = require('pg').Pool
const {v4} = require('uuid');
const {dbConfig} = require('../../config.js')

// HAND MADE ORM
class DataBase {
    constructor() {
        this.pool = new Pool(dbConfig)
    }

    async register(first_name, second_name, birthdate, biography, city, password) {
        const uuidGen = v4()
        const response = await this.pool.query('INSERT into profiles (user_id, first_name, second_name, birthdate, biography, city, password) values ($1, $2, $3, $4, $5, $6, $7) returning user_id',
            [uuidGen, first_name, second_name, birthdate, biography, city, password])
        return response.rows[0].user_id
    }

    async findProfileById(id) {
        const profile = await this.pool.query('SELECT user_id, first_name, second_name, birthdate, biography, city FROM profiles where user_id = $1', [id])
        if (profile?.rows?.length) {
            return profile.rows[0]
        }
        else {
            return null;
        }
    }

    async findProfileWithPasswordById(id) {
        const profile = await this.pool.query('SELECT user_id, password FROM profiles where user_id = $1', [id])
        if (profile?.rows?.length) {
            return profile.rows[0]
        }
        else {
            return null;
        }
    }

    async getAll() {
        const profiles = this.pool.query('SELECT user_id, first_name, second_name, birthdate, biography, city FROM profiles ORDER BY id ASC')
        if (profiles?.rows?.length) {
            return profiles.rows
        }
        else {
            return null;
        }
    }


    destroy() {
        if (this.pool) {
            this.pool.end();
        }
    }

}

module.exports = DataBase