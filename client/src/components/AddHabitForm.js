import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddHabitForm.css';
import ProgressBar from './ProgressBar';

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
  const [progress, setProgress] = useState(0);
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
        updateProgress(res.data);
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
      updateProgress([...habits, res.data]);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add habit');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const markAsDone = async (habitId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(`http://localhost:5000/api/habits/${habitId}/complete`, {}, {
        headers: { Authorization: token }
      });
      const updatedHabits = habits.map(habit => {
        if (habit.id === habitId) {
          return res.data;
        }
        return habit;
      });
      setHabits(updatedHabits);
      updateProgress(updatedHabits);
    } catch (error) {
      console.error('Error marking habit as done:', error);
    }
  };

  const updateProgress = (habits) => {
    const today = new Date().toISOString().split('T')[0];
    const completedToday = habits.filter(habit => habit.completedDays.includes(today)).length;
    setProgress((completedToday / habits.length) * 100);
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
        <ProgressBar progress={progress} />
        <ul>
          {habits.map(habit => {
            const remainingDays = habit.goal - habit.completedDays.length;
            return (
              <li key={habit.id}>
                <strong>{habit.name}</strong>: {habit.description} ({habit.frequency})
                <p>Start Date: {habit.startDate}</p>
                <p>Reminders: {habit.reminders ? 'Yes' : 'No'}</p>
                <p>Goal: {habit.goal}</p>
                <p>Category: {habit.category}</p>
                <p>Priority: {habit.priority}</p>
                <p>Remaining Days: {remainingDays}</p>
                <button onClick={() => markAsDone(habit.id)}>Mark as Done</button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default AddHabitForm;
