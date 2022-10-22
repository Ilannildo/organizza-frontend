import { StyledEngineProvider, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { theme } from "./theme";
import { AppRoutes } from "./routes";
import { AuthProvider } from "./contexts/AuthContext";
import { WithAxios } from "./contexts/WithAxios";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <AuthProvider>
      <WithAxios>
        <ThemeProvider theme={theme}>
          <StyledEngineProvider injectFirst>
            <BrowserRouter>
              <ToastContainer
                // position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme="light"
              />
              <AppRoutes />
            </BrowserRouter>
          </StyledEngineProvider>
        </ThemeProvider>
      </WithAxios>
    </AuthProvider>
  );
};

export default App;
