import {
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

interface IStepThree {
  responsibleName: string;
  setResponsibleName: (value: string) => void;
  responsibleEmail: string;
  setResponsibleEmail: (value: string) => void;
  responsibleDescription: string;
  setResponsibleDescription: (value: string) => void;
  responsibleNameError: string;
  setResponsibleNameError: (value: string) => void;
  responsibleEmailError: string;
  setResponsibleEmailError: (value: string) => void;
  responsibleDescriptionError: string;
  setResponsibleDescriptionError: (value: string) => void;
  acceptedTerms: boolean;
  setAcceptedTerms: (value: boolean) => void;
}

export const StepThree = ({
  responsibleName,
  setResponsibleName,
  responsibleEmail,
  setResponsibleEmail,
  responsibleDescription,
  setResponsibleDescription,
  responsibleNameError,
  setResponsibleNameError,
  responsibleEmailError,
  setResponsibleEmailError,
  responsibleDescriptionError,
  setResponsibleDescriptionError,
  setAcceptedTerms,
  acceptedTerms,
}: IStepThree) => {
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
                  <StepIcon icon="6" />
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
                    Organizador do evento
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
                    <TextField
                      label="Nome do organizador"
                      variant="outlined"
                      onChange={(e) => setResponsibleName(e.target.value)}
                      onBlur={() => {
                        setResponsibleNameError(" ");
                      }}
                      error={responsibleNameError !== " "}
                      helperText={responsibleNameError}
                      value={responsibleName}
                      size="small"
                      fullWidth
                      color="primary"
                    />
                  </Grid>
                  <Grid item lg={6} md={6} xs={12}>
                    <TextField
                      label="E-mail para contato"
                      variant="outlined"
                      onChange={(e) => setResponsibleEmail(e.target.value)}
                      onBlur={() => {
                        setResponsibleEmailError(" ");
                      }}
                      error={responsibleEmailError !== " "}
                      helperText={responsibleEmailError}
                      value={responsibleEmail}
                      size="small"
                      fullWidth
                      color="primary"
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
                  id="outlined-multiline-static"
                  label="Descrição do organizador"
                  onChange={(e) => setResponsibleDescription(e.target.value)}
                  onBlur={() => {
                    setResponsibleDescriptionError(" ");
                  }}
                  error={responsibleDescriptionError !== " "}
                  helperText={responsibleDescriptionError}
                  value={responsibleDescription}
                  variant="outlined"
                  multiline
                  rows={4}
                  size="small"
                  fullWidth
                  color="primary"
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item lg={10} md={10} sm={12} xs={12} display="flex">
        <FormControlLabel
          control={
            <Checkbox
              checked={acceptedTerms}
              onChange={(event, value) => {
                setAcceptedTerms(value);
              }}
            />
          }
          label="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus ab veritatis expedita? Nam suscipit, recusandae commodi perspiciatis nesciunt porro possimus temporibus, id earum cum sunt dolor, excepturi odio voluptatibus! Quod."
        />
      </Grid>
    </Grid>
  );
};
