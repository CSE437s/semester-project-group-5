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

const scoreDescriptions = {
  "Risk Tolerance": [
  "If you score as High Averse in risk tolerance, you exhibit extreme caution in financial matters. You prioritize security over potential gains, favoring investments that offer steady, albeit lower returns, such as savings accounts and government bonds. While this minimizes your risk of loss, it may also limit your potential for higher financial gains. Consider slowly integrating more diverse but conservative investment options to balance security with growth.",
  "Scoring Averse suggests a cautious approach to financial risk. You prefer stability in your investments and are likely to shy away from speculative opportunities. This conservative strategy protects you from significant financial downturns but may restrict your growth potential. To enhance your financial portfolio, you might explore mixed-risk investments that offer a balance of safety and a higher return opportunity.",
  "A Neutral score in risk tolerance indicates a balanced approach to financial risk. You are comfortable with a moderate level of risk, allowing you to explore various investment types, from bonds to stocks. This balanced approach helps you to capitalize on growth opportunities without exposing yourself to undue risk, ideally positioning you to achieve healthy financial growth over time.",
  "As a Risk Seeking individual, you are comfortable taking on higher risk levels in pursuit of greater financial returns. You think about or actively invest in stocks, real estate, or business ventures with higher potential rewards. While this approach can lead to substantial gains, it also comes with the risk of significant losses, so continuous monitoring and strategic diversification of your investments are essential.",
  "Highly Risk Seeking individuals are very comfortable with taking substantial financial risks. You thrive on high-risk, high-reward investment opportunities and are likely to have a significant portion of your portfolio in volatile markets. To safeguard against potential financial setbacks, consider balancing your portfolio with some lower-risk investments and regularly reviewing your investment strategy to align with your long-term financial goals."
],
  "Feeling": [
  "Highly Anxious scorers experience significant stress and worry over their financial decisions. This high level of anxiety can often lead to decision paralysis or hasty choices under pressure. It is beneficial to develop strategies such as setting clear financial goals, seeking professional advice, and practicing stress-reduction techniques to manage your anxiety and make more confident financial decisions.",
  "Anxious scorers feel regular nervousness about their financial situation. This anxiety may prevent you from taking necessary risks that could benefit your financial health. Implementing a solid financial plan and educating yourself on financial matters can help alleviate these fears and give you a clearer path to follow, improving your financial confidence.",
  "A Neutral score in feeling suggests you experience a balanced emotional response to your finances. You handle financial ups and downs with a steady demeanor, allowing you to make decisions without excessive stress or overconfidence. Maintaining this equilibrium is beneficial; continue to educate yourself on financial practices to further enhance your decision-making process.",
  "Relaxed individuals typically do not let financial decisions cause them undue stress. Your calm approach lets you think clearly and make decisions without panic or anxiety. However, staying engaged and not becoming complacent is essential, as being too relaxed can sometimes lead to missed opportunities or overlooked risks.",
  "Highly Relaxed scorers are extremely calm about their financial decisions, to the point where they may pay little attention to financial details. This can be beneficial in reducing stress but may risk neglecting crucial financial planning and opportunities for growth. To balance this, set regular check-ins for your financial status and involve a financial advisor to ensure you are on track with your financial goals."
],
  "Planning": [
  "Highly Reactive planners often make financial decisions based solely on immediate needs or crises, lacking a long-term strategy. This can result in missed opportunities and higher costs in the long run. Developing a more proactive financial planning approach, such as setting long-term goals and preparing for emergencies, can provide greater security and peace of mind.",
  "Reactive planners address financial issues as they arise rather than through strategic planning. While this allows for flexibility, it may also lead to a lack of preparation for future financial needs. Incorporating elements of proactive planning, like regular savings for future goals, can enhance your financial readiness and control.",
  "A Neutral planning score indicates a balance between proactive and reactive financial strategies. You are able to adapt to immediate circumstances while also keeping an eye on future goals. This adaptability is a strong asset; continue to refine your planning skills to further improve your financial well-being.",
  "Proactive planners are well-prepared for future financial demands, often having detailed plans and savings goals. This forward-thinking approach minimizes surprises and ensures financial stability. To keep your planning effective, regularly review and update your financial plans to adapt to changes in your life circumstances or financial status.",
  "Highly Proactive individuals are exceptionally diligent in planning for future financial needs, often with extensive preparation and contingency plans. This thoroughness ensures that you are well-equipped to handle unexpected financial challenges. However, ensure that you maintain some flexibility in your plans to allow for changes in your goals or opportunities that may arise unexpectedly.",
],
  "Spending Habits": [
  "High Spenders tend to allocate a significant portion of their income towards purchases. This spending behavior can lead to impressive lifestyles but might compromise your ability to save for future needs or emergencies. Implementing a structured budget with clear limits on discretionary spending can help manage your finances more effectively and increase your savings.",
  "As a Spender, you are comfortable spending money, often prioritizing immediate enjoyment or convenience over long-term savings. While this may enhance your quality of life, ensuring it doesn't impede your financial security is essential. Adopting a budget that includes savings as a fixed expense could help balance your spending habits with your financial health goals.",
  "A Neutral score in spending habits means you maintain a balance between spending and saving. This approach allows you to enjoy your present lifestyle while preparing for the future. Continue practicing this balanced financial behavior, and consider adjusting your strategies as your financial goals and circumstances evolve.",
  "Savers prioritize accumulating money over making unnecessary purchases. Your disciplined approach to finances ensures you are well-prepared for the future, but it may also mean missing out on some of life’s pleasures. To maintain a healthy balance, allocate a portion of your budget for leisure and enjoyment, ensuring you enjoy the present while saving for the future.",
  "High Savers exhibit an extreme commitment to saving money, often at the expense of current personal enjoyment. This approach provides a significant financial cushion and excellent security but can diminish quality of life if too restrictive. Allowing yourself some flexibility in your budget for occasional treats or experiences can enhance your overall happiness without compromising your financial stability."
],
  "Influence": [
  "Scoring High Internal Influence indicates that your financial decisions are predominantly guided by your personal beliefs and values, largely independent of external influences. You trust your judgment and rarely seek or follow advice from others unless it aligns closely with your own insights. While this can lead to a strong sense of financial autonomy, be mindful to occasionally seek external perspectives to avoid potential biases and to ensure a well-rounded view of your financial landscape.",
  "An Internal Influence score suggests that while you consider external advice and trends, your financial decisions are primarily based on your own reasoning. You may consult others but ultimately rely on your personal assessment to guide your actions. This level of independence is beneficial for confidence in financial decision-making, but maintaining a balance by considering credible external input can sometimes offer valuable insights.",
  "A Neutral score in Influence means you balance your internal convictions with external input in financial decision-making. You value your own ideas but also recognize the benefits of external advice, allowing for a diversified approach to financial strategies. This balance helps you adapt to various financial scenarios effectively, making informed yet personal decisions.",
  "Scoring as External indicates that your financial decisions are significantly influenced by others, including experts, peers, and prevailing trends. You often seek advice and may rely heavily on recommendations from trusted sources. While this can keep you informed of current trends and ideas, it's essential to critically assess all advice to ensure it aligns with your financial goals.",
  "Highly External scorers are deeply influenced by external factors in their financial decisions, often prioritizing popular opinion and trends over personal judgment. You may find security in following the crowd or an expert’s guidance. To maintain a healthy financial perspective, it’s crucial to develop your ability to evaluate external influences critically, ensuring they complement your financial objectives without compromising your autonomy."
],
  "Knowledge": [
  "As a Novice, you have yet to truly dig into your financial journey, concepts, and products, which may limit your ability to make fully informed decisions. It's essential to begin building a foundational knowledge of basic financial principles, such as budgeting, saving, and the importance of credit scores. Engaging in financial education resources and seeking guidance from financial literacy programs can accelerate your learning and confidence.",
  "Beginners have a basic understanding of financial principles but still require further education to effectively navigate more complex financial decisions. You are familiar with simple budgeting and saving strategies but may still need to understand investing or the broader economic factors that could impact your finances. Expanding your knowledge through more detailed financial education courses and practical experience will be beneficial.",
  "With an Intermediate level of knowledge, you understand fundamental financial concepts and have some experience with more complex issues like investments and loans. You can manage your finances with some confidence and are prepared to explore more sophisticated financial products. Continuing to build your knowledge through advanced courses and staying updated with financial news can help refine your skills.",
  "Proficient individuals possess a solid understanding of a wide range of financial topics and can make informed decisions across most financial areas. You feel comfortable with various financial instruments and can strategize effectively regarding personal finance management, investments, and retirement planning. To enhance your proficiency, consider deepening your expertise in specific areas of interest or potential growth.",
  "Knowledgeable individuals have a comprehensive understanding of finance, excelling in various areas, from basic budgeting to complex investment strategies. Your depth of knowledge allows you to navigate the financial landscape with expert insight, making well-informed decisions that optimize your financial potential. Continuing education, mentorship, and active participation in financial communities can further enhance your expertise and keep you at the forefront of new developments."
]
}

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
      const updatedScore2 = factorScore.map((item) => {
      let currentDesc = scoreDescriptions[item.name] 
      let currentScore = getFactorPercentData(item)
      var index = 0;
      if (currentScore > 86) {
          index = 4;
        } else if (currentScore > 71 && currentScore < 86) {
          index = 3;
        } else if (currentScore > 56 && currentScore < 71) {
          index = 2;
        } else if (currentScore > 40 && currentScore < 56) {
          index = 1;
        } 
      return {
            ...item,
            description: currentDesc[index]
          }
      }
    );
    setfactorScore(updatedScore2);

      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error getting user:", error.message);
        return null;
      }
      const uid = data.session.user.id;
      const phenotype = calculatePhenotype(factorScore);
      const responseData = { userID: uid, factorScores: updatedScore2, phenotype: phenotype };
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
