const express = require('express')
const router = new express.Router()
const Staff = require('../models/staff')

router.post('/registerStaff', async (req, res) => {
   
    const staff = new Staff(req.body)


    try{
        const token = await staff.generateAuthToken()
        res.status(201).send({
            success: true,
            staff,
            token})
    }catch(e) {
        res.status(400).send({
            success: false,
            message: "Something went wrong.",
            e
        })
        console.log(e)
    }
})


router.post('/loginStaff', async (req, res) => {
    
    try{
        const staff = await Staff.findByCredentials(req.body.staffId, req.body.password)
        const token = await staff.generateAuthToken()
        
        res.send( {
            success: true,
            staff,
            token})
    }catch(e) {
        res.status(400).send({
            sucess: false,
            message: "Invalid Login Details"
        })
    }
})

module.exports = router