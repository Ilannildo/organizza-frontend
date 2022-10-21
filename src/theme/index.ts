import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#00497A",
      light: "#0062A1",
      dark: "#9CCAFF",
    },
    secondary: {
      main: "#F19413",
      light: "#895100",
      dark: "#FFB86C",
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
      dark: "#FFB4AB",
    },
  },
});
