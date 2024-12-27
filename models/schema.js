const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    roll_no: { type: String, required: true, unique: true },
    dept: { type: String },
    sgpa: { type: Number, min: 0, max: 10 },
    cgpa: { type: Number, min: 0, max: 10 },
});

module.exports = mongoose.model('Student', studentSchema);
