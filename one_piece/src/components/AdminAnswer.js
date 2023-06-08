import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminAnswer = () => {
  const { answer_id } = useParams();

  const [surveyQuestions, setSurveyQuestions] = useState([]);

  useEffect(() => {
    fetchSurveyQuestions();
  }, []);

  const fetchSurveyQuestions = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/answers/${answer_id}`
      );
      let answers = [];

      if (Array.isArray(response.data)) {
        answers = response.data;
      } else if (typeof response.data === "object") {
        answers = [response.data];
      }

      const resolvedQuestions = await Promise.all(
        answers.map(async (answer) => {
          const questionResponse = await axios.get(
            `http://localhost:5000/api/answers/${answer.answer_id}`
          );
          return {
            ...answer,
            answer_text: questionResponse.data.answer_text,
            user_id: answer.user_id,
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
      <h4>Answers for Answer ID: {answer_id}</h4>
      <ul className="list-group">
        {surveyQuestions.map((answer) => (
          <li
            key={answer.answer_id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <span className="fw-bold">User ID:</span> {answer.user_id}
            </div>
            <div>
              <span className="fw-bold">Answer Text:</span> {answer.answer_text}
            </div>
            <Link
              to={`/answers/${answer.answer_id}`}
              className="btn btn-primary"
            >
              Bekijk antwoorden
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminAnswer;
