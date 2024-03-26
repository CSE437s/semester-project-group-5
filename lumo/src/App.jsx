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
        <Route path="/" element={<LayoutNav />}>
          <Route path="/landing" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/phenotype" element={<Phenotype />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/nowvslater" element={<SaveNowVsLater />} />
        </Route>
        {/* You can add more routes as needed */}
      </Routes>
    </Router>
  );
}
