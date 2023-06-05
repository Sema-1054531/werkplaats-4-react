import React from 'react';
import DeleteSurveyForm from "./DeleteSurveyForm";

const Header = () => {
    return (
        <header>
            <h2 className="my-4">Bouw Enquêttes</h2>
        </header>
    );
};


const DeleteSurvey = () => {
    return (
        <div className="container">
            <Header />
            <main>
                <div className="row">
                    <div className="col">
                        <DeleteSurveyForm />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DeleteSurvey;