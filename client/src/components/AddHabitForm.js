import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddHabitForm.css'; // Create and import a CSS file for styling

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
        const res = await axios.get('http://localhost:5000/api/habits');
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
    console.log('Form submitted:', formData); // Log the form data

    try {
      const res = await axios.post('http://localhost:5000/api/habits', formData);
      console.log('Response:', res.data); // Log the response data

      // Update the habit list
      setHabits([...habits, res.data]);

      // Reset the form
      setFormData({ name: '', description: '', frequency: '' });
      alert('Habit added successfully!');
    } catch (error) {
      console.error('Error:', error); // Log the error
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
        alert(`Failed to add habit: ${error.response.data}`);
      } else if (error.request) {
        console.error('Request data:', error.request);
        alert('Failed to add habit: No response from server');
      } else {
        console.error('Error message:', error.message);
        alert(`Failed to add habit: ${error.message}`);
      }
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
