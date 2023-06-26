import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container">
                <Link className="navbar-brand" to="/admin">Enquêttes</Link>
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

const AdminAnswer = () => {
  const {survey_id, question_id} = useParams();

  const [surveyQuestions, setSurveyQuestions] = useState([]);

  useEffect(() => {
    fetchSurveyQuestions();
  }, []);

  const fetchSurveyQuestions = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/answers/${survey_id}/${question_id}`
      );
      let answers = [];

      if (Array.isArray(response.data)) {
        answers = response.data;
      } else if (typeof response.data === "object") {
        answers = [response.data];
      }

      const resolvedQuestions = await Promise.all(
        answers.map(async (answers) => {
          const questionResponse = await axios.get(
            `http://localhost:5000/api/answers/${answers.question_id}`
          );
          return {
            ...answers,
            answer_text: questionResponse.data.answer_text,
            user_id: answers.user_id,
          };
        })
      );
      setSurveyQuestions(resolvedQuestions);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Header />
      <div className="container">
      <h4>Answers for question ID: {question_id}</h4>
      <ul className="list-group">
        {surveyQuestions.map((answers) => (
          <li
            key={answers.answer_id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <span className="fw-bold">User ID:</span> {answers.user_id}
            </div>
            <div>
              <span className="fw-bold">Answer Text:</span> {answers.answer_text}
            </div>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default AdminAnswer;
