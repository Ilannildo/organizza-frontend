import {
  Box,
  Button,
  Container,
  Grid,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import ImgHome from "../../assets/images/img-homeome.png";
import { Footer } from "../Event/components/Footer";
import { HomeNavbar } from "./components/HomeNavbar";

const Home = () => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <>
      <Box
        // sx={{
        //   // backgroundColor: (theme) => theme.palette.primary.main,
        // }}
        // height="90vh"
        width="100%"
        // position="absolute"
        // right="0"
        // top="0"
        sx={{
          background: `url(${ImgHome})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPositionX: "center",
          backgroundPositionY: "center",
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          overflow: "hidden",
        }}
      >
        <HomeNavbar />
        <Container>
          <Box>
            <Grid
              item
              xl={6}
              lg={6}
              md={4}
              xs={false}
              p={5}
              textAlign="center"
              justifyContent="center"
              alignItems="center"
              display="flex"
              flexDirection="column"
            >
              {matchUpMd ? (
                <Typography
                  fontSize={40}
                  fontFamily="Potta One"
                  fontWeight="bold"
                  sx={{ color: theme.palette.onPrimary.main }}
                >
                  Tudo que você precisa
                  <br /> para <br />
                  organizar seu evento
                </Typography>
              ) : (
                <Typography
                  fontSize={24}
                  fontFamily="Potta One"
                  fontWeight="bold"
                  sx={{ color: theme.palette.onPrimary.main }}
                >
                  Tudo que você precisa para organizar seu evento
                </Typography>
              )}
              <Typography
                sx={{ color: theme.palette.onPrimary.main }}
                fontSize={matchUpMd ? 16 : 14}
                mt={2}
                mb={2}
              >
                A plataforma feita para facilitar a divulgação e o gerenciamento
                do seu evento
              </Typography>

              <Grid>
                <Tooltip title="Criar Evento">
                  <Button
                    color="secondary"
                    variant="contained"
                    href="/organizador/criar-evento"
                    disableElevation
                  >
                    Criar um evento
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
      <Box width="100%">
        <Container>
          <Box>
            <Grid
              item
              xl={6}
              lg={6}
              md={4}
              xs={false}
              p={5}
              textAlign="center"
              justifyContent="center"
              alignItems="center"
              display="flex"
              flexDirection="column"
            >
              <Typography
                sx={{
                  color: (theme) => theme.palette.onSurfaceVariant.main,
                }}
                fontSize={matchUpMd ? 16 : 14}
                mt={2}
                mb={2}
              >
                A nossa plataforma é a solução ideal para organizar seus eventos
                com eficiência e facilidade. Oferecemos tudo o que você precisa
                para planejar e executar um evento bem-sucedido, desde a
                divulgação até o gerenciamento do dia do evento. Nossa
                plataforma é projetada para tornar o processo de organização de
                eventos mais simples, permitindo que você se concentre em criar
                uma experiência incrível para seus convidados.
              </Typography>
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* <Box
        sx={{
          pt: 3,
          pb: 5,
          backgroundColor: (theme) => theme.palette.onSecondary.main,
        }}
      >
        <Container maxWidth="xl">
          <Grid container mt={4}>
            <Grid item lg={12} md={12} sm={12} xs={12} textAlign="center">
              <Typography
                component="h1"
                variant="h3"
                sx={{
                  color: (theme) => theme.palette.onSurfaceVariant.main,
                  fontWeight: (theme) => theme.typography.fontWeightBold,
                  fontSize: 28,
                  mb: 2,
                }}
              >
                Eventos em destaque
              </Typography>
              <Typography
                component="h1"
                variant="h3"
                sx={{
                  color: (theme) => theme.palette.onSurfaceVariant.main,
                  fontSize: 14,
                  mb: 4,
                }}
              >
                Veja quais eventos estão com destaque nesse momento
              </Typography>
            </Grid>
          </Grid>

          <Grid mt={2} container>
            <Grid item lg={12} md={12} sm={12} xl={12}>
              <Carousel
                autoPlay={true}
                interval={5000}
                showArrows={true}
                showStatus={false}
                swipeable={true}
                showThumbs={false}
                infiniteLoop={true}
                emulateTouch={true}
                showIndicators={true}
              >
                <HomeEventCard />
                <HomeEventCard />
              </Carousel>
            </Grid>
          </Grid>
        </Container>
      </Box> */}

      {/* <Box>
        <Container maxWidth="xl">
          <Grid container>
            <Grid container mt={2}>
              <Grid item lg={12} md={12} sm={12} xl={12}>
                <HomeInformatiosEventCard />
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box> */}

      {/* <Box>
        <Container maxWidth="xl">
          <Grid container>
            
            <Grid container mt={2}>
              <Grid item lg={12} md={12} sm={12} xl={12}>
                <HomeCategoryEventCard />
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box> */}
      <Footer />
    </>
  );
};
export default Home;
