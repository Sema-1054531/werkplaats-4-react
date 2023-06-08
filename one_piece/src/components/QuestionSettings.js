import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const QuestionSettings = () => {
  const { question_id } = useParams(); // Get the question_id from the URL
  const [is_active, setIs_active] = useState();
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchQuestion();
  }, [question_id]);

  const fetchQuestion = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/questions/${question_id}`);
      const { is_active } = response.data;
      setIs_active(is_active);
    } catch (error) {
      console.error(error);
      setMessage('Er ging iets fout bij het ophalen van de vraag');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/api/questions/change/${question_id}`, { is_active });
      setMessage('Vraag is succesvol bijgewerkt');
    } catch (error) {
      console.error(error);
      setMessage('Er ging iets fout bij het bijwerken van de vraag');
    }
  };

  return (
    <div>
      <h2>Wijzig</h2>
      <form onSubmit={handleSubmit}>
        <label>Is Actief:</label>
        <select value={is_active} onChange={(e) => setIs_active(e.target.value)}>
          <option value={1}>Ja</option>
          <option value={0}>Nee</option>
        </select>
        <button type="submit" className="btn btn-primary">Sla op</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default QuestionSettings;
