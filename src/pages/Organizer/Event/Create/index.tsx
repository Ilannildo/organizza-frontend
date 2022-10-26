import { useState } from "react";
import {
  Box,
  Container,
  Divider,
  Grid,
  Step,
  StepButton,
  Stepper,
  Typography,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { Navbar } from "../../../../components/Navbar";
import { StepOne } from "./StepOne";
import { EventFooter } from "../../../../components/EventFooter";
import { StepTwo } from "./StepTwo";

const steps = [
  "Informações gerais",
  "Preço e localização",
  "Informações adicionais",
];

const CreateEvent = () => {
  const [searchParams] = useSearchParams();
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{ [k: number]: boolean }>({});
  const [skipped, setSkipped] = useState(new Set<number>());
  console.log("Search params", searchParams.get("venue"));
  console.log("Search params", searchParams.get("type"));

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.background.default,
          pt: 2,
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            minHeight: "100vh",
            pb: 10,
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            mb={2}
            fontWeight={600}
            sx={{
              color: (theme) => theme.palette.text.primary,
            }}
          >
            Criar evento
          </Typography>
          <Divider />
          <Grid
            container
            mt={2}
            spacing={2}
            justifyContent="center"
            display="flex"
          >
            <Grid item lg={8} md={10} sm={12} xs={12}>
              <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                  const stepProps: { completed?: boolean } = {};
                  const labelProps: {
                    optional?: React.ReactNode;
                  } = {};
                  if (isStepOptional(index)) {
                    labelProps.optional = (
                      <Typography variant="caption">Optional</Typography>
                    );
                  }
                  if (isStepSkipped(index)) {
                    stepProps.completed = false;
                  }
                  return (
                    <Step key={label} {...stepProps}>
                      <StepButton color="inherit" onClick={handleStep(index)}>
                        {label}
                      </StepButton>
                    </Step>
                  );
                })}
              </Stepper>
            </Grid>
          </Grid>
          {/* steps */}
          {activeStep === 0 && <StepOne />}
          {activeStep === 1 && <StepTwo />}
          {activeStep === 2 && <Typography>Informações</Typography>}
        </Container>
      </Box>
      <EventFooter
        onBack={handleBack}
        onComplete={handleComplete}
        activeStep={activeStep}
        steps={steps}
      />
    </>
  );
};

export default CreateEvent;
