import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HabitList.css'; // Create and import a CSS file for styling

const HabitList = () => {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/habits');
        setHabits(res.data);
      } catch (error) {
        console.error('Error fetching habits:', error);
      }
    };

    fetchHabits();
  }, []);

  return (
    <div className="habit-list">
      <h2>Added Habits</h2>
      <ul>
        {habits.map(habit => (
          <li key={habit.id}>
            <strong>{habit.name}</strong>: {habit.description} ({habit.frequency})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HabitList;
