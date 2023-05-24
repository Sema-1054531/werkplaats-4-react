import React, { useEffect, useState } from 'react';

function FeedbackForm() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Fetch vragen van de backend API
    fetch('/api/questions')
      .then(response => response.json())
      .then(data => setQuestions(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Feedback Formulier</h1>
      {questions.map(question => (
        <div key={question.id}>
          <h3>{question.title}</h3>
          <p>{question.description}</p>
          <input type="text" placeholder="Antwoord" />
        </div>
      ))}
      <button type="submit">Verzenden</button>
    </div>
  );
}

export default FeedbackForm;
