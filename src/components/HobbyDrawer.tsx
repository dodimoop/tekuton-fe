import {
  Box,
  Container,
  List,
  SwipeableDrawer,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material/";
import React from "react";
import { useFormContext } from "react-hook-form";
import { HobbyTypes } from "../pages/hobby/HobbyTypes";
import MyButton from "./MyButton";
import MySwitch from "./MySwitch";
import MyTextField from "./MyTextField";

interface HobbyDrawerProps {
  open: boolean;
  onClose: () => void;
  detailHobby: HobbyTypes[] | string | object | null;
  handleSaveChange?: () => void;
}

const HobbyDrawer: React.FC<HobbyDrawerProps> = ({
  open,
  onClose,
  detailHobby = null,
  handleSaveChange = () => {},
}) => {
  const { setValue, reset, getValues } = useFormContext();

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
                  {!detailHobby ? "Add Hobby" : "Edit Hobby"}
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <MyTextField
                    name="name"
                    label="Hobby"
                    required
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Input hobby"
                    autoFocus
                  />
                  <MySwitch
                    name="active"
                    label="Active"
                    onChange={(e: any) =>
                      handleInputChange("active", e.target.checked)
                    }
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

export default HobbyDrawer;
