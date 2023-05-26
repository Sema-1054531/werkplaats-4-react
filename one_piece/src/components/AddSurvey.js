import React from 'react';
import { Link } from 'react-router-dom';
import SurveyForm from './SurveyForm';

const AddSurvey = () => {
  return (
    <div className="container">
        <h1 className="my-4">Survey Page</h1>
        <div className="row">
            <div className="col">
                <SurveyForm />
            </div>
        </div>
        <div className="row">
            <div className="col">
                <Link className="btn btn-primary" to={"/surveys"}>Ga naar all enquêtes</Link>
            </div>
        </div>
    </div>
  );
};

export default AddSurvey;
