import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { CircularProgress, Grid, Link } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import MyButton from "../../components/MyButton";
import MyTextField from "../../components/MyTextField";
import MyToastContainer from "../../components/MyToastContainer";
import { SignInContext, useSignInContext } from "./SignInContext";

const SignIn = () => {
  const store = useSignInContext();

  const { handleLogin, loading } = store;

  const navigate = useNavigate();

  React.useEffect(() => {
    const me = localStorage.getItem("me");
    const path = window.location.pathname;

    if (me && path === "/") {
      navigate("/users");
    } else if (!me) {
      navigate("/");
    }
  }, []);

  return (
    <SignInContext.Provider value={store}>
      <FormProvider {...store.methods}>
        <MyToastContainer />
        <Container
          component="main"
          maxWidth="xs"
          sx={{ height: "90vh", width: "90vw" }}
        >
          <Box mt={8} display="flex" flexDirection="column" alignItems="center">
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box sx={{ mt: 1 }}>
              <MyTextField
                name="email"
                label="Email Address"
                required
                placeholder="Your email"
                autoFocus
                autoComplete="email"
              />
              <MyTextField
                name="password"
                label="Password"
                type="password"
                required
                placeholder="Your password"
                autoComplete="current-password"
              />
              <MyButton onClick={handleLogin} sx={{ mt: 3, mb: 2 }}>
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Sign In"
                )}
              </MyButton>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/sign-up" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </FormProvider>
    </SignInContext.Provider>
  );
};

export default SignIn;
