import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const SaveSurvey = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const survey_id = searchParams.get("survey_id");
  const survey_title = searchParams.get("title");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSaveSurvey = async () => {
    const confirmed = window.confirm(
      "Weet je zeker dat je de enquête definitief wil opslaan? Dit kan je niet meer ongedaan maken."
    );

    if (!confirmed) {
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/surveys/${survey_id}`, { is_done: true });
      setMessage("Enquête succesvol opgeslagen.");
      navigate("/surveys");
    } catch (error) {
      console.error(error);
      setMessage("Er is een fout opgetreden bij het opslaan van de enquête.");
    }
  };

  return (
    <div className="container">
      <h4 className="my-4">Enquête opslaan: {survey_title}</h4>
      <p>{message}</p>
      <button className="btn btn-primary" onClick={handleSaveSurvey}>
        Ja, sla op
      </button>
    </div>
  );
};

export default SaveSurvey;