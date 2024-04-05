// SavingsInputForm.jsx
import React, { useState } from "react";
import { Box, FormControl, TextField, Button } from "@mui/material";

function SavingsInputForm({ onSubmit }) {
  // Prop name corrected to match the passed prop from the parent
  const [formData, setFormData] = useState({
    startingBalance: "",
    annualYield: "",
    monthlyContribution: "",
    yearsToSave: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: parseFloat(value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // This will call the function passed from the parent component
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
        display: "flex", // Enable flexbox
        justifyContent: "center", // Center content horizontally
        alignItems: "center", // Center content vertically (optional)
      }}
    >
      <FormControl>
        <TextField
          label="Starting Balance"
          type="number"
          name="startingBalance"
          value={formData.startingBalance}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          label="Annual Yield % (APY)"
          type="number"
          name="annualYield"
          value={formData.annualYield}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          label="Monthly Contribution"
          type="number"
          name="monthlyContribution"
          value={formData.monthlyContribution}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          label="Years to Save"
          type="number"
          name="yearsToSave"
          value={formData.yearsToSave}
          onChange={handleChange}
          variant="outlined"
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Calculate
        </Button>
      </FormControl>
    </Box>
  );
}

export default SavingsInputForm;
