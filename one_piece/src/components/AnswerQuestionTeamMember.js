import React, { useState } from 'react';
import axios from 'axios';

const AnswerQuestionTeamMember = () => {
    const [answer_text,setAnswer_text]= useState('');
    const [user_id, setUser_id]= useState('');
    const [message,setMessage]= useState('');

    const handleAnswerSubmit = async (e) => {
        e.preventDefault();


        try {
            const response = await axios.post('http://localhost:5000/api/answer', {
                answer_text,
                user_id
               
            });

            // Succesvol aangemaakt
            setMessage('Vraag is beantwoord');
            console.log(response.data);
        } catch (error) {
            // Fout bij het maken van de survey
            setMessage('Er ging iets mis met het beantwoorden van de vraag')
            console.error(error);
        }
    };

  return (
    <div>
      <h2>Beantwoord de vraag</h2>
      <textarea rows={5} value={answer_text} onChange={e => setAnswer_text(e.target.value)} />
      <input type="text" value={user_id} onChange={e => setUser_id(e.target.value)} />
      <button onClick={handleAnswerSubmit}>Beantwoorden</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AnswerQuestionTeamMember;