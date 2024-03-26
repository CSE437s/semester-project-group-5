import { Stack, Typography, Button, getGrid2UtilityClass } from "@mui/material";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend } from "recharts";
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
        setGraphData(getGraphData(responses[0].factorScores));
      }
    }
    fetchResponses();
  }, []);

  function getGraphData(factorScores) {
    // Extracted data
    let factorNames = [];
    let factorRatios = [];

    for (var i = 0; i < factorScores.length; i++) {
      factorNames.push(factorScores[i].name);
      factorRatios.push(100 * (factorScores[i].responseScore / factorScores[i].totalScore));
    }

    const data = [
      {
        subject: factorNames[0],
        A: factorRatios[0],
        fullMark: 100,
      },
      {
        subject: factorNames[1],
        A: factorRatios[1],
        fullMark: 100,
      },
      {
        subject: factorNames[2],
        A: factorRatios[2],
        fullMark: 100,
      },
      {
        subject: factorNames[3],
        A: factorRatios[3],
        fullMark: 100,
      },
      {
        subject: factorNames[4],
        A: factorRatios[4],
        fullMark: 100,
      },
      {
        subject: factorNames[5],
        A: factorRatios[5],
        fullMark: 100,
      },
    ];
    return data;
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
            Here are your results:
          </Typography>

          <RadarChart outerRadius={85} width={730} height={250} data={graphData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar
              name="Financial Fingerprint"
              dataKey="A"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
            />
            <Legend />
          </RadarChart>

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
