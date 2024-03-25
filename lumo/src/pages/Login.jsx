import React from "react";
import { Navigate } from "react-router";

import { Box, Button, Container, Typography } from "@mui/material";
import Form from "../components/Form";
import EmailInput from "../components/EmailInput";
import PasswordInput from "../components/PasswordInput";
import Logo from "../components/Logo";
import Link from "../components/Link";

import { useMutation } from "@tanstack/react-query";
import { supabase } from "../supabase";
import { useSession } from "../services/api";

export default function Login() {
  const session = useSession();

  const { mutate: login, isLoading } = useMutation(async (formData) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (error) {
      console.error(error);
    }
  });

  // Navigate back to the home page on login.
  if (session) {
    return <Navigate to="/About" replace />;
  }

  return (
    <Box className="fullscreen-no-toolbar" display="flex" alignItems="center" padding={1}>
      <Container maxWidth="xs">
        <Box display="flex" flexDirection="column" alignItems="center">
          <Logo />

          <Form method="post" action={login} sx={{ marginTop: 4 }}>
            <EmailInput autoFocus fullWidth />
            <PasswordInput fullWidth margin="normal" />

            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              fullWidth
              sx={{ marginTop: 3 }}
            >
              Sign In
            </Button>
          </Form>

          <Link to="/forgot" color="text.secondary" sx={{ marginTop: 2 }}>
            Forgot your password?
          </Link>
        </Box>

        <Typography marginTop={4}>
          Don't have an account?{" "}
          <Link to="/register" color="primary.light">
            Sign up
          </Link>
        </Typography>
      </Container>
    </Box>
  );
}
