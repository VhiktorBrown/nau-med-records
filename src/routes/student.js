const express = require('express')
const auth = require('../middleware/auth')
const router = new express.Router()
const Student = require('../models/student')

router.post('/addStudent', auth, async (req, res) => {

    try{

        const student = new Student(req.body)
        await student.save()
        
        res.status(201).send({ 
            success: true,
            student
        })
    }catch(e){
        console.log(e)
        res.status(500).send(e)
    }
})

module.exports = router