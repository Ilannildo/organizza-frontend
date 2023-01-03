import { useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Radio,
  Typography,
} from "@mui/material";
import { Params, useNavigate, useParams } from "react-router-dom";
import creditCardType from "credit-card-type";

import { useEventCheckout } from "../../../hooks/useEventCheckout";
import { useAllPaymentInstallments } from "../../../stores/paymentMethods";
import { formatCurrency } from "../../../utils/masks";

interface IParams extends Params {
  slug: string;
}

const CheckoutPaymentCardInstallments = () => {
  const {
    paymentMethod,
    paymentCardForm,
    serviceOrder,
    paymentCardInstallment,
    handleChangePaymentCardInstallment,
    handleChangeFinalize,
  } = useEventCheckout();
  const { slug } = useParams<IParams>();
  const navigate = useNavigate();

  const { data: paymentInstallments, isLoading: isLoadingPaymentInstallments } =
    useAllPaymentInstallments(
      serviceOrder?.service_order_id,
      paymentMethod?.payment_id,
      {
        enabled: !!serviceOrder && !!paymentMethod,
      }
    );

  const handleSubmitPaymentInstallment = () => {
    if (
      serviceOrder &&
      paymentMethod &&
      paymentCardForm &&
      paymentCardInstallment
    ) {
      navigate(
        `/evento/${slug}/checkout/${serviceOrder.service_order_id}/payment/${paymentMethod.payment_id}/pay`
      );
    }
  };

  const goToPaymentCardForm = () => {
    handleChangePaymentCardInstallment(null);
    return navigate(
      `/evento/${slug}/checkout/${serviceOrder?.service_order_id}/payment/${paymentMethod?.payment_id}/card-form`
    );
  };

  useEffect(() => {
    if (serviceOrder) {
      if (
        !paymentMethod ||
        paymentMethod.payment_type !== "credit" ||
        !paymentCardForm
      ) {
        navigate(
          `/evento/${slug}/checkout/${serviceOrder.service_order_id}/payment`
        );
      }
    }
  }, [paymentMethod, serviceOrder, paymentCardForm, slug, navigate]);

  useEffect(() => {
    handleChangeFinalize(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container sx={{ py: 3 }}>
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
              Forma de pagamento
            </Typography>
          </Grid>
          {paymentCardForm && (
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Card variant="outlined">
                <CardContent>
                  <Grid container>
                    <Grid item lg={8} md={8} xs={12}>
                      <Typography
                        fontSize={16}
                        sx={{
                          color: (theme) =>
                            theme.palette.onPrimaryContainer.main,
                        }}
                      >
                        {creditCardType(paymentCardForm.cardNumber)[0].niceType}{" "}
                        {` **** ${paymentCardForm.cardNumber
                          .replace(" ", "")
                          .slice(
                            paymentCardForm.cardNumber.length - 4,
                            paymentCardForm.cardNumber.length
                          )}`}
                      </Typography>
                      <Typography
                        fontSize={12}
                        sx={{
                          color: (theme) => theme.palette.text.disabled,
                        }}
                      >
                        {paymentMethod?.payment_title}
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
                      <Button onClick={() => goToPaymentCardForm()}>Alterar</Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          )}
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
                  Parcelas
                </Typography>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <List>
                  {paymentInstallments && !isLoadingPaymentInstallments && (
                    <Grid container spacing={2}>
                      {paymentInstallments.map((installment) => (
                        <Grid
                          key={installment.number}
                          item
                          lg={12}
                          md={12}
                          sm={12}
                          xs={12}
                        >
                          <Card variant="outlined">
                            <ListItemButton
                              onClick={() => {
                                handleChangePaymentCardInstallment(installment);
                                window.scrollTo({
                                  top: 2000,
                                  behavior: "smooth",
                                });
                              }}
                              selected={
                                paymentCardInstallment
                                  ? installment.number ===
                                    paymentCardInstallment.number
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
                                    paymentCardInstallment
                                      ? installment.number ===
                                        paymentCardInstallment.number
                                      : false
                                  }
                                  disableRipple
                                  tabIndex={-1}
                                />
                              </ListItemIcon>
                              <ListItemText
                                primary={`${
                                  installment.number
                                }x de ${formatCurrency(installment.price)}`}
                                secondary={
                                  installment.price === installment.total
                                    ? "Sem juros"
                                    : "Com juros"
                                }
                              />
                              <ListItemSecondaryAction>
                                <Typography
                                  fontSize={14}
                                  sx={{
                                    color: (theme) =>
                                      theme.palette.onPrimaryContainer.main,
                                    fontWeight: 500,
                                  }}
                                >
                                  {formatCurrency(installment.total)}
                                </Typography>
                              </ListItemSecondaryAction>
                            </ListItemButton>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </List>
              </Grid>

              {paymentCardInstallment && (
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Grid
                    container
                    justifyContent="flex-end"
                    alignItems="center"
                    display="flex"
                  >
                    <Grid item lg={3} md={4} sm={6} xs={12}>
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={() => handleSubmitPaymentInstallment()}
                      >
                        Continuar
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CheckoutPaymentCardInstallments;
