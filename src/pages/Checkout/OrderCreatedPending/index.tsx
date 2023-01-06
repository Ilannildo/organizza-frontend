import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import {
  CheckCircle,
  Clock,
  Copy,
  DeviceMobileCamera,
  EnvelopeSimple,
} from "phosphor-react";
import { Params, useLocation, useNavigate, useParams } from "react-router-dom";
import { Main } from "../../../layout/CheckoutLayout";
import LogoSection from "../../../layout/MainPanelLayout/components/LogoSection";
import QrCodeIcon from "../../../assets/icons/QrCode.svg";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { IPayServiceOrderResponse } from "../../../models/serviceOrder";
import { formatCurrency, getReturnValuesCounter, padTo2Digits } from "../../../utils/masks";

interface IParams extends Params {
  slug: string;
}

interface IState {
  order: IPayServiceOrderResponse;
  ammout: number;
}

const CheckoutOrderCreatedPending = () => {
  const theme = useTheme();
  const { slug } = useParams<IParams>();
  const navigate = useNavigate();
  const location = useLocation();
  const [orderCreated, setOrderCreated] = useState<IState | null>(null);

  const [counter, setCounter] = useState(0);
  const [started, setStarted] = useState(false);
  const [days, hours, minutes, seconds] = getReturnValuesCounter(counter);

  useEffect(() => {
    if (orderCreated && started) {
      if (orderCreated.order.expires_at) {
        const countDownDate = new Date(orderCreated.order.expires_at).getTime();
        const interval = setInterval(() => {
          setCounter(countDownDate - new Date().getTime());
        }, 1000);
        return () => clearInterval(interval);
      }
    }
  }, [started, orderCreated]);

  useEffect(() => {
    if (
      orderCreated &&
      orderCreated.order &&
      days + hours + minutes + seconds <= 0 &&
      started
    ) {
      setStarted(false);
      navigate(`/evento/${slug}`, {
        replace: true,
      });
    }
  }, [days, hours, minutes, seconds, orderCreated, started, navigate, slug]);

  const onCopyCode = () => {
    console.log("Copiar code");
  };

  const onSendEmailNotification = () => {
    console.log("enviar email");
  };

  useEffect(() => {
    if (!location.state) {
      navigate(`/evento/${slug}`, {
        replace: true,
      });
    } else {
      setOrderCreated(location.state);
    }
  }, [location, navigate, slug]);

  useEffect(() => {
    if (orderCreated && orderCreated.order.expires_at) {
      if (new Date(orderCreated.order.expires_at) < new Date()) {
        navigate(`/evento/${slug}`, {
          replace: true,
        });
      } else {
        setStarted(true);
        setCounter(
          new Date(orderCreated.order.expires_at).getTime() -
            new Date().getTime()
        );
      }
    }
  }, [orderCreated, navigate, slug]);

  return (
    <>
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
          maxWidth="lg"
          sx={{
            display: "flex",
            flexDirection: "row",
            height: "100%",
          }}
        >
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            display="flex"
          >
            {orderCreated && (
              <Grid item lg={7} md={8} sm={12} xs={12}>
                <Grid container spacing={2}>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Grid
                      container
                      justifyContent="center"
                      alignItems="center"
                      display="flex"
                    >
                      <Grid
                        item
                        lg={8}
                        md={8}
                        sm={12}
                        xs={12}
                        textAlign="center"
                        justifyContent="center"
                        alignItems="center"
                        display="flex"
                        flexDirection="column"
                        mb={2}
                      >
                        <CheckCircle
                          size={48}
                          color={theme.palette.success.main}
                        />

                        <Typography
                          fontSize={22}
                          sx={{
                            color: (theme) =>
                              theme.palette.onPrimaryContainer.main,
                            fontWeight: 600,
                          }}
                        >
                          {orderCreated.order.status === "pending"
                            ? `Inscrição aguardando pagamento`
                            : "Teste"}
                        </Typography>
                      </Grid>
                      {orderCreated.order.expires_at && (
                        <Grid item lg={8} md={8} xs={12} textAlign="center">
                          <Typography
                            fontSize={14}
                            sx={{
                              color: (theme) =>
                                theme.palette.onPrimaryContainer.main,
                            }}
                          >
                            O pix no valor {formatCurrency(orderCreated.ammout)}{" "}
                            foi gerado e pode ser pago até o dia{" "}
                            {format(
                              new Date(orderCreated.order.expires_at),
                              "dd/MM/yyyy 'às' HH:mm"
                            )}
                          </Typography>
                        </Grid>
                      )}
                      {started && (
                        <Grid
                          item
                          lg={8}
                          xs={8}
                          mt={1}
                        >
                          <Stack
                            direction="row"
                            alignItems="center"
                            width="100%"
                            justifyContent="center"
                            spacing={1}
                          >
                            <Clock size={22} />
                            <Typography
                              fontSize={14}
                              sx={{
                                color: (theme) =>
                                  theme.palette.onPrimaryContainer.main,
                                fontWeight: 500,
                                width: 44,
                              }}
                            >
                              {`${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`}
                            </Typography>
                          </Stack>
                        </Grid>
                      )}

                      <Grid
                        item
                        lg={6}
                        md={6}
                        xs={12}
                        mt={2}
                        mb={2}
                        justifyContent="center"
                        alignItems="center"
                        display="flex"
                        flexDirection="column"
                      >
                        <Box
                          sx={{
                            height: 225,
                            width: 225,
                            backgroundColor: theme.palette.onPrimary.main,
                          }}
                        >
                          <img
                            src={orderCreated.order.qr_code_url}
                            alt="Pix payment"
                            width="100%"
                          />
                        </Box>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          width="100%"
                          mt={1}
                        >
                          <Button
                            variant="text"
                            size="small"
                            color="inherit"
                            disableElevation
                            onClick={() => onCopyCode()}
                            startIcon={<Copy size={18} />}
                          >
                            Copiar código
                          </Button>
                          <Button
                            variant="text"
                            size="small"
                            color="inherit"
                            disableElevation
                            onClick={() => onSendEmailNotification()}
                            startIcon={<EnvelopeSimple size={18} />}
                          >
                            Enviar por email
                          </Button>
                        </Stack>
                      </Grid>

                      <Grid item lg={8} md={8} xs={12} mt={1}>
                        <Grid container>
                          <Grid item lg={12} md={12} xs={12} textAlign="center">
                            <Typography
                              fontSize={14}
                              sx={{
                                color: (theme) =>
                                  theme.palette.onPrimaryContainer.main,
                                fontWeight: 600,
                              }}
                            >
                              Como pagar?
                            </Typography>
                          </Grid>
                          <Grid item lg={12} md={12} xs={12}>
                            <Stack
                              spacing={2}
                              direction="row"
                              alignItems="center"
                              width="100%"
                            >
                              <DeviceMobileCamera size={18} color="#73777F" />
                              <Typography
                                fontSize={14}
                                sx={{
                                  color: (theme) =>
                                    theme.palette.onPrimaryContainer.main,
                                }}
                              >
                                Abra o app do seu banco e escolha pagar com Pix
                              </Typography>
                            </Stack>
                            <Stack
                              spacing={2}
                              direction="row"
                              alignItems="center"
                              width="100%"
                            >
                              <img src={QrCodeIcon} alt="qr-code" width={18} />
                              <Typography
                                fontSize={14}
                                sx={{
                                  color: (theme) =>
                                    theme.palette.onPrimaryContainer.main,
                                }}
                              >
                                Selecione a opção pagar com QR Code e escaneie o
                                código acima ou copie o código e selecione a
                                opção Pix Copia e Cola
                              </Typography>
                            </Stack>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Container>
      </Main>
    </>
  );
};

export default CheckoutOrderCreatedPending;
