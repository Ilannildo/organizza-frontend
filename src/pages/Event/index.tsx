import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Navbar } from "./components/Navbar";

import EventCover from "../../assets/images/cover.jpg";
import { SectionMarker } from "../../components/SectionMarker";

const Event = () => {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      <Box
        id="início"
        component="section"
        sx={{
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        <Navbar />
        {!matchesSM && (
          <Box
            height="100vh"
            width="45%"
            position="absolute"
            right="0"
            top="0"
            sx={{
              background: `url(${EventCover})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPositionX: "center",
              backgroundPositionY: "top",
              display: "flex",
              alignItems: "end",
              justifyContent: "end",
            }}
          />
        )}
        {matchesSM && (
          <Box
            height="250px"
            width="100%"
            position="absolute"
            top="0"
            sx={{
              background: `url(${EventCover})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPositionX: "center",
              backgroundPositionY: "top",
              display: "flex",
              alignItems: "end",
              justifyContent: "end",
            }}
          />
        )}
        <Container
          maxWidth="xl"
          sx={{
            minHeight: "calc(100vh - 64px)",
            display: "flex",
            alignItems: "center",
            justifyContent: matchesSM ? "center" : "start",
          }}
        >
          <Grid
            container
            zIndex={1}
            mt={matchesSM ? 4 : -2}
            sx={{
              background: matchesSM
                ? "linear-gradient(152.97deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.1) 100%)"
                : "transparent",
              backdropFilter: matchesSM ? "blur(21px)" : "none",
              borderRadius: matchesSM ? 2 : 0,
              padding: matchesSM ? 2 : 0,
            }}
          >
            <Grid item lg={6} md={6} xl={6} xs={12}>
              <Typography
                sx={{
                  color: (theme) => theme.palette.secondary.main,
                  mb: 1,
                }}
              >
                01 - 10 de novembro de 2022
              </Typography>
              <Typography
                component="h1"
                variant="h3"
                sx={{
                  color: (theme) => theme.palette.text.primary,
                  fontWeight: (theme) => theme.typography.fontWeightBold,
                  fontSize: matchesSM ? 24 : 48,
                  mb: 2,
                }}
              >
                I Evento Nacional de Desenvolvimento de Jogos 2D
              </Typography>
              <Typography
                component="h1"
                variant="h3"
                sx={{
                  color: (theme) => theme.palette.onSurfaceVariant.main,
                  fontSize: matchesSM ? 12 : 16,
                  mb: 4,
                }}
              >
                Aqui deve ficar a descrição curta do evento, tendo como
                principal intuito mostrar uma breve explicação para o
                participante do que se trata o evento
              </Typography>
              <Grid container>
                <Grid item lg={6}>
                  <Button variant="contained" fullWidth>
                    Realizar inscrição
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box
        id="sobre"
        component="section"
        sx={{
          backgroundColor: "rgba(246,248,255,0.5)",
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            minHeight: "50vh",
            pt: 4,
          }}
        >
          {/* <Button
            variant="text"
            disableElevation
            disableFocusRipple
            disableRipple
            disableTouchRipple
            onClick={() => {}}
            sx={{
              backgroundColor: (theme) => theme.palette.primaryContainer.main,
              color:  theme => theme.palette.primary.main,
              opacity: 1
            }}
          >
            Sobre o evento
          </Button> */}
          
          <Grid container>
            <Grid item lg={1}>
            <SectionMarker />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Event;
