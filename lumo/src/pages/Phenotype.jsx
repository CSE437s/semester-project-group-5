import { Stack, Typography, Button, getGrid2UtilityClass } from "@mui/material";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend } from "recharts";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSession } from "../components/SessionProvider";
import { supabase } from "../supabase";
import { Navigate } from "react-router-dom";
import ipf from "../assets/ipf_character.png";

export default function Phenotype() {
  const [resultsAvailable, setResultsAvailable] = useState(false);
  const [responses, setResponses] = useState({});
  const [graphData, setGraphData] = useState({});

  // VERYFY SESSION
  const session = useSession();
  if (!session) {
    return <Navigate to="/login" replace />; // Redirect to login if no user is logged in
  }

  // ON COMPONENT MOUNT
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

  // FUNCTIONS
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
      padding={15}
      spacing={4}
    >
      {resultsAvailable ? (
        <Stack>
          <Typography component="h1" variant="h4" textAlign="center" fontWeight="bold">
            Results
          </Typography>

          <Typography maxWidth="sm" variant="body1" marginTop={2}>
            In the world of personal finance, individuals exhibit a wide range of financial personalities that are influenced by a combination of internal and external factors. These personalities can be broadly categorized into eight distinct types based on their emotional orientation, strategic approach, and the extent to which they are influenced by internal and external factors. Let's explore each of these financial personalities:
            <br></br><br></br>
            Your financial phenotype is <strong>IPF (Internal Pessimistic Frugal)</strong>.
            <br />
            <br></br>
            <img src={ipf} width={230} height={320} className="center"></img>
            <br />
            <br />
            IPF individuals make financial decisions based on their own reasoning and principles,
            rather than external influences. Often pessimistic about financial outcomes, they tend
            to be cautious and anxious. With a frugal approach to money management, they focus on
            long-term financial stability, avoiding impulsive spending and investing in low-risk
            assets. Their primary objective is financial security, and they are reluctant to engage
            in risky endeavors.
            <br />
          </Typography>
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

          <Typography maxWidth="sm" variant="body1" marginTop={2}>
            <br />
            <br />
            <div>
              <strong>Definition:</strong> <p>IPF individuals are internally guided, cautious, and frugal. They prioritize long-term financial stability and are hesitant about taking risks.</p>
<strong>Contextual Examples:</strong> <p>Creating detailed budgets, preferring savings accounts, and conservative investments such as bonds.</p>
<strong>Potential Pitfalls and Strengths:</strong>
<br></br><br></br>
<strong>Pitfalls</strong> <p>May miss growth opportunities due to risk aversion.</p>
<strong>Strengths</strong> <p>Financial stability and predictability.</p>
<strong>Adjustment/Learning and Exceptions/Nuances:</strong> <p>Could benefit from moderate, calculated risk-taking.</p>
<strong>Scope of Application:</strong><p> Best suited for conservative financial environments, retirement planning.</p>
<strong>Description:</strong> <p>IPF individuals make financial decisions based on their own reasoning and principles, rather than external influences. Often pessimistic about financial outcomes, they tend to be cautious and anxious. With a frugal approach to money management, they focus on long-term financial stability, avoiding impulsive spending and investing in low-risk assets. Their primary objective is financial security, and they are reluctant to engage in risky endeavors.</p>


            </div>
            <br />
          </Typography>
        </Stack>
      ) : (
        <Button variant="contained" component={Link} to="/home/quiz" color="primary">
          Take the Phenotype Test
        </Button>
      )}
    </Stack>
  );
}

// HELEN'S GUIDE: https://docs.google.com/document/d/1eIYwI9r_l_lywapAEqabSq9zZuovPzN42ecUSOddzkE/edit
