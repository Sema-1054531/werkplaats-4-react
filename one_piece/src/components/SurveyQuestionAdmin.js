import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

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
      <h4>Survey Questions for Survey ID: {survey_id}</h4>
      <ul className="list-group">
        {surveyQuestions.map((survey_question) => (
          <li key={survey_question.question_id} className="list-group-item">
            {survey_question.question_text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SurveyQuestionAdmin;
