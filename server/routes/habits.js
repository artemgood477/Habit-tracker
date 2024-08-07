const express = require('express');
const router = express.Router();

let habits = [];

router.get('/', (req, res) => {
  const userHabits = habits.filter(habit => habit.userId === req.user.userId);
  res.json(userHabits);
});

router.post('/', (req, res) => {
  const habit = { ...req.body, userId: req.user.userId };
  habits.push(habit);
  res.status(201).json(habit);
});

module.exports = router;
