import React, { useState } from 'react';
import axios from 'axios';

const SurveyForm = () => {
    const [survey_title, set_survey_title] = useState('');
    const [survey_description, set_survey_description] = useState('');
    const [is_anonymous, set_is_anonymous] = useState('');

    const handleSurveySubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/surveys/new', {
                survey_title,
                survey_description,
                is_anonymous
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
                value={survey_title}
                onChange={(e) => set_survey_title(e.target.value)}
                placeholder="Survey Title"
            />
            <input
                type="text"
                value={survey_description}
                onChange={(e) => set_survey_description(e.target.value)}
                placeholder="Survey Description"
            />
            <p>Is anonymous</p>
            <input
                type="checkbox"
                checked={is_anonymous}
                onChange={(e) => set_is_anonymous(e.target.checked)}
            />
            <button type="submit">Create Survey</button>
      </form>
  );
};

export default SurveyForm;
