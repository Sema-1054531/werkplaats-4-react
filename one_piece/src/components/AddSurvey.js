import React from 'react';
import AddSurveyForm from './AddSurveyForm';
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

const AddSurvey = () => {
  return (
      <div>
          <Header />
          <div className="container">
              <main>
                  <h3 className="my-4">Voeg nieuwe enquête toe</h3>
                  <div className="row">
                      <div className="col">
                          <AddSurveyForm />
                      </div>
                  </div>
              </main>
          </div>
      </div>
  );
};

export default AddSurvey;
