import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#00658F",
      light: "#0062A1",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#FF7D10",
      contrastText: "#FFFFFF",
    },
    tertiary: {
      main: "#138E9C",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#FEFEFF",
      paper: "#FEFEFF",
    },
    success: {
      main: "#55DAD2",
      // main: "#A1E3CB",
    },
    error: {
      main: "#BA1A1A",
      light: "#FF4F4F",
    },
    text: {
      primary: "#001E2E",
      disabled: "#8B9198",
    },
    onPrimary: {
      main: "#FFFFFF",
    },
    onPrimaryContainer: {
      main: "#001E2E",
    },
    onSecondary: {
      main: "#FFFFFF",
    },
    onSecondaryContainer: {
      main: "#001F24",
    },
    onSurface: {
      main: "#1B0161",
    },
    onSurfaceVariant: {
      main: "#41484D",
    },
    onTertiary: {
      main: "#FFFFFF",
    },
    onTertiaryContainer: {
      main: "#321300",
    },
    primaryContainer: {
      main: "#C7E7FF",
      dark: "#004C6D",
    },
    secondaryContainer: {
      main: "#95F1FF",
    },
    surfaceVariant: {
      main: "#DDE3EA",
    },
    tertiaryContainer: {
      main: "#FFDBC8",
    },
    neutral: {
      main: "#DDE3EA",
    },
  },
  typography: {
    fontFamily: "Poppins",
    h1: {
      color: "#001E2E",
    },
  },
  components: {
    // Name of the component
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
  },
});

declare module "@mui/material/styles" {
  interface PaletteOptions {
    tertiary: PaletteOptions["primary"];
    onPrimary: PaletteOptions["primary"];
    onPrimaryContainer: PaletteOptions["primary"];
    primaryContainer: PaletteOptions["primary"];
    onSecondary: PaletteOptions["primary"];
    onSecondaryContainer: PaletteOptions["primary"];
    secondaryContainer: PaletteOptions["primary"];
    onTertiary: PaletteOptions["primary"];
    onTertiaryContainer: PaletteOptions["primary"];
    tertiaryContainer: PaletteOptions["primary"];
    onSurface: PaletteOptions["primary"];
    onSurfaceVariant: PaletteOptions["primary"];
    surfaceVariant: PaletteOptions["primary"];
    neutral: PaletteOptions["primary"];
  }

  interface Palette {
    tertiary: Palette["primary"];
    onPrimary: Palette["primary"];
    onPrimaryContainer: Palette["primary"];
    primaryContainer: Palette["primary"];
    onSecondary: Palette["primary"];
    onSecondaryContainer: Palette["primary"];
    secondaryContainer: Palette["primary"];
    onTertiary: Palette["primary"];
    onTertiaryContainer: Palette["primary"];
    tertiaryContainer: Palette["primary"];
    onSurface: Palette["primary"];
    onSurfaceVariant: Palette["primary"];
    surfaceVariant: Palette["primary"];
    neutral: Palette["primary"];
  }
}
