import React, { useEffect, useState } from "react";
import axios from "axios";
import {useParams, useNavigate, Link} from "react-router-dom";
import questions from "./Questions";

const QuestionTeamMember = () => {
  const { survey_id } = useParams();
  const navigate = useNavigate();

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

  const handleAnswerClick = (question_id) => {
    navigate(`/surveys/${survey_id}/survey_questions/answer/${question_id}`);
  };

  return (
    <div>
      <table className="table table-striped">
        <thead className="thead-dark">
        <tr>
          <th>Vragen</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        {surveyQuestions.map((survey_question) => (
        <tr key={survey_question.question_id}>
          <td>{survey_question.question_text}</td>
          <td><Link className="btn btn-primary" to={`/surveys/${survey_id}/survey_questions/answer/${survey_question.question_id}?question_text=${encodeURIComponent(survey_question.question_text)}`}>Beantwoorden</Link></td>
        </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionTeamMember;