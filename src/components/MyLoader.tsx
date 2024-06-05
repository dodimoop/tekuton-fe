import { CircularProgress, Grid } from "@mui/material";
import React from "react";

const MyLoader = () => {
  return (
    <Grid
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <CircularProgress />
    </Grid>
  );
};

export default MyLoader;
