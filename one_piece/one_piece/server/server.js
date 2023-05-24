import React, { useState } from 'react';
import axios from 'axios';

const AddQuestionForm = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/questions', {
        question,
        answer,
      });

      // Reset form fields after successful submission
      setQuestion('');
      setAnswer('');

      console.log('Question added:', response.data);
    } catch (error) {
      console.error('Error adding question:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="question">Question:</label>
        <input
          type="text"
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="answer">Answer:</label>
        <input
          type="text"
          id="answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
      </div>
      <button type="submit">Add Question</button>
    </form>
  );
};

export default AddQuestionForm;
