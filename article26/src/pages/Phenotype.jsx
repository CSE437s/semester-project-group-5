import { Stack, Typography, Button } from "@mui/material";
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
  const [phenotypeResponses, setPhenotypeResponses] = useState({});
  const [factorScores, setFactorScores] = useState({});
  const [phenotypeInformation, setPhenotypeInformation] = useState({});
  const [graphData, setGraphData] = useState({});

  // VERYFY SESSION
  const session = useSession();
  if (!session) {
    return <Navigate to="/login" replace />; // Redirect to login if no user is logged in
  }

  // ON COMPONENT MOUNT
  // eslint-disable-next-line react-hooks/rules-of-hooks
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
        setFactorScores(responses[0].factorScores)
        setResultsAvailable(true);
        setGraphData(getGraphData(responses[0].factorScores));
      }

       const { data: phenotypeResponses, error2 } = await supabase
        .from("Phenotypes")
        .select("phenotype, information, introduction, phenotypeFullForm");

         if (error2) {
        console.error("Error fetching question and options:", error2.message);
        return;
      }

        if (phenotypeResponses && phenotypeResponses.length > 0) {
        setPhenotypeResponses(phenotypeResponses);
        console.log(phenotypeResponses)
        setPhenotypeInformation(phenotypeResponses[7])
      }
    }

   

    fetchResponses();
  }, []);

  function getFactorPercentData(factorScore) {
    return Math.round(100 * (factorScore.responseScore / factorScore.totalScore));
  }
  // FUNCTIONS
  function getGraphData(factorScores) {

    let data = [];

    for (var i = 0; i < factorScores.length; i++) {
      data.push(
        {
        subject: factorScores[i].name,
        A: getFactorPercentData(factorScores[i]),
        fullMark: 100,
        },
      )
    }
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
           {JSON.stringify(phenotypeInformation.introduction)}
           
            <br></br>
            <br></br>
            Your financial phenotype is <strong>{phenotypeInformation.phenotypeFullForm}</strong>.
            <br />
            <br></br>
            <img
              alt="your_phenotype_character_image"
              src={ipf}
              width={230}
              height={320}
              className="center"
            ></img>
            <br />
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

          {/* <Typography maxWidth="sm" variant="body1" marginTop={2}> */}
            <br />
            <br />
            <div>
              {phenotypeInformation.information && phenotypeInformation.information.length > 0 ? ( 
                <>
               {phenotypeInformation.information.map((phenotypeInfo, index) => (
                <div key = {index}>
                <strong>{phenotypeInfo.title}</strong>
                {phenotypeInfo.description.split('\n').map((item, key) => {
      return <p key={key}>{item}<br /></p>;
      })}
      <br></br>
                </div>
            ))}
            </>
          ) : (
        <p>Loading...</p>
      )}
              <br></br>
              <br></br>
              
              </div>
              {/* </Typography> */}

              <h3>Big 6 Factors</h3>
              
              <div>
               {factorScores.map((factorInfo, index) => (
                <div key={index}>
              <br></br>
              <strong> {factorInfo.name}: {getFactorPercentData(factorInfo)}</strong>
              <br></br>
              <div>
                <br></br>
                <input type="range" min="0" max="100" defaultValue={getFactorPercentData(factorInfo)} className="center" disabled/>
                <br></br>
              </div>
              <p>{factorInfo.description}</p>
             
              <br></br>
              </div>
            ))}
            

            </div>
            <br />
          
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
