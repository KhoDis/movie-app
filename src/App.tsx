import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/*<Route path="/movie/:id" element={<MovieDetailPage />} />*/}
      </Routes>
    </Router>
  );
};

export default App;
