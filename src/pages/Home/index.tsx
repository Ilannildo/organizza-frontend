import {
  Box,
  Container,
  Grid,
  Tooltip,
  Button,
  Typography,
} from "@mui/material";
import { SectionMarker } from "../../components/SectionMarker";
import { HomeEventCard } from "../../components/HomeEventCard";
import { HomeNavbar } from "./components/HomeNavbar";

const Home = () => {
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
              <Typography
                lineHeight={1}
                p={0}
                m={0}
                fontSize={52}
                fontWeight={"bold"}
                sx={{ color: "#fff" }}
              >
                Tudo que você precisa
                <br /> para <br />
                organizar seu evento
              </Typography>
              <Grid pb={3} pt={2}>
                <Typography sx={{ color: "#fff" }} fontSize={18}>
                  A plataforma feita para facilitar a divulgação e o
                  gerenciamento do seu evento
                </Typography>
              </Grid>
              <Grid>
                <Tooltip title="Criar Evento">
                  <Button
                    sx={{
                      fontWeight: "bold",
                      color: (theme) => theme.palette.onPrimary.main,
                      backgroundColor: (theme) => theme.palette.secondary.main,
                    }}
                    variant="outlined"
                    href="/login"
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
              <HomeEventCard />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
export default Home;
