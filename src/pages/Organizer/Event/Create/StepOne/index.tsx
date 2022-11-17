import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Stack,
  StepIcon,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { filesize } from "filesize";
import { uniqueId } from "lodash";
import {
  Buildings,
  GlobeHemisphereEast,
  UsersThree,
  Webcam,
} from "phosphor-react";
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { UploadImage } from "../../../../../components/UploadImage";

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

interface IEventGeneralInformation {
  title: string;
  setTitle: (value: string) => void;
  
  shortDescription: string;
  setShortDescription: (value: string) => void;
  venueType: "presential" | "online" | "";
  setVenueType: (value: "presential" | "online" | "") => void;
  isPrivate: boolean | null;
  setIsPrivate: (value: boolean | null) => void;
  startDate: Date | null;
  setStartDate: (value: Date | null) => void;
  startTime: Date | null;
  setStartTime: (value: Date | null) => void;
  endDate: Date | null;
  setEndDate: (value: Date | null) => void;
  endTime: Date | null;
  setEndTime: (value: Date | null) => void;
  uploadedCoverImage: IUploadedCoverImage | null;
  setUploadedCoverImage: (value: IUploadedCoverImage | null) => void;
  titleError: string;
  setTitleError: (value: string) => void;
  
  shortDescriptionError: string;
  setShortDescriptionError: (value: string) => void;
  venueTypeError: string;
  setVenueTypeError: (value: string) => void;
  isPrivateError: string;
  setIsPrivateError: (value: string) => void;
  startDateError: string;
  setStartDateError: (value: string) => void;
  startTimeError: string;
  setStartTimeError: (value: string) => void;
  endDateError: string;
  setEndDateError: (value: string) => void;
  endTimeError: string;
  setEndTimeError: (value: string) => void;
  uploadedCoverImageError: string;
  setUploadedCoverImageError: (value: string) => void;
}

