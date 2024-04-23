import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "./components/SessionProvider.jsx";
import { ThemeProvider } from "@mui/material";

import App from "./App.jsx";
import theme from "./theme.js";
import "./index.css";

require("dotenv").config();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: true,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <SessionProvider>
          <App />
        </SessionProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
