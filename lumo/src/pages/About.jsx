/* About.jsx
Basic about page
*/
import { Stack, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function About() {
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
          About Us
        </Typography>

        <Typography maxWidth="sm" variant="body1" marginTop={2}>
          Article 26 in The United Nations Declaration of Human Rights states that everyone has the
          right to education. As a team of minorities, we have experienced the effects of financial
          literacy not being held to this same standard.
          <br />
          <br />
          Article 26 aims to uplift other minorities and their extended families by creating the
          first personal finance platform leveraging the connection between mental and financial
          health to provide equitable and accessible financial literacy. Not only increasing users'
          knowledge but also instilling better behaviors and habits, leading to better financial
          capability.
          <br />
          <br />
          The <strong>Financial Phenotype Test</strong>, akin to the Myers Briggs personality test,
          is a tool we've developed to help individuals understand their unique financial
          personality. This phenotype, once obtained, informs the personalized financial education
          resources that Article 26 will provide. By understanding one's financial phenotype,
          individuals can gain insights into their financial tendencies, strengths, and areas for
          improvement, enabling them to make more informed financial decisions and build healthier
          financial habits.
          <br />
          <br />
        </Typography>

        <Button variant="contained" component={Link} to="/quiz" color="primary">
          Take the Financial Phenotype Test
        </Button>
      </div>
    </Stack>
  );
}
