import React from 'react';
import AddQuestionForm from "./AddQuestionForm";

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
