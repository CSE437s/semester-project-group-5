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
            In the world of personal finance, individuals exhibit a wide range of financial personalities that are influenced by a combination of internal and external factors. These personalities can be broadly categorized into eight distinct types based on their emotional orientation, strategic approach, and the extent to which they are influenced by internal and external factors. Let&apos;s explore each of these financial personalities:
            <br></br><br></br>
            Your financial phenotype is <strong>IPF (Internal Pessimistic Frugal)</strong>.
            <br />
            <br></br>
            <img alt="your_phenotype_character_image" src={ipf} width={230} height={320} className="center"></img>
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

<br></br><br></br>
<h3>Big 6 Factors</h3>
<br></br>
<strong>Spending Habits: 60</strong>
<br></br> 
 <div>
  <br></br>
      <input type="range" min="0" max="100" value={60} className = "center"/>
      <br></br>
    </div>
You strive to follow a budget, though occasional treats and surprises find their way into your spending, showing an effort to balance enjoyment today with financial responsibility for tomorrow. You struggle with budgeting and prefer a spontaneous approach to spending. The allure of saving money through sales can lead to spontaneous buying. You feel too busy with other responsibilities to assess your spending. You limit spending on clothing, gadgets, and other shopping items when finances are strained. It&apos;s harder to forgo immediate pleasures without defined financial objectives.
<br></br><br></br>
<strong>Feeling: 64</strong>
<div>
  <br></br>
      <input type="range" min="0" max="100" value={64} className = "center"/>
      <br></br>
    </div>
<br></br> 
You&apos;re comfortable enough to discuss finances in familiar circles and manage day-to-day budgeting with a moderate level of stress, showing an evolving competence in personal financial management. You find that discussing financial matters with peers provides mutual support. Managing the budget for daily sustenance can be particularly stressful. You value the lasting memories created by experiences with friends. Concerns about going into debt affect your confidence in credit card use. Having a full scholarship eliminates the need to factor student loans into daily spending.
<br></br><br></br>
<strong>Influence: 52</strong>
<div>
  <br></br>
      <input type="range" min="0" max="100" value={52} className = "center"/>
      <br></br>
    </div>
<br></br> 
You consider the financial habits of those around you and occasionally consult with family or online resources, but you maintain a degree of independence in your final financial decisions. Your friends often inspire you to engage in more social spending when they suggest group activities or shared experiences that involve financial costs. Your family&apos;s financial knowledge may not be sufficient for your needs. Your spending is focused on addressing current necessities. You don&apos;t engage in writing online reviews or ratings. Your financial decisions are influenced by informal advice from your social and family circle.
<br></br><br></br>
<strong>Planning: 40</strong>
<div>
  <br></br>
      <input type="range" min="0" max="100" value={40} className = "center"/>
      <br></br>
    </div>
<br></br> 
You live in the moment, often without a detailed financial plan for future expenses or emergencies, which can indicate a preference for immediate enjoyment over long-term financial security. High-value items don&apos;t interest you enough to save for them. An unpredictable outlook makes it challenging to establish financial milestones. Other expenses take priority over leisure activities in your budget. You rely on peer advice for price information and decision-making. Insufficient funds leave no room for emergency savings.
<br></br><br></br>
<strong>Risk Tolerance: 60</strong>
<div>
  <br></br>
      <input type="range" min="0" max="100" value={60} className = "center"/>
      <br></br>
    </div>
<br></br> 
You take a balanced approach to risk, sometimes investing in markets or new ventures after thorough consideration, and you&apos;re prepared for some income variation while preferring overall stability. Insufficient understanding of high-risk opportunities keeps you cautious. A stable income is crucial to your financial well-being and comfort. The process of diversifying income is an opportunity to gain new skills. The complexity of financial markets discourages active engagement. Confidence in a well-researched business plan encourages you to consider loans.
<br></br><br></br>
<strong>Knowledge: 56</strong>
<div>
  <br></br>
      <input type="range" min="0" max="100" value={56} className = "center"/>
      <br></br>
    </div>
<br></br> 
You have a foundational understanding of financial management and make efforts to educate yourself about key financial matters, indicating a developing financial literacy. You have educated yourself on budgeting through your own research efforts. You have diligently maintained or improved your credit score by consistently paying bills on time. You find it challenging to allocate time to learn about investments due to other commitments. The long-term impact of carrying debt is something you&apos;re not fully comfortable with. You haven&apos;t explored much because you&apos;re unaware of where to find resources for financial education.
<br></br><br></br>

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
