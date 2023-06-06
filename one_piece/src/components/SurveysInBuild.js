import React from 'react';
import { Link } from 'react-router-dom';
import AllSurveysInBuild from './AllSurveysInBuild';

const Header = () => {
    return (
        <header>
            <h2 className="my-4">Bouw Enquêttes</h2>
        </header>
    );
};

const SurveysInBuild = () => {
  return (
    <div className="container">
        <Header />
        <main>
            <div className="row">
                <div className="col">
                    <AllSurveysInBuild />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Link to={"/surveys/new"} className="btn btn-primary">Voeg nieuwe enquêtte</Link>
                    <Link to={"/questions/new"} className="btn btn-secondary">Maak nieuwe vragen</Link>
                </div>
            </div>
        </main>
    </div>
  );
};

export default SurveysInBuild;
