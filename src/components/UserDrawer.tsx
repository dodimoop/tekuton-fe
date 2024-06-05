import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Container,
  IconButton,
  InputAdornment,
  List,
  SwipeableDrawer,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material/";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useUserContext } from "../pages/user/UserContext";
import { UserTypes } from "../pages/user/UserTypes";
import MyButton from "./MyButton";
import MySelect from "./MySelect";
import MyTextField from "./MyTextField";

interface UserDrawerProps {
  open: boolean;
  onClose: () => void;
  userDetail: UserTypes[] | string | object | null;
  handleSaveChange?: () => void;
}

const UserDrawer: React.FC<UserDrawerProps> = ({
  open,
  onClose,
  userDetail = null,
  handleSaveChange = () => {},
}) => {
  const { setValue, reset, getValues } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const toggleDrawer =
    () => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      reset();
      onClose();
    };

  const handleInputChange = (fieldName: string, value: string) => {
    setValue(fieldName, value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword: boolean) => !prevShowPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevShowPassword: boolean) => !prevShowPassword);
  };

  const { dataHobbies } = useUserContext();

  return (
    <div>
      <SwipeableDrawer
        anchor="right"
        open={open}
        onClose={toggleDrawer()}
        onOpen={toggleDrawer()}
      >
        <Box
          sx={{ width: isMobile ? 300 : 500 }}
          role="presentation"
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
        >
          <List>
            <Container component="main" maxWidth="xs">
              <Box
                mt={4}
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Typography className="font-bold" variant="h5">
                  {!userDetail ? "Add User" : "Edit User"}
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <MyTextField
                    name="firstName"
                    label="First Name"
                    required
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    placeholder="Input First Name"
                    autoFocus
                  />
                  <MyTextField
                    name="lastName"
                    label="Last Name"
                    required
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    placeholder="Input Last Name"
                  />
                  <MyTextField
                    type="number"
                    name="age"
                    label="Age"
                    required
                    onChange={(e) => handleInputChange("age", e.target.value)}
                    placeholder="Input age"
                  />
                  <MySelect
                    sx={{ mt: 1 }}
                    options={dataHobbies && dataHobbies}
                    name="hobby_ids"
                    onChange={(e: any) =>
                      handleInputChange("hobby_ids", e.target.value)
                    }
                    required
                  />
                  <MyTextField
                    name="email"
                    label="Email Address"
                    required
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Your email"
                    autoComplete="email"
                  />
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
                  <MyTextField
                    name="confirmPassword"
                    label="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    onChange={(e) =>
                      handleInputChange("confirmPassword", e.target.value)
                    }
                    placeholder="Confirm password"
                    autoComplete="confirm-password"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleToggleConfirmPasswordVisibility}
                            edge="end"
                          >
                            {showConfirmPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <MyButton
                    onClick={() => handleSaveChange()}
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Save Changes
                  </MyButton>
                </Box>
              </Box>
            </Container>
          </List>
        </Box>
      </SwipeableDrawer>
    </div>
  );
};

export default UserDrawer;
