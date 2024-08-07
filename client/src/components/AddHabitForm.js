import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddHabitForm.css';

const AddHabitForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    frequency: ''
  });
  const [habits, setHabits] = useState([]);

  const { name, description, frequency } = formData;

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/habits', {
          headers: { Authorization: token }
        });
        setHabits(res.data);
      } catch (error) {
        console.error('Error fetching habits:', error);
      }
    };

    fetchHabits();
  }, []);

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5000/api/habits', formData, {
        headers: { Authorization: token }
      });
      setHabits([...habits, res.data]);
      setFormData({ name: '', description: '', frequency: '' });
      alert('Habit added successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add habit');
    }
  };

  return (
    <div className="habit-tracker">
      <form onSubmit={onSubmit} className="habit-form">
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={name} onChange={onChange} required />
        </div>
        <div>
          <label>Description:</label>
          <input type="text" name="description" value={description} onChange={onChange} required />
        </div>
        <div>
          <label>Frequency:</label>
          <input type="text" name="frequency" value={frequency} onChange={onChange} required />
        </div>
        <button type="submit">Add Habit</button>
      </form>
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
    </div>
  );
};

export default AddHabitForm;
