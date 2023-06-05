import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddQuestionForm from "./components/AddQuestionForm";
import AllQuestions from "./components/AllQuestions";
import QuestionSettings from "./components/QuestionSettings";

const App = () => {
  return (
    <Router>
        <div>
            <Routes>
                <Route path="/questions/new" element={<AddQuestionForm />} />
                <Route path="/questions" element={<AllQuestions />} />
                <Route path="/questions/wijzig/:question_id" element={<QuestionSettings />} />
                {/* Andere routes */}
            </Routes>
        </div>
    </Router>
  );
};

export default App;