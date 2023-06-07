import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams} from "react-router-dom";
import questions from "./Questions";

const SurveyQuestionAdmin = () => {
    const { survey_id } = useParams();

    const [surveyQuestions, setSurveyQuestions] = useState([]);

  useEffect(() => {
    fetchSurveyQuestions();
  }, []);

  const fetchSurveyQuestions = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/surveys/${survey_id}/survey_questions`);
      setSurveyQuestions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h4>Survey Questions for Survey ID: {survey_id}</h4>
      <ul>
        {surveyQuestions.map((question) => (
            <li key={question.question_id}>{question.question_text}</li>
        ))}
      </ul>
    </div>
  );
};

export default SurveyQuestionAdmin;
