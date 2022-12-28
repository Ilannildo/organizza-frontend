import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Step,
  StepLabel,
  Stepper,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Navigate, Params, useNavigate, useParams } from "react-router-dom";

import { BannerTicket } from "../../components/BannerTicket";
import { SectionMarker } from "../../components/SectionMarker";
import { Navbar } from "./components/Navbar";

import EventCover from "../../assets/images/cover.jpg";
import { format } from "date-fns";
import LoaderProgress from "../../layout/LoaderProgress";
import {
  useEventPageBySlug,
  useEventPageTickets,
} from "../../stores/eventPage";

const steps = [
  {
    label: "Credenciamento",
    hour: "08:00 - 09:00",
  },
  {
    label: "Palestra 1",
    hour: "08:00 - 09:00",
  },
  {
    label: "Palestra 2",
    hour: "08:00 - 09:00",
  },
];

interface IParams extends Params {
  slug: string;
}

const Event = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));
  const [activeSessionDay, setActiveSessionDay] = useState(0);
  const [activeSessionHour, setActiveSessionHour] = useState(0);
  const { slug } = useParams<IParams>();

  const { data: event, isLoading: isLoadingEvent } = useEventPageBySlug(slug);

  const { data: tickets } = useEventPageTickets(
    {
      eventId: event?.event_id,
    },
    {
      enabled: !!event?.event_id && !event.is_finished,
    }
  );
  const handleChangeActiveSession = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setActiveSessionDay(newValue);
  };

  const handleNextHour = () => {
    setActiveSessionHour((prevActiveStep) => prevActiveStep + 1);
  };

  useEffect(() => {
    if (!event && !isLoadingEvent) {
      navigate("/");
    }
  }, [event, isLoadingEvent, navigate]);

  return (
    <>
      {isLoadingEvent ? (
        <LoaderProgress />
      ) : event === undefined ? (
        <Navigate to={`/`} replace />
      ) : (
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
                  background: `url(${event?.event_cover_url || EventCover})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPositionX: "center",
                  backgroundPositionY: "top",
                  display: "flex",
                  alignItems: "end",
                  justifyContent: "end",
                }}
              >
                <Box
                  sx={{
                    width: 315,
                    height: 120,
                    background: "rgba(253, 252, 255, 0.1)",
                    backdropFilter: "blur(25px)",
                    mr: 4,
                    borderTopLeftRadius: 1,
                    borderTopRightRadius: 1,
                    p: 2,
                  }}
                >
                  <Grid container>
                    <Grid item textAlign="center" lg={12} xs={12}>
                      <Typography
                        sx={{
                          color: (theme) => theme.palette.onPrimary.main,
                          mb: 1,
                          fontWeight: "bold",
                        }}
                      >
                        {event.venue_type === "presential"
                          ? "Evento presencial"
                          : "Evento online"}
                      </Typography>
                    </Grid>
                    <Grid item textAlign="center" lg={12} xs={12}>
                      <Divider color="white" />
                    </Grid>
                    <Grid item textAlign="center" lg={12} xs={12}>
                      <Typography
                        sx={{
                          color: (theme) => theme.palette.onPrimary.main,
                          mb: 1,
                          mt: 2,
                        }}
                      >
                        {`${format(
                          new Date(event.start_date),
                          "dd"
                        )} - ${format(
                          new Date(event.end_date),
                          "dd 'de' MMMM 'de' yyyy"
                        )}`}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            )}
            {matchesSM && (
              <Box
                height="250px"
                width="100%"
                position="absolute"
                top="0"
                sx={{
                  background: `url(${event?.event_cover_url || EventCover})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPositionX: "center",
                  backgroundPositionY: "top",
                  display: "flex",
                  alignItems: "end",
                  justifyContent: "end",
                }}
              >
                <Box
                  sx={{
                    width: 315,
                    height: 120,
                    background: "rgba(253, 252, 255, 0.1)",
                    backdropFilter: "blur(25px)",
                    mr: 4,
                    borderTopLeftRadius: 1,
                    borderTopRightRadius: 1,
                    p: 2,
                  }}
                >
                  <Grid container>
                    <Grid item textAlign="center" lg={12} xs={12}>
                      <Typography
                        sx={{
                          color: (theme) => theme.palette.onPrimary.main,
                          mb: 1,
                          fontWeight: "bold",
                        }}
                      >
                        {event.venue_type === "presential"
                          ? "Evento presencial"
                          : "Evento online"}
                      </Typography>
                    </Grid>
                    <Grid item textAlign="center" lg={12} xs={12}>
                      <Divider color="white" />
                    </Grid>
                    <Grid item textAlign="center" lg={12} xs={12}>
                      <Typography
                        sx={{
                          color: (theme) => theme.palette.onPrimary.main,
                          mb: 1,
                          mt: 2,
                        }}
                      >
                        {`${format(
                          new Date(event.start_date),
                          "dd"
                        )} - ${format(
                          new Date(event.end_date),
                          "dd 'de' MMMM 'de' yyyy"
                        )}`}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
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
                  {event.is_finished ? (
                    <SectionMarker
                      label="O evento já encerrou"
                      color="primary"
                    />
                  ) : (
                    <Typography
                      sx={{
                        color: (theme) => theme.palette.secondary.main,
                        mb: 1,
                      }}
                    >
                      {`${format(new Date(event.start_date), "dd")} - ${format(
                        new Date(event.end_date),
                        "dd 'de' MMM 'de' yyyy"
                      )}`}
                    </Typography>
                  )}
                  <Typography
                    component="h1"
                    variant="h3"
                    sx={{
                      color: (theme) => theme.palette.text.primary,
                      fontWeight: (theme) => theme.typography.fontWeightBold,
                      fontSize: matchesSM ? 24 : 44,
                      mb: 2,
                    }}
                  >
                    {event.title}
                  </Typography>
                  <Typography
                    component="h1"
                    variant="h3"
                    sx={{
                      color: (theme) => theme.palette.onSurfaceVariant.main,
                      fontSize: matchesSM ? 12 : 14,
                      mb: 4,
                    }}
                  >
                    {event.short_description}
                  </Typography>
                  {!event.is_finished && (
                    <Grid container>
                      <Grid item lg={6}>
                        <Button variant="contained" fullWidth>
                          Realizar inscrição
                        </Button>
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Container>
          </Box>
          {event.summary && (
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
                  pb: 4,
                }}
              >
                <Grid container>
                  <Grid item lg={1} md={1} sm={1} xs={2}>
                    <SectionMarker label="Sobre o evento" color="primary" />
                  </Grid>
                </Grid>
                <Grid container mt={4} spacing={2}>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Typography
                      component="h1"
                      variant="h3"
                      sx={{
                        color: (theme) => theme.palette.text.primary,
                        fontWeight: (theme) => theme.typography.fontWeightBold,
                        fontSize: matchesSM ? 18 : 28,
                        mb: 2,
                      }}
                    >
                      A importância dos jogos 2D para a sociedade
                    </Typography>
                    <Typography
                      component="h1"
                      variant="h3"
                      sx={{
                        color: (theme) => theme.palette.onSurfaceVariant.main,
                        fontSize: matchesSM ? 12 : 14,
                        mb: 2,
                      }}
                    >
                      <p>
                        Aqui deve ficar a descri&ccedil;&atilde;o curta do
                        evento, tendo como principal intuito mostrar uma breve
                        explica&ccedil;&atilde;o para o participante do que se
                        trata o evento Aqui deve ficar a descri&ccedil;&atilde;o
                        curta do evento, tendo como principal intuito
                        mostrar&nbsp;uma breve explica&ccedil;&atilde;o para o
                        participante do que se trata o&nbsp;evento.
                      </p>

                      <ul>
                        <li>
                          Aqui deve ficar a descri&ccedil;&atilde;o curta do
                          evento, tendo como principal intuito mostrar uma breve
                          explica&ccedil;&atilde;o para o participante do que se
                          trata o evento;
                        </li>
                        <li>
                          Aqui deve ficar a&nbsp;descri&ccedil;&atilde;o curta
                          do evento, tendo como principal intuito
                          mostrar&nbsp;uma breve explica&ccedil;&atilde;o para o
                          participante do que se trata o&nbsp;evento.
                        </li>
                      </ul>
                    </Typography>
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Typography
                      component="h1"
                      variant="h3"
                      sx={{
                        color: (theme) => theme.palette.text.primary,
                        fontWeight: (theme) => theme.typography.fontWeightBold,
                        fontSize: matchesSM ? 18 : 28,
                        mb: 2,
                      }}
                    >
                      A importância dos jogos 2D para a sociedade
                    </Typography>
                    <Typography
                      component="h1"
                      variant="h3"
                      sx={{
                        color: (theme) => theme.palette.onSurfaceVariant.main,
                        fontSize: matchesSM ? 12 : 14,
                        mb: 2,
                      }}
                    >
                      <p>
                        Aqui deve ficar a descri&ccedil;&atilde;o curta do
                        evento, tendo como principal intuito mostrar uma breve
                        explica&ccedil;&atilde;o para o participante do que se
                        trata o evento Aqui deve ficar a descri&ccedil;&atilde;o
                        curta do evento, tendo como principal intuito
                        mostrar&nbsp;uma breve explica&ccedil;&atilde;o para o
                        participante do que se trata o&nbsp;evento.
                      </p>
                    </Typography>
                  </Grid>
                </Grid>
              </Container>
            </Box>
          )}

          <Box
            id="programação"
            component="section"
            sx={{
              backgroundColor: (theme) => theme.palette.background.default,
            }}
          >
            <Container
              maxWidth="xl"
              sx={{
                minHeight: "50vh",
                pt: 4,
                pb: 4,
              }}
            >
              <Grid container>
                <Grid item lg={2} md={2} sm={1} xs={2}>
                  <SectionMarker
                    label="Programação do evento"
                    color="secondary"
                  />
                </Grid>
              </Grid>
              <Grid container mt={4} spacing={2}>
                <Grid item lg={4} md={4} sm={12} xs={12}>
                  <Typography
                    component="h1"
                    variant="h3"
                    sx={{
                      color: (theme) => theme.palette.text.primary,
                      fontWeight: (theme) => theme.typography.fontWeightBold,
                      fontSize: matchesSM ? 18 : 28,
                      mb: 2,
                    }}
                  >
                    Fique atualizado!
                  </Typography>
                  <Typography
                    component="h1"
                    variant="h3"
                    sx={{
                      color: (theme) => theme.palette.onSurfaceVariant.main,
                      fontSize: matchesSM ? 12 : 14,
                      mb: 4,
                    }}
                  >
                    Acompanhe a planejamento do evento e não perca nenhum
                    momento
                  </Typography>
                  <Button variant="outlined">Baixar programação</Button>
                </Grid>
                <Grid item lg={8} md={8} sm={12} xs={12}>
                  <Tabs
                    value={activeSessionDay}
                    onChange={handleChangeActiveSession}
                    aria-label="session tabs"
                    variant="scrollable"
                  >
                    <Tab
                      sx={{
                        textAlign: "left",
                        width: 160,
                      }}
                      label={
                        <>
                          <Box
                            sx={{
                              width: "100%",
                            }}
                          >
                            <Typography
                              component="h1"
                              variant="h6"
                              sx={{
                                fontSize: 14,
                                textTransform: "none",
                                fontWeight: "bold",
                              }}
                            >
                              Primeiro dia
                            </Typography>
                            <Box
                              display="flex"
                              flexDirection="row"
                              alignItems="center"
                              sx={{}}
                            >
                              <Typography
                                component="h1"
                                variant="h6"
                                sx={{
                                  fontSize: 18,
                                  fontWeight: "bold",
                                }}
                              >
                                10
                              </Typography>
                              <Typography
                                component="h1"
                                variant="h6"
                                sx={{
                                  fontSize: 10,
                                  textTransform: "none",
                                  fontWeight: "bold",
                                  ml: 1,
                                }}
                              >
                                nov, segunda
                              </Typography>
                            </Box>
                          </Box>
                        </>
                      }
                      id="0"
                    />
                    <Tab label="Primeiro dia" id="1" />
                    <Tab label="Primeiro dia" id="2" />
                  </Tabs>
                  {activeSessionDay === 0 && (
                    <Grid container mt={2}>
                      <Grid item lg={4} sm={4} md={4} xs={12}>
                        <Stepper
                          activeStep={activeSessionHour}
                          onChange={() => handleNextHour()}
                          orientation="vertical"
                        >
                          {steps.map((step, index) => (
                            <Step key={step.label}>
                              <StepLabel optional={step.hour}>
                                {step.label}
                              </StepLabel>
                            </Step>
                          ))}
                        </Stepper>
                      </Grid>
                      <Grid
                        item
                        lg={8}
                        md={8}
                        sx={{
                          backgroundColor: "rgba(223, 227, 235, 0.2)",
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                          flexDirection: "column",
                          borderRadius: 1,
                          p: 2,
                        }}
                      >
                        <Box>
                          <Typography
                            component="h1"
                            variant="h6"
                            sx={{
                              fontSize: 16,
                              fontWeight: "bold",
                            }}
                          >
                            Credenciamento
                          </Typography>
                          <Typography
                            component="h1"
                            variant="h6"
                            sx={{
                              fontSize: 14,
                              mt: 1,
                              color: (theme) =>
                                theme.palette.onSurfaceVariant.main,
                            }}
                          >
                            Realize o seu credenciamento no evento
                          </Typography>
                        </Box>
                        <Typography
                          component="h1"
                          variant="h6"
                          sx={{
                            fontSize: 14,
                            color: (theme) =>
                              theme.palette.onSurfaceVariant.main,
                          }}
                        >
                          Local: Sala 1
                        </Typography>
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Container>
          </Box>
          {!event.is_finished && tickets && tickets.length > 0 && (
            <Box
              id="inscrição"
              component="section"
              sx={{
                backgroundColor: (theme) => theme.palette.background.default,
              }}
            >
              <Container
                maxWidth="xl"
                sx={{
                  minHeight: "50vh",
                  pt: 4,
                  pb: 8,
                }}
              >
                <Grid container>
                  <Grid item lg={2} md={2} sm={1} xs={2}>
                    <SectionMarker label="Inscrição" color="primary" />
                  </Grid>
                </Grid>
                <Grid container mt={4}>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Typography
                      component="h1"
                      variant="h3"
                      sx={{
                        color: (theme) => theme.palette.text.primary,
                        fontWeight: (theme) => theme.typography.fontWeightBold,
                        fontSize: matchesSM ? 18 : 28,
                        mb: 2,
                      }}
                    >
                      Realize sua inscrição!
                    </Typography>
                    <Typography
                      component="h1"
                      variant="h3"
                      sx={{
                        color: (theme) => theme.palette.onSurfaceVariant.main,
                        fontSize: matchesSM ? 12 : 14,
                        mb: 4,
                      }}
                    >
                      Escolha a categoria que mais define você
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container mt={4} spacing={2}>
                  {tickets.map((ticket, index) => (
                    <Grid
                      item
                      lg={2}
                      md={3}
                      sm={4}
                      xs={12}
                      key={ticket.ticket_id}
                    >
                      <BannerTicket ticket={ticket} />
                    </Grid>
                  ))}
                </Grid>
              </Container>
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default Event;
