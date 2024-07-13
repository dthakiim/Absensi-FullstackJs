const express = require('express')
const router = express.Router()
const UsersModel = require('../models/users')

router.get('/', async(req, res) => {
    const users = await UsersModel.findAll()
    console.log(users)

    res.status(200).json({
        data: "Test",
        metadata: "test user endpoint"
    })
})

module.exports = router