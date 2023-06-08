import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminAnswer = () => {
  const { survey_id, question_id } = useParams();

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
  );
};

export default AdminAnswer;
