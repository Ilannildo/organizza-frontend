import {
  Button,
  Card,
  CardContent,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Radio,
  Typography,
} from "@mui/material";
import { Params, useNavigate, useParams } from "react-router-dom";
import { useEventCheckout } from "../../../hooks/useEventCheckout";
import { useAllPaymentMethods } from "../../../stores/paymentMethods";
import { useAuthenticatedUser } from "../../../stores/user";

interface IParams extends Params {
  serviceOrderId: string;
  slug: string;
}

const CheckoutPaymentMethod = () => {
  const { serviceOrder, paymentMethod, handleChangePaymentMethod } =
    useEventCheckout();
  const navigate = useNavigate();
  const { serviceOrderId, slug } = useParams<IParams>();
  const { data: user } = useAuthenticatedUser();
  const { data: paymentMethods } = useAllPaymentMethods(
    serviceOrder?.service_order_id || "",
    {
      enabled: !!serviceOrder,
    }
  );

  const goToPaymentCardForm = () => {
    if (paymentMethod) {
      if (paymentMethod.payment_type === "credit") {
        return navigate(
          `/evento/${slug}/checkout/${serviceOrderId}/payment/${paymentMethod.payment_id}/card-form`
        );
      }

      return navigate(`/evento/${slug}/checkout/${serviceOrderId}/shipping`);
    }
  };

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
                      {user?.name}
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
                      {user?.email}
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
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <List>
                  <Grid container spacing={2}>
                    {paymentMethods &&
                      paymentMethods.map((payment) => (
                        <Grid
                          item
                          lg={12}
                          md={12}
                          sm={12}
                          xs={12}
                          key={payment.payment_id}
                        >
                          <Card variant="outlined">
                            <ListItemButton
                              onClick={() => handleChangePaymentMethod(payment)}
                              selected={
                                paymentMethod
                                  ? paymentMethod.payment_id === payment.payment_id
                                  : false
                              }
                              sx={{
                                borderWidth: 1,
                              }}
                            >
                              <ListItemIcon>
                                <Radio
                                  edge="start"
                                  checked={
                                    paymentMethod
                                      ? paymentMethod.payment_id === payment.payment_id
                                      : false
                                  }
                                  disableRipple
                                  tabIndex={-1}
                                />
                              </ListItemIcon>
                              <ListItemText
                                primary={payment.payment_title}
                                secondary={payment.information}
                              />
                            </ListItemButton>
                          </Card>
                        </Grid>
                      ))}
                  </Grid>
                </List>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Grid
                  container
                  justifyContent="flex-end"
                  alignItems="center"
                  display="flex"
                >
                  <Grid item lg={3} md={4} sm={6} xs={12}>
                    {paymentMethod && (
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={() => goToPaymentCardForm()}
                      >
                        Continuar
                      </Button>
                    )}
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

export default CheckoutPaymentMethod;
