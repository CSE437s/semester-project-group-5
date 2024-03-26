import { Stack, Typography, Button, getGrid2UtilityClass } from "@mui/material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../supabase";

export default function Phenotype() {
  const [resultsAvailable, setResultsAvailable] = useState(false);
  const [responses, setResponses] = useState({});
  const [graphData, setGraphData] = useState({});

  useEffect(() => {
    async function fetchResponses() {
      const { data, err } = await supabase.auth.getSession();
      if (err) {
        console.error("Error getting user:", error.message);
        return null;
      }
      const uid = data.session.user.id;
      const { data: responses, error } = await supabase
        .from("Responses")
        .select("userID, factorScores")
        .eq("userID", uid);

      if (error) {
        console.error("Error fetching question and options:", error.message);
        return;
      }

      if (responses && responses.length > 0) {
        setResponses(responses);
        setResultsAvailable(true);
        getGraphData(responses[0].factorScores);
      }
    }
    fetchResponses();
  }, []);

  function getGraphData(factorScores) {
    // Extract data
    let factorNames = [];
    let factorRatios = [];
    for (var i = 0; i < factorScores.length; i++) {
      factorNames.push(factorScores[i].name);
      factorRatios.push(100 * (factorScores[i].responseScore / factorScores[i].totalScore));
    }
    console.log(factorNames);
    console.log(factorRatios);
  }

  return (
    <Stack
      className="fullscreen"
      direction={{
        xs: "column",
        md: "row-reverse",
      }}
      alignItems="center"
      justifyContent="center"
      padding={3}
      spacing={4}
    >
      {resultsAvailable ? (
        <Stack>
          <Typography component="h1" variant="h4" textAlign="center" fontWeight="bold">
            Your Financial Phenotype!
          </Typography>
          <Typography maxWidth="sm" variant="body1" marginTop={2}>
            Here are your results
          </Typography>
          {responses[0].factorScores.map((factor) => (
            <div key={factor.name}>
              <p>
                {factor.name} : {factor.responseScore} / {factor.totalScore}{" "}
              </p>
            </div>
          ))}
        </Stack>
      ) : (
        <Button variant="contained" component={Link} to="/home/quiz" color="primary">
          Take the Phenotype Test
        </Button>
      )}
    </Stack>
  );
}
