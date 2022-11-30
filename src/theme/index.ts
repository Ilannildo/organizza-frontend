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
    tertiary: {
      main: "#9A405A",
    },
    background: {
      default: "#FDFCFF",
      paper: "#FDFCFF",
    },
    success: {
      // main: "#00D488",
      main: "#A1E3CB",
    },
    error: {
      main: "#BA1A1A",
      light: "#FF4F4F",
    },
    text: {
      primary: "#001D35",
      disabled: "#42474E",
    },
    onPrimary: {
      main: "#FFFFFF",
    },
    onPrimaryContainer: {
      main: "#001D35",
    },
    onSecondary: {
      main: "#FFFFFF",
    },
    onSecondaryContainer: {
      main: "#2C1600",
    },
    onSurface: {
      main: "#1A1C1E",
    },
    onSurfaceVariant: {
      main: "#C2C7CF",
    },
    onTertiary: {
      main: "#FFFFFF",
    },
    onTertiaryContainer: {
      main: "#3F0019",
    },
    primaryContainer: {
      main: "#D0E4FF",
    },
    secondaryContainer: {
      main: "#FFDCBD",
    },
    surfaceVariant: {
      main: "#DFE3EB",
    },
    tertiaryContainer: {
      main: "#FFD9E0",
    },
  },
  typography: {
    fontFamily: "Inter",
    h1: {
      color: "#42474E",
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
  }
}
