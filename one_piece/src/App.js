import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Survey from './components/Survey';
import AllSurveys from './components/AllSurveys';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/surveys" element={<AllSurveys />} />
          <Route path="/surveys/new" element={<Survey />} />
          {/* Andere routes */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
