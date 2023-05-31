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
                {surveys.map(survey => (
                    <tr key={survey.survey_id}>
                        <td>{survey.survey_title}</td>
                        <td>{survey.survey_description}</td>
                        <td>{survey.is_anonymous ? "Ja" : "Nee"}</td>
                        <td><Link to={`/surveys/${survey.survey_id}/add_question?title=${encodeURIComponent(survey.survey_title)}`}>Details</Link></td>
                        <td><Link to={`/surveys/${survey.survey_id}/delete?title=${encodeURIComponent(survey.survey_title)}`}>Verwijder</Link></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllSurveys;