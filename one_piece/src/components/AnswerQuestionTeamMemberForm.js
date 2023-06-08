import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';

const AnswerQuestionTeamMember = () => {
  const [answer_text, setAnswer_text] = useState('');
  const [user_id, setUser_id] = useState('');
  const [message, setMessage] = useState('');

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const question_text = searchParams.get('question_text');
  const question_type = searchParams.get('question_type');

  const { question_id  } = useParams();

    const handleAnswerSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/answers', {
                question_id,
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

    const renderAnswerInput = () => {
        if (question_type === 'openvraag') {
            return (
                <textarea
                  rows={5}
                  value={answer_text}
                  onChange={(e) => setAnswer_text(e.target.value)}
                  placeholder="Type je antwoord in..."
                />
            );
        } else if (question_type === 'meerkeuzevraag') {
            return (
                <div>
                    <p>beoordeel je ervaring op een schaal van 1 tot 10, waarbij 1 staat voor zeer ontevreden en 10 voor extreem tevreden.</p>
                    <div className="d-flex">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((option) => (
                            <div key={option} className="form-check">
                                <input
                                    type="radio"
                                    id={`option-${option}`}
                                    name="answer-option"
                                    value={option}
                                    checked={Number(answer_text) === option}
                                    onChange={(e) => setAnswer_text(e.target.value)}
                                />
                                <label htmlFor={`option-${option}`}>{option}</label>
                            </div>
                        ))}
                    </div>
                </div>
            );
        } else {
            return null;
        }
    };


  return (
    <div className="container">
        <form onSubmit={handleAnswerSubmit} className="my-4">
            <h4>{question_text}</h4>
            <div className="row">
                {renderAnswerInput()}
                {/*TIJDELIJK!!*/}
                <input
                    type="text"
                    value={user_id}
                    onChange={e => setUser_id(e.target.value)}
                    placeholder="user id"
                />
                <input
                    type="text"
                    value={question_id}
                />
            </div>
            <div className="my-4">
                <button type="submit" className="btn btn-primary">Beantwoorden</button>
                {message && <p>{message}</p>}
            </div>
        </form>
    </div>
  );
};

export default AnswerQuestionTeamMember;