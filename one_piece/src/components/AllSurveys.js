import React,{ useEffect, useState} from "react";
import axios from "axios";

const AllSurveys = () => {
    const [surveys, setSurveys] =useState([]);

    useEffect(() => {
        fetchSurveys();
    }, []);

    const fetchSurveys = async () => {
        try {
            const response = await axios.get('/api/surveys');
            setSurveys(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <div>
            <h1>Survey List</h1>
            <table>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Is anoniem</th>
                </tr>
                </thead>
                <tbody>
                {surveys.map(survey => (
                    <tr key={survey.id}>
                        <td>{survey.title}</td>
                        <td>{survey.description}</td>
                        <td>{survey.anonymous}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllSurveys;