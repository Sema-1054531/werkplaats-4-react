import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container">
                <Link className="navbar-brand" to="/surveys">Enquêteoverzicht</Link>
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

const SurveyQuestionAdmin = () => {
  const { survey_id } = useParams();

  const [surveyQuestions, setSurveyQuestions] = useState([]);

  useEffect(() => {
    fetchSurveyQuestions();
  }, []);

  const fetchSurveyQuestions = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/surveys/${survey_id}/survey_questions`
      );
      const questions = response.data.map(async (survey_question) => {
        const questionResponse = await axios.get(
          `http://localhost:5000/api/questions/${survey_question.question_id}`
        );
        return { ...survey_question, question_text: questionResponse.data.question_text };
      });
      const resolvedQuestions = await Promise.all(questions);
      setSurveyQuestions(resolvedQuestions);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Header/>
      <div className="container">
      <h4>Survey Questions for Survey ID: {survey_id}</h4>
      <ul className="list-group">
        {surveyQuestions.map((survey_question) => (
          <li key={survey_question.question_id} className="list-group-item d-flex justify-content-between align-items-center">
            {survey_question.question_text}
            <Link to={`/admin/surveys/${survey_id}/survey_questions/answers/${survey_question.question_id}`} className="btn btn-primary">Bekijk antwoorden</Link>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default SurveyQuestionAdmin;