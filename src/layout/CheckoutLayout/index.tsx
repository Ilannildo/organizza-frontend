import { Outlet, Params, useNavigate, useParams } from "react-router-dom";
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  styled,
  Toolbar,
  useTheme,
} from "@mui/material";
import LogoSection from "../MainPanelLayout/components/LogoSection";
import { CheckoutSidebar } from "./components/Sidebar";
import { useEventCheckout } from "../../hooks/useEventCheckout";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    width: "100%",
    minHeight: "calc(100vh - 56px)",
    flexGrow: 1,
    marginTop: "56px",
  })
);

interface IParams extends Params {
  serviceOrderId: string;
  slug: string;
}

const CheckoutLayout = () => {
  const theme = useTheme();
  const { serviceOrderId, slug } = useParams<IParams>();
  const navigate = useNavigate();

  const {
    serviceOrder,
    handleGetServiceOrder,
    isExpired,
    handleChangeExpired,
  } = useEventCheckout();

  useEffect(() => {
    if (serviceOrderId) {
      handleGetServiceOrder({ serviceOrderId }).catch((err) => {
        if (err.response) {
          toast.error(err.response.data.error.message);
        } else {
          toast.error("Ocorreu um problema ao realizar o pagamento");
        }
        navigate(`/evento/${slug}`);
        console.log("error");
      });
    } else {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceOrderId, navigate, slug]);

  useEffect(() => {
    if (!serviceOrder && isExpired) {
      toast.info("O tempo que tinha para fazer a compra acabou");
      setTimeout(() => {
        handleChangeExpired(false);
        navigate(`/evento/${slug}`);
      }, 300);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpired, serviceOrder, navigate, slug]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          bgcolor: theme.palette.primary.main,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LogoSection />
          </Toolbar>
        </Container>
      </AppBar>
      <Main theme={theme}>
        <Container
          maxWidth="xl"
          sx={{
            display: "flex",
            flexDirection: "row",
            minHeight: "calc(100vh - 56px)",
          }}
        >
          <Outlet />
          <CheckoutSidebar />
        </Container>
      </Main>
    </Box>
  );
};

export default CheckoutLayout;
