import {
  Autocomplete,
  Card,
  CardContent,
  Checkbox,
  Chip,
  FormControlLabel,
  Grid,
  IconButton,
  Stack,
  StepIcon,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Laptop, MusicNotes, Plus } from "phosphor-react";
import { ICity } from "../../../../../models/city";
import { useAllCities } from "../../../../../stores/city";
import { useAllStates } from "../../../../../stores/state";

const main_subjects = [
  "Acadêmico e científico",
  "Desenvolvimento pessoal",
  "Design e produtos digitais",
  "Esportes",
  "Games e Geek",
  "Gastronomia",
  "Empreendedorismo, negócios e inovasão",
  "Governo e política",
  "Marketing e vendas",
  "Moda e beleza",
  "Saúde e bem-estar",
  "Religião e espiritualidade",
  "Sociedade e cultura",
  "Teatro, stand-up e dança",
];

interface IStepTwo {
  city: ICity | null;
  setCity: (city: ICity | null) => void;
  street: string;
  setStreet: (value: string) => void;
  placeUndefined: boolean;
  setPlaceUndefined: (value: boolean) => void;
  eventTypeId: string;
  setEventTypeId: (value: string) => void;
  mainSubject: string;
  setMainSubject: (value: string) => void;
  eventTypeIdError: string;
  setEventTypeIdError: (value: string) => void;
  mainSubjectError: string;
  setMainSubjectError: (value: string) => void;
  cityError: string;
  setCityError: (value: string) => void;
  streetError: string;
  setStreetError: (value: string) => void;
}

