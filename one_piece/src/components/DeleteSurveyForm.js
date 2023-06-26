import React, {useState} from 'react';
import {Link, useLocation, useParams, useNavigate} from "react-router-dom";
import axios from "axios";


const DeletingSurvey = async(survey_id, setMessage, setButtonVisible) => {
    try {
        await axios.delete(`http://localhost:5000/surveys/delete/${survey_id}`);
        console.log('Enquête verwijderd.');
        setMessage('Enquête succesvol verwijderd.');
        }
        catch (error) {
        console.error(error.message);
        setMessage('Er is iets misgegaan met het verwijderen van de enquête.');
        }
        //Verwijderknop verdwijnt na het klikken erop
        finally {
        setButtonVisible(false);
        }
    };

const DeleteSurveyForm = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const survey_title = searchParams.get("title");
    const {survey_id} = useParams();
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [buttonVisible, setButtonVisible] = useState(true);

    const handleDeleteOnClick = () => {
        DeletingSurvey(survey_id, setMessage, setButtonVisible);
        setMessage('Enquête succesvol verwijderd.');
        navigate('/admin')
    };

    return (
    <div className="container">
        <h4 className="my-4">Wil je de enquête <b>{survey_title}</b> verwijderen?</h4>
        {buttonVisible && (<button className="btn btn-primary" onClick={handleDeleteOnClick}>Verwijder</button>
        )}
        <Link to={"/surveys/bouw"} className="btn btn-secondary">Terug</Link>
        {message && <p>{message}</p>}
    </div>
    );
};

export default DeleteSurveyForm;