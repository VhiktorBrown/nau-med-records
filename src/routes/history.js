const express = require('express')
const auth = require('../middleware/auth')
const router = new express.Router()
const History = require('../models/history')
const patient = require('../models/patient')

router.post('/addHistory', auth, async (req, res) => {
    try{
        const history = new History(req.body)

        //update the patient details by appending a new history
        await Patient.findOneAndUpdate(
            { student: req.student._id },
            { $addToSet: { history: history} }
        
        )

        await history.save()
        
        res.status(201).send({ 
            success: true,
            history
        })
    }catch(e){
        console.log(e)
        res.status(500).send(e)
    }
})

module.exports = router