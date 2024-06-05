import { Visibility, VisibilityOff } from "@mui/icons-material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { IconButton, InputAdornment } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { FormProvider } from "react-hook-form";
import MyButton from "../../components/MyButton";
import MyTextField from "../../components/MyTextField";
import MyToastContainer from "../../components/MyToastContainer";
import { SignUpContext, useSignUpContext } from "./SignUpContext";

const SignUp = () => {
  const store = useSignUpContext();
  const { handleSaveChange, methods } = store;
  const { setValue } = methods;
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (
    fieldName: keyof (typeof methods)["formState"]["dirtyFields"],
    value: string
  ) => {
    setValue(fieldName, value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword: boolean) => !prevShowPassword);
  };

  return (
    <SignUpContext.Provider value={store}>
      <FormProvider {...store.methods}>
        <Container component="main" maxWidth="xs">
          <MyToastContainer />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <MyTextField
                    name="firstName"
                    label="First Name"
                    required
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    placeholder="Your first name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <MyTextField
                    name="lastName"
                    label="Last Name"
                    required
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    placeholder="Your last name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <MyTextField
                    type="number"
                    name="age"
                    label="Age"
                    required
                    onChange={(e) => handleInputChange("age", e.target.value)}
                    placeholder="Your age"
                  />
                </Grid>
                <Grid item xs={12}>
                  <MyTextField
                    name="email"
                    label="Email Address"
                    required
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Your email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <MyTextField
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    required
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    placeholder="Your password"
                    autoComplete="current-password"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleTogglePasswordVisibility}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <MyTextField
                    name="confirmPassword"
                    label="Confirm Password"
                    type={showPassword ? "text" : "password"}
                    required
                    onChange={(e) =>
                      handleInputChange("confirmPassword", e.target.value)
                    }
                    placeholder="Confirm Password"
                    autoComplete="confirm-password"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleTogglePasswordVisibility}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              <MyButton
                onClick={() => handleSaveChange()}
                sx={{ mt: 3, mb: 2 }}
              >
                Save Account
              </MyButton>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/" variant="body2">
                    Already have an account? Sign in now!
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </FormProvider>
    </SignUpContext.Provider>
  );
};

export default SignUp;
