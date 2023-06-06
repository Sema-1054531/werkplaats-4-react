import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddSurvey from "./components/AddSurvey";
import SurveysInBuild from "./components/SurveysInBuild";
import AddQuestionToSurvey from "./components/AddQuestionToSurvey";
import SaveSurvey from "./components/SaveSurvey";
import Register from "./components/Register";
// import LoginForm from './components/LoginForm';
import AddQuestion from "./components/AddQuestion";
import Questions from "./components/Questions";
import QuestionSettings from "./components/QuestionSettings";
import DeleteSurvey from "./components/DeleteSurvey";
import Surveys from "./components/Surveys";


const App = () => {

    return (
        <Router>
          <div>
            <Routes>
                <Route path="/surveys" element={<Surveys />} />
                <Route path="/surveys/bouw" element={<SurveysInBuild />} />
                <Route path="/surveys/bouw/new" element={<AddSurvey />} />
                <Route path="/surveys/bouw/:survey_id/add_question" element={<AddQuestionToSurvey />} />
                <Route path="/surveys/bouw/:survey_id/save" element={<SaveSurvey />} />
                <Route path="/surveys/bouw/:survey_id/delete" element={<DeleteSurvey />} />
                {/*<Route path="/login" element={<LoginForm />} />/*/}
                <Route path="/register" element={<Register />} />
                <Route path="/questions/new" element={<AddQuestion />} />
                <Route path="/questions" element={<Questions />} />
                <Route path="/questions/wijzig/:question_id" element={<QuestionSettings />} />
              {/* Andere routes */}
            </Routes>
          </div>
        </Router>
  );
};

export default App;