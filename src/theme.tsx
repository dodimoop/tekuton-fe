import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiPopover: {
      defaultProps: {
        container: document.getElementById("root"),
      },
    },
    MuiPopper: {
      defaultProps: {
        container: document.getElementById("root"),
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        asterisk: {
          color: "red",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          //   backgroundColor: "#008DE4",
          textTransform: "none",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#F7FAFD",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: "10px",
        },
      },
    },
  },
});

export default theme;
