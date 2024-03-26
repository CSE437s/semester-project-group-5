/* About.jsx
Basic about page
*/
import { Stack, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// MOVE SOMEWHERE ELSE
const supabase = createClient(
  "https://dzmmfskrxgkcjakmhutk.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6bW1mc2tyeGdrY2pha21odXRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg4OTQ5NTksImV4cCI6MjAyNDQ3MDk1OX0.rcnmUdhmLpXxlhgkPAUq1jA743biNbMLZtOtR361AS0"
);

export default function Phenotype() {
  const [responses, setResponses] = useState({});

    useEffect(() => {
    async function fetchResponses() {
      const { data, err } = await supabase.auth.getSession()
      if (err) {
        console.error('Error getting user:', error.message);
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

      console.log('responses: ', responses)

      if (responses && responses.length > 0) {
        setResponses(responses);
      }
    }

    fetchResponses();
  }, []);

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
      <div>
        <Typography component="h1" variant="h4" textAlign="center" fontWeight="bold">
          Your Financial Phenotype
        </Typography>

        <Typography maxWidth="sm" variant="body1" marginTop={2}>
          - your phenotype is blah blah blah
          <br />
          - button should render if they havent taken the test.
          <br />
          - if not logged in, they should be directed to the auth page
          <br />
        </Typography>

        <Button variant="contained" component={Link} to="/home/quiz" color="primary">
          Take the Financial Phenotype Test
        </Button>
        {responses && responses.length > 0 ? (
          <div>
         {responses[0].factorScores.map((factor) => (
          <div key = {factor.name}>
            <p>{factor.name} : {factor.responseScore} / {factor.totalScore} </p>
            </div>
            ))}
        </div>
        ) : (
          <p>Loading...</p>
        )
        }
        

        
      </div>
    </Stack>
  );
}
