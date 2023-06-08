import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const AddQuestionToSurveyForm = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const survey_id = searchParams.get("survey_id")
  const survey_title = searchParams.get("title");

  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [message, setMessage] = useState("");

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
    setSelectedQuestions([...selectedQuestions, null]);
  };

  const handleQuestionChange = (index, question_id) => {
    const updatedQuestions = [...selectedQuestions];
    updatedQuestions[index] = question_id;
    setSelectedQuestions(updatedQuestions);
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = [...selectedQuestions];
    updatedQuestions.splice(index, 1);
    setSelectedQuestions(updatedQuestions);
  };

  const handleSaveSurvey = async () => {
    try {
      // filter null values
      const filteredQuestions = selectedQuestions.filter((question_id) => question_id !== null);

      // check if survey is not empty
      if (filteredQuestions.length === 0) {
        setMessage("Voeg ten minste 1 vraag voordat je de enquete opslaat.");
        return
      }

      // array of survey_question object
      const surveyQuestions = filteredQuestions.map((question_id) => ({
        survey_id: survey_id,
        question_id: question_id,
      }));

      // save survey questions to database
      const response = await axios.post("http://localhost:5000/api/survey_questions", surveyQuestions);

      console.log("Vragen opgeslagen: ", response.data);
      setMessage("Enquête succesvol opgeslagen");
    } catch (error) {
      console.error(error);
      setMessage("Er is een fout opgetreden bij het opslaan van de enquête");
    }
  };

  return (
    <div className="container">
      <h4 className="my-4">Voeg vragen toe aan <b>{survey_title}</b></h4>
      <input
          type="hidden"
          value={survey_id}
      />
      {selectedQuestions.map((question_id, index) => (
        <div key={index} className="d-flex align-items-center mb-3">
          <select
            className="form-select flex-grow-1"
            value={question_id}
            onChange={(e) => handleQuestionChange(index, e.target.value)}
          >
            <option value="">Selecteer een vraag</option>
            {questions.map((q) => (
              <option key={q.question_id} value={q.question_id}>
                {q.question_text}
              </option>
            ))}
          </select>
          <button className="btn btn-secondary ms-2" onClick={() => handleRemoveQuestion(index)}>Verwijder</button>
        </div>
      ))}
      <button className="btn btn-secondary" onClick={handleAddQuestion}>Voeg nog een vraag toe</button>
      <button className="btn btn-primary" onClick={handleSaveSurvey}>Opslaan</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddQuestionToSurveyForm;