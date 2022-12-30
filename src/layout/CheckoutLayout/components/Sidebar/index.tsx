import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Clock } from "phosphor-react";

import Logo from "../../../../assets/images/logo.svg";
import { useEventCheckout } from "../../../../hooks/useEventCheckout";
import {
  formatCurrency,
  getReturnValuesCounter,
} from "../../../../utils/masks";

export const CheckoutSidebar = () => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const {
    serviceOrder,
    isExpired,
    isFetchingServiceOrder,
    handleResetServiceOrder,
    paymentMethod,
  } = useEventCheckout();

  const [counter, setCounter] = useState(0);
  const [stated, setStarted] = useState(false);
  const [days, hours, minutes, seconds] = getReturnValuesCounter(counter);

  useEffect(() => {
    if (serviceOrder) {
      setStarted(true);
      setCounter(
        new Date(serviceOrder.expires_in * 1000).getTime() -
          new Date().getTime()
      );
    }
  }, [serviceOrder]);

  useEffect(() => {
    if (serviceOrder && stated) {
      const interval = setInterval(() => {
        const countDownDate = new Date(
          serviceOrder.expires_in * 1000
        ).getTime();
        setCounter(countDownDate - new Date().getTime());
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [stated, serviceOrder]);

  useEffect(() => {
    if (serviceOrder && days + hours + minutes + seconds <= 0 && stated) {
      handleResetServiceOrder();
      setStarted(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days, hours, minutes, seconds, serviceOrder, stated]);

  return (
    <Box
      sx={{
        flexShrink: { md: 0 },
        width: matchUpMd ? 350 : "auto",
        backgroundColor: "rgba(0,98,161, 0.05)",
        ml: 2,
        py: 3,
        px: 5,
      }}
    >
      {serviceOrder && !isFetchingServiceOrder && (
        <div
          style={{
            position: "sticky",
            top: 24
          }}
        >
          <Grid container>
            <Grid item lg={6} xs={6}>
              <Typography
                fontSize={14}
                sx={{
                  color: (theme) => theme.palette.onPrimaryContainer.main,
                  fontWeight: 500,
                }}
              >
                Detalhe do seu pedido
              </Typography>
            </Grid>
            {stated && (
              <Grid item lg={6} xs={6} justifyContent="flex-end" display="flex">
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Clock size={24} />
                  <Typography
                    fontSize={14}
                    sx={{
                      color: (theme) => theme.palette.onPrimaryContainer.main,
                      fontWeight: 500,
                      width: 16,
                    }}
                  >
                    {isExpired ? "00:00" : `${minutes}:${seconds}`}
                  </Typography>
                </Stack>
              </Grid>
            )}
          </Grid>
          <Grid container mt={6}>
            <Grid item lg={12} xs={12}>
              <Grid container>
                <Grid
                  item
                  lg={12}
                  xs={12}
                  alignItems="center"
                  display="flex"
                  textAlign="center"
                  flexDirection="column"
                >
                  <img
                    src={serviceOrder.ticket.icon_url || Logo}
                    alt=""
                    width="68"
                  />
                  <Typography
                    fontSize={18}
                    sx={{
                      color: (theme) => theme.palette.onPrimaryContainer.main,
                      fontWeight: 500,
                    }}
                  >
                    {serviceOrder.ticket.event_title}
                  </Typography>
                  <Typography
                    fontSize={14}
                    sx={{
                      color: (theme) => theme.palette.onPrimaryContainer.main,

                      mt: 1,
                    }}
                  >
                    {serviceOrder.ticket.title}
                  </Typography>
                  <Typography
                    fontSize={14}
                    sx={{
                      color: (theme) => theme.palette.onPrimaryContainer.main,
                      mt: 1,
                    }}
                  >
                    Quantidade: {serviceOrder.quantity}
                  </Typography>
                </Grid>
                <Grid item lg={12} xs={12} mt={2}>
                  <Divider />
                  <Stack mt={2} justifyContent="space-between" direction="row">
                    <Typography
                      fontSize={14}
                      sx={{
                        color: (theme) => theme.palette.onPrimaryContainer.main,
                      }}
                    >
                      Subtotal
                    </Typography>
                    <Typography
                      fontSize={14}
                      sx={{
                        color: (theme) => theme.palette.onPrimaryContainer.main,
                      }}
                    >
                      {formatCurrency(serviceOrder.subtotal)}
                    </Typography>
                  </Stack>
                  <Stack mt={1} justifyContent="space-between" direction="row">
                    <Typography
                      fontSize={14}
                      sx={{
                        color: (theme) => theme.palette.onPrimaryContainer.main,
                      }}
                    >
                      Taxa
                    </Typography>
                    <Typography
                      fontSize={14}
                      sx={{
                        color: (theme) => theme.palette.onPrimaryContainer.main,
                      }}
                    >
                      {formatCurrency(serviceOrder.fee)}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item lg={12} xs={12} mt={2}>
                  <Divider />
                  <Stack mt={2} justifyContent="space-between" direction="row">
                    <Typography
                      fontSize={16}
                      sx={{
                        color: (theme) => theme.palette.onPrimaryContainer.main,
                      }}
                    >
                      Total
                    </Typography>
                    <Typography
                      fontSize={16}
                      sx={{
                        color: (theme) => theme.palette.onPrimaryContainer.main,
                        fontWeight: "bold",
                      }}
                    >
                      {formatCurrency(serviceOrder.total)}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
            {serviceOrder && paymentMethod && (
              <Grid item lg={12} xs={12} mt={5}>
                <Button fullWidth variant="contained" disabled={isExpired}>
                  Finalizar a compra
                </Button>
              </Grid>
            )}
          </Grid>
        </div>
      )}
    </Box>
  );
};
