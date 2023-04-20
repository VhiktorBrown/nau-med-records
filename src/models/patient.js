const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        trim: true
    },
    Appearance: {
        type: String,
        trim: true
    },
    pH: {
        type: String,
        trim: true
    },
    Protein: {
        type: String,
        trim: true,
        default: 'null'
    },
    Glucose: {
        type: String,
        trim: true,
        default: 'null'
    },
    Ketones: {
        type: String,
        trim: true,
        default: 'null'
    },
    Bilirubin: {
        type: String,
        trim: true,
        default: 'null'
    },
    Urobilinogen: {
        type: String,
        trim: true,
        default: 'null'
    },
    BloodLysed: {
        type: String,
        trim: true,
        default: 'null'
    },
    WBCs: {
        type: String,
        trim: true,
        default: 'Couldn\'t fathom anything'
    },
    RBCs: {
        type: String,
        trim: true,
        default: 'null'
    },
    Casts: {
        type: String,
        trim: true,
        default: 'null'
    },
    TVaginalis: {
        type: String,
        trim: true,
        default: 'null'
    },
    YeastCells: {
        type: String,
        trim: true,
    },
    Hb: {
        type: String,
        trim: true,
    },
    HbGenotype: {
        type: String,
        trim: true,
    },
    BloodGroup: {
        type: String,
        trim: true,
    },
    gDl: {
        type: String,
        trim: true,
    },
    RhD: {
        type: String,
        trim: true,
    },
    vDRL: {
        type: String,
        trim: true,
    },
    HBsAg: {
        type: String,
        trim: true,
    },
    history: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'History'
        },
        title: {
            type: String,
            trim: true
        },
        body: {
            type: String,
            trim: true
        }
    }]
}, {
    timestamps: true
})

const Patient = mongoose.model('Patient', patientSchema)

module.exports = Patient