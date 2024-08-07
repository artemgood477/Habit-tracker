const express = require('express');
const router = express.Router();

let habits = [];

router.get('/', (req, res) => {
  res.json(habits.filter(habit => habit.userId === req.user.userId));
});

router.post('/', (req, res) => {
  const habit = { ...req.body, id: habits.length + 1, userId: req.user.userId, completedDays: [] };
  habit.remainingDays = habit.goal; // Initialize remaining days to the goal
  habits.push(habit);
  res.status(201).json(habit);
});

router.put('/:id/complete', (req, res) => {
  const habit = habits.find(h => h.id === parseInt(req.params.id) && h.userId === req.user.userId);
  if (habit) {
    const today = new Date().toISOString().split('T')[0];
    if (!habit.completedDays.includes(today)) {
      habit.completedDays.push(today);
      habit.remainingDays = habit.goal - habit.completedDays.length; // Update remaining days
    }
    res.json(habit);
  } else {
    res.status(404).json({ message: 'Habit not found' });
  }
});

module.exports = router;
