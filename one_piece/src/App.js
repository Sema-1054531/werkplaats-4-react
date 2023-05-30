import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import AddSurvey from "./components/AddSurvey";
import Surveys from "./components/Surveys";
import AddQuestionToSurvey from "./components/AddQuestionToSurvey";

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = () => {
    axios.post('/api/register', { username, password })
      .then(response => setMessage(response.data.message))
      .catch(error => setMessage('Registration failed'));
  };

  const handleLogin = () => {
    axios.post('/api/login', { username, password })
      .then(response => setMessage(response.data.message))
      .catch(error => setMessage('Login failed'));
  };

  const Login = () => {
    return (
      <div>
        <h2>Login</h2>
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
        <button onClick={handleLogin}>Login</button>
        <p>{message}</p>
      </div>
    );
  };

  const Register = () => {
    return (
      <div>
        <h2>Register</h2>
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
        <button onClick={handleRegister}>Register</button>
        <p>{message}</p>
      </div>
    );
  };

  

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/surveys" element={<Surveys />} />
          <Route path="/surveys/new" element={<AddSurvey />} />
          <Route path="/surveys/:survey_id/add_question" element={<AddQuestionToSurvey />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Andere routes */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;