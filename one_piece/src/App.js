import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddSurvey from "./components/AddSurvey";
import Surveys from "./components/Surveys";
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/surveys" element={<Surveys />} />
          <Route path="/surveys/new" element={<AddSurvey />} />
          {/* Andere routes */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
