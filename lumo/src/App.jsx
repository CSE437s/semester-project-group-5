// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import "./index.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import Questionnaire from "./components/Questionnaire"; // Choose the correct import based on your app's structure
import SaveNowVsLater from "./components/SaveNowVsLaterCalc/SaveNowVsLater"; // Keep this component if needed

const supabase = createClient(
  "https://dzmmfskrxgkcjakmhutk.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6bW1mc2tyeGdrY2pha21odXRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg4OTQ5NTksImV4cCI6MjAyNDQ3MDk1OX0.rcnmUdhmLpXxlhgkPAUq1jA743biNbMLZtOtR361AS0"
);

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Router>
      <div className="app-container">
        <nav>
          {/* Conditionally render links based on session state */}
          {session && (
            <>
              <Link to="/">Home</Link>
              <Link to="/savenowvslater">Save Now vs Later</Link>
            </>
          )}
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              !session ? (
                <div className="flexbox-signin">
                  <h1>Welcome to Article26!</h1>
                  <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} providers={[]} />
                </div>
              ) : (
                <Questionnaire />
              )
            }
          />
          <Route path="/savenowvslater" element={<SaveNowVsLater />} />
          {/* You can add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}
