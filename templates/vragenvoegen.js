import { useState } from 'react';
import axios from 'axios';

function AddQuestionForm() {
  const [questionText, setQuestionText] = useState('');
  const [questionType, setQuestionType] = useState('');
  const [isActive, setIsActive] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/add_question', {
        question_text: questionText,
        question_type: questionType,
        is_active: isActive
      });
      setQuestionText('');
      setQuestionType('');
      setIsActive('');
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>Vragen Toevoegen</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="question_text">Vraag</label>
          <input type="text" className="form-control" id="question_text" name="question_text" required value={questionText} onChange={(event) => setQuestionText(event.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="question_type">Type Vraag</label>
          <input type="text" className="form-control" id="question_type" name="question_type" required value={questionType} onChange={(event) => setQuestionType(event.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="is_active">Actief</label>
          <input type="text" className="form-control" id="is_active" name="is_active" required value={isActive} onChange={(event) => setIsActive(event.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Toevoegen</button>
      </form>
    </div>
  );
}
