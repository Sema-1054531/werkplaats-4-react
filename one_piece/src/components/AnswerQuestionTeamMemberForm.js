import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';

const AnswerQuestionTeamMember = () => {
  const [answer_text, setAnswer_text] = useState('');
  const [user_id, setUser_id] = useState('');
  const [is_anonymous, setIs_anonymous] = useState(false);
  const [message, setMessage] = useState('');
  const [isAnswerEmpty, setIsAnswerEmpty] = useState(false);


  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const question_text = searchParams.get('question_text');
  const question_type = searchParams.get('question_type');

  const { question_id  } = useParams();
  const { survey_id  } = useParams();

  useEffect(() => {
      // GET is_anonymous from survey
      const fetchSurveyAnonymity = async () => {
          try {
              const response = await axios.get(`http://localhost:5000/api/surveys/${survey_id}`);
              setIs_anonymous(response.data.is_anonymous);
          } catch (error) {
              console.error(error);
          }
      };

      fetchSurveyAnonymity();
  }, [survey_id]);

    const handleAnswerSubmit = async (e) => {
        e.preventDefault();

        if (answer_text.trim() === '') {
            setIsAnswerEmpty(true);
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/answers', {
                survey_id,
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
                  onChange={(e) => {
                      setAnswer_text(e.target.value);
                      setIsAnswerEmpty(false);
                  }}
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
                                    onChange={(e) => {
                                        setAnswer_text(e.target.value)
                                        setIsAnswerEmpty(false);
                                    }}
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

    const renderAnonymous = () => {
        if (is_anonymous === 1){
            return <p>Deze enquete is anoniem</p>
        } else if (is_anonymous === 0){
            return (
                <input
                    type="text" // tijdelijk niet hidden!!
                    value={user_id}
                    onChange={(e) => setUser_id(e.target.value)}
                    placeholder="user_id"
                />
            );
        } else {
            return null;
        }
    }


  return (
    <div className="container">
        <form onSubmit={handleAnswerSubmit} className="my-4">
            {renderAnonymous()}
            <h4>{question_text}</h4>
            <div className="row">
                {renderAnswerInput()}
                <input
                    type="hidden"
                    value={question_id}
                />
                <input
                    type="hidden"
                    value={survey_id}
                />
            </div>
            <div className="my-4">
                <button type="submit" className="btn btn-primary">Beantwoorden</button>
                {message && <p>{message}</p>}
                {isAnswerEmpty && <p>Vul eerst nog een antwoord in.</p>}
            </div>
        </form>
    </div>
  );
};

export default AnswerQuestionTeamMember;