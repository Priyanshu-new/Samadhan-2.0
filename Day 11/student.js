const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rollNumber: {
    type: String,
    required: true
  },
  major: {
    type: String
  },
  joinDate: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Student', studentSchema)
