import React from 'react';
import AddQuestionForm from "./AddQuestionForm";
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <header>
            <h2 className="my-4">Bouw Enquêttes</h2>
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


const AddSurvey = () => {
  return (
    <div className="container">
        <Header />
        <Navbar />
        <main>
            <h3 className="my-4">Maak nieuwe vraag aan</h3>
            <div className="row">
                <div className="col">
                    <AddQuestionForm />
                </div>
            </div>
        </main>
    </div>
  );
};

export default AddSurvey;
