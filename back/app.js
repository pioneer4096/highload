
const express = require('express')
const AuthConnector = require('./utils/connectors/auth.connector.js')
const ProfilesConnector = require('./utils/connectors/profiles.connector.js')
const DataBase = require('./utils/db/DataBase.js')

const app = express()
const http = require('http').createServer(app)
const port = 3000


const dataBase = new DataBase()
const authConnector = new AuthConnector(dataBase)
const profilesConnector = new ProfilesConnector(dataBase)


app.use(express.json())

app.post('/login', async (req, res) => {
    const {id, password} = req.body

    try {
        const token = await authConnector.login(id, password)
        return res.status(200).json({
            token
        })
    }
    catch (e) {
        res.status(500).send({
            description: 'Broken query'
        })
    }
})

app.post('/user/register', async (req, res) => {
    const {first_name, second_name, birthdate, biography, city, password} = req.body
    console.log(req.body)
    const fields = [first_name, second_name, birthdate, biography, city, password]
    const fieldNames = ['first_name', 'second_name', 'birthdate', 'biography', 'city', 'password']

    if (fields.some(f => !f)) {
        const emptyField = fields.find(f => !f)
        const emptyFieldIndex = fields.indexOf(emptyField)

        return res.status(400).send({
            description: `Не заполнено поле ${fieldNames[emptyFieldIndex]}`
        })
    }

    try {
        const user_id = await authConnector.register(first_name, second_name, birthdate, biography, city, password)

        res.status(200).send({
            user_id
        })
    }
    catch (e) {
        console.error(e)
        res.status(500).send({
            description: 'Broken query'
        })
    }
})

app.get('/user/get', async (req, res) => {
    const userId = req.query.userId
    if (!req.query.hasOwnProperty('userId')) {
        return res.status(400).send({
            description: 'Невалидные данные'
        })
    }

    let profile = null
    try {
        profile = await profilesConnector.getProfile(userId)
    }
    catch (e) {
        res.status(500).send({
            description: 'Broken query'
        })
    }


    if (profile) {
        res.json(profile)
    }
    else {
        res.status(404).send({
            description: 'User not found'
        })
    }
})


app.get('/user/all', async (req, res) => {
    try {
        const profiles = await profilesConnector.getAllProfiles()
        return res.status(200).json({
            users: profiles
        })
    }
    catch (e) {
        res.status(500).send({
            description: 'Broken query'
        })
    }
})



http.listen(port, () => {
    console.log(`App started at port ${port}`)
})
