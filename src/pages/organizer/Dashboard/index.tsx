import { Box, Container, Grid, Typography } from "@mui/material";
import { CreateCard } from "../../../components/CreateCard";
import { EventCard } from "../../../components/EventCard";
import { Navbar } from "../../../components/Navbar";
import { useAuthenticatedUser } from "../../../stores/user";

const OrganizerDashboard = () => {
  const { data: user } = useAuthenticatedUser();
  return (
    <>
      <Navbar />
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.background.default,
          pt: 4,
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            minHeight: "100vh",
            pb: 10,
          }}
        >
          <Typography
            sx={{
              color: (theme) => theme.palette.text.primary,
            }}
          >
            Olá, {user?.name.split(" ")[0]}
          </Typography>
          <Typography
            component="h1"
            variant="h5"
            fontWeight={600}
            sx={{
              color: (theme) => theme.palette.text.primary,
            }}
          >
            Crie o seu primeiro evento
          </Typography>
          <Grid container mt={3} spacing={2}>
            <Grid item lg={3} md={4} sm={6} xs={12}>
              <CreateCard label="EVENTO ONLINE" color="primary" />
            </Grid>
            <Grid item lg={3} md={4} sm={6} xs={12}>
              <CreateCard label="EVENTO ONLINE" color="secondary" />
            </Grid>
            <Grid item lg={3} md={4} sm={6} xs={12}>
              <CreateCard label="EVENTO ONLINE" color="tertiary" />
            </Grid>
            <Grid item lg={3} md={4} sm={6} xs={12}>
              <CreateCard label="EVENTO ONLINE" color="default" />
            </Grid>
          </Grid>
          <Typography
            component="h1"
            variant="h6"
            mt={5}
            fontWeight={600}
            sx={{
              color: (theme) => theme.palette.primary.main,
            }}
          >
            Eventos criados
          </Typography>
          <Grid container mt={1} spacing={2}>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <EventCard
                eventId="1"
                title="Meu evento teste 1"
                shortDescription="Mais uma noite como todas as anteriores. Pego minha caneca de café
                cheia, acendo meu ultimo cigarro e corro pra velha janela do quarto."
                coverUrl="cover2.jpeg"
                status="published"
                startDate={new Date()}
              />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <EventCard
                eventId="2"
                title="Meu evento teste 2"
                shortDescription="Mais uma noite como todas as anteriores. Pego minha caneca de café
                cheia, acendo meu ultimo cigarro e corro pra velha janela do quarto."
                coverUrl="cover.jpg"
                status="started"
                startDate={new Date()}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default OrganizerDashboard;
