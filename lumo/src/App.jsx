import React, { useState, useEffect } from "react";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import { LayoutNav } from "./pages/LayoutNav";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Phenotype from "./pages/Phenotype";
import Quiz from "./pages/Quiz";
import SaveNowVsLater from "./pages/SaveNowVsLater";

import { supabase } from "./supabase";
import { createClient } from "@supabase/supabase-js";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<LayoutNav />}>
          <Route path="/home/about" element={<About />} />
          <Route path="/home/phenotype" element={<Phenotype />} />
          <Route path="/home/quiz" element={<Quiz />} />
          <Route path="/home/nowvslater" element={<SaveNowVsLater />} />
        </Route>
        {/* You can add more routes as needed */}
      </Routes>
    </Router>
  );
}
