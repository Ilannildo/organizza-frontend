import {
  Autocomplete,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Stack,
  StepIcon,
  TextField,
  Typography,
} from "@mui/material";
import { Ticket as TicketIcon } from "phosphor-react";
import { Ticket } from "../../../../../components/Ticket";

export const StepTwo = () => {
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
                      options={[
                        {
                          label: "Cametá",
                          value: "cametá",
                        },
                      ]}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Selecione uma cidade"
                          variant="outlined"
                          size="small"
                          fullWidth
                        />
                      )}
                    />
                  </Grid>
                  <Grid item lg={6} md={6} xs={12}>
                    <Autocomplete
                      disablePortal
                      id="state"
                      disabled
                      options={[
                        {
                          label: "Pará",
                          value: "pa",
                        },
                      ]}
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
                  size="small"
                  fullWidth
                  color="primary"
                />
              </Grid>
              <Grid item lg={8} md={8} sm={12} xs={12} display="flex">
                <FormControlLabel
                  control={<Checkbox />}
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
                    <Ticket />
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
                      title="Jornada ou congresso"
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
                      title="Festival, Festa ou show"
                      color="primary"
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
      </Grid>
    </Grid>
  );
};