export const StepOne = ({
  title,
  setTitle,
  
  shortDescription,
  setShortDescription,
  venueType,
  setVenueType,
  isPrivate,
  setIsPrivate,
  startDate,
  setStartDate,
  startTime,
  setStartTime,
  endDate,
  setEndDate,
  endTime,
  setEndTime,
  uploadedCoverImage,
  setUploadedCoverImage,
  titleError,
  setTitleError,
  shortDescriptionError,
  setShortDescriptionError,
  venueTypeError,
  setVenueTypeError,
  isPrivateError,
  setIsPrivateError,
  startDateError,
  setStartDateError,
  startTimeError,
  setStartTimeError,
  endDateError,
  setEndDateError,
  endTimeError,
  setEndTimeError,
  uploadedCoverImageError,
  setUploadedCoverImageError,
}: IEventGeneralInformation) => {
  const [searchParams] = useSearchParams();
  const theme = useTheme();

  const handleUpload = useCallback(
    <T extends File>(files: T[]) => {
      const uploadedImages = files.map((file) => ({
        file,
        id: uniqueId(),
        name: file.name,
        readableSize: filesize(file.size),
        preview: URL.createObjectURL(file),
        progreess: 0,
        uploaded: false,
        error: false,
        url: null,
      }));
      setUploadedCoverImageError(" ");
      setUploadedCoverImage(uploadedImages[0]);
    },
    [setUploadedCoverImage, setUploadedCoverImageError]
  );

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
                  <StepIcon icon="1" />
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
                    Informações sobre o evento
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
                <TextField
                  label="Título do evento"
                  variant="outlined"
                  onChange={(e) => setTitle(e.target.value)}
                  onBlur={() => {
                    setTitleError(" ");
                  }}
                  error={titleError !== " "}
                  helperText={titleError}
                  value={title}
                  size="small"
                  fullWidth
                  color="primary"
                />
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
                  label="Descrição curta"
                  error={shortDescriptionError !== " "}
                  helperText={shortDescriptionError}
                  onBlur={() => {
                    setShortDescriptionError(" ");
                  }}
                  variant="outlined"
                  onChange={(e) => setShortDescription(e.target.value)}
                  value={shortDescription}
                  multiline
                  rows={4}
                  size="small"
                  fullWidth
                  color="primary"
                />
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
                <Grid container spacing={2} alignItems="center" display="flex">
                  <Grid item lg={6} md={6} sm={6}>
                    <Typography
                      component="h1"
                      variant="h6"
                      mb={1}
                      sx={{
                        color: (theme) => theme.palette.text.primary,
                        fontSize: 14,
                      }}
                    >
                      Capa (Imagem principal){" "}
                    </Typography>
                    <UploadImage
                      onUpload={handleUpload}
                      error={uploadedCoverImageError}
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={6}>
                    <Typography
                      component="h1"
                      variant="h6"
                      sx={{
                        color: (theme) => theme.palette.text.primary,
                        fontSize: 14,
                        fontWeight: 400,
                      }}
                    >
                      A resolução recomendada é de 1600 x 838. Os formatos
                      aceitos são: PNG, JPEG ou GIF de no máximo 3MB.
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              {uploadedCoverImage && (
                <Grid
                  item
                  lg={6}
                  md={6}
                  sm={6}
                  xs={12}
                  justifyContent="center"
                  display="flex"
                >
                  <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    display="flex"
                  >
                    <Grid item lg={12} md={12} sm={12}>
                      <Typography
                        component="h1"
                        variant="h6"
                        sx={{
                          color: (theme) => theme.palette.text.primary,
                          fontSize: 14,
                        }}
                      >
                        Preview
                      </Typography>
                      <Box
                        height="300px"
                        width="100%"
                        mt={1}
                        sx={{
                          background: `url(${uploadedCoverImage.preview})`,
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                          backgroundPositionX: "center",
                          backgroundPositionY: "top",
                          display: "flex",
                          alignItems: "end",
                          borderRadius: 1,
                        }}
                      />

                      <Stack mt={1}>
                        <Typography
                          component="h1"
                          variant="h6"
                          sx={{
                            color: (theme) => theme.palette.text.primary,
                            fontSize: 14,
                          }}
                        >
                          {uploadedCoverImage.name}
                        </Typography>
                        <Stack spacing={1} direction="row" alignItems="center">
                          <Typography
                            sx={{
                              color: (theme) => theme.palette.text.disabled,
                              fontSize: 12,
                            }}
                          >
                            {uploadedCoverImage.readableSize.toString()}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Grid>
                  </Grid>
                </Grid>
              )}
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
                  <StepIcon icon="2" />
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
                    Data e horário do evento
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
                    <DatePicker
                      label="Data de início"
                      value={startDate}
                      onChange={(newValue) => {
                        setStartDate(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          size="small"
                          fullWidth
                          error={startDateError !== " "}
                          helperText={startDateError}
                          onBlur={() => {
                            setStartDateError(" ");
                          }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item lg={6} md={6} xs={12}>
                    <TimePicker
                      label="Hora de início"
                      value={startTime}
                      onChange={(newValue) => {
                        setStartTime(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          size="small"
                          fullWidth
                          error={startTimeError !== " "}
                          helperText={startTimeError}
                          onBlur={() => {
                            setStartTimeError(" ");
                          }}
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
                <Grid container spacing={2}>
                  <Grid item lg={6} md={6} xs={12}>
                    <DatePicker
                      label="Data de término"
                      value={endDate}
                      onChange={(newValue) => {
                        setEndDate(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          size="small"
                          fullWidth
                          error={endDateError !== " "}
                          helperText={endDateError}
                          onBlur={() => {
                            setEndDateError(" ");
                          }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item lg={6} md={6} xs={12}>
                    <TimePicker
                      label="Hora de término"
                      value={endTime}
                      onChange={(newValue) => {
                        setEndTime(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          size="small"
                          fullWidth
                          error={endTimeError !== " "}
                          helperText={endTimeError}
                          onBlur={() => {
                            setEndTimeError(" ");
                          }}
                        />
                      )}
                    />
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
                <Typography
                  component="h1"
                  variant="h6"
                  fontWeight={500}
                  sx={{
                    color: (theme) => theme.palette.text.primary,
                    fontSize: 16,
                  }}
                >
                  Visibilidade do evento
                </Typography>
                <Stack spacing={4} direction="row" mt={2}>
                  <Stack alignItems="center" spacing={1}>
                    <IconButton
                      color="primary"
                      onClick={() => {
                        setIsPrivate(false);
                        setIsPrivateError(" ");
                      }}
                      sx={{
                        backgroundColor: (theme) =>
                          isPrivate === false
                            ? theme.palette.primary.main
                            : theme.palette.primaryContainer.main,
                        width: 70,
                        height: 70,
                      }}
                    >
                      <GlobeHemisphereEast
                        color={
                          isPrivate === false
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
                      Público
                    </Typography>
                  </Stack>
                  <Stack alignItems="center" spacing={1}>
                    <IconButton
                      color="primary"
                      onClick={() => {
                        setIsPrivate(true);
                        setIsPrivateError(" ");
                      }}
                      sx={{
                        backgroundColor: (theme) =>
                          isPrivate === true
                            ? theme.palette.primary.main
                            : theme.palette.primaryContainer.main,
                        width: 70,
                        height: 70,
                      }}
                    >
                      <Buildings
                        color={
                          isPrivate === true
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
                      Privado
                    </Typography>
                  </Stack>
                </Stack>
                {isPrivateError !== " " && (
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
                    {isPrivateError}
                  </Typography>
                )}
              </Grid>
              {searchParams.get("venue") !== "online" &&
                searchParams.get("venue") !== "presential" && (
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
                    <Typography
                      component="h1"
                      variant="h6"
                      fontWeight={500}
                      sx={{
                        color: (theme) => theme.palette.text.primary,
                        fontSize: 16,
                      }}
                    >
                      Tipo de evento
                    </Typography>
                    <Stack spacing={4} direction="row" mt={2}>
                      <Stack alignItems="center" spacing={1}>
                        <IconButton
                          color="primary"
                          onClick={() => {
                            setVenueType("presential");
                            setVenueTypeError(" ");
                          }}
                          sx={{
                            backgroundColor: (theme) =>
                              venueType === "presential"
                                ? theme.palette.primary.main
                                : theme.palette.action.disabledBackground,
                            width: 70,
                            height: 70,
                          }}
                        >
                          <UsersThree
                            color={
                              venueType === "presential"
                                ? theme.palette.action.disabled
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
                          Presencial
                        </Typography>
                      </Stack>
                      <Stack alignItems="center" spacing={1}>
                        <IconButton
                          color="primary"
                          onClick={() => {
                            setVenueType("online");
                            setVenueTypeError(" ");
                          }}
                          sx={{
                            backgroundColor: (theme) =>
                              venueType === "online"
                                ? theme.palette.primary.main
                                : theme.palette.action.disabledBackground,
                            width: 70,
                            height: 70,
                          }}
                        >
                          <Webcam
                            color={
                              venueType === "online"
                                ? theme.palette.action.disabled
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
                          Online
                        </Typography>
                      </Stack>
                    </Stack>
                    {venueTypeError !== " " && (
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
                        {venueTypeError}
                      </Typography>
                    )}
                  </Grid>
                )}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
