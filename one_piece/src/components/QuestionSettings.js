import React, { useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";

const QuestionSettings = () => {
  const { question_id } = useParams(); // Get the question_id from the URL
  const [is_active, setIs_active] = useState();
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchQuestion();
  }, [question_id]);

  const fetchQuestion = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/questions/${question_id}`);
      const { is_active } = response.data;
      setIs_active(is_active);
    } catch (error) {
      console.error(error);
      setMessage('Er ging iets fout bij het ophalen van de vraag');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/api/questions/change/${question_id}`, { is_active });
      setMessage('Vraag is succesvol bijgewerkt');
    } catch (error) {
      console.error(error);
      setMessage('Er ging iets fout bij het bijwerken van de vraag');
    }
  };

  const Header = () => {
    return (
        <header>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container">
                <Link className="navbar-brand" to="/surveys">Enquêteoverzicht</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <Link className="nav-link" to="/surveys/bouw">Bouw enquêttes</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/questions">Bouw vragen</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
        </header>
    );
  };

  return (
    <div>
      <Header />
      <div className="container">
        <h2>Wijzig</h2>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col">
              <p>Wil je deze vraag op actief zetten? </p>
          <select value={is_active} onChange={(e) => setIs_active(e.target.value)}>
            <option value={1}>Ja</option>
            <option value={0}>Nee</option>
          </select>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <br/>
              <button type="submit" className="btn btn-primary">Sla op</button>
              {message && <p>{message}</p>}
            </div>
          </div>
        </form>
      </div>
      </div>
  );
};

export default QuestionSettings;
