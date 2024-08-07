import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddHabitForm.css';

const AddHabitForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    frequency: 'daily',
    startDate: '',
    reminders: false,
    goal: '',
    category: '',
    priority: 'medium'
  });
  const [habits, setHabits] = useState([]);
  const navigate = useNavigate();

  const { name, description, frequency, startDate, reminders, goal, category, priority } = formData;

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
  const onCheck = e => setFormData({ ...formData, [e.target.name]: e.target.checked });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5000/api/habits', formData, {
        headers: { Authorization: token }
      });
      setHabits([...habits, res.data]);
      setFormData({ name: '', description: '', frequency: 'daily', startDate: '', reminders: false, goal: '', category: '', priority: 'medium' });
      alert('Habit added successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add habit');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <div className="habit-tracker">
      <button onClick={handleLogout}>Log out</button>
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
          <select name="frequency" value={frequency} onChange={onChange} required>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="custom">Custom</option>
          </select>
        </div>
        <div>
          <label>Start Date:</label>
          <input type="date" name="startDate" value={startDate} onChange={onChange} required />
        </div>
        <div>
          <label>Reminders:</label>
          <input type="checkbox" name="reminders" checked={reminders} onChange={onCheck} />
        </div>
        <div>
          <label>Goal:</label>
          <input type="number" name="goal" value={goal} onChange={onChange} />
        </div>
        <div>
          <label>Category:</label>
          <input type="text" name="category" value={category} onChange={onChange} />
        </div>
        <div>
          <label>Priority:</label>
          <select name="priority" value={priority} onChange={onChange} required>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
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
