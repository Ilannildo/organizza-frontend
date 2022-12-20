import {
  Box,
  Container,
  Grid,
  Tooltip,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Carousel } from "react-responsive-carousel";

import { SectionMarker } from "../../components/SectionMarker";
import { HomeEventCard } from "../../components/HomeEventCard";
import { HomeNavbar } from "./components/HomeNavbar";
import { HomeCategoryEventCard } from "../../components/HomeCategoryEventCard";
import { HomeInformatiosEventCard } from "../../components/HomeInformatiosEventCard";


const Home = () => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <>
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.primary.main,
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
                    href="/organizador/evento"
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
        sx={{
          pt: 3,
          pb: 5,
          backgroundColor: (theme) => theme.palette.onSecondary.main,
        }}
      >
        <Container maxWidth="xl">
          <Grid container>
            <Grid item>
              <SectionMarker color="primary" label="Eventos em Destaque" />
            </Grid>
          </Grid>

          <Grid mt={2} container>
            <Grid item lg={12} md={12} sm={12} xl={12}>
              <Carousel
                autoPlay={true}
                interval={5000}
                showArrows={false}
                showStatus={false}
                swipeable={true}
                showThumbs={false}
              >
                <HomeEventCard />
                <HomeEventCard />
              </Carousel>
            </Grid>
          </Grid>

        </Container>
      </Box>

      <Box>
        <Container maxWidth='xl'>
          <Grid container>
            <Grid
              container
              mt={2}
            >
              <Grid
                item
                lg={12}
                md={12}
                sm={12}
                xl={12}
              >
                <HomeInformatiosEventCard />
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box>
        <Container maxWidth='xl'>
          <Grid container>
            <Grid
              mt={2}
              item>
              <SectionMarker color="primary" label="Educação" />
            </Grid>
            <Grid
              container
              mt={2}
            >
              <Grid
                item
                lg={12}
                md={12}
                sm={12}
                xl={12}
              >
                <HomeCategoryEventCard />
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
export default Home;
