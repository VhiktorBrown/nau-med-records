const express = require('express')
const auth = require('../middleware/auth')
const router = new express.Router()
const Patient = require('../models/patient')

router.post('/addPatient', auth, async (req, res) => {

    try{
        
        const patient = new Patient(req.body)
        await patient.save()
        
        res.status(201).send({ 
            success: true,
            patient
        })
    }catch(e){
        console.log(e)
        res.status(500).send(e)
    }
})

module.exports = router