import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddSurvey from "./components/AddSurvey";
import Surveys from "./components/Surveys";
import AddQuestionToSurvey from "./components/AddQuestionToSurvey";

const App = () => {
  return (
    <Router>
        <div>
            <Routes>
                <Route path="/surveys" element={<Surveys />} />
                <Route path="/surveys/new" element={<AddSurvey />} />
                <Route path="/surveys/:survey_id/add_question" element={<AddQuestionToSurvey />} />
                {/* Andere routes */}
            </Routes>
        </div>
    </Router>
  );
};

export default App;
