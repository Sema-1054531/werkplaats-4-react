import React from 'react';
import { Link } from 'react-router-dom';
import SurveyForm from './SurveyForm';

const Survey = () => {
  return (
    <div>
      <h1>Survey Page</h1>
      <SurveyForm />
        <button><Link to={"/surveys"}>Ga naar all enquêtes</Link></button>
    </div>
  );
};

export default Survey;
