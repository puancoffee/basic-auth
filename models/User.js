const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema ({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'mitra', 'admin']
    }
})

module.exports = mongoose.model('user', userSchema)