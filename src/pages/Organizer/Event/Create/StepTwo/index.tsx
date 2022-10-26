import {
  Autocomplete,
  Box,
  Card,
  CardContent,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
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
  Ticket as TicketIcon,
} from "phosphor-react";
import { useCallback, useState } from "react";
import { Ticket } from "../../../../../components/Ticket";
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

export const StepTwo = () => {
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
                lg={8}
                md={8}
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
                lg={8}
                md={8}
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
                lg={8}
                md={8}
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
                lg={8}
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
