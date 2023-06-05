import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const QuestionSettings = () => {
  const [question, setQuestion] = useState(null);
  const { question_id } = useParams();

  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/questions/${question_id}`);
      setQuestion(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleIsActiveChange = async (e) => {
    const { value } = e.target;
    try {
      await axios.patch(`http://localhost:5000/api/questions/${question_id}`, { is_active: value });
      setQuestion((prevQuestion) => ({
        ...prevQuestion,
        is_active: value,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  if (!question) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Wijzig Vraag</h2>
      <p>Vraag: {question.question_text}</p>
      <p>Soort Vraag: {question.question_type}</p>
      <p>Is Actief: {question.is_active ? "Ja" : "Nee"}</p>

      <label>
        Is Actief:
        <select value={question.is_active} onChange={handleIsActiveChange}>
          <option value={true}>Ja</option>
          <option value={false}>Nee</option>
        </select>
      </label>
    </div>
  );
};

export default QuestionSettings;
