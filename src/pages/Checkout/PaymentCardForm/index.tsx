import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import { useEventCheckout } from "../../../hooks/useEventCheckout";

const CheckoutPaymentCardForm = () => {
  const { paymentMethod } = useEventCheckout();

  return (
    <Grid container sx={{ py: 3, px: 1 }}>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Grid container spacing={2}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Typography
              fontSize={14}
              sx={{
                color: (theme) => theme.palette.onPrimaryContainer.main,
                fontWeight: 500,
              }}
            >
              Dados do participante
            </Typography>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Grid container>
                  <Grid item lg={4} md={4} xs={12}>
                    <Typography
                      fontSize={12}
                      sx={{
                        color: (theme) => theme.palette.text.disabled,
                      }}
                    >
                      Nome
                    </Typography>
                    <Typography
                      fontSize={16}
                      sx={{
                        color: (theme) => theme.palette.onPrimaryContainer.main,
                      }}
                    >
                      {paymentMethod?.payment_title}
                    </Typography>
                  </Grid>
                  <Grid item lg={4} md={4} xs={12}>
                    <Typography
                      fontSize={12}
                      sx={{
                        color: (theme) => theme.palette.text.disabled,
                      }}
                    >
                      Email
                    </Typography>
                    <Typography
                      fontSize={16}
                      sx={{
                        color: (theme) => theme.palette.onPrimaryContainer.main,
                      }}
                    >
                      {paymentMethod?.information}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    lg={4}
                    md={4}
                    xs={12}
                    justifyContent="flex-end"
                    alignItems="center"
                    display="flex"
                  >
                    <Button>Alterar</Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Grid container spacing={2}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Typography
                  fontSize={18}
                  sx={{
                    color: (theme) => theme.palette.onPrimaryContainer.main,
                    fontWeight: 500,
                  }}
                >
                  Escolha a forma de pagamento
                </Typography>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}></Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Grid
                  container
                  justifyContent="flex-end"
                  alignItems="center"
                  display="flex"
                >
                  <Grid item lg={3} md={4} sm={6} xs={12}>
                    <Button variant="contained" fullWidth>
                      Continuar
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CheckoutPaymentCardForm;
