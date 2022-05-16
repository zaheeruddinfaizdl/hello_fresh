import React from "react";
import { Button, Container } from "@mui/material";
import { Google } from "@mui/icons-material";

function Login() {
  return (
    <Container maxWidth="sm">
      <Button variant="outlined" startIcon={<Google />} href="/api/google/login">
        Continue With Google
      </Button>
    </Container>
  );
}

export default Login;
