import React from 'react';
import {Link, useLocation} from "react-router-dom";

const Header = () => {
    return (
        <header>
            <h2 className="my-4">Bouw Enquêttes</h2>
        </header>
    );
};

const DeleteSurvey = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const survey_title = searchParams.get("title");


    const deletingSurvey = () => {

    };

    return (
    <div className="container">
        <h4 className="my-4">Wil je de enquêtte <b>{survey_title}</b> verwijderen?</h4>
        <button className="btn btn-primary" onClick={deletingSurvey}>Verwijder</button>
        <Link to={"/surveys"} className="btn btn-secondary">Ga terug</Link>

    </div>
    );

};

export default DeleteSurvey;