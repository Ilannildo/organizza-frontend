import { Outlet, Params, useNavigate, useParams } from "react-router-dom";
import { AppBar, Container, styled, Toolbar, useTheme } from "@mui/material";
import LogoSection from "../MainPanelLayout/components/LogoSection";
import { CheckoutSidebar } from "./components/Sidebar";
import { useEventCheckout } from "../../hooks/useEventCheckout";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Codes } from "../../utils/codes";

export const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  width: "100%",
  height: "100%",
  flexGrow: 1,
}));

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
          if (err.response.data.error.code === Codes.EXPIRED_TIME) {
            navigate(`/evento/${slug}/checkout/buy/expired`, {
              replace: true,
            });
          } else {
            toast.info(err.response.data.error.message);
            navigate(`/evento/${slug}`, {
              replace: true,
            });
          }
        } else {
          toast.error("Ocorreu um problema ao realizar o pagamento");
        }
        console.log("error");
      });
    } else {
      navigate("/", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceOrderId, navigate, slug]);

  useEffect(() => {
    if (!serviceOrder && isExpired) {
      setTimeout(() => {
        handleChangeExpired(false);
        navigate(`/evento/${slug}/checkout/buy/expired`, {
          replace: true,
        });
      }, 300);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpired, serviceOrder, navigate, slug, serviceOrderId]);

  return (
    <>
      <AppBar
        color="inherit"
        elevation={0}
        position="relative"
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
          maxWidth="lg"
          sx={{
            display: "flex",
            flexDirection: "row",
            // height: "calc(100vh - 50px)",
          }}
        >
          <Outlet />
          <CheckoutSidebar />
        </Container>
      </Main>
    </>
  );
};

export default CheckoutLayout;
