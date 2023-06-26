import React from 'react';
import {Link} from 'react-router-dom';
import AllQuestions from "./AllQuestions";

const Header = () => {
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container">
                <Link className="navbar-brand" to="/admin">Enquêteoverzicht</Link>
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

const Surveys = () => {
  return (
      <div>
          <Header />
          <div className="container">
            <main>
                <h3 className="my-4">Vragen</h3>
                <div className="row">
                    <div className="col">
                        <AllQuestions />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Link to={"/questions/new"} className="btn btn-primary">Nieuwe vraag</Link>
                    </div>
                </div>
            </main>
        </div>
      </div>
  );
};

export default Surveys;
