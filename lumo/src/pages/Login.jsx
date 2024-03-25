import React from "react";
import { Navigate } from "react-router";

import { Box, Button, Container, Typography } from "@mui/material";
import Form from "../components/Form";
import EmailInput from "../components/EmailInput";
import PasswordInput from "../components/PasswordInput";
import Logo from "../components/Logo";
import Link from "../components/Link";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../supabase";
import { useSession } from "../services/api";

export default function Login() {
  const session = useSession();
  // Navigate back to the home page on login.
  if (session) {
    return <Navigate to="/About" replace />;
  }

  return (
    <Box className="fullscreen-no-toolbar" display="flex" alignItems="center" padding={1}>
      <Container maxWidth="xs">
        <Box display="flex" flexDirection="column" alignItems="center">
          <Logo />
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={["google"]}
          />
        </Box>
      </Container>
    </Box>
  );
}
