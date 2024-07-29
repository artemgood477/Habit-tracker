const express = require('express');
const router = express.Router();

let habits = []; // In-memory data store

// Create a new habit
router.post('/', (req, res) => {
  const { name, description, frequency } = req.body;
  if (!name || !description || !frequency) {
    return res.status(400).send('All fields are required');
  }

  const newHabit = {
    id: habits.length + 1, // Simple ID generation
    name,
    description,
    frequency
  };

  habits.push(newHabit);
  console.log('Habit added:', newHabit); // Log the added habit
  res.json(newHabit); // Send the newly created habit as a JSON response
});

// Get all habits
router.get('/', (req, res) => {
  res.json(habits);
});

module.exports = router;
