import React, { useState } from 'react';
import axios from 'axios';

const SurveyForm = () => {
    const [surveyTitle, setSurveyTitle] = useState('');
    const [surveyDescription, setSurveyDescription] = useState('');
    const [surveyIsAnonymous, setSurveyIsAnonymous] = useState('');

    const handleSurveySubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/survey', {
                surveyTitle,
                surveyDescription,
                surveyIsAnonymous
            });

            // Succesvol aangemaakt
            console.log(response.data);
        } catch (error) {
            // Fout bij het maken van de survey
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSurveySubmit}>
            <input
                type="text"
                value={surveyTitle}
                onChange={(e) => setSurveyTitle(e.target.value)}
                placeholder="Survey Title"
            />
            <input
                type="text"
                value={surveyDescription}
                onChange={(e) => setSurveyDescription(e.target.value)}
                placeholder="Survey Description"
            />
            <p>Is anonymous</p>
            <input
                type="checkbox"
                checked={surveyIsAnonymous}
                onChange={(e) => setSurveyIsAnonymous(e.target.checked)}
            />
            <button type="submit">Create Survey</button>
      </form>
  );
};

export default SurveyForm;
