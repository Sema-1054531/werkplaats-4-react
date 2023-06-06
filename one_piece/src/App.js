import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddSurvey from "./components/AddSurvey";
import Surveys from "./components/Surveys";
import AddQuestionToSurvey from "./components/AddQuestionToSurvey";
<<<<<<< HEAD
import SaveSurvey from "./components/SaveSurvey";
=======
import Register from "./components/Register";
// import LoginForm from './components/LoginForm';
import AddQuestionForm from "./components/AddQuestionForm";
import AllQuestions from "./components/AllQuestions";
import QuestionSettings from "./components/QuestionSettings";
>>>>>>> main

const App = () => {

    return (
        <Router>
          <div>
            <Routes>
<<<<<<< HEAD
                <Route path="/surveys" element={<Surveys />} />
                <Route path="/surveys/new" element={<AddSurvey />} />
                <Route path="/surveys/:survey_id/add_question" element={<AddQuestionToSurvey />} />
                <Route path="/surveys/:survey_id/save" element={<SaveSurvey />} />
                {/* Andere routes */}
=======
              <Route path="/surveys" element={<Surveys />} />
              <Route path="/surveys/new" element={<AddSurvey />} />
              <Route path="/surveys/:survey_id/add_question" element={<AddQuestionToSurvey />} />
              {/*<Route path="/login" element={<LoginForm />} />/*/}
              <Route path="/register" element={<Register />} />
              <Route path="/questions/new" element={<AddQuestionForm />} />
                <Route path="/questions" element={<AllQuestions />} />
                <Route path="/questions/wijzig/:question_id" element={<QuestionSettings />} />
              {/* Andere routes */}
>>>>>>> main
            </Routes>
          </div>
        </Router>
  );
};

export default App;