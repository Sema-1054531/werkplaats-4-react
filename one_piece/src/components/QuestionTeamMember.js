import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

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
      <h4>Survey Questions for Survey ID: {survey_id}</h4>
      <ul>
        {surveyQuestions.map((survey_question) => (
          <li key={survey_question.question_id}>
            {survey_question.question_text}
            <button onClick={() => handleAnswerClick(survey_question.question_id)}>Beantwoorden</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionTeamMember;