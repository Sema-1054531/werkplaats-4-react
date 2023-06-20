import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container">
                <Link className="navbar-brand" to="/surveys">Enquêttes</Link>
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
        </header>
    );
};

const Admin = () => {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    fetchSurveys();
  }, []);

  const fetchSurveys = async () => {
    try {
      const response = await axios.get("http://localhost:5000/surveys");
      setSurveys(response.data);
    }
      catch (error) {
      console.error(error);
    }
  };

  // only show surveys that are not done
  const filteredSurveys = surveys.filter((survey) => survey.is_done === 1);

  return (
    <div>
      <Header/>
      <div className="container">
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Bekijk vragen</th>
          </tr>
        </thead>
        <tbody>
          {filteredSurveys.map((survey) => (
            <tr key={survey.survey_id}>
              <td>{survey.survey_title}</td>
              <td>{survey.survey_description}</td>
              <td>
                <Link to={`/admin/surveys/${survey.survey_id}/survey_questions`}>
                  <button className="btn btn-primary">Bekijk</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default Admin;
