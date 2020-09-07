const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
    names: String,
    lastname: String,
    email: {
        type: String,
        lowercase: true
    },
    phone: String,
    address: String,
    school: String,
    grade: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('students', StudentSchema);