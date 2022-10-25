import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  IconButton,
  Stack,
  StepIcon,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { addDays } from "date-fns";
import { filesize } from "filesize";
import { uniqueId } from "lodash";
import {
  Buildings,
  GlobeHemisphereEast,
  Laptop,
  MusicNotes,
  Plus,
} from "phosphor-react";
import { useCallback, useState } from "react";
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

const main_subjects = [
  "Acadêmico e científico",
  "Desenvolvimento pessoal",
  "Design e produtos digitais",
  "Esportes",
  "Games e Geek",
  "Gastronomia",
  "Empreendedorismo, negócios e inovasão",
  "Governo e política",
  "Marketing e vendas",
  "Moda e beleza",
  "Saúde e bem-estar",
  "Religião e espiritualidade",
  "Sociedade e cultura",
  "Teatro, stand-up e dança",
];

export const StepOne = () => {
  const [uploadedCoverImage, setUploadedCoverImage] =
    useState<IUploadedCoverImage | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(
    addDays(new Date(), 1)
  );
  const [startTime, setStartTime] = useState<Date | null>(null);

  const handleUpload = useCallback(<T extends File>(files: T[]) => {
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
    setUploadedCoverImage(uploadedImages[0]);
    console.log("Files", files);
  }, []);

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
                lg={8}
                md={8}
                sm={12}
                xs={12}
                justifyContent="center"
                display="flex"
              >
                <Stack direction="row" spacing={1} mt={1} alignItems="center">
                  <StepIcon icon="I" />
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
                lg={8}
                md={8}
                sm={12}
                xs={12}
                justifyContent="center"
                display="flex"
              >
                <TextField
                  label="Nome do evento"
                  variant="outlined"
                  size="small"
                  fullWidth
                  color="primary"
                />
              </Grid>
              <Grid
                item
                lg={8}
                md={8}
                sm={12}
                xs={12}
                justifyContent="center"
                display="flex"
              >
                <TextField
                  id="outlined-multiline-static"
                  label="Descrição curta"
                  variant="outlined"
                  multiline
                  rows={4}
                  size="small"
                  fullWidth
                  color="primary"
                />
              </Grid>

              <Grid
                item
                lg={8}
                md={8}
                sm={12}
                xs={12}
                justifyContent="center"
                display="flex"
              >
                <Grid container spacing={2} alignItems="center" display="flex">
                  <Grid item lg={6} md={6}>
                    <Typography
                      component="h1"
                      variant="h6"
                      mb={1}
                      sx={{
                        color: (theme) => theme.palette.text.primary,
                        fontSize: 14,
                      }}
                    >
                      Capa (Imagem principal)
                    </Typography>
                    <UploadImage onUpload={handleUpload} />
                  </Grid>
                  <Grid item lg={6} md={6}>
                    <Typography
                      component="h1"
                      variant="h6"
                      sx={{
                        color: (theme) => theme.palette.text.primary,
                        fontSize: 16,
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
                  sm={12}
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
                    <Grid item lg={12} md={12}>
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
                        height="200px"
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
                lg={8}
                md={8}
                sm={12}
                xs={12}
                justifyContent="center"
                display="flex"
              >
                <Stack direction="row" spacing={1} mt={1} alignItems="center">
                  <StepIcon icon="II" />
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
                lg={8}
                md={8}
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
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                lg={8}
                md={8}
                sm={12}
                xs={12}
                justifyContent="center"
                display="flex"
              >
                <Grid container spacing={2}>
                  <Grid item lg={6} md={6} xs={12}>
                    <DatePicker
                      label="Data de término"
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
                        />
                      )}
                    />
                  </Grid>
                  <Grid item lg={6} md={6} xs={12}>
                    <TimePicker
                      label="Hora de término"
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
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                mt={2}
                lg={8}
                md={8}
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
                      title="Jornada ou congresso"
                      sx={{
                        backgroundColor: (theme) =>
                          theme.palette.action.disabledBackground,
                        width: 70,
                        height: 70,
                      }}
                    >
                      <GlobeHemisphereEast />
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
                      title="Festival, Festa ou show"
                      color="primary"
                      sx={{
                        backgroundColor: (theme) =>
                          theme.palette.action.disabledBackground,
                        width: 70,
                        height: 70,
                      }}
                    >
                      <Buildings />
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
                lg={8}
                md={8}
                sm={12}
                xs={12}
                justifyContent="center"
                display="flex"
              >
                <Stack direction="row" spacing={1} mt={1} alignItems="center">
                  <StepIcon icon="III" />
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
                lg={8}
                md={8}
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
                      <Laptop />
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
                      Jornada ou congresso
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
                      <MusicNotes />
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
                      Festival, Festa ou show
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
              <Grid
                item
                mt={3}
                lg={8}
                md={8}
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
                  {main_subjects.map((subject) => (
                    <Grid item>
                      <Chip
                        label={subject}
                        key={subject}
                        onClick={() => {}}
                        color="primary"
                        variant="outlined"
                      />
                    </Grid>
                  ))}
                  <Grid item>
                    <Chip
                      label="Adicionar assunto"
                      onClick={() => {}}
                      color="error"
                      variant="outlined"
                      icon={
                        <Plus style={{marginLeft: 8}} />
                      }
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
