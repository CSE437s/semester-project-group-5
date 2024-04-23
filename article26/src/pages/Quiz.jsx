import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useSession } from "../components/SessionProvider";
import { Container, Button, Typography, Box, LinearProgress, Stack, Grid } from "@mui/material";

const initialScores = [
  {
    name: "Risk Tolerance",
    responseScore: 0,
    totalScore: 0,
    description: "TBD based on Helen data",
  },
  { name: "Feeling", responseScore: 0, totalScore: 0, description: "TBD based on Helen data" },
  { name: "Planning", responseScore: 0, totalScore: 0, description: "TBD based on Helen data" },
  {
    name: "Spending Habits",
    responseScore: 0,
    totalScore: 0,
    description: "TBD based on Helen data",
  },
  { name: "Influence", responseScore: 0, totalScore: 0, description: "TBD based on Helen data" },
  { name: "Knowledge", responseScore: 0, totalScore: 0, description: "TBD based on Helen data" },
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

  function calculatePhenotype(factorScore) {
    let phenotypeLetters = [];
    const iScore = getFactorPercentData(factorScore.find((item) => item.name === "Influence"));
    if (iScore < 63) {
      phenotypeLetters.push("I");
    } else {
      phenotypeLetters.push("E");
    }
    const rScore = getFactorPercentData(factorScore.find((item) => item.name === "Risk Tolerance"));
    const fScore = getFactorPercentData(factorScore.find((item) => item.name === "Feeling"));
    if (
      rScore < 41 ||
      (rScore <= 56 && fScore < 86) ||
      (rScore <= 64 && fScore < 71) ||
      (rScore >= 64 && rScore < 71 && fScore > 56) ||
      (rScore >= 71 && rScore < 86 && fScore > 41)
    ) {
      phenotypeLetters.push("P");
    } else {
      phenotypeLetters.push("O");
    }
    const pScore = getFactorPercentData(factorScore.find((item) => item.name === "Planning"));
    const sScore = getFactorPercentData(
      factorScore.find((item) => item.name === "Spending Habits")
    );
    if (
      pScore < 41 ||
      (pScore <= 56 && sScore < 86) ||
      (pScore <= 64 && sScore < 71) ||
      (pScore >= 64 && pScore < 71 && sScore > 56) ||
      (pScore >= 71 && pScore < 86 && sScore > 41)
    ) {
      phenotypeLetters.push("F");
    } else {
      phenotypeLetters.push("I");
    }
    return phenotypeLetters.join("");
  } // Usage example

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
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Financial Phenotype Test
      </Typography>
      <LinearProgress
        variant="determinate"
        value={(currentIndex / (questions.length || 1)) * 100}
      />
      {questions.length > 0 ? (
        <>
          <Typography variant="h6" gutterBottom>
            {questions[currentIndex].questionText}
          </Typography>
          <Grid container spacing={2} justifyContent="center" sx={{ my: 2 }}>
            {questions[currentIndex].options.map((option, index) => (
              <Grid item xs={6} key={index}>
                <Button
                  fullWidth
                  variant={selectedOption === index ? "contained" : "outlined"}
                  onClick={() => handleOptionClick(index)}
                  sx={{ textTransform: "none", height: "150px" }}
                >
                  {option.optionText}
                </Button>
              </Grid>
            ))}
          </Grid>
          <Button
            variant="contained"
            onClick={handleContinueClick}
            disabled={selectedOption === null}
          >
            {currentIndex === questions.length - 1 ? "Finish" : "Continue"}
          </Button>
        </>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Container>
  );
}
