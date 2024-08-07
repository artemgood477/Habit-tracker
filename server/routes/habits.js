const express = require('express');
const router = express.Router();

let habits = [];

router.get('/', (req, res) => {
  res.json(habits);
});

router.post('/', (req, res) => {
  const habit = req.body;
  habits.push(habit);
  res.status(201).json(habit);
});

module.exports = router;
