import React, { useState } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

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
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="col-lg-6">
          <form onSubmit={handleSubmit} className="container">
            <div className="card">
              <div className="card-header">
                <h2>Meld je aan</h2>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label>E-mail <span className="errmsg">*</span></label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label>Wachtwoord <span className="errmsg">*</span></label>
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
              </div>
              <div className="card-footer">
                <p>Heb je al een account? <Link to={'/'}>Log dan hier in</Link></p>
                <button type="submit" className="btn btn-primary">Registreer</button>
                {message && <p>{message}</p>}
              </div>
            </div>
          </form>
        </div>
      </div>
  );
};

export default Register;