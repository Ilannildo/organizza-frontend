import Logo from "../../assets/images/logo-white.svg";
import Cover from "../../assets/images/cover.jpg";
import { AppBar, Box, Container, Grid, Link, Tooltip, Toolbar, Button, Typography } from '@mui/material';
import { useAuthenticatedUser } from '../../stores/user';
import { SectionMarker } from "../../components/SectionMarker";
import { HomeEventCard } from "../../components/HomeEventCard";


const Home = () => {
  const { data: user } = useAuthenticatedUser();
  return (
    <>
      <Box sx={{
        backgroundColor: theme => theme.palette.primary.main
      }}>
        <AppBar
          position="relative"
          elevation={0}
          sx={{
            backgroundColor: (theme) => theme.palette.primary.main
          }}
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Grid
                container
                display="flex"
                flexDirection='row'
                justifyContent="space-between"
              >
                <Grid
                  item
                  xl={3}
                  lg={3}
                  md={4}
                  xs={4}
                  alignItems="center"
                  display="flex"
                >
                  <Link
                    href="/"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <img src={Logo} alt="" />
                  </Link>
                </Grid>
                <Grid
                  item
                  xl={6}
                  lg={7}
                  md={8}
                  xs={false}
                  display="flex"
                  flexDirection='row'
                  justifyContent='end'
                  alignItems="center"
                >
                  <Grid
                    title="Página inicial do organizza"
                    item
                    xl={0.8}
                    lg={1}
                    md={2.5}
                    xs={false}
                    justifyContent="center"
                    alignItems="center"
                    display="flex"
                  >
                    <Button sx={{ color: "#fff" }}> Início </Button>
                  </Grid>
                  <Grid
                    title=""
                    item
                    xl={2}
                    lg={1.5}
                    md={2.8}
                    xs={false}
                    justifyContent="center"
                    alignItems="center"
                    display="flex"
                  >
                    <Button sx={{ color: "#fff" }}> Recursos </Button>
                  </Grid>
                  <Grid
                    item
                    xl={1}
                    lg={1.3}
                    md={2.7}
                    xs={false}
                    justifyContent="center"
                    alignItems="center"
                    display="flex"
                  >
                    <Button sx={{ color: "#fff" }}> Preços </Button>
                  </Grid>
                  <Grid
                    item
                    xl={3}
                    lg={3}
                    md={6}
                    xs={false}
                    justifyContent="center"
                    alignItems="center"
                    display="flex"
                  >
                    <Button sx={{ color: "#fff" }}> Encontre eventos </Button>
                  </Grid>
                  <Grid
                    item
                    xl={2.5}
                    lg={3}
                    md={6}
                    xs={false}
                    justifyContent="center"
                    alignItems="center"
                    display="flex"
                  >
                    <Button sx={{ color: "#fff" }}> Tire suas duvidas </Button>
                  </Grid>
                  <Grid
                    item
                    xs={false}
                  >
                    <Tooltip title="Entre na sua conta">
                      <Button sx={{
                        fontWeight: 'bold',
                        color: (theme) => theme.palette.onPrimary.main,
                        backgroundColor: (theme) => theme.palette.secondary.main
                      }}
                        variant="outlined" href="/login"
                      >
                        Login
                      </Button>
                    </Tooltip>
                  </Grid>
                </Grid>
              </Grid>
            </Toolbar>
          </Container>
        </AppBar>
        <Container>
          <Box>
            <Grid
              item
              xl={6}
              lg={6}
              md={4}
              xs={false}
              p={5}
              textAlign='center'
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
                fontWeight={'bold'}
                sx={{ color: "#fff" }}
              >
                Tudo que você precisa
                <br /> para <br />
                organizar seu evento
              </Typography>
              <Grid
                pb={3}
                pt={2}
              >
                <Typography sx={{ color: "#fff" }} fontSize={18}>
                  A plataforma feita para facilitar a divulgação e o gerenciamento do seu evento
                </Typography>
              </Grid>
              <Grid>
                <Tooltip title="Criar Evento">
                  <Button sx={{
                    fontWeight: 'bold',
                    color: (theme) => theme.palette.onPrimary.main,
                    backgroundColor: (theme) => theme.palette.secondary.main
                  }}
                    variant="outlined" href="/login"
                  >
                    Criar um evento
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>



      <Box sx={{
        pt: 3,
        backgroundColor: theme => theme.palette.onSecondary.main
      }}>
        <Container maxWidth="xl">
          <Grid container>
            <Grid
              item

            >
              <SectionMarker color='primary' label='Eventos em Destaque' />
            </Grid>

          </Grid>

          <Grid 
          mt={2}
          container>
            <Grid
              item
              lg={12}
              md={12}
              sm={12}
              xl={12}
            >
              <HomeEventCard
              />
            </Grid>

          </Grid>



            

         


        </Container>
      </Box>
    </>
  );
};
export default Home;
