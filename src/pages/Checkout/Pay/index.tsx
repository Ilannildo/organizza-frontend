import {
  Avatar,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import creditCardType from "credit-card-type";
import { useEffect, useState } from "react";
import { Params, useNavigate, useParams } from "react-router-dom";

import { useEventCheckout } from "../../../hooks/useEventCheckout";
import { useAuthenticatedUser } from "../../../stores/user";
import {
  formatCurrency,
  maskCpf,
  maskPhoneNumber,
  maskZipCode,
  removeMaskCpf,
} from "../../../utils/masks";
import { validateCpf } from "../../../utils/roles";
import { paymentMethodIcons } from "../PaymentMethod";

interface IParams extends Params {
  slug: string;
}

const USER_DOCUMENT_MAX_LENGTH = 11;
const PHONE_NUMBER_MAX_LENGTH = 11;

const CheckoutPay = () => {
  const {
    paymentMethod,
    paymentCardForm,
    isFetchingServiceOrder,
    serviceOrder,
    paymentAddress,
    paymentCardInstallment,
    handleChangeFinalize,
    handleChangePaymentCardForm,
    handleChangePaymentCardInstallment,
    isFinishingServiceOrder,
  } = useEventCheckout();
  const { slug } = useParams<IParams>();
  const [userDocument, setUserDocument] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [userDocumentError, setUserDocumentError] = useState<string>(" ");
  const [phoneNumberError, setPhoneNumberError] = useState<string>(" ");

  const { data: user } = useAuthenticatedUser();
  const navigate = useNavigate();

  const onChangeUserDocument = (value: string) => {
    value = removeMaskCpf(value);
    const regex = /^([0-9.-]+)+$/;
    if (value.length > USER_DOCUMENT_MAX_LENGTH) {
      return;
    }
    setUserDocument(value);
    setUserDocumentError(" ");

    if (!value) {
      return setUserDocumentError("O CPF é obrigatório");
    }

    if (!validateCpf(value)) {
      return setUserDocumentError("O CPF é inválido");
    }

    if (!regex.test(value)) {
      return setUserDocumentError("Revise este dado");
    }
  };

  const onChangePhoneNumber = (value: string) => {
    value = removeMaskCpf(value);
    const regex = /^([0-9.-]+)+$/;
    if (value.length > PHONE_NUMBER_MAX_LENGTH) {
      return;
    }
    setPhoneNumber(value);
    setPhoneNumberError(" ");

    if (!value) {
      return setPhoneNumberError("O número de telefone é obrigatório");
    }

    if (!regex.test(value)) {
      return setPhoneNumberError("Revise este dado");
    }
  };

  const goToPaymentMethod = () => {
    handleChangePaymentCardInstallment(null);
    handleChangePaymentCardForm(null);
    return navigate(
      `/evento/${slug}/checkout/${serviceOrder?.service_order_id}/payment`
    );
  };

  const goToPaymentAddress = () => {
    return navigate(
      `/evento/${slug}/checkout/${serviceOrder?.service_order_id}/address`
    );
  };

  const handleSubmitPaymentUser = () => {
    if (serviceOrder && paymentMethod) {
      handleChangePaymentCardForm({
        cardNumber: "",
        cardOwnerName: "",
        documentType: "cpf",
        expirationDate: "",
        phoneNumber,
        securityCode: "",
        userDocument,
      });
    }
  };

  useEffect(() => {
    if (serviceOrder && paymentMethod && !isFetchingServiceOrder) {
      if (paymentMethod.payment_type === "credit" && !paymentCardInstallment) {
        return navigate(
          `/evento/${slug}/checkout/${serviceOrder.service_order_id}/address`
        );
      } else {
        if (paymentCardForm) {
          handleChangeFinalize(true);
        } else {
          handleChangeFinalize(false);
        }
      }
    } else {
      navigate(`/evento/${slug}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    paymentMethod,
    serviceOrder,
    paymentCardForm,
    slug,
    navigate,
    paymentCardInstallment,
    isFetchingServiceOrder
  ]);

  return (
    <Grid container sx={{ py: 3 }}>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Grid container spacing={2}>
          <Grid item lg={12} md={12} sm={12} xs={12} mb={2}>
            <Typography
              fontSize={22}
              sx={{
                color: (theme) => theme.palette.onPrimaryContainer.main,
                fontWeight: 500,
              }}
            >
              Resumo e confirmação
            </Typography>
          </Grid>
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
          {user && (
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
                          color: (theme) =>
                            theme.palette.onPrimaryContainer.main,
                        }}
                      >
                        {user.name}
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
                          color: (theme) =>
                            theme.palette.onPrimaryContainer.main,
                        }}
                      >
                        {user.email}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          )}
          {paymentCardForm && paymentCardForm.userDocument ? (
            <>
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
                  {paymentCardForm &&
                    paymentMethod &&
                    (paymentMethod.payment_type === "credit" ? (
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Card variant="outlined">
                          <CardContent>
                            <Grid container>
                              <Grid item lg={1} md={1} xs={1}>
                                <Avatar
                                  sx={{
                                    bgcolor: (theme) =>
                                      theme.palette.primaryContainer.main,
                                  }}
                                >
                                  <img
                                    src={
                                      paymentMethodIcons.find(
                                        (item) =>
                                          item.name ===
                                          paymentMethod.payment_type
                                      )?.icon
                                    }
                                    alt="teste"
                                    width={24}
                                    height={24}
                                  />
                                </Avatar>
                              </Grid>
                              <Grid item lg={7} md={7} xs={11}>
                                <Typography
                                  fontSize={16}
                                  sx={{
                                    color: (theme) =>
                                      theme.palette.onPrimaryContainer.main,
                                  }}
                                >
                                  {
                                    creditCardType(
                                      paymentCardForm.cardNumber
                                    )[0].niceType
                                  }{" "}
                                  {` **** ${paymentCardForm.cardNumber
                                    .replace(" ", "")
                                    .slice(
                                      paymentCardForm.cardNumber.length - 4,
                                      paymentCardForm.cardNumber.length
                                    )}`}
                                </Typography>
                                {paymentCardInstallment && (
                                  <Typography
                                    fontSize={12}
                                    sx={{
                                      color: (theme) =>
                                        theme.palette.text.disabled,
                                    }}
                                  >
                                    {paymentMethod.payment_title} -{" "}
                                    {paymentCardInstallment.number}x de{" "}
                                    {formatCurrency(
                                      paymentCardInstallment.price
                                    )}
                                  </Typography>
                                )}
                              </Grid>
                              {!isFinishingServiceOrder && (
                                <Grid
                                  item
                                  lg={4}
                                  md={4}
                                  xs={12}
                                  justifyContent="flex-end"
                                  alignItems="center"
                                  display="flex"
                                >
                                  <Button onClick={() => goToPaymentMethod()}>
                                    Alterar
                                  </Button>
                                </Grid>
                              )}
                            </Grid>
                          </CardContent>
                        </Card>
                      </Grid>
                    ) : (
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Card variant="outlined">
                          <CardContent>
                            <Grid container>
                              <Grid item lg={1} md={1} xs={1}>
                                <Avatar
                                  sx={{
                                    bgcolor: (theme) =>
                                      theme.palette.primaryContainer.main,
                                  }}
                                >
                                  <img
                                    src={
                                      paymentMethodIcons.find(
                                        (item) =>
                                          item.name ===
                                          paymentMethod.payment_type
                                      )?.icon
                                    }
                                    alt="teste"
                                    width={24}
                                    height={24}
                                  />
                                </Avatar>
                              </Grid>
                              <Grid item lg={7} md={7} xs={11}>
                                <Typography
                                  fontSize={16}
                                  sx={{
                                    color: (theme) =>
                                      theme.palette.onPrimaryContainer.main,
                                  }}
                                >
                                  {paymentMethod.payment_title}
                                </Typography>
                                <Typography
                                  fontSize={12}
                                  sx={{
                                    color: (theme) =>
                                      theme.palette.text.disabled,
                                  }}
                                >
                                  O ingresso só é reservado quando o pagamento
                                  for aprovado
                                </Typography>
                              </Grid>
                              {!isFinishingServiceOrder && (
                                <Grid
                                  item
                                  lg={4}
                                  md={4}
                                  xs={12}
                                  justifyContent="flex-end"
                                  alignItems="center"
                                  display="flex"
                                >
                                  <Button onClick={() => goToPaymentMethod()}>
                                    Alterar
                                  </Button>
                                </Grid>
                              )}
                            </Grid>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                </Grid>
              </Grid>
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
                      Dados complementares
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
                              CPF (Documento)
                            </Typography>
                            <Typography
                              fontSize={16}
                              sx={{
                                color: (theme) =>
                                  theme.palette.onPrimaryContainer.main,
                              }}
                            >
                              {maskCpf(paymentCardForm.userDocument)}
                            </Typography>
                          </Grid>
                          <Grid item lg={4} md={4} xs={12}>
                            <Typography
                              fontSize={12}
                              sx={{
                                color: (theme) => theme.palette.text.disabled,
                              }}
                            >
                              Número de celular (Contato)
                            </Typography>
                            <Typography
                              fontSize={16}
                              sx={{
                                color: (theme) =>
                                  theme.palette.onPrimaryContainer.main,
                              }}
                            >
                              {maskPhoneNumber(paymentCardForm.phoneNumber)}
                            </Typography>
                          </Grid>
                          {!isFinishingServiceOrder && (
                            <Grid
                              item
                              lg={4}
                              md={4}
                              xs={12}
                              justifyContent="flex-end"
                              alignItems="center"
                              display="flex"
                            >
                              <Button
                                onClick={() =>
                                  handleChangePaymentCardForm(null)
                                }
                              >
                                Alterar
                              </Button>
                            </Grid>
                          )}
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Typography
                      fontSize={14}
                      sx={{
                        color: (theme) => theme.palette.onPrimaryContainer.main,
                        fontWeight: 500,
                      }}
                    >
                      Endereço de cobrança
                    </Typography>
                  </Grid>
                  {paymentAddress && (
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
                                {`${paymentAddress.street}, ${paymentAddress.number}`}
                              </Typography>
                              <Typography
                                fontSize={12}
                                sx={{
                                  color: (theme) => theme.palette.text.disabled,
                                }}
                              >
                                {`${paymentAddress.city}, ${
                                  paymentAddress.state
                                } ${maskZipCode(paymentAddress.zipcode)}`}
                              </Typography>
                            </Grid>
                            {!isFinishingServiceOrder && (
                              <Grid
                                item
                                lg={4}
                                md={4}
                                xs={12}
                                justifyContent="flex-end"
                                alignItems="center"
                                display="flex"
                              >
                                <Button onClick={() => goToPaymentAddress()}>
                                  Alterar
                                </Button>
                              </Grid>
                            )}
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </>
          ) : (
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
                    Dados complementares
                  </Typography>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Card variant="outlined">
                    <CardContent>
                      <Grid container spacing={3}>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                          <Grid container spacing={2}>
                            <Grid item lg={6} md={6} xs={12}>
                              <TextField
                                id="cpf"
                                name="cpf"
                                label="CPF do titular"
                                size="small"
                                fullWidth
                                value={maskCpf(userDocument)}
                                type="tel"
                                onChange={(e) =>
                                  onChangeUserDocument(e.target.value)
                                }
                                error={userDocumentError !== " "}
                                helperText={userDocumentError}
                              />
                            </Grid>
                            <Grid item lg={6} md={6} xs={12}>
                              <TextField
                                id="phoneNumber"
                                name="phoneNumber"
                                label="Número de telefone"
                                size="small"
                                fullWidth
                                value={maskPhoneNumber(phoneNumber)}
                                type="tel"
                                onChange={(e) =>
                                  onChangePhoneNumber(e.target.value)
                                }
                                error={phoneNumberError !== " "}
                                helperText={phoneNumberError}
                              />
                            </Grid>
                          </Grid>
                          <Grid item lg={12} md={12} sm={12} xs={12}>
                            <Grid
                              container
                              justifyContent="flex-end"
                              alignItems="center"
                              display="flex"
                            >
                              <Grid item lg={3} md={4} sm={6} xs={12}>
                                {userDocument &&
                                  phoneNumber &&
                                  userDocumentError === " " &&
                                  phoneNumberError === " " && (
                                    <Button
                                      variant="contained"
                                      fullWidth
                                      onClick={() => handleSubmitPaymentUser()}
                                    >
                                      Continuar
                                    </Button>
                                  )}
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CheckoutPay;
