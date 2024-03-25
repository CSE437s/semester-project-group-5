import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// MOVE SOMEWHERE ELSE
const supabase = createClient(
  "https://dzmmfskrxgkcjakmhutk.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6bW1mc2tyeGdrY2pha21odXRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg4OTQ5NTksImV4cCI6MjAyNDQ3MDk1OX0.rcnmUdhmLpXxlhgkPAUq1jA743biNbMLZtOtR361AS0"
);

export default function Questionnaire() {
  const [questions, setQuestions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentIndex, setcurrentIndex] = useState(0);

  // Fetch question and options from Supabase
  useEffect(() => {
    async function fetchQuestionAndOptions() {
      console.log("here");
      const { data: questions, error } = await supabase
        .from("Questions")
        .select("questionText, options");

      console.log("questions:", questions);
      console.log("options:", questions[0].options);

      if (error) {
        console.error("Error fetching question and options:", error.message);
        return;
      }

      if (questions && questions.length > 0) {
        let tempQs = [];
        let tempOpts = [];
        questions.forEach((el) => {
          tempQs.push(el.questionText);
          tempOpts.push(el.options);
        });
        console.log("tempQs:", tempQs);
        console.log("tempOpts:", tempOpts);
        console.log("q:", questions[0]);
        setQuestions(questions);
      }
    }

    fetchQuestionAndOptions();
  }, []);

  const handleOptionClick = (optionId) => {
    setSelectedOption(optionId);
  };

  const handleContinueClick = () => {
    setcurrentIndex(currentIndex + 1);
    setSelectedOption(null);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto", textAlign: "center" }}>
      <h1>Quiz</h1>
      <p>Current Question: {currentIndex + 1}</p>
      <h3>Progress bar</h3>
      <progress value={(currentIndex / questions.length) * 100} max="100"></progress>
      {questions && questions.length > 0 ? (
        <>
          <p>{questions[currentIndex].questionText}</p>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "20px" }}
          >
            {questions[currentIndex].options.map((option) => (
              <button
                key={option.focusScore}
                style={{
                  padding: "10px 20px",
                  fontSize: "16px",
                  borderRadius: "5px",
                  backgroundColor: selectedOption === option.focusScore ? "#4CAF50" : "#f0f0f0",
                  color: selectedOption === option.focusScore ? "white" : "black",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => handleOptionClick(option.focusScore)}
              >
                {option.optionText}
              </button>
            ))}
          </div>
          {selectedOption && <button onClick={handleContinueClick}>Continue</button>}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
