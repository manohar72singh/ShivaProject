const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name: {
        type: 'String',
        required: true,
    },
    username: {
        type: 'String',
        required: true,
        unique: true
    },
    email: {
        type: 'String',
        required: true,
        unique: true
    },
    phoneNumber: {
        type: "String",
        required: "true",
        unique: true
    },
    designation: {
        type: 'String',
        required: true,
    },
    pinecode: {
        type: 'String',
        required: true,
    },
    state: {
        type: 'String',
        required: true,
    },
    city: {
        type: 'String',
        required: true,
    },
    district: {
        type: 'String',
        required: true,
    },
    password: {
        type: 'String',
        required: true,
    }
}, { versionKey: false })
const userModel = mongoose.model('Users', userSchema);
module.exports = userModel;