import "./index.css";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://dzmmfskrxgkcjakmhutk.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6bW1mc2tyeGdrY2pha21odXRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg4OTQ5NTksImV4cCI6MjAyNDQ3MDk1OX0.rcnmUdhmLpXxlhgkPAUq1jA743biNbMLZtOtR361AS0"
);

export function Questionnaire() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  // Fetch question and options from Supabase
  useEffect(() => {
    async function fetchQuestionAndOptions() {
      console.log("here");
      const { data: questions, error } = await supabase
        .from("Questions")
        .select("question, options");

      console.log("questions:", questions);

      if (error) {
        console.error("Error fetching question and options:", error.message);
        return;
      }

      if (questions && questions.length > 0) {
        setQuestion(questions[0].question);
        setOptions(questions[0].options);
      }
    }

    fetchQuestionAndOptions();
  }, []);

  const handleOptionClick = (optionId) => {
    setSelectedOption(optionId);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto", textAlign: "center" }}>
      <h1>Quiz</h1>
      <p>{question}</p>
      <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "20px" }}>
        {options.map((option) => (
          <button
            key={option.id}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              borderRadius: "5px",
              backgroundColor: selectedOption === option.id ? "#4CAF50" : "#f0f0f0",
              color: selectedOption === option.id ? "white" : "black",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => handleOptionClick(option.id)}
          >
            {option}
          </button>
        ))}
      </div>
      {selectedOption && (
        <p>You selected: {options.find((option) => option.id === selectedOption).text}</p>
      )}
    </div>
  );
}
