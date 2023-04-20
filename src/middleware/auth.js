const jwt = require('jsonwebtoken')
const Staff = require('../models/staff')

const auth = async (req, res, next) => {
   try{
       const token = req.header('Authorization').replace('Bearer ', '')
       //TODO Update JWT_SECRET
       const decoded = jwt.verify(token, process.env.JWT_SECRET)
       const staff = await Staff.findOne({ _id: decoded._id, 'tokens.token' : token})

       if(!staff){
           throw new Error()
       }
       req.staff = staff
       req.token = token
       next()
   }catch(e) {
       console.log(e)
       res.status(401).send({error: 'You don\'t have permission to make this request.'})
   }
}

module.exports = auth