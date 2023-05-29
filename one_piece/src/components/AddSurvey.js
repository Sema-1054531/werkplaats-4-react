import React from 'react';
import AddSurveyForm from './AddSurveyForm';

const Header = () => {
    return (
        <header>
            <h2 className="my-4">Bouw Enquêttes</h2>
        </header>
    );
};


const AddSurvey = () => {
  return (
    <div className="container">
        <Header />
        <main>
            <h3 className="my-4">Voeg nieuwe enquête toe</h3>
            <div className="row">
                <div className="col">
                    <AddSurveyForm />
                </div>
            </div>
        </main>
    </div>
  );
};

export default AddSurvey;
