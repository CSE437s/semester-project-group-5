import { useState } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";

export default function PasswordInput(props) {
  const [hidden, setHidden] = useState(true);

  return (
    <TextField
      type={hidden ? "password" : "text"}
      name="password"
      label="Password"
      required
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => setHidden((hidden) => !hidden)}>
              {hidden ? (
                <VisibilityOffIcon htmlColor="gray" />
              ) : (
                <VisibilityIcon htmlColor="lightgray" />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
}
