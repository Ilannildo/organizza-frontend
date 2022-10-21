import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#00497A",
      light: "#0062A1",
    },
    secondary: {
      main: "#F19413",
      light: "#895100",
    },
    background: {
      default: "#FDFCFF",
      paper: "#FDFCFF",
    },
    success: {
      main: "#00D488",
    },
    error: {
      main: "#BA1A1A",
      light: "#FF4F4F",
    },
  },
  typography: {
    fontFamily: "Inter",
    h1: {
      color: "#42474E",
    },
  },
});
