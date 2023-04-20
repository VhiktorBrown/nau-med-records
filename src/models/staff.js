const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const staffSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    staffId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    doctor: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a postive number')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }] },
    {
    timestamps: true
})

staffSchema.methods.toJSON = function() {
    const staff = this
    const staffObject = staff.toObject()

    delete staffObject.password
    delete staffObject.tokens
    
    return staffObject
}

staffSchema.statics.findByCredentials = async (staffId, password) => {
    const staff = await Staff.findOne({ staffId })

    if(!staff){
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, staff.password)

    if(!isMatch){
        throw new Error('Unable to login')
    }
    return staff
}

staffSchema.methods.generateAuthToken = async function() {
    const staff = this
    //TODO Update JWT SECRET before releasing for Local Test
    const token = jwt.sign({ _id : staff._id.toString()}, process.env.JWT_SECRET)
    
    staff.tokens = staff.tokens.concat({ token })
    console.log(staff)
    await staff.save()
    return token
}

staffSchema.pre('save', async function (next) {
    const staff = this

    if (staff.isModified('password')) {
        staff.password = await bcrypt.hash(staff.password, 8)
    }

    next()
})

const Staff = mongoose.model('Staff', staffSchema)

module.exports = Staff