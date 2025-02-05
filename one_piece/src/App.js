import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import AddSurvey from "./components/AddSurvey";
import SurveysInBuild from "./components/SurveysInBuild";
import AddQuestionToSurvey from "./components/AddQuestionToSurvey";
import SaveSurvey from "./components/SaveSurvey";
import Register from "./components/Register";
import LoginForm from './components/LoginForm';
import AddQuestion from "./components/AddQuestion";
import Questions from "./components/Questions";
import QuestionSettings from "./components/QuestionSettings";
import DeleteSurvey from "./components/DeleteSurvey";
import Surveys from "./components/Surveys";
import SurveyQuestionAdmin from "./components/SurveyQuestionAdmin";
import Admin from "./components/Admin";
import AdminAnswer from "./components/AdminAnswer";
import QuestionTeamMember from "./components/QuestionTeamMember";
import AnswerQuestionTeamMember from "./components/AnswerQuestionTeamMember";
import HomePage from "./components/HomePage";

const App = () => {

    return (
        <Router>
          <div>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/surveys/:survey_id/survey_questions" element={<SurveyQuestionAdmin />} />
                <Route path="/admin/surveys/:survey_id/survey_questions/answers/:question_id" element={<AdminAnswer />} />
                <Route path="/surveys" element={<Surveys />} />
                <Route path="/surveys/bouw" element={<SurveysInBuild />} />
                <Route path="/surveys/bouw/new" element={<AddSurvey />} />
                <Route path="/surveys/bouw/:survey_id/add_question" element={<AddQuestionToSurvey />} />
                <Route path="/surveys/bouw/:survey_id/save" element={<SaveSurvey />} />
                <Route path="/surveys/bouw/:survey_id/delete" element={<DeleteSurvey />} />
                <Route path="/surveys/:survey_id/survey_questions" element={<QuestionTeamMember />} />
                <Route path="/surveys/:survey_id/survey_questions/answer/:question_id" element={<AnswerQuestionTeamMember />} />
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