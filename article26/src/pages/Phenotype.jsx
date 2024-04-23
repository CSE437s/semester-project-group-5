import { useState, useEffect } from "react";
import { Grid, Typography, Card, CardContent, Slider, Button, Container } from "@mui/material";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from "recharts";
import { Link, Navigate } from "react-router-dom";
import { useSession } from "../components/SessionProvider";
import { supabase } from "../supabase";
import React from "react";
import PhenotypeImage from "../components/phenotype_image";

export default function Phenotype() {
  const [resultsAvailable, setResultsAvailable] = useState(false);
  const [responses, setResponses] = useState({});
  const [phenotypeInformation, setPhenotypeInformation] = useState({});
  const [factorScores, setFactorScores] = useState([]);
  const [graphData, setGraphData] = useState([]);

  const session = useSession();
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {
    async function fetchResponses() {
      const { data, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        console.error("Error getting user:", sessionError.message);
        return;
      }
      const uid = data.session.user.id;
      const { data: responsesData, error } = await supabase
        .from("Responses")
        .select("userID, factorScores, phenotype")
        .eq("userID", uid);

      if (error) {
        console.error("Error fetching responses:", error.message);
        return;
      }

      if (responsesData && responsesData.length > 0) {
        setResponses(responsesData[0]);
        setFactorScores(responsesData[0].factorScores);
        setResultsAvailable(true);
        setGraphData(getGraphData(responsesData[0].factorScores));
      }

      const { data: phenotypeData, error: phenotypeError } = await supabase
        .from("Phenotypes")
        .select("phenotype, information, introduction, phenotypeFullForm");

      if (phenotypeError) {
        console.error("Error fetching phenotype data:", phenotypeError.message);
        return;
      }

      if (phenotypeResponses && phenotypeResponses.length > 0) {
        setPhenotypeResponses(phenotypeResponses);
        console.log(phenotypeResponses);
        const matchingResponse = phenotypeResponses.find(
          (response) => response.phenotype === responses[0].phenotype
        );
        setPhenotypeInformation(matchingResponse);
      }
    }

    fetchResponses();
  }, []);

  function getFactorPercentData(factorScore) {
    return Math.round(100 * (factorScore.responseScore / factorScore.totalScore));
  }

  function getGraphData(factorScores) {
    return factorScores.map((score) => ({
      subject: score.name,
      A: getFactorPercentData(score),
      fullMark: 100,
    }));
  }

  return resultsAvailable ? (
    <Container maxWidth="md">
      <Typography component="h1" variant="h4" fontWeight="bold" textAlign="center" mb={4}>
        <br />
        <br />
        Your Results
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <PhenotypeImage phenotype={phenotypeInformation.phenotype} />
        </Grid>
        <Grid item xs={12} md={6}>
          <RadarChart outerRadius={130} width={520} height={400} data={graphData}>
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
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body1" textAlign="center">
            Your financial phenotype is <strong>{phenotypeInformation.phenotypeFullForm}</strong>.
            <br />
          </Typography>
        </Grid>

        {phenotypeInformation.information &&
          phenotypeInformation.information.map((info, index) => (
            <Grid item xs={12} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{info.title}</Typography>
                  {info.description.split("\n").map((item, key) => (
                    <Typography key={key}>{item}</Typography>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          ))}

        <Grid item xs={12}>
          <Typography variant="h6" component="div">
            Big 6 Factors
          </Typography>
        </Grid>

        {factorScores.map((factor, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Card>
              <CardContent>
                <Typography gutterBottom>
                  {factor.name}: {getFactorPercentData(factor)}%
                </Typography>
                <Slider value={getFactorPercentData(factor)} min={0} max={100} disabled />
                <Typography>{factor.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  ) : (
    <Button variant="contained" component={Link} to="/home/quiz" color="primary" sx={{ mt: 4 }}>
      Take the Phenotype Test
    </Button>
  );
}

// HELEN'S GUIDE: https://docs.google.com/document/d/1eIYwI9r_l_lywapAEqabSq9zZuovPzN42ecUSOddzkE/edit
