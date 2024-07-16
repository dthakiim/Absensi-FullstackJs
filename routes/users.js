const express = require('express')
const router = express.Router()
const UsersModel = require('../models/users')
const bcrypt = require('bcrypt')
const passwordCheck = require('../utils/passwordCheck')

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
    const check = await passwordCheck(nip, password)
    const encryptedPassword = await bcrypt.hash(passwordBaru, 8)

    if(check.compare === true){       
        const users = await UsersModel.update({
            nama, password: encryptedPassword //apa yang mau diganti 
        }, {where: {nip:nip}})
        res.status(200).json({
            users: {updated: users[0]},
            metadata: "update berhasil"
        })
    } else {
        res.status(400).json({
            error: "data invalid"
        })
    }
    })

//Delete data

//Login
router.post('/login', async(req, res) => {
    const {nip, password} = req.body
    const check = await passwordCheck(nip, password)
    if (check.compare === true) {
        res.json({
            users: check.userData,
            metadata:"Login success"
        })
    } else {
        res.status(400).json({
            error:"data invalid"
        })
    }
})

module.exports = router