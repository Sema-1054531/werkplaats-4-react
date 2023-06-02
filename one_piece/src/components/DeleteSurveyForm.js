import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import axios from "axios";


const DeleteSurveyForm = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const survey_title = searchParams.get("title");
    const [message, setMessage] = useState('');
    const deletingSurvey = async(survey_id) => {
        try {
            const url = '/surveys';
            const response = await fetch(url, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Er is iets misgegaan met het verwijderen van de enquête.');
            }
            console.log('Enquête verwijderd.');
            setMessage('Enquête succesvol verwijderd.');

            }
            catch (error) {
            console.error(error.message);
            setMessage('Er is iets misgegaan met het verwijderen van de enquête.');
            }
        };

    //Function to handle the clicking on the delete button
    const handleDeleteClick = (survey_id) => {
        deletingSurvey(survey_id)
    };

    return (
    <div className="container">
        <h4 className="my-4">Wil je de enquêtte <b>{survey_title}</b> verwijderen?</h4>
        <button className="btn btn-primary" onClick={handleDeleteClick(11)}>Verwijder</button>
        <Link to={"/surveys"} className="btn btn-secondary">Ga terug</Link>

    </div>
    );

};

export default DeleteSurveyForm;