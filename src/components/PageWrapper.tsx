import { Box } from "@mui/material";
import React, { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface PageWrapperProps {
  children: ReactNode;
}

const PageWrapper = ({ children }: PageWrapperProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <Header
        onToggleSidebar={handleToggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />
      <Sidebar isOpen={isSidebarOpen} onClose={handleToggleSidebar} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: "64px",
          overflowY: "auto",
          minHeight: "100vh",
        }}
      >
        <Box mx={3.5} my={1}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default PageWrapper;