export const StepTwo = ({
  city,
  setCity,
  setStreet,
  street,
  placeUndefined,
  setPlaceUndefined,
  eventTypeId,
  setEventTypeId,
  mainSubject,
  setMainSubject,
  eventTypeIdError,
  setEventTypeIdError,
  mainSubjectError,
  setMainSubjectError,
  cityError,
  setCityError,
  streetError,
  setStreetError,
}: IStepTwo) => {
  const { data: cities, isLoading: isLoadingCities } = useAllCities();
  const { data: states, isLoading: isLoadingStates } = useAllStates();
  const theme = useTheme();

  return (
    <Grid container mt={2} spacing={2} justifyContent="center" display="flex">
      <Grid item lg={10} md={10} sm={12} xs={12}>
        <Card variant="outlined">
          <CardContent>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              component="form"
              display="flex"
              noValidate
              autoComplete="off"
            >
              <Grid
                item
                lg={10}
                md={10}
                sm={12}
                xs={12}
                justifyContent="center"
                display="flex"
              >
                <Stack direction="row" spacing={1} mt={1} alignItems="center">
                  <StepIcon icon="4" />
                  <Typography
                    component="h1"
                    variant="h6"
                    mb={2}
                    fontWeight={600}
                    sx={{
                      color: (theme) => theme.palette.text.primary,
                      fontSize: 18,
                    }}
                  >
                    Localização do evento
                  </Typography>
                </Stack>
              </Grid>
              <Grid
                item
                lg={10}
                md={10}
                sm={12}
                xs={12}
                justifyContent="center"
                display="flex"
              >
                <Grid container spacing={2}>
                  <Grid item lg={6} md={6} xs={12}>
                    <Autocomplete
                      id="city"
                      options={cities !== undefined ? cities : []}
                      getOptionLabel={(value) => value.name}
                      loading={isLoadingCities}
                      disabled={placeUndefined}
                      onChange={(event, newValue) => {
                        setCity(newValue);
                      }}
                      value={city}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Selecione uma cidade"
                          variant="outlined"
                          size="small"
                          fullWidth
                          onBlur={() => {
                            setCityError(" ");
                          }}
                          error={cityError !== " "}
                          helperText={cityError}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item lg={6} md={6} xs={12}>
                    <Autocomplete
                      disablePortal
                      id="state"
                      disabled
                      loading={isLoadingStates}
                      options={states !== undefined ? states : []}
                      getOptionLabel={(value) => value?.name}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
                      value={city !== null ? city.state : null}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Estado"
                          variant="outlined"
                          size="small"
                          fullWidth
                          
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                lg={10}
                md={10}
                sm={12}
                xs={12}
                justifyContent="center"
                display="flex"
              >
                <TextField
                  id="address"
                  label="Endereço"
                  variant="outlined"
                  disabled={placeUndefined}
                  size="small"
                  fullWidth
                  color="primary"
                  value={street}
                  onBlur={() => {
                    setStreetError(" ");
                  }}
                  error={streetError !== " "}
                  helperText={streetError}
                  onChange={(event) => {
                    setStreet(event.target.value);
                  }}
                />
              </Grid>
              <Grid item lg={10} md={10} sm={12} xs={12} display="flex">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={placeUndefined}
                      onChange={(event, value) => {
                        setStreet("");
                        setCity(null);
                        setPlaceUndefined(value);
                      }}
                    />
                  }
                  label="Local ainda não definido"
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {/* <Grid item lg={10} md={10} sm={12} xs={12}>
        <Card variant="outlined">
          <CardContent>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              component="form"
              display="flex"
              noValidate
              autoComplete="off"
            >
              <Grid
                item
                lg={10}
                md={10}
                sm={12}
                xs={12}
                justifyContent="center"
                display="flex"
              >
                <Stack direction="row" spacing={1} mt={1} alignItems="center">
                  <StepIcon icon="5" />
                  <Typography
                    component="h1"
                    variant="h6"
                    mb={2}
                    fontWeight={600}
                    sx={{
                      color: (theme) => theme.palette.text.primary,
                      fontSize: 18,
                    }}
                  >
                    Ingressos e inscrições
                  </Typography>
                </Stack>
              </Grid>
              <Grid
                item
                lg={10}
                md={10}
                sm={12}
                xs={12}
                justifyContent="center"
                display="flex"
              >
                <Grid container spacing={2}>
                  <Grid
                    item
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                    alignItems="center"
                    display="flex"
                    flexDirection="column"
                  >
                    {tickets.map((ticket) => (
                      <Ticket key={ticket.id} />
                    ))}
                  </Grid>
                </Grid>
              </Grid>

              <Grid
                item
                mt={2}
                lg={10}
                md={10}
                sm={12}
                xs={12}
                alignItems="center"
                display="flex"
                flexDirection="column"
              >
                <Stack spacing={4} direction="row" mt={2}>
                  <Stack alignItems="center" spacing={1}>
                    <IconButton
                      color="primary"
                      onClick={() => addTicket("1")}
                      sx={{
                        backgroundColor: (theme) =>
                          theme.palette.action.disabledBackground,
                        width: 70,
                        height: 70,
                      }}
                    >
                      <TicketIcon />
                    </IconButton>
                    <Typography
                      component="h1"
                      variant="h6"
                      fontWeight={500}
                      sx={{
                        color: (theme) => theme.palette.text.disabled,
                        fontSize: 14,
                      }}
                    >
                      Adicionar ingresso pago
                    </Typography>
                  </Stack>
                  <Stack alignItems="center" spacing={1}>
                    <IconButton
                      color="primary"
                      onClick={() => addTicket("2")}
                      sx={{
                        backgroundColor: (theme) =>
                          theme.palette.action.disabledBackground,
                        width: 70,
                        height: 70,
                      }}
                    >
                      <TicketIcon />
                    </IconButton>
                    <Typography
                      component="h1"
                      variant="h6"
                      fontWeight={500}
                      sx={{
                        color: (theme) => theme.palette.text.disabled,
                        fontSize: 14,
                      }}
                    >
                      Adicionar ingresso grátis
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid> */}
      <Grid item lg={10} md={10} sm={12} xs={12}>
        <Card variant="outlined">
          <CardContent>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              component="form"
              display="flex"
              noValidate
              autoComplete="off"
            >
              <Grid
                item
                lg={10}
                md={10}
                sm={12}
                xs={12}
                justifyContent="center"
                display="flex"
              >
                <Stack direction="row" spacing={1} mt={1} alignItems="center">
                  <StepIcon icon="3" />
                  <Typography
                    component="h1"
                    variant="h6"
                    mb={2}
                    fontWeight={600}
                    sx={{
                      color: (theme) => theme.palette.text.primary,
                      fontSize: 18,
                    }}
                  >
                    Qual a categoria do seu evento?
                  </Typography>
                </Stack>
              </Grid>
              <Grid
                item
                mt={2}
                lg={10}
                md={10}
                sm={12}
                xs={12}
                alignItems="center"
                display="flex"
                flexDirection="column"
              >
                <Stack spacing={4} direction="row" mt={2}>
                  <Stack alignItems="center" spacing={1}>
                    <IconButton
                      color="primary"
                      onClick={() => {
                        setEventTypeId("1");
                        setEventTypeIdError(" ");
                      }}
                      sx={{
                        backgroundColor: (theme) =>
                          eventTypeId === "1"
                            ? theme.palette.primary.main
                            : theme.palette.primaryContainer.main,
                        width: 70,
                        height: 70,
                      }}
                    >
                      <Laptop
                        color={
                          eventTypeId === "1"
                            ? theme.palette.primaryContainer.main
                            : theme.palette.primary.main
                        }
                      />
                    </IconButton>
                    <Typography
                      component="h1"
                      variant="h6"
                      fontWeight={500}
                      sx={{
                        color: (theme) => theme.palette.text.disabled,
                        fontSize: 14,
                      }}
                    >
                      Jornada ou congresso
                    </Typography>
                  </Stack>
                  <Stack alignItems="center" spacing={1}>
                    <IconButton
                      title="Festival, Festa ou show"
                      color="primary"
                      onClick={() => {
                        setEventTypeId("2");
                        setEventTypeIdError(" ");
                      }}
                      sx={{
                        backgroundColor: (theme) =>
                          eventTypeId === "2"
                            ? theme.palette.primary.main
                            : theme.palette.primaryContainer.main,
                        width: 70,
                        height: 70,
                      }}
                    >
                      <MusicNotes
                        color={
                          eventTypeId === "2"
                            ? theme.palette.primaryContainer.main
                            : theme.palette.primary.main
                        }
                      />
                    </IconButton>
                    <Typography
                      component="h1"
                      variant="h6"
                      fontWeight={500}
                      sx={{
                        color: (theme) => theme.palette.text.disabled,
                        fontSize: 14,
                      }}
                    >
                      Festival, Festa ou show
                    </Typography>
                  </Stack>
                </Stack>
                {eventTypeIdError !== " " && (
                  <Typography
                    component="h1"
                    variant="h6"
                    mt={2}
                    sx={{
                      color: (theme) => theme.palette.error.main,
                      fontSize: 12,
                      fontWeight: 400,
                    }}
                  >
                    {eventTypeIdError}
                  </Typography>
                )}
              </Grid>
              <Grid
                item
                mt={3}
                lg={10}
                md={10}
                sm={12}
                xs={12}
                alignItems="center"
                display="flex"
                flexDirection="column"
              >
                <Typography
                  component="h1"
                  variant="h6"
                  fontWeight={500}
                  sx={{
                    color: (theme) => theme.palette.text.primary,
                    fontSize: 16,
                  }}
                >
                  Selecione o assunto principal
                </Typography>
              </Grid>
              <Grid
                item
                mt={1}
                lg={10}
                md={10}
                sm={12}
                xs={12}
                alignItems="center"
                display="flex"
                flexDirection="column"
              >
                <Grid container spacing={2}>
                  {main_subjects.map((subject) => (
                    <Grid item key={subject}>
                      <Chip
                        label={subject}
                        onClick={() => {
                          setMainSubject(subject);
                          setMainSubjectError(" ");
                        }}
                        color="primary"
                        variant={
                          mainSubject === subject ? "filled" : "outlined"
                        }
                      />
                    </Grid>
                  ))}
                  <Grid item>
                    <Chip
                      label="Adicionar assunto"
                      onClick={() => {}}
                      color="error"
                      variant="outlined"
                      icon={<Plus style={{ marginLeft: 8 }} />}
                    />
                  </Grid>
                </Grid>
                {mainSubjectError !== " " && (
                  <Typography
                    component="h1"
                    variant="h6"
                    mt={2}
                    sx={{
                      color: (theme) => theme.palette.error.main,
                      fontSize: 12,
                      fontWeight: 400,
                    }}
                  >
                    {mainSubjectError}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
