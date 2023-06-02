import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import axios from "axios";


const DeleteSurveyForm = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const survey_title = searchParams.get("title");
    const [message, setMessage] = useState('');

    async function deletingSurvey(survey_id, survey_title) {
        const url = `/surveys/${survey_id}/delete?title=${encodeURIComponent(survey_title)}`;

        try {
            const response = await fetch(url, {
                method: 'DELETE',
            });

        if (!response.ok) {
            throw new Error('Er is iets misgegaan met het verwijderen van de enquêtte.');
        }
        const responseData = await response.json();
        console.log('Test.');
        }
        catch (error) {
        console.error(error.message);
        setMessage('Er is iets misgegaan met het verwijderen van de enquêtte.');
        }
    }

    return (
    <div className="container">
        <h4 className="my-4">Wil je de enquêtte <b>{survey_title}</b> verwijderen?</h4>
        <button className="btn btn-primary" onClick={deletingSurvey('11', 'test')}>Verwijder</button>
        <Link to={"/surveys"} className="btn btn-secondary">Ga terug</Link>

    </div>
    );

};

export default DeleteSurveyForm;