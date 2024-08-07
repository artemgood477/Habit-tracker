import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AddHabitForm from './components/AddHabitForm';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/habits" element={<AddHabitForm />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
