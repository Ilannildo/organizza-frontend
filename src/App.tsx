import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StyledEngineProvider, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";

import { theme } from "./theme";
import { AppRoutes } from "./routes";
import { AuthProvider } from "./contexts/AuthContext";
import { WithAxios } from "./contexts/WithAxios";
import { ptBR } from "date-fns/locale";
import { NavigationScroll } from "./layout/NavigationScroll";
import { CustomizationProvider } from "./contexts/CustomizationContext";
import { setDefaultOptions } from "date-fns";
import { EventCheckoutProvider } from "./contexts/EventCheckout";

const queryClient = new QueryClient();
setDefaultOptions({ locale: ptBR });

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CustomizationProvider>
          <ThemeProvider theme={theme}>
            <StyledEngineProvider injectFirst>
              <BrowserRouter>
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  adapterLocale={ptBR}
                >
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
                  <WithAxios>
                    <NavigationScroll>
                      <EventCheckoutProvider>
                        <AppRoutes />
                      </EventCheckoutProvider>
                    </NavigationScroll>
                  </WithAxios>
                </LocalizationProvider>
              </BrowserRouter>
            </StyledEngineProvider>
          </ThemeProvider>
        </CustomizationProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
