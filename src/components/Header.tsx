import { Menu as MenuIcon } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import React, { useState } from "react";
import { FormProvider } from "react-hook-form";

import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { AppContext, useAppContext } from "../AppContext";
import MyButton from "./MyButton";
import Sidebar from "./Sidebar";

interface HeaderProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar, isSidebarOpen }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const { me } = useAppContext();

  const store = useAppContext();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const navigate = useNavigate();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    toast.success("See you again!", {
      transition: Bounce,
      onClose: () => navigate("/"),
    });
    setAnchorEl(null);
  };

  const handleToggleSidebar = () => {
    onToggleSidebar();
  };

  const handleMenuIconHover = () => {
    setIsHovered(true);
    if (!isSidebarOpen) {
      handleToggleSidebar();
    }
  };

  const handleMenuIconLeave = () => {
    setIsHovered(false);
    if (isSidebarOpen && !isHovered) {
      handleToggleSidebar();
    }
  };

  return (
    <>
      <AppContext.Provider value={store}>
        <FormProvider {...store.methods}>
          <AppBar position="fixed" sx={{ backgroundColor: "white" }}>
            <Toolbar
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onMouseEnter={handleMenuIconHover}
                onMouseLeave={handleMenuIconLeave}
              >
                <MenuIcon color="primary" />
              </IconButton>
              <div>
                <MyButton
                  onClick={(e: any) => handleMenu(e)}
                  variant="outlined"
                  startIcon={<AccountCircleIcon />}
                  endIcon={
                    anchorEl ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )
                  }
                  sx={{
                    border: "none",
                    "&:hover": {
                      border: "none",
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  {me?.firstName || ""} {me?.lastName || ""}
                </MyButton>

                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  sx={{ top: "50px" }}
                >
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </div>
            </Toolbar>
          </AppBar>
          <Sidebar isOpen={isSidebarOpen} onClose={onToggleSidebar} />
        </FormProvider>
      </AppContext.Provider>
    </>
  );
};

export default Header;
