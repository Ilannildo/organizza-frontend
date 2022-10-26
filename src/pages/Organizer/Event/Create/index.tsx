import { useEffect, useState } from "react";
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
import { addDays } from "date-fns";
import { Navbar } from "../../../../components/Navbar";
import { StepOne } from "./StepOne";
import { EventFooter } from "../../../../components/EventFooter";
import { StepTwo } from "./StepTwo";

const steps = [
  "Informações gerais",
  "Preço e localização",
  "Informações adicionais",
];

interface IUploadedCoverImage {
  file: File;
  id: string;
  name: string;
  readableSize:
    | string
    | number
    | any[]
    | {
        value: any;
        symbol: any;
        exponent: number;
        unit: string;
      };
  preview: string;
  progreess: number;
  uploaded: boolean;
  error: boolean;
  url: string | null;
}

const CreateEvent = () => {
  const [searchParams] = useSearchParams();
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{ [k: number]: boolean }>({});
  const [skipped, setSkipped] = useState(new Set<number>());

  const [title, setTitle] = useState<string>("");
  const [eventTypeId, setEventTypeId] = useState<string>("");
  const [mainSubject, setMainSubject] = useState<string>("");
  const [shortDescription, setShortDescription] = useState<string>("");
  const [venueType, setVenueType] = useState<"presential" | "online" | "">("");
  const [isPrivate, setIsPrivate] = useState<boolean | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(
    addDays(new Date(), 1)
  );
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(addDays(new Date(), 4));
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [uploadedCoverImage, setUploadedCoverImage] =
    useState<IUploadedCoverImage | null>(null);
  // const [responsibleName, setResponsibleName] = useState<string>("");
  // const [responsibleEmail, setResponsibleEmail] = useState<string>("");
  // const [responsibleDescription, setResponsibleDescription] =
  //   useState<string>("");
  console.log("Search params", searchParams.get("venue"));
  console.log("Search params", searchParams.get("type"));

  useEffect(() => {
    if (searchParams.get("venue") !== null) {
      if (searchParams.get("venue") === "online") {
        setVenueType("online");
      }
      if (searchParams.get("venue") === "presential") {
        setVenueType("presential");
      }
    } else {
      setVenueType("");
    }

    if (searchParams.get("type") !== null) {
      if (
        searchParams.get("type") === "1" ||
        searchParams.get("type") === "2"
      ) {
        setEventTypeId(searchParams.get("type")!);
      }
    }
  }, [searchParams]);

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
    window.scrollTo({
      top: 0,      
      behavior: "smooth",
    });
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
            Criar evento{" "}
            {venueType === "online"
              ? "online"
              : venueType === "presential"
              ? "presencial"
              : ""}
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
          {activeStep === 0 && (
            <StepOne
              title={title}
              setTitle={setTitle}
              eventTypeId={eventTypeId}
              setEventTypeId={setEventTypeId}
              mainSubject={mainSubject}
              setMainSubject={setMainSubject}
              shortDescription={shortDescription}
              setShortDescription={setShortDescription}
              venueType={venueType}
              setVenueType={setVenueType}
              isPrivate={isPrivate}
              setIsPrivate={setIsPrivate}
              startDate={startDate}
              setStartDate={setStartDate}
              startTime={startTime}
              setStartTime={setStartTime}
              endDate={endDate}
              setEndDate={setEndDate}
              endTime={endTime}
              setEndTime={setEndTime}
              uploadedCoverImage={uploadedCoverImage}
              setUploadedCoverImage={setUploadedCoverImage}
            />
          )}
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
