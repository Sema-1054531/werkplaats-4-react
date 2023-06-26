import React from 'react';
import AllSurveys from "./AllSurveys";
import {Link} from "react-router-dom";


const Header = () => {
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container">
                <Link className="navbar-brand" to="/surveys">Enquêteoverzicht</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
              </div>
            </nav>
        </header>
    );
};

const SurveysInBuild = () => {
  return (
      <div>
          <Header />
          <div className="container">
              <main>
                  <div className="row">
                      <div className="col">
                          <AllSurveys />
                      </div>
                  </div>
              </main>
          </div>
      </div>
  );
};

export default SurveysInBuild;
