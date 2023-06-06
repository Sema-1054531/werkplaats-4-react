import React, { useState } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

const AddSurveyForm = () => {
    const [survey_title, set_survey_title] = useState('');
    const [survey_description, set_survey_description] = useState('');
    const [is_anonymous, set_is_anonymous] = useState('');
    const [is_done, set_is_done] = useState();
    const [message, setMessage] = useState('');

    const handleSurveySubmit = async (e) => {
        e.preventDefault();

        // Check if input is empty
        if (survey_title.trim() === '' || survey_description.trim() === '' || is_anonymous === '') {
            setMessage('Vul alstublieft alle velden in.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/surveys/new', {
                survey_title,
                survey_description,
                is_anonymous
            });

            // Succesvol aangemaakt
            setMessage('Enguêtte is aangemaakt');
            console.log(response.data);
        } catch (error) {
            // Fout bij het maken van de survey
            setMessage('Er ging iets mis met het toevoegen van een nieuwe enquêtte')
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSurveySubmit} className="my-4">
            <div className="row">
                <div className="col">
                    <div className="form-group">
                        <label htmlFor="survey_title">Titel:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="survey_title"
                            value={survey_title}
                            onChange={(e) => set_survey_title(e.target.value)}
                            placeholder="Typ titel van de enquête..."
                        />
                    </div>
                    <div className="form-group" style={{ paddingTop: '20px'}}>
                        <label>Anoniem:</label>
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="is_anonymous"
                                checked={is_anonymous === 1}
                                onChange={(e) => set_is_anonymous(e.target.checked ? 1 : 0)}
                                value={is_anonymous === 1 ? 1 : 0}
                            />
                            <label className="form-check-label" htmlFor="is_anonymous">Ja</label>
                        </div>
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="is_not_anonymous"
                                checked={is_anonymous === 0}
                                onChange={(e) => set_is_anonymous(e.target.checked ? 0 : 1)}
                                value={is_anonymous === 0 ? 0 : 1}
                            />
                            <label className="form-check-label" htmlFor="is_not_anonymous">Nee</label>
                        </div>
                    </div>
                    <input
                        type="text"
                        value={is_done}
                        onChange={(e) => set_is_done(e.target.value)}
                    />
                    <div style={{ paddingTop: '100px' }}>
                        <button type="submit" className="btn btn-primary mt-3">Create Survey</button>
                        <Link className="btn btn-secondary mt-3" to={"/surveys"}>Ga naar all enquêtes</Link>
                        {message && <p>{message}</p>}
                    </div>
                </div>
                <div className="col">
                    <div className="form-group">
                        <label htmlFor="survey_description">Beschrijving:</label>
                        <textarea
                            className="form-control"
                            id="survey_description"
                            value={survey_description}
                            onChange={(e) => set_survey_description(e.target.value)}
                            placeholder="Typ een beschrijving over de enquête..."
                            style={{ height: '200px' }}
                        />
                    </div>
                </div>
            </div>
      </form>
  );
};

export default AddSurveyForm;
