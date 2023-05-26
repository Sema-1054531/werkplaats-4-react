import React from 'react';
import { Link } from 'react-router-dom';
import AllSurveys from './AllSurveys';


const Surveys = () => {
  return (
    <div className="container">
      <h1 className="my-4">Alle Enquêttes</h1>
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
    </div>
  );
};

export default Surveys;
