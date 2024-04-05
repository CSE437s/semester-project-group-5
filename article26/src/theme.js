import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#DE932B",
      contrastText: "black",
    },
    secondary: {
      main: "#43998b",
    },
  },
  mixins: {
    toolbar: {
      height: 64,
    },
  },
});

export default theme;
