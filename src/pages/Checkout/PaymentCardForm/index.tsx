import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useEventCheckout } from "../../../hooks/useEventCheckout";
import CardImg from "../../../assets/card.png";
import { useState } from "react";
import { formatExpirationDate, validateCpf } from "../../../utils/roles";
import { maskCpf, maskCreditCard, maskPhoneNumber, removeMaskCpf } from "../../../utils/masks";

const CARD_NUMBER_MAX_LENGTH = 19;
const CARD_NUMBER_MIN_LENGTH = 12;
const EXPIRATION_DATE_MAX_LENGTH = 9;
const EXPIRATION_DATE_MIN_LENGTH = 5;
const SECURITY_CODE_MAX_LENGTH = 4;
const SECURITY_CODE_MIN_LENGTH = 3;
const USER_DOCUMENT_MAX_LENGTH = 11;
const PHONE_NUMBER_MAX_LENGTH = 11;

const CheckoutPaymentCardForm = () => {
  const { paymentMethod } = useEventCheckout();

  const [cardNumber, setCardNumber] = useState<string>("");
  const [cardOwnerName, setCardOwnerName] = useState<string>("");
  const [expirationDate, setExpirationDate] = useState<string>("");
  const [securityCode, setSecurityCode] = useState<string>("");
  const [userDocument, setUserDocument] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const [cardNumberError, setCardNumberError] = useState<string>(" ");
  const [cardOwnerNameError, setCardOwnerNameError] = useState<string>(" ");
  const [expirationDateError, setExpirationDateError] = useState<string>(" ");
  const [securityCodeError, setSecurityCodeError] = useState<string>(" ");
  const [userDocumentError, setUserDocumentError] = useState<string>(" ");
  const [phoneNumberError, setPhoneNumberError] = useState<string>(" ");

  const onChangeCardNumber = (value: string) => {
    
    if (value.length > CARD_NUMBER_MAX_LENGTH) {
      return;
    }
    value = value.replace(" ", "");
    const regex = /^([0-9 ]+)+$/;
    setCardNumber(maskCreditCard(value));
    setCardNumberError(" ");

    if (!value) {
      return setCardNumberError("O número do cartão é obrigatório");
    }

    if (!regex.test(value)) {
      return setCardNumberError("Revise esse dado");
    }

    if (value.length < CARD_NUMBER_MIN_LENGTH) {
      return setCardNumberError(
        "A quantidade de caracteres digitados é inválida"
      );
    }
  };

  const onChangeCardOwnerName = (value: string) => {
    const regex = /^[a-zA-Z-À-Ÿà-ÿ][A-Za-zÀ-Ÿà-ÿ ,.']+$/;
    setCardOwnerName(value);
    setCardOwnerNameError(" ");
    if (!value) {
      return setCardOwnerNameError("O nome do titular do cartão é obrigatório");
    }

    if (!regex.test(value)) {
      return setCardOwnerNameError("Revise esse dado");
    }
  };

  const onChangeExpirationDate = (value: string) => {
    value = formatExpirationDate(value);
    const regex = /^(0[1-9]|1[0-2])( )?\/( )?([2][0]\d{2}|\d{2})$/;
    setExpirationDate(value);
    setExpirationDateError(" ");

    if (!value) {
      return setExpirationDateError("A data de validade é obrigatório");
    }

    if (!regex.test(value)) {
      return setExpirationDateError("Insira uma data válida");
    }

    if (value.length > EXPIRATION_DATE_MAX_LENGTH) {
      return setExpirationDateError(
        "A quantidade de caracteres digitados é inválida"
      );
    }

    if (value.length < EXPIRATION_DATE_MIN_LENGTH) {
      return setExpirationDateError(
        "A quantidade de caracteres digitados é inválida"
      );
    }

    const date_array = value.split("/");
    // Attention! Javascript consider months in the range 0 - 11
    const month = Number(date_array[0]) - 1;
    const year = Number(date_array[1]);
    // This instruction will create a date object

    if (month < 0 || month > 11) {
      return setExpirationDateError("Insira uma data válida");
    }

    const source_date = new Date();
    if (year <= source_date.getFullYear()) {
      return setExpirationDateError("Insira uma data válida");
    }
  };

  const onChangeSecurityCode = (value: string) => {
    const regex = /^[0-9]+$/;
    setSecurityCode(value);
    setSecurityCodeError(" ");
    if (!value) {
      return setSecurityCodeError("O CVV é obrigatório");
    }

    if (!regex.test(value)) {
      return setSecurityCodeError("Revise este dado");
    }

    if (value.length > SECURITY_CODE_MAX_LENGTH) {
      return setSecurityCodeError(
        "A quantidade de caracteres digitados é inválida"
      );
    }

    if (value.length < SECURITY_CODE_MIN_LENGTH) {
      return setSecurityCodeError(
        "A quantidade de caracteres digitados é inválida"
      );
    }
  };

  const onChangeUserDocument = (value: string) => {
    value = removeMaskCpf(value);
    const regex = /^([0-9.-]+)+$/;
    if (value.length > USER_DOCUMENT_MAX_LENGTH) {
      return;
    }
    setUserDocument(maskCpf(value));
    setUserDocumentError(" ");
    console.log("CPF", value);

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
    setPhoneNumber(maskPhoneNumber(value));
    setPhoneNumberError(" ");

    console.log("Phone number", value);
    if (!value) {
      return setPhoneNumberError("O número de telefone é obrigatório");
    }

    if (!regex.test(value)) {
      return setPhoneNumberError("Revise este dado");
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
              Forma de pagamento
            </Typography>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Grid container>
                  <Grid
                    item
                    lg={8}
                    md={8}
                    xs={12}
                    alignItems="center"
                    display="flex"
                  >
                    <Typography
                      fontSize={16}
                      sx={{
                        color: (theme) => theme.palette.onPrimaryContainer.main,
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
                  Dados do cartão
                </Typography>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Card variant="outlined">
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid item lg={8} md={8} sm={12} xs={12}>
                        <Grid container spacing={2}>
                          <Grid item lg={12} md={12} xs={12}>
                            <TextField
                              fullWidth
                              id="cardNumber"
                              name="cardNumber"
                              label="Número do cartão"
                              size="small"
                              autoFocus
                              value={cardNumber}
                              type="tel"
                              onChange={(e) =>
                                onChangeCardNumber(e.target.value)
                              }
                              error={cardNumberError !== " "}
                              helperText={cardNumberError}
                            />
                          </Grid>
                          <Grid item lg={12} md={12} xs={12}>
                            <TextField
                              id="holderName"
                              name="holderName"
                              label="Nome do titular do cartão"
                              size="small"
                              placeholder="Como está escrito no cartão"
                              fullWidth
                              value={cardOwnerName}
                              type="text"
                              onChange={(e) =>
                                onChangeCardOwnerName(e.target.value)
                              }
                              error={cardOwnerNameError !== " "}
                              helperText={cardOwnerNameError}
                            />
                          </Grid>
                          <Grid item lg={6} md={6} xs={12}>
                            <TextField
                              id="date"
                              name="date"
                              label="Data de validade"
                              size="small"
                              fullWidth
                              placeholder="MM/AA"
                              value={expirationDate}
                              type="tel"
                              onChange={(e) =>
                                onChangeExpirationDate(e.target.value)
                              }
                              error={expirationDateError !== " "}
                              helperText={expirationDateError}
                            />
                          </Grid>
                          <Grid item lg={6} md={6} xs={12}>
                            <TextField
                              id="cvv"
                              name="cvv"
                              label="CVV"
                              size="small"
                              fullWidth
                              placeholder="Números no verso do cartão"
                              value={securityCode}
                              type="tel"
                              onChange={(e) =>
                                onChangeSecurityCode(e.target.value)
                              }
                              error={securityCodeError !== " "}
                              helperText={securityCodeError}
                            />
                          </Grid>
                          <Grid item lg={6} md={6} xs={12}>
                            <TextField
                              id="cpf"
                              name="cpf"
                              label="CPF do titular"
                              size="small"
                              fullWidth
                              value={userDocument}
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
                              value={phoneNumber}
                              type="tel"
                              onChange={(e) =>
                                onChangePhoneNumber(e.target.value)
                              }
                              error={phoneNumberError !== " "}
                              helperText={phoneNumberError}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        lg={4}
                        md={4}
                        sm={12}
                        xs={12}
                        display="flex"
                        alignItems="center"
                      >
                        <img src={CardImg} alt="" width="100%" />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
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
