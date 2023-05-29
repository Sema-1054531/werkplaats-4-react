import React from 'react';
import { Link } from 'react-router-dom';
import AllSurveys from './AllSurveys';

const Header = () => {
    return (
        <header>
            <h2 className="my-4">Bouw Enquêttes</h2>
        </header>
    );
};

const Surveys = () => {
  return (
    <div className="container">
        <Header />
        <main>
            <div className="row">
                <div className="col">
                    <AllSurveys />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Link to={"/surveys/new"} className="btn btn-primary">Voeg nieuwe enquêtte</Link>
                </div>
            </div>
        </main>
    </div>
  );
};

export default Surveys;
