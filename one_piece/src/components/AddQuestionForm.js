import React, { useState } from 'react';
import axios from 'axios';

const AddQuestionForm = () => {
  const [question, setQuestion] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/questions', {
        question,
      });

      // Reset form field after successful submission
      setQuestion('');

      console.log('Question added:', response.data);
    } catch (error) {
      console.error('Error adding question:', error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="question">Question:</label>
              <input
                type="text"
                id="question"
                className="form-control"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">Add Question</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddQuestionForm;
