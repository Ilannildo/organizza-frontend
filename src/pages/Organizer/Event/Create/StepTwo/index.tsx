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
import { Plus } from "phosphor-react";
import { ICity } from "../../../../../models/city";
import { useAllCities } from "../../../../../stores/city";
import { useAllEventTypes } from "../../../../../stores/eventType";
import { useAllMainSubjects } from "../../../../../stores/mainSubject";
import { useAllStates } from "../../../../../stores/state";

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
  const { data: eventTypes } = useAllEventTypes();
  const { data: mainSubjects } = useAllMainSubjects();
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
                  {eventTypes?.map((type) => (
                    <Stack key={type.id} alignItems="center" spacing={1}>
                      <IconButton
                        color="primary"
                        onClick={() => {
                          setEventTypeId(type.id);
                          setEventTypeIdError(" ");
                        }}
                        sx={{
                          backgroundColor: (theme) =>
                            eventTypeId === type.id
                              ? theme.palette.primary.main
                              : theme.palette.primaryContainer.main,
                          width: 70,
                          height: 70,
                        }}
                      >
                        <i
                          className={`ph-${type.icon_name}`}
                          style={{
                            color:
                              eventTypeId === type.id
                                ? theme.palette.primaryContainer.main
                                : theme.palette.primary.main,
                          }}
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
                        {type.title}
                      </Typography>
                    </Stack>
                  ))}
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
                  {mainSubjects?.map((subject) => (
                    <Grid item key={subject.id}>
                      <Chip
                        label={subject.title}
                        onClick={() => {
                          setMainSubject(subject.id);
                          setMainSubjectError(" ");
                        }}
                        color="primary"
                        variant={
                          mainSubject === subject.id ? "filled" : "outlined"
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
