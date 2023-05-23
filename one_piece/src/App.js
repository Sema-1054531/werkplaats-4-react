import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Survey from './components/Survey';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/survey" element={<Survey />} />
          {/* Andere routes */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
