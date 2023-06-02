import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import axios from "axios";


const DeleteSurveyForm = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const survey_title = searchParams.get("title");
    const [message, setMessage] = useState('');

    const deletingSurvey = (survey_id, survey_title) => {
        const url = `/surveys/${survey_id}/delete?title=${encodeURIComponent(survey_title)}`;
        // Delete specified survey
        fetch(url, {method: 'DELETE'})
            .then(response => {
                if (response.ok) {
                    console.log('Enquêtte verwijderd');
                }
                else {
                    setMessage('Er ging iets mis met het verwijderen van de enquêtte')
                    console.error(response.status);
                }
            })
            .catch(error => {
                setMessage('Er ging iets mis met het verwijderen van de enquêtte')
                console.error(error);
            });
    }

    return (
    <div className="container">
        <h4 className="my-4">Wil je de enquêtte <b>{survey_title}</b> verwijderen?</h4>
        <button className="btn btn-primary" onClick={deletingSurvey('8', 'nee')}>Verwijder</button>
        <Link to={"/surveys"} className="btn btn-secondary">Ga terug</Link>

    </div>
    );

};

export default DeleteSurveyForm;