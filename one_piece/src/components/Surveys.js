import React from 'react';
import AllSurveys from "./AllSurveys";


const Header = () => {
    return (
        <header>
            <h2 className="my-4">Alle Enquêttes</h2>
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
                    <AllSurveys />
                </div>
            </div>
        </main>
    </div>
  );
};

export default SurveysInBuild;
