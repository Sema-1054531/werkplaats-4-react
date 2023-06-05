import React, { useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const AllSurveys = () => {
    const [surveys, setSurveys] =useState([]);

    useEffect(() => {
        fetchSurveys();
    }, []);

    const fetchSurveys = async () => {
        try {
            const response = await axios.get('http://localhost:5000/surveys');
            setSurveys(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    // only show surveys that are not done
    const filteredSurveys = surveys.filter((survey) => survey.is_done === 0);

    return(
        <div>
            <table className="table table-striped">
                <thead className="thead-dark">
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Is anoniem</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {filteredSurveys.map((survey) => (
                    <tr key={survey.survey_id}>
                        <td>{survey.survey_title}</td>
                        <td>{survey.survey_description}</td>
                        <td>{survey.is_anonymous ? "Ja" : "Nee"}</td>
                        <td><Link className="btn btn-secondary" to={`/surveys/${survey.survey_id}/add_question?survey_id=${encodeURIComponent(survey.survey_id)}&title=${encodeURIComponent(survey.survey_title)}`}>Details</Link></td>
                        <td><Link className="btn btn-primary" to={`/surveys/${survey.survey_id}/save?survey_id=${encodeURIComponent(survey.survey_id)}&title=${encodeURIComponent(survey.survey_title)}`}>Opslaan</Link></td>
                        <td><Link className="btn btn-danger" to="#">Verwijder</Link></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllSurveys;