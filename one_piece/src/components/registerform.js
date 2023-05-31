import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [is_team_member, set_is_team_member] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Maak een nieuwe gebruiker aan via de API
      const response = await axios.post('http://localhost:5000/user/new', {
        email,
        password,
        is_team_member
      });

      // Succesvol aangemaakt
      console.log(response.data);
    } catch (error) {
      // Fout bij het maken van de gebruiker
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Registratie</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Wachtwoord:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Is team member:</label>
          <input
            type="hidden"
            value={is_team_member=== 1}
            onChange={(e) => is_team_member(e.target.value)}
          />
        </div>
        <button type="submit">Registreer</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
