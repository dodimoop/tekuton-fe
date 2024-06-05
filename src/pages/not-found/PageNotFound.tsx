import { Box } from "@mui/material";
import React from "react";

const PageNotFound = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <img
        src="/assets/page-not-found.jpg"
        alt="hr-logo"
        style={{ width: "40vw", height: "auto" }}
      />
    </Box>
  );
};

export default PageNotFound;
