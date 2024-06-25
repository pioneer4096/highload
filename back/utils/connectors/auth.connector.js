const md5 = require('md5');

class AuthConnector {
    constructor(db) {
        this.db = db
    }

    async register(first_name, second_name, birthdate, biography, city, password) {
        return await this.db.register(first_name, second_name, birthdate, biography, city, md5(password))
    }

    login(login, password) {
        const account = this.db.findAccount(login)
        if(account) {
            if(account.password === this.getPasswordHash(password)) {
                return account
            }
            else {
                throw new Error('Incorrect password')
            }
        }
        else {
            throw new Error('Login not found')
        }
    }
}

module.exports = AuthConnector