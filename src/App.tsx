import { StyledEngineProvider, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { theme } from "./theme";
import { AppRoutes } from "./routes";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </StyledEngineProvider>
    </ThemeProvider>
  );
};

export default App;
