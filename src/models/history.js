const mongoose = require('mongoose')

const historySchema = new mongoose.Schema({
   title: {
        type: String,
        required: true,
        trim: true
    },
    body: {
        type: String,
        required: true,
        trim: true
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        trim: true
    },
}, {
    timestamps: true
})

const History = mongoose.model('History', historySchema)

module.exports = History