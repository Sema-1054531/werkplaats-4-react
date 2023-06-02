import React, {useEffect, useState} from 'react';
import {Link, useLocation, useParams} from "react-router-dom";
import axios from "axios";


const DeletingSurvey = async(survey_id) => {
    const [message, setMessage] = useState('');
    try {
        const response = await axios.delete(`/surveys/delete/${survey_id}`);
        console.log('Enquête verwijderd.');
        setMessage('Enquête succesvol verwijderd.');
        }
        catch (error) {
        console.error(error.message);
        setMessage('Er is iets misgegaan met het verwijderen van de enquête.');
        }
    };

const DeleteSurveyForm = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const survey_title = searchParams.get("title");
    const {survey_id} = useParams();

    const handleDeleteOnClick = () => {
        DeletingSurvey(survey_id)
    };

    return (
    <div className="container">
        <h4 className="my-4">Wil je de enquêtte <b>{survey_title}</b> verwijderen?</h4>
        <button className="btn btn-primary" onClick={handleDeleteOnClick}>Verwijder</button>
        <Link to={"/surveys"} className="btn btn-secondary">Ga terug</Link>

    </div>
    );

};

export default DeleteSurveyForm;