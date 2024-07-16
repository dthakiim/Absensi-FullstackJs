const express = require('express')
const router = express.Router()
const AbsensiModel = require('../models/absensi')

//Get all data
router.get('/', async(req, res) => {
    const absensi = await AbsensiModel.findAll()
    res.status(200).json({
        data: absensi,
        metadata: "test get absensi"
    })
})

//Absensi In
router.post('/checkin', async(req, res) => {
    const {nip} = req.body
    const absensi = await AbsensiModel.create({
        users_nip : nip,
        status: 'in'
    })
    res.status(200).json({
        data: absensi,
        metadata: "test in"
    })
})

//Absensi out
router.post('/checkout', async(req, res) => {
    const {nip} = req.body
    const absensi = await AbsensiModel.create({
        users_nip : nip,
        status: 'out'
    })
    res.status(200).json({
        data: absensi,
        metadata: "test out"
    })
})

module.exports = router