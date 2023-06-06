import React, { useState } from 'react';
import axios from 'axios';

const AddQuestionForm = () => {
  const [question_text, set_question_text] = useState('');
  const [question_type, set_question_type] = useState('');
  const [is_active, set_is_active] = useState('');
  const [message, setMessage] = useState('');

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/questions/new', {
        question_text,
        question_type,
        is_active
      });

      // Succesvol aangemaakt
      setMessage('Vraag is toegevoegd');
      console.log('Question added:', response.data);
    } catch (error) {
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
            <div className="form-group">
              <label>Soort vraag</label>
              <div className="form-check">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id="open_vraag"
                    checked={question_type=== 1}
                    onChange={(e) => set_question_type(e.target.checked ? 1 : 0)}
                    value={question_type === 1 ? 1 : 0}
                />
                <label className="form-check-label" htmlFor="open_vraag">Open vraag</label>
              </div>
              <div className="form-check">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id="multiple_choice"
                    checked={question_type === 0}
                    onChange={(e) => set_question_type(e.target.checked ? 0 : 1)}
                    value={question_type === 0 ? 0 : 1}
                />
                <label className="form-check-label" htmlFor="multiple_choice">Multiple choice</label>
              </div>
            </div>
            <div style={{ paddingTop: '100px' }}>
              <button type="submit" className="btn btn-primary mt-3">Add Question</button>
              {message && <p>{message}</p>}
            </div>
          </div>
        </div>
      </form>
);
};

export default AddQuestionForm;