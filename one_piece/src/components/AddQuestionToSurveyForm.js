import React, { useEffect, useState } from "react";
import {Link, useLocation} from "react-router-dom";
import axios from "axios";

const AddQuestionToSurveyForm = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const survey_title = searchParams.get("title");

  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  // Get questions
  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/questions");
      setQuestions(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddQuestion = () => {
    setSelectedQuestions([...selectedQuestions, ""]);
  };

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...selectedQuestions];
    updatedQuestions[index] = value;
    setSelectedQuestions(updatedQuestions);
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = [...selectedQuestions];
    updatedQuestions.splice(index, 1);
    setSelectedQuestions(updatedQuestions);
  };

  const handleSaveSurvey = async () => {
    try {
      // Save selectedQuestions to the database
      console.log("Vragen opgeslagen:", selectedQuestions);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h4 className="my-4">Voeg vragen toe aan <b>{survey_title}</b></h4>
      {selectedQuestions.map((question, index) => (
        <div key={index} className="d-flex align-items-center mb-3">
          <select
              className="form-select flex-grow-1"
              value={question}
              onChange={(e) => handleQuestionChange(index, e.target.value)}
          >
            <option value="">Selecteer een vraag</option>
            {questions.map((q) => (
              <option key={q.id} value={q.question_text}>
                {q.question_text}
              </option>
            ))}
          </select>
          <button className="btn btn-secondary ms-2" onClick={() => handleRemoveQuestion(index)}>Verwijder</button>
        </div>
      ))}
      <button className="btn btn-primary" onClick={handleAddQuestion}>Voeg nog een vraag toe</button>
      <button className="btn btn-secondary" onClick={handleSaveSurvey}>Opslaan</button>
      <Link to={"/surveys"} className="btn btn-secondary">Ga terug</Link>

    </div>
  );
};

export default AddQuestionToSurveyForm;
