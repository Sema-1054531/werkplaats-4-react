import React, {useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
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
    }
      catch (error) {
      console.error(error);
      setMessage("Er is een fout opgetreden bij het opslaan van de enquête.");
    }
  };

  const handleSaveSurveyOnClick= () => {
    handleSaveSurvey();
    navigate('/surveys')
  }

  const Header= () => {
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container">
                <Link className="navbar-brand" to="/admin">Enquêttes</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <Link className="nav-link" to="/surveys/bouw">Bouw enquêttes</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/questions">Bouw vragen</Link>
                    </li>
                  </ul>
                </div>
              </div>
        </nav>
    );
  };

  return (
      <div>
        <Header />
        <div className="container">
          <h4 className="my-4">Enquête opslaan: {survey_title}</h4>
          <p>{message}</p>
          <button className="btn btn-primary" onClick={handleSaveSurveyOnClick}>Opslaan</button>
          <Link to={"/surveys/bouw"} className="btn btn-secondary">Terug</Link>
        </div>
      </div>
  );
};

export default SaveSurvey;