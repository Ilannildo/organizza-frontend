import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Params, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { useEventCheckout } from "../../../hooks/useEventCheckout";
import { useAuthenticatedUser } from "../../../stores/user";
import { maskZipCode } from "../../../utils/masks";

const ZIPCODE_MAX_LENGTH = 11;
const ZIPCODE_MIN_LENGTH = 8;

interface IParams extends Params {
  slug: string;
}

const CheckoutPaymentAddress = () => {
  const {
    serviceOrder,
    isFetchingServiceOrder,
    handleChangeFinalize,
    handleChangePaymentAddress,
    paymentAddress,
  } = useEventCheckout();
  const { slug } = useParams<IParams>();
  const { data: user } = useAuthenticatedUser();
  const navigate = useNavigate();
  const [state, setState] = useState<string>(paymentAddress?.state || "");
  const [city, setCity] = useState<string>(paymentAddress?.city || "");
  const [zipCode, setZipCode] = useState<string>(paymentAddress?.zipcode || "");
  const [address, setAddress] = useState<string>(paymentAddress?.street || "");
  const [addressNumber, setAddressNumber] = useState<string>(
    paymentAddress?.number || ""
  );
  const [district, setDistrict] = useState<string>(
    paymentAddress?.neighborhood || ""
  );

  const [zipCodeError, setZipCodeError] = useState<string>(" ");
  const [addressError, setAddressError] = useState<string>(" ");
  const [addressNumberError, setAddressNumberError] = useState<string>(" ");
  const [districtError, setDistrictError] = useState<string>(" ");

  const [isFetchingZipCode, setIsFetchingZipCode] = useState<boolean>(false);

  const onChangeZipCode = (value: string) => {
    if (value.length > ZIPCODE_MAX_LENGTH) {
      return;
    }

    value = value.replace("-", "");

    const regex = /^([0-9 ]+)+$/;

    setZipCode(value);
    setZipCodeError(" ");
    if (!value) {
      return setZipCodeError("O CEP é obrigatório");
    }

    if (!regex.test(value)) {
      return setZipCodeError("Revise esse dado");
    }

    if (value.length < ZIPCODE_MIN_LENGTH) {
      return setZipCodeError("A quantidade de caracteres digitados é inválida");
    }
  };

  const onChangeAddress = (value: string) => {
    const regex = /^[a-zA-Z-À-Ÿà-ÿ][A-Za-zÀ-Ÿà-ÿ ,.']+$/;
    setAddress(value);
    setAddressError(" ");
    if (!value) {
      return setAddressError("O endereço é obrigatório");
    }

    if (!regex.test(value)) {
      return setAddressError("Revise esse dado");
    }
  };

  const onChangeAddressNumber = (value: string) => {
    const regex = /^([0-9 ]+)+$/;
    setAddressNumber(value);
    setAddressNumberError(" ");

    if (!value) {
      return setAddressNumberError("O número é obrigatório");
    }

    if (!regex.test(value)) {
      return setAddressNumberError("Revise esse dado");
    }
  };

  const onChangeDistrict = (value: string) => {
    const regex = /^[a-zA-Z-À-Ÿà-ÿ][A-Za-zÀ-Ÿà-ÿ ,.']+$/;
    setDistrict(value);
    setDistrictError(" ");
    if (!value) {
      return setDistrictError("O bairro é obrigatório");
    }

    if (!regex.test(value)) {
      return setDistrictError("Insira somente o bairro");
    }
  };

  const handleSubmitPaymentCardForm = () => {
    if (serviceOrder) {
      handleChangePaymentAddress({
        city,
        state,
        neighborhood: district,
        number: addressNumber,
        street: address,
        zipcode: zipCode,
      });
      navigate(
        `/evento/${slug}/checkout/${serviceOrder.service_order_id}/payment`
      );
    }
  };

  useEffect(() => {
    if (!serviceOrder && !isFetchingServiceOrder) {
      navigate(`/evento/${slug}`);
    }
  }, [isFetchingServiceOrder, serviceOrder, slug, navigate]);

  useEffect(() => {
    handleChangeFinalize(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGetZipCode = async (zipCode: string) => {
    try {
      setIsFetchingZipCode(true);
      const res = await axios.get(`https://viacep.com.br/ws/${zipCode}/json/`);
      setCity(res.data.localidade);
      setState(res.data.uf);
      setIsFetchingZipCode(false);
    } catch (error) {
      setIsFetchingZipCode(false);
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("lenght", zipCode.length);

    if (zipCode.length >= ZIPCODE_MIN_LENGTH) {
      handleGetZipCode(zipCode);
    }
  }, [zipCode]);

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
                          color: (theme) =>
                            theme.palette.onPrimaryContainer.main,
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
                  Endereço de cobrança
                </Typography>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Card variant="outlined">
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item lg={4} md={4} xs={12}>
                        <TextField
                          fullWidth
                          id="cep"
                          name="cep"
                          label="CEP"
                          size="small"
                          autoFocus
                          value={maskZipCode(zipCode)}
                          type="tel"
                          InputProps={{
                            endAdornment: isFetchingZipCode ? (
                              <CircularProgress color="inherit" size={24} />
                            ) : null,
                          }}
                          disabled={isFetchingZipCode}
                          onChange={(e) => onChangeZipCode(e.target.value)}
                          error={zipCodeError !== " "}
                          helperText={zipCodeError}
                        />
                      </Grid>
                      <Grid item lg={8} md={8} xs={12}>
                        <TextField
                          id="address"
                          name="address"
                          label="Logradouro"
                          size="small"
                          fullWidth
                          value={address}
                          type="text"
                          onChange={(e) => onChangeAddress(e.target.value)}
                          error={addressError !== " "}
                          helperText={
                            addressError !== " "
                              ? addressError
                              : "Digite a rua, avenida ou similar"
                          }
                        />
                      </Grid>
                      <Grid item lg={4} md={4} xs={12}>
                        <TextField
                          id="number"
                          name="number"
                          label="Número"
                          size="small"
                          fullWidth
                          value={addressNumber}
                          type="tel"
                          onChange={(e) =>
                            onChangeAddressNumber(e.target.value)
                          }
                          error={addressNumberError !== " "}
                          helperText={
                            addressNumberError !== " "
                              ? addressNumberError
                              : "Se não possuir número, coloque 0"
                          }
                        />
                      </Grid>
                      <Grid item lg={8} md={8} xs={12}>
                        <TextField
                          id="district"
                          name="district"
                          label="Bairro"
                          size="small"
                          fullWidth
                          value={district}
                          type="tel"
                          onChange={(e) => onChangeDistrict(e.target.value)}
                          error={districtError !== " "}
                          helperText={districtError}
                        />
                      </Grid>
                      <Grid item lg={4} md={4} xs={12}>
                        <TextField
                          id="city"
                          name="city"
                          label="Cidade"
                          size="small"
                          fullWidth
                          value={city}
                          InputProps={{
                            endAdornment: isFetchingZipCode ? (
                              <CircularProgress color="inherit" size={24} />
                            ) : null,
                          }}
                          disabled
                        />
                      </Grid>
                      <Grid item lg={4} md={4} xs={12}>
                        <TextField
                          id="state"
                          name="state"
                          label="Estado (UF)"
                          size="small"
                          fullWidth
                          value={state}
                          InputProps={{
                            endAdornment: isFetchingZipCode ? (
                              <CircularProgress color="inherit" size={24} />
                            ) : null,
                          }}
                          disabled
                        />
                      </Grid>
                      <Grid item lg={4} md={4} xs={12}>
                        <TextField
                          id="country"
                          name="state"
                          label="País"
                          size="small"
                          fullWidth
                          defaultValue="Brasil"
                          disabled
                        />
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
                    {zipCode &&
                      address &&
                      addressNumber &&
                      district &&
                      zipCodeError === " " &&
                      addressError === " " &&
                      addressNumberError === " " &&
                      districtError === " " && (
                        <Button
                          variant="contained"
                          fullWidth
                          onClick={() => handleSubmitPaymentCardForm()}
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

export default CheckoutPaymentAddress;
