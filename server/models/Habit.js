const mongoose = require('mongoose');

const HabitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  frequency: {
    type: String,
    required: true
  },
  progress: {
    type: [Date],
    default: []
  }
});

module.exports = mongoose.model('Habit', HabitSchema);
