import { Stack, Typography } from "@mui/material";

export default function Phenotype() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h2">Your Financial Phenotype Report</Typography>
        <Typography>
          In the world of personal finance, individuals exhibit a wide range of financial
          personalities that are influenced by a combination of internal and external factors. These
          personalities can be broadly categorized into eight distinct types based on their
          emotional orientation, strategic approach, and the extent to which they are influenced by
          internal and external factors. Let's explore your financial personality!
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h2">Overall Phenotype Report and Score:</Typography>
        <Typography>Your financial phenotype is [INSERT PHENOTYPE]</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h2">Big 6 Factors:</Typography>
        {/* Add content for Big 6 Factors */}
      </Grid>
    </Grid>
  );
}
