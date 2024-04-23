import React from "react";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import LayoutNav from "./pages/LayoutNav"; // Adjusted for default import
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Phenotype from "./pages/Phenotype";
import Quiz from "./pages/Quiz";
import Chatbot from "./components/Chatbot";
import SavingsCalculatorPage from "./pages/SavingsCalculatorPage";
import RentVsBuyCalculatorPage from "./pages/RentVsBuyCalculatorPage";


import { supabase } from "./supabase";
import { createClient } from "@supabase/supabase-js";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<LayoutNav />}>
            <Route path="about" element={<About />} />
            <Route path="phenotype" element={<Phenotype />} />
            <Route path="quiz" element={<Quiz />} />
            <Route path="nowvslater" element={<SavingsCalculatorPage />} />
            <Route path="rentvsbuy" element={<RentVsBuyCalculatorPage />} />
          </Route>
          {/* Add other routes here as needed */}
        </Routes>
        <Chatbot />
      </Router>
    </>
  );
}
