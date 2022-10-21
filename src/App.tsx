import { lazy } from "react";
import { StyledEngineProvider, ThemeProvider } from "@mui/material";
import { Loadable } from "./layout/Loadable";

import { theme } from "./theme";

const OrganizerDashboard = Loadable(
  lazy(() => import("./pages/organizer/Dashboard"))
);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <OrganizerDashboard />
      </StyledEngineProvider>
    </ThemeProvider>
  );
};

export default App;
