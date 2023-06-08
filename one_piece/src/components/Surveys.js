import React from 'react';
import AllSurveys from "./AllSurveys";


const Header = () => {
    return (
        <header>
            <h2 className="my-4">Alle Enquêttes</h2>
        </header>
    );
};

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/surveys">Surveys</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/surveys/bouw">Alle Surveys</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/questions">Alle Vragen</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/surveys/bouw/new">Maak Survey</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/questions/new">Maak Vragen</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

const SurveysInBuild = () => {
  return (
    <div className="container">
        <Header />
        <Navbar />
        <main>
            <div className="row">
                <div className="col">
                    <AllSurveys />
                </div>
            </div>
        </main>
    </div>
  );
};

export default SurveysInBuild;
