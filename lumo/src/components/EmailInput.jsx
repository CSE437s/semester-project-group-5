import { TextField } from "@mui/material";

export default function EmailInput(props) {
  return (
    <TextField
      type="email"
      name="email"
      label="Email Address"
      autoComplete="email"
      required
      {...props}
    />
  );
}
