import {
  Autocomplete,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  Stack,
  StepIcon,
  TextField,
  Typography,
} from "@mui/material";
import { ICity } from "../../../../models/city";
import { IEventType } from "../../../../models/eventType";
import { IMainSubject } from "../../../../models/mainSubject";
import { useAllCities } from "../../../../stores/city";
import { useAllEventTypes } from "../../../../stores/eventType";
import { useAllMainSubjects } from "../../../../stores/mainSubject";
import { useAllStates } from "../../../../stores/state";

interface IStepTwo {
  city: ICity | null;
  setCity: (city: ICity | null) => void;
  street: string;
  setStreet: (value: string) => void;
  placeUndefined: boolean;
  setPlaceUndefined: (value: boolean) => void;
  eventType: IEventType | null;
  setEventType: (value: IEventType | null) => void;
  mainSubject: IMainSubject | null;
  setMainSubject: (value: IMainSubject | null) => void;
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
  eventType,
  setEventType,
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
  const { data: eventTypes, isLoading: isLoadingEventTypes } =
    useAllEventTypes();
  const { data: mainSubjects } = useAllMainSubjects();

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
                      id="category"
                      options={eventTypes !== undefined ? eventTypes : []}
                      getOptionLabel={(value) => value.title}
                      loading={isLoadingEventTypes}
                      disabled={isLoadingEventTypes}
                      onChange={(event, newValue) => {
                        setEventType(newValue);
                        setEventTypeIdError(" ");
                      }}
                      value={eventType}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Selecione a categoria do evento"
                          variant="outlined"
                          size="small"
                          fullWidth
                          onBlur={() => {
                            setEventTypeIdError(" ");
                          }}
                          error={eventTypeIdError !== " "}
                          helperText={eventTypeIdError}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item lg={6} md={6} xs={12}>
                    <Autocomplete
                      id="main-subject"
                      options={mainSubjects !== undefined ? mainSubjects : []}
                      getOptionLabel={(value) => value.title}
                      loading={isLoadingEventTypes}
                      disabled={isLoadingEventTypes}
                      onChange={(event, newValue) => {
                        setMainSubject(newValue);
                        setMainSubjectError(" ");
                      }}
                      value={mainSubject}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Selecione o assunto principal"
                          variant="outlined"
                          size="small"
                          fullWidth
                          onBlur={() => {
                            setMainSubjectError(" ");
                          }}
                          error={mainSubjectError !== " "}
                          helperText={mainSubjectError}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
