import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AnimalPage from "./pages/AnimalPage";
import AnimalInfo from "./pages/AnimalInfo";
import Layout from "./pages/Layout";
import NotFound from "./pages/NotFound";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="AnimalPage" element={<AnimalPage />} />
          <Route path="animal/:animalId" element={<AnimalInfo />} />{" "}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
