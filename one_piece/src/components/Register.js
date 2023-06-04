import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [is_admin, set_is_admin] = useState('0') // default value of 0 (is not admin)
  const [message, setMessage ] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Controleer of de invoervelden leeg zijn
    if (email.trim() === '' || password.trim() === '') {
      setMessage('Vul alstublieft alle velden in.');
      return;
    }

    try {
      // make new user through api
      const response = await axios.post('http://localhost:5000/api/user', {
        email,
        password,
        is_admin
      });

      // Succesvol aangemaakt
      setMessage('Je nieuwe account is aangemaakt. Je kan nu inloggen.')
      console.log(response.data);
    } catch (error) {
      // Fout bij het maken van de gebruiker
      setMessage('Er ging iets mis met het registreren.')
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h2>Registratie</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Wachtwoord:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <input
            type="hidden"
            value={is_admin}
            onChange={(e) => set_is_admin(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Registreer</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;