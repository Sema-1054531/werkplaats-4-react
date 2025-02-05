import React, { useState } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

const AddQuestionForm = () => {
  const [question_text, set_question_text] = useState('');
  const [question_type, set_question_type] = useState('');
  const [is_active, set_is_active] = useState('');
  const [message, setMessage] = useState('');

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/questions', {
        question_text,
        question_type,
        is_active
      });

      // Succesvol aangemaakt
      setMessage('Vraag is toegevoegd');
      console.log('Question added:', response.data);
    }
      catch (error) {
      // fout bij het maken van question
      setMessage('Er ging iets fout bij het toevoegen van een nieuwe vraag');
      console.error('Error adding question:', error);
    }
  };

  return (
      <form onSubmit={handleQuestionSubmit} className="ny-4">
        <div className="row">
          <div className="col">
            <div className="form-group">
              <label htmlFor="question_text">Vraag:</label>
              <input
                type="text"
                id="question_text"
                className="form-control"
                value={question_text}
                onChange={(e) => set_question_text(e.target.value)}
              />
            </div>
            <div className="form-group" style={{ paddingTop: '20px' }}>
              <label>Actief</label>
              <div className="form-check">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id="is_active"
                    checked={is_active === 1}
                    onChange={(e) => set_is_active(e.target.checked ? 1 : 0)}
                    value={is_active === 1 ? 1 : 0}
                />
                <label className="form-check-label" htmlFor="is_active">Ja</label>
              </div>
              <div className="form-check">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id="is_not_active"
                    checked={is_active === 0}
                    onChange={(e) => set_is_active(e.target.checked ? 0 : 1)}
                    value={is_active === 0 ? 0 : 1}
                />
                <label className="form-check-label" htmlFor="is_not_active">Nee</label>
              </div>
            </div>
            <div className="row">
              <div className="col">

              </div>
            </div>
            <div className="form-group">
              <label>Soort vraag</label>
              <div className="form-check">
                <input
                    type="radio"
                    className="form-check-input"
                    id="open_vraag"
                    checked={question_type === "openvraag"}
                    onChange={(e) => set_question_type("openvraag")}
                    value="openvraag"
                />
                <label className="form-check-label" htmlFor="open_vraag">Open vraag</label>
              </div>
              <div className="form-check">
                <input
                    type="radio"
                    className="form-check-input"
                    id="multiple_choice"
                    checked={question_type === "meerkeuzevraag"}
                    onChange={(e) => set_question_type("meerkeuzevraag")}
                    value="meerkeuzevraag"
                />
                <label className="form-check-label" htmlFor="multiple_choice">Meerkeuzevraag</label>
              </div>
            </div>
            <div style={{ paddingTop: '100px' }}>
              <button type="submit" className="btn btn-primary mt-3">Vraag toevoegen</button>
              <Link className="btn btn-secondary mt-3" to={"/questions"}>Terug</Link>
              {message && <p>{message}</p>}
            </div>
          </div>
          <div className="col">

          </div>
        </div>
      </form>
);
};

export default AddQuestionForm;