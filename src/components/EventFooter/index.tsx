import { Box, Button, CircularProgress, Container, Grid, Stack } from "@mui/material";

interface IEventFooter {
  onBack: () => void;
  onComplete: () => void;
  activeStep: number;
  acceptedTerms: boolean;
  isLoading: boolean;
  steps: string[];
}

export const EventFooter = ({
  onBack,
  onComplete,
  activeStep,
  acceptedTerms,
  steps,
  isLoading,
}: IEventFooter) => {
  return (
    <Box
      position="sticky"
      bottom={0}
      // height="48px"
      p={1}
      sx={{
        background:
          "linear-gradient(152.97deg, rgba(21, 21, 21, 0.1) 0%, rgba(21, 21, 21, 0) 100%)",
        boxShadow: "1px 1px 16px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(21px)",
      }}
    >
      <Container>
        <Grid
          container
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
            justifyContent="end"
            position="relative"
            display="flex"
          >
            <Stack spacing={3} direction="row">
              {activeStep > 0 && (
                <Button
                  variant="outlined"
                  onClick={onBack}
                  disabled={isLoading}
                >
                  Voltar
                </Button>
              )}
              <Button
                variant="contained"
                onClick={onComplete}
                disabled={activeStep === steps.length - 1 && !acceptedTerms}
              >
                {isLoading ? (
                  <CircularProgress color="inherit" size={24} />
                ) : activeStep === steps.length - 1 ? (
                  "Criar evento"
                ) : (
                  "Próximo passo"
                )}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
