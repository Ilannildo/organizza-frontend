import {
  Box,
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
  useTheme,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { filesize } from "filesize";
import { uniqueId } from "lodash";
import { UsersThree, Webcam } from "phosphor-react";
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { UploadImage } from "../../../../components/UploadImage";

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
  isPrivate: boolean;
  setIsPrivate: (value: boolean) => void;
  startDate: Date | null;
  setStartDate: (value: Date | null) => void;
  endDate: Date | null;
  setEndDate: (value: Date | null) => void;
  uploadedCoverImage: IUploadedCoverImage | null;
  setUploadedCoverImage: (value: IUploadedCoverImage | null) => void;
  titleError: string;
  setTitleError: (value: string) => void;
  shortDescriptionError: string;
  setShortDescriptionError: (value: string) => void;
  venueTypeError: string;
  setVenueTypeError: (value: string) => void;
  startDateError: string;
  setStartDateError: (value: string) => void;
  endDateError: string;
  setEndDateError: (value: string) => void;
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
  endDate,
  setEndDate,
  uploadedCoverImage,
  setUploadedCoverImage,
  titleError,
  setTitleError,
  shortDescriptionError,
  setShortDescriptionError,
  venueTypeError,
  setVenueTypeError,
  startDateError,
  setStartDateError,
  endDateError,
  setEndDateError,
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
                lg={7}
                md={7}
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
                  multiline
                  maxRows={2}
                  value={title}
                  size="small"
                  fullWidth
                  color="primary"
                />
              </Grid>
              <Grid item lg={3} md={3} sm={12} xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={(e, value) => {
                        setIsPrivate(!value);
                      }}
                      checked={!isPrivate}
                    />
                  }
                  label="O evento é público?"
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
                  label="Descrição curta/Tema"
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
                  lg={8}
                  md={8}
                  sm={8}
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
                    <DateTimePicker
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
                    <DateTimePicker
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
                </Grid>
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
