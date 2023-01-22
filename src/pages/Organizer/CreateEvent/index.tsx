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
import { addDays } from "date-fns";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { EventFooter } from "../../../components/EventFooter";
import { useCustomization } from "../../../hooks/useCustomization";
import { ICity } from "../../../models/city";
import { IEventType } from "../../../models/eventType";
import { IMainSubject } from "../../../models/mainSubject";
import { api } from "../../../services/api";
import { StepOne } from "./StepOne";
import { StepThree } from "./StepThree";
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

export const CreateEvent = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setMenu } = useCustomization();
  const [activeStep, setActiveStep] = useState(0);
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);
  const [completed, setCompleted] = useState<{ [k: number]: boolean }>({});
  const [skipped, setSkipped] = useState(new Set<number>());

  const [title, setTitle] = useState<string>("");
  const [eventType, setEventType] = useState<IEventType | null>(null);
  const [mainSubject, setMainSubject] = useState<IMainSubject | null>(null);
  const [shortDescription, setShortDescription] = useState<string>("");
  const [venueType, setVenueType] = useState<"presential" | "online" | "">("");
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date | null>(
    addDays(new Date(), 1)
  );

  const [endDate, setEndDate] = useState<Date | null>(addDays(new Date(), 4));

  const [uploadedCoverImage, setUploadedCoverImage] =
    useState<IUploadedCoverImage | null>(null);

  const [street, setStreet] = useState<string>("");
  const [city, setCity] = useState<ICity | null>(null);

  const [placeUndefined, setPlaceUndefined] = useState<boolean>(false);
  const [cityError, setCityError] = useState<string>(" ");
  const [streetError, setStreetError] = useState<string>(" ");
  const [titleError, setTitleError] = useState<string>(" ");
  const [eventTypeIdError, setEventTypeIdError] = useState<string>(" ");
  const [mainSubjectError, setMainSubjectError] = useState<string>(" ");
  const [shortDescriptionError, setShortDescriptionError] =
    useState<string>(" ");
  const [venueTypeError, setVenueTypeError] = useState<string>(" ");
  const [startDateError, setStartDateError] = useState<string>(" ");
  const [endDateError, setEndDateError] = useState<string>(" ");
  const [uploadedCoverImageError, setUploadedCoverImageError] =
    useState<string>(" ");
  const [responsibleName, setResponsibleName] = useState<string>("");
  const [responsibleEmail, setResponsibleEmail] = useState<string>("");
  const [responsibleDescription, setResponsibleDescription] =
    useState<string>("");
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);
  const [responsibleNameError, setResponsibleNameError] = useState<string>(" ");
  const [responsibleEmailError, setResponsibleEmailError] =
    useState<string>(" ");
  const [responsibleDescriptionError, setResponsibleDescriptionError] =
    useState<string>(" ");

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

    // if (searchParams.get("type") !== null) {
    //   if (
    //     searchParams.get("type") === "1" ||
    //     searchParams.get("type") === "2"
    //   ) {
    //     setEventType(null);
    //   }
    // }
  }, [searchParams]);

  useEffect(() => {
    setMenu(false);

    return () => {
      setMenu(true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validateStepOne = () => {
    if (title === "") {
      setTitleError("Título do evento é obrigatório");
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return false;
    }
    if (shortDescription === "") {
      setShortDescriptionError("Descrição do evento é obrigatório");
      window.scrollTo({
        top: 10,
        behavior: "smooth",
      });
      return false;
    }
    if (uploadedCoverImage === null) {
      setUploadedCoverImageError("Capa do evento é obrigatório");
      window.scrollTo({
        top: 300,
        behavior: "smooth",
      });
      return false;
    }
    if (startDate === null) {
      setStartDateError("Data de início é obrigatório");
      window.scrollTo({
        top: 700,
        behavior: "smooth",
      });
      return false;
    }

    if (endDate === null) {
      setEndDateError("Data de término é obrigatório");
      window.scrollTo({
        top: 700,
        behavior: "smooth",
      });
      return false;
    }

    if (venueType === "") {
      setVenueTypeError("Tipo do evento é obrigatório");
      window.scrollTo({
        top: 950,
        behavior: "smooth",
      });
      return false;
    }
    return true;
  };

  const validateStepTwo = () => {
    if (!placeUndefined) {
      if (city === null) {
        setCityError("Cidade do evento é obrigatório");
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        return false;
      }
      if (street === "") {
        setStreetError("Endereço do evento é obrigatório");
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        return false;
      }
    }
    if (eventType === null) {
      setEventTypeIdError("Categoria do evento é obrigatório");
      window.scrollTo({
        top: 1000,
        behavior: "smooth",
      });
      return false;
    }
    if (mainSubject === null) {
      setMainSubjectError("Assunto principal é obrigatório");
      window.scrollTo({
        top: 1500,
        behavior: "smooth",
      });
      return false;
    }
    return true;
  };

  const validateStepThree = () => {
    if (responsibleName === "") {
      setResponsibleNameError("Nome do responśavel do evento é obrigatório");
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return false;
    }
    if (responsibleEmail === "") {
      setResponsibleEmailError("Email do responsável do evento é obrigatório");
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return false;
    }

    if (responsibleDescription === "") {
      setResponsibleDescriptionError(
        "Descrição do responsável do evento é obrigatório"
      );
      window.scrollTo({
        top: 1000,
        behavior: "smooth",
      });
      return false;
    }

    return true;
  };

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

    if (activeStep === 0) {
      if (validateStepOne()) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }
    if (activeStep === 1) {
      if (validateStepTwo()) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }
    if (activeStep === 2) {
      if (validateStepThree()) {
        handleSubmit();
      }
    }
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

  const handleSubmit = async () => {
    setIsCreatingEvent(true);
    try {
      const response = await api.post("/events", {
        title,
        event_type_id: eventType?.id,
        main_subject_id: mainSubject?.id,
        short_description: shortDescription,
        venue_type: venueType,
        is_private: isPrivate,
        start_date: startDate,
        end_date: endDate,
        address: street,
        city_id: city?.id,
        responsible_name: responsibleName,
        responsible_email: responsibleEmail,
        responsible_description: responsibleDescription,
      });

      if (response.data) {
        // TO-DO: adicionar upload da capa do evento
        if (uploadedCoverImage) {
          const id = toast.loading("Fazendo o upload da imagem do evento... ");
          const formData = new FormData();
          formData.append(
            "cover",
            uploadedCoverImage.file,
            uploadedCoverImage.name
          );
          api
            .post(`/events/${response.data.data.id}/cover`, formData, {
              headers: {
                "Content-Type": `multipart/form-data`,
              },
            })
            .then(() => {
              toast.update(id, {
                render: "A capa do evento foi enviada com sucesso",
                type: "success",
                isLoading: false,
                autoClose: 5000,
              });
            })
            .catch((error: any) => {
              console.log("Error upload", error);
              toast.update(id, {
                render: `${
                  error.response
                    ? error.response.data.error.message
                    : "Upload cancelado"
                }. Você pode alterar a capa do evento acessando o painel do evento`,
                type: "error",
                isLoading: false,
                autoClose: 5000,
              });
            })
            .finally(() => {
              toast.success("Evento criado com sucesso!");
              setIsCreatingEvent(false);
              navigate("/organizador");
            });
        } else {
          setIsCreatingEvent(false);
          toast.success("Evento criado com sucesso!");
          navigate("/organizador");
        }
      }
    } catch (error: any) {
      setIsCreatingEvent(false);
      if (error.response) {
        toast.error(error.response.data.error.message);
      }
      console.log("Error ao criar evento =>", error);
    }
  };

  return (
    <>
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
            variant="h6"
            mb={1}
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
              shortDescription={shortDescription}
              setShortDescription={setShortDescription}
              venueType={venueType}
              setVenueType={setVenueType}
              isPrivate={isPrivate}
              setIsPrivate={setIsPrivate}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              uploadedCoverImage={uploadedCoverImage}
              setUploadedCoverImage={setUploadedCoverImage}
              titleError={titleError}
              setTitleError={setTitleError}
              shortDescriptionError={shortDescriptionError}
              setShortDescriptionError={setShortDescriptionError}
              venueTypeError={venueTypeError}
              setVenueTypeError={setVenueTypeError}
              startDateError={startDateError}
              setStartDateError={setStartDateError}
              endDateError={endDateError}
              setEndDateError={setEndDateError}
              uploadedCoverImageError={uploadedCoverImageError}
              setUploadedCoverImageError={setUploadedCoverImageError}
            />
          )}
          {activeStep === 1 && (
            <StepTwo
              city={city}
              setCity={setCity}
              street={street}
              setStreet={setStreet}
              placeUndefined={placeUndefined}
              setPlaceUndefined={setPlaceUndefined}
              eventType={eventType}
              setEventType={setEventType}
              mainSubject={mainSubject}
              setMainSubject={setMainSubject}
              eventTypeIdError={eventTypeIdError}
              setEventTypeIdError={setEventTypeIdError}
              mainSubjectError={mainSubjectError}
              setMainSubjectError={setMainSubjectError}
              cityError={cityError}
              setCityError={setCityError}
              streetError={streetError}
              setStreetError={setStreetError}
            />
          )}
          {activeStep === 2 && (
            <StepThree
              responsibleName={responsibleName}
              setResponsibleName={setResponsibleName}
              responsibleEmail={responsibleEmail}
              setResponsibleEmail={setResponsibleEmail}
              responsibleDescription={responsibleDescription}
              setResponsibleDescription={setResponsibleDescription}
              responsibleNameError={responsibleNameError}
              setResponsibleNameError={setResponsibleNameError}
              responsibleEmailError={responsibleEmailError}
              setResponsibleEmailError={setResponsibleEmailError}
              responsibleDescriptionError={responsibleDescriptionError}
              setResponsibleDescriptionError={setResponsibleDescriptionError}
              acceptedTerms={acceptedTerms}
              setAcceptedTerms={setAcceptedTerms}
            />
          )}
        </Container>
      </Box>
      <EventFooter
        onBack={handleBack}
        onComplete={handleComplete}
        activeStep={activeStep}
        acceptedTerms={acceptedTerms}
        steps={steps}
        isLoading={isCreatingEvent}
      />
    </>
  );
};
