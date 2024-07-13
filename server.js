const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')
const port = 3000

//database
const sequelize = require('./db.config')
sequelize.sync().then(() => console.log('database ready!'))

//penting
const userEndpoint = require('./routes/users')

const app = express()
app.use(cors())
app.use(express.json())

//penting
app.use('/users', userEndpoint)

app.listen(port, () => console.log(`Listening on port ${port}!`))