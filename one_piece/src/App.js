import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddQuestionForm from "./components/AddQuestionForm";

const App = () => {
  return (
    <Router>
        <div>
            <Routes>
                <Route path="/questions" element={<AddQuestionForm />} />
                {/* Andere routes */}
            </Routes>
        </div>
    </Router>
  );
};

export default App;