import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useSession } from "../components/SessionProvider";

const initialScores = [
  { name: "Risk Tolerance", responseScore: 0, totalScore: 0, "description": "TBD based on Helen data" },
  { name: "Feeling", responseScore: 0, totalScore: 0, "description": "TBD based on Helen data" },
  { name: "Planning", responseScore: 0, totalScore: 0, "description": "TBD based on Helen data" },
  { name: "Spending Habits", responseScore: 0, totalScore: 0, "description": "TBD based on Helen data" },
  { name: "Influence", responseScore: 0, totalScore: 0, "description": "TBD based on Helen data" },
  { name: "Knowledge", responseScore: 0, totalScore: 0, "description": "TBD based on Helen data" },
];

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [factorScore, setfactorScore] = useState(initialScores);
  const [currentIndex, setcurrentIndex] = useState(0);
  const navigate = useNavigate(); // VERIFY SESSION

  const session = useSession();
  if (!session) {
    return <Navigate to="/login" replace />; // Redirect to login if no user is logged in
  } // ON COMPONENT MOUNT

  useEffect(() => {
    // Fetch question and options from Supabase
    async function fetchQuestionAndOptions() {
      const { data: questions, error } = await supabase
        .from("Questions")
        .select("questionText, options, primaryFactor");

      if (error) {
        console.error("Error fetching question and options:", error.message);
        return;
      }

      if (questions && questions.length > 0) {
        setQuestions(questions);
      }
    }
    fetchQuestionAndOptions();
  }, []); // FUNCTIONS

  const handleOptionClick = (optionId) => {
    setSelectedOption(optionId);
  };

  async function createResponseEntry(responseData) {
    try {
      const { data, error } = await supabase.from("Responses").insert(responseData);

      if (error) {
        console.error("Error1 creating entry:", error.message);
        return null;
      }
      console.log("Entry created successfully:", data);
      return data;
    } catch (err) {
      console.error("Error2 creating entry:", err.message);
      return null;
    }
  } 

  function getFactorPercentData(factorScore) {
    return Math.round(100 * (factorScore.responseScore / factorScore.totalScore));
  }
  
  function calculatePhenotype(factorScore){
    let phenotypeLetters = [];
    const iScore = getFactorPercentData(factorScore.find(item => item.name === "Influence"));
    if (iScore < 63 ){
      phenotypeLetters.push('I')
    }
    else {
      phenotypeLetters.push('E')
    }
    const rScore = getFactorPercentData(factorScore.find(item => item.name === "Risk Tolerance"));
    const fScore = getFactorPercentData(factorScore.find(item => item.name === "Feeling"));
    if (rScore < 41 || rScore <= 56 && fScore < 86 || rScore <= 64 && fScore < 71 || rScore >= 64 && rScore < 71 && fScore > 56 || rScore >= 71 && rScore < 86 && fScore > 41){
      phenotypeLetters.push('P')
    }
    else {
      phenotypeLetters.push('O')
    }
    const pScore = getFactorPercentData(factorScore.find(item => item.name === "Planning"));
    const sScore = getFactorPercentData(factorScore.find(item => item.name === "Spending Habits"));
    if (pScore < 41 || pScore <= 56 && sScore < 86 || pScore <= 64 && sScore < 71 || pScore >= 64 && pScore < 71 && sScore > 56 || pScore >= 71 && pScore < 86 && sScore > 41){
      phenotypeLetters.push('F')
    }
    else {
      phenotypeLetters.push('I')
    }
    return phenotypeLetters.join('');
  }// Usage example

  const handleContinueClick = async () => {
    const updatedScore = factorScore.map((item) =>
      item.name === questions[currentIndex].primaryFactor
        ? {
            ...item,
            responseScore:
              item.responseScore + questions[currentIndex].options[selectedOption].focusScore,
            totalScore: item.totalScore + 4,
          }
        : item
    );
    setfactorScore(updatedScore);
    if (currentIndex + 1 >= questions.length) {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error getting user:", error.message);
        return null;
      }
      const uid = data.session.user.id;
      const phenotype = calculatePhenotype(factorScore);
      const responseData = { userID: uid, factorScores: factorScore, phenotype: phenotype };
      createResponseEntry(responseData);
      navigate("/home/phenotype"); //TODO: Navigate somewhere
    } else {
      setcurrentIndex(currentIndex + 1);
      setSelectedOption(null);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto", textAlign: "center" }}>
      <h1>Quiz</h1>
      <h3>Progress</h3>
      <progress value={(currentIndex / questions.length ?? 1) * 100} max="100"></progress>
      
      {questions && questions.length > 0 ? (
        <>
          <p>{questions[currentIndex].questionText}</p>
          
          <div
            style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "20px" }}
          >
            
            {questions[currentIndex].options.map((option, index) => (
              <button
                key={index}
                style={{
                  padding: "10px 20px",
                  fontSize: "16px",
                  borderRadius: "5px",
                  backgroundColor: selectedOption === index ? "#4CAF50" : "#f0f0f0",
                  color: selectedOption === index ? "white" : "black",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => handleOptionClick(index)}
              >
                {(option.optionText.replace(/'/g, "'"))}

              </button>
            ))}
            
          </div>
          {selectedOption + 1 && <button onClick={handleContinueClick}>Continue</button>}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
