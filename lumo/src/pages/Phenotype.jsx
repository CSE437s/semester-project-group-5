/* About.jsx
Basic about page
*/
import { Stack, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Phenotype() {
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
          blah blah blah blah
          <br />
          button should render if they haven't taken the test. if not logged in, they should be
          directed to the auth page
          <br />
        </Typography>

        <Button variant="contained" component={Link} to="/quiz" color="primary">
          Take the Financial Phenotype Test
        </Button>
      </div>
    </Stack>
  );
}
