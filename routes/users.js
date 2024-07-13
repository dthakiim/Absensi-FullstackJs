const express = require('express')
const router = express.Router()
const UsersModel = require('../models/users')
const bcrypt = require('bcrypt')

//Get all data
router.get('/', async(req, res) => {
    const users = await UsersModel.findAll()
    res.status(200).json({
        data: users,
        metadata: "test user endpoint"
    })
})

//Add data
router.post('/', async(req,res) => {
    const {nip, nama, password} = req.body
    const encryptedPassword = await bcrypt.hash(password, 8)
    const users = await UsersModel.create({
        nip, nama, password: encryptedPassword
    })
    res.status(200).json({
        data: users,
        metadata: "test post user endpoint"
    })
})

//Edit data
router.put('/', async(req, res) => {
    const {nip, nama, password, passwordBaru} = req.body
    const userData = await UsersModel.findOne({where: {nip:nip}})

    const compare = await bcrypt.compare(password, userData.password)
    const encryptedPassword = await bcrypt.hash(passwordBaru, 8)

    if(compare === true){       
        const users = await UsersModel.update({
            nama, password: encryptedPassword //apa yang mau diganti 
        }, {where: {nip:nip}})
        res.status(200).json({
            users: {updated: users[0]},
            metadata: "update berhasil"
        })
    } else {
        res.status(200).json({
            error: "data invalid"
        })
    }
    })

//Delete data

module.exports = router