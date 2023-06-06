import React from 'react';
import { Link } from 'react-router-dom';
import AllQuestions from "./AllQuestions";

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
            <h3 className="my-4">Vragen</h3>
            <div className="row">
                <div className="col">
                    <AllQuestions />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Link to={"/questions/new"} className="btn btn-primary">Maak nieuwe vragen</Link>
                </div>
            </div>
        </main>
    </div>
  );
};

export default Surveys;
