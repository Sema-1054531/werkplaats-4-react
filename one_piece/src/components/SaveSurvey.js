import React, { useState } from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

const SaveSurvey = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const survey_id = searchParams.get("survey_id");
  const survey_title = searchParams.get("title");
  const [message, setMessage] = useState("");
  const [buttonVisible, setButtonVisible] = useState(true);
  //const navigate = useNavigate();

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
    } catch (error) {
      console.error(error);
      setMessage("Er is een fout opgetreden bij het opslaan van de enquête.");
    }
    finally {
        setButtonVisible(false);
    }
  };

  const handleSaveSurveyOnClick= () => {
    handleSaveSurvey();
    //navigate('/surveys')
  }

  return (
    <div className="container">
      <h4 className="my-4">Enquête opslaan: {survey_title}</h4>
      <p>{message}</p>
      <button className="btn btn-primary" onClick={handleSaveSurveyOnClick}>Sla op</button>
      <Link to={"/surveys"} className="btn btn-secondary">Ga terug</Link>
    </div>
  );
};

export default SaveSurvey;