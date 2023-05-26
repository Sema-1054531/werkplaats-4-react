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
        <form onSubmit={handleSurveySubmit} className="my-4">
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    value={survey_title}
                    onChange={(e) => set_survey_title(e.target.value)}
                    placeholder="Survey Title"
                />
            </div>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    value={survey_description}
                    onChange={(e) => set_survey_description(e.target.value)}
                    placeholder="Survey Description"
                />
            </div>
            <div className="form-group">
                <label className="form-check-label">Is anoniem </label>
                <input
                    type="checkbox"
                    className="form-check-input"
                    checked={is_anonymous}
                    onChange={(e) => set_is_anonymous(e.target.checked)}
                />
            </div>
            <button type="submit" className="btn btn-primary mt-3">Create Survey</button>
      </form>
  );
};

export default SurveyForm;
