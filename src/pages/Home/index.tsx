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
        width="100%"
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
      <Box
        id="sobre"
        component="section"
        sx={{
          backgroundColor: "rgba(210, 231, 255, 0.05)",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            minHeight: "40vh",
            pb: 4,
          }}
        >
          <Grid container mt={4} spacing={2}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Typography
                component="h1"
                sx={{
                  color: (theme) => theme.palette.onSurfaceVariant.main,
                  fontWeight: (theme) => theme.typography.fontWeightBold,
                  fontSize: 28,
                  mb: 1,
                  textAlign: "center",
                }}
              >
                Eficiente e Fácil
              </Typography>
              <Typography
                component="p"
                sx={{
                  color: (theme) => theme.palette.onSurfaceVariant.main,
                  fontSize: 14,
                  mb: 6,
                  textAlign: "center",
                }}
              >
                Organizar eventos pode ser uma tarefa desafiadora, mas não
                precisa ser assim. Com a nossa plataforma de organização de
                eventos, você terá tudo o que precisa em um só lugar. Não
                importa se você está planejando um pequeno evento ou um grande
                evento corporativo, nossa plataforma é projetada para tornar o
                processo mais simples e eficiente.
              </Typography>
              <Typography
                component="h2"
                sx={{
                  color: (theme) => theme.palette.onSurfaceVariant.main,
                  fontWeight: (theme) => theme.typography.fontWeightBold,
                  fontSize: 24,
                  mb: 1,
                  textAlign: "center",
                }}
              >
                Recursos da Nossa Plataforma
              </Typography>
            </Grid>
            <Grid item lg={6} md={6} xs={12}>
              <Typography
                component="p"
                sx={{
                  color: (theme) => theme.palette.onSurfaceVariant.main,
                  fontSize: 14,
                  mb: 4,
                }}
              >
                Divulgar o seu evento para um público amplo
              </Typography>
              <Typography
                component="p"
                sx={{
                  color: (theme) => theme.palette.onSurfaceVariant.main,
                  fontSize: 14,
                  mb: 4,
                }}
              >
                Gerenciar facilmente a lista de convidados
              </Typography>
            </Grid>
            <Grid item lg={6} md={6} xs={12}>
              <Typography
                component="p"
                sx={{
                  color: (theme) => theme.palette.onSurfaceVariant.main,
                  fontSize: 14,
                  mb: 4,
                }}
              >
                Controlar o fluxo de pagamentos
              </Typography>
              <Typography
                component="p"
                sx={{
                  color: (theme) => theme.palette.onSurfaceVariant.main,
                  fontSize: 14,
                  mb: 4,
                }}
              >
                Acompanhar o progresso do seu evento em tempo real
              </Typography>
            </Grid>
            <Box
              sx={{
                color: (theme) => theme.palette.onSurfaceVariant.main,
                fontSize: 14,
                mb: 2,
              }}
            >
              <p>
                Não perca mais tempo e energia na organização de eventos.
                Escolha a nossa plataforma e tenha tudo o que precisa em um só
                lugar. Se concentre em criar uma experiência incrível para seus
                convidados e deixe a organização com a gente.
              </p>
            </Box>
          </Grid>
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
