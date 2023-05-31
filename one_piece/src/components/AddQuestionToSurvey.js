import React from 'react';
import AddQuestionToSurveyForm from './AddQuestionToSurveyForm';

const Header = () => {
    return (
        <header>
            <h2 className="my-4">Bouw Enquêttes</h2>
        </header>
    );
};


const AddQuestionToSurvey = () => {
    return (
        <div className="container">
            <Header />
            <main>
                <div className="row">
                    <div className="col">
                        <AddQuestionToSurveyForm />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AddQuestionToSurvey;