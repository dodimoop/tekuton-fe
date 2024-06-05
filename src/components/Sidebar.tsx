import { ListAlt as ListAltIcon } from "@mui/icons-material";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const menus = [
  { name: "User", route: "/users", icon: <ListAltIcon /> },
  { name: "Hobby", route: "/hobby", icon: <ListAltIcon /> },
];

const Sidebar: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      anchor="left"
      open={isOpen}
      onClose={onClose}
      sx={{ width: "240px", flexShrink: 0 }}
    >
      <Box sx={{ width: "240px" }}>
        <Box display="flex">
          <img
            src="/assets/team-work.jpg"
            alt="hr-logo"
            style={{ width: "100%", height: "64px" }}
          />
        </Box>
        <Divider />
        <List>
          {menus.map((menu) => (
            <ListItem
              key={menu.name}
              sx={{
                padding: 0,
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
                backgroundColor:
                  location.pathname === menu.route
                    ? "hsl(210, 100%, 96%)"
                    : "inherit",
              }}
            >
              <ListItemButton
                className="p-0"
                disableRipple
                onClick={() => {
                  navigate(menu.route);
                  onClose();
                }}
                sx={{
                  padding: 0,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexGrow: 1,
                    alignItems: "center",
                  }}
                >
                  <Typography
                    style={{
                      height: "40px",
                      width: "4px",
                      backgroundColor:
                        location.pathname === menu.route
                          ? "hsl(210, 100%, 42%)"
                          : "inherit",
                      marginRight: "14px",
                    }}
                  />
                  <ListItemIcon
                    sx={{
                      minWidth: "30px",
                      height: "20px",
                      width: "18px",
                      "& .MuiSvgIcon-root": {
                        color:
                          location.pathname === menu.route
                            ? "hsl(210, 100%, 42%)"
                            : "inherit",
                      },
                    }}
                  >
                    {menu.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        sx={{
                          color:
                            location.pathname === menu.route
                              ? "hsl(210, 100%, 42%)"
                              : "inherit",
                        }}
                        fontSize={14}
                        fontWeight={500}
                      >
                        {menu.name}
                      </Typography>
                    }
                  />
                </Box>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
