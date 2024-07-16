const express = require('express')
const cors = require('cors')
const port = 3000

//database
const sequelize = require('./db.config')
sequelize.sync().then(() => console.log('database ready!'))

//endpoint
const userEndpoint = require('./routes/users')
const absensiEndpoint = require('./routes/absensi')

const app = express()
app.use(cors())
app.use(express.json())

//penting
app.use('/users', userEndpoint)
app.use('/absensi', absensiEndpoint)

app.listen(port, () => console.log(`Listening on port ${port}!`))