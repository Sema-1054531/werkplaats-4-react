import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllQuestions = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/questions');
      setQuestions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Vragen</th>
            <th>Soort Vraag</th>
            <th>Is Actief</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {questions.map(question => (
            <tr key={question.question_id}>
              <td>{question.question_text}</td>
              <td>{question.question_type}</td>
              <td>{question.is_active ? "Ja" : "Nee"}</td>
              <td>
                <Link to={`/questions/wijzig/${question.question_id}`}>Wijzig</Link>

              </td>
              <td>
                <Link to="#">Delete</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllQuestions;
