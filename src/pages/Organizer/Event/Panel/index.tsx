import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { useEventById } from "../../../../stores/event";
import { getEventStatus, getEventStatusColor } from "../../../../utils/masks";
import {
  DiamondsFour,
  GraduationCap,
  Info,
  PencilSimple,
  Ticket,
  UsersThree,
  Wallet,
} from "phosphor-react";
import { Params, useParams } from "react-router-dom";

interface IParams extends Params {
  eventId: string;
}

const EventPanel = () => {
  const theme = useTheme();
  const { eventId } = useParams<IParams>();
  const { data: event, isLoading: isLoadingEvent } = useEventById(eventId);

  return (
    <Grid container spacing={2}>
      {isLoadingEvent && (
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Card variant="elevation" elevation={0}>
            <CardHeader
              sx={{
                backgroundColor: theme.palette.neutral.main,
              }}
              title={
                <Typography
                  fontSize={14}
                  sx={{
                    color: (theme) => theme.palette.onSurfaceVariant.main,
                    fontWeight: 500,
                  }}
                >
                  Detalhes do evento
                </Typography>
              }
            />
            <CardContent>
              <Grid container mt={1} spacing={2}>
                <Grid item lg={4} md={4} xs={12}>
                  <Skeleton variant="rectangular" width={300} height={21} />
                </Grid>
                <Grid item lg={4} md={4} xs={12}>
                  <Skeleton variant="rectangular" width={250} height={21} />
                </Grid>
                <Grid item lg={4} md={4} xs={12}>
                  <Skeleton variant="rectangular" width={250} height={21} />
                </Grid>
                <Grid item lg={4} md={4} xs={12}>
                  <Skeleton variant="rectangular" width={250} height={21} />
                </Grid>
                <Grid item lg={4} md={4} xs={12}>
                  <Skeleton variant="rectangular" width={275} height={21} />
                </Grid>
                <Grid item lg={4} md={4} xs={12}>
                  <Skeleton variant="rectangular" width={250} height={21} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      )}
      {!isLoadingEvent && event === undefined && (
        <Typography
          fontSize={14}
          sx={{
            color: (theme) => theme.palette.text.disabled,
          }}
        >
          Não foi possível encontrar o evento
        </Typography>
      )}
      {!isLoadingEvent && event && (
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Card variant="elevation" elevation={0}>
            <CardHeader
              sx={{
                backgroundColor: theme.palette.neutral.main,
              }}
              title={
                <Typography
                  fontSize={14}
                  sx={{
                    color: (theme) => theme.palette.onSurfaceVariant.main,
                    fontWeight: 500,
                  }}
                >
                  Detalhes do evento
                </Typography>
              }
              action={
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="end"
                  alignItems="center"
                >
                  {event.status === "started" && (
                    <Button variant="text" size="small">
                      Publicar
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<PencilSimple size={16} />}
                  >
                    Editar
                  </Button>
                </Stack>
              }
            />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item lg={4} md={4} xs={12}>
                  <Typography
                    fontSize={12}
                    sx={{
                      color: (theme) => theme.palette.text.disabled,
                      fontWeight: 500,
                    }}
                  >
                    {`Local - ${
                      event?.venue_type === "presential"
                        ? "Evento presencial"
                        : event?.venue_type
                        ? "Evento Online"
                        : "Local não definido"
                    }`}
                  </Typography>
                  {event.venue_type === "presential" && (
                    <Typography
                      fontSize={14}
                      sx={{
                        color: (theme) => theme.palette.onPrimaryContainer.main,
                        fontWeight: 500,
                      }}
                    >
                      {event.event_has_address
                        ? event.event_has_address.address?.street
                        : "Nenhum endereço cadastrado"}
                    </Typography>
                  )}
                  {event.venue_type === "online" && (
                    <Typography
                      fontSize={14}
                      sx={{
                        color: (theme) => theme.palette.onPrimaryContainer.main,
                        fontWeight: 500,
                      }}
                    >
                      {event.event_has_address
                        ? event.event_has_address.address?.address_link
                        : "Nenhum link cadastrado"}
                    </Typography>
                  )}
                </Grid>
                <Grid item lg={4} md={4} xs={12}>
                  <Typography
                    fontSize={12}
                    sx={{
                      color: (theme) => theme.palette.text.disabled,
                      fontWeight: 500,
                    }}
                  >
                    Categoria
                  </Typography>
                  <Typography
                    fontSize={14}
                    sx={{
                      color: (theme) => theme.palette.onPrimaryContainer.main,
                      fontWeight: 500,
                    }}
                  >
                    {event.event_type
                      ? event.event_type.title
                      : "Nenhuma categoria"}
                  </Typography>
                </Grid>
                <Grid item lg={4} md={4} xs={12}>
                  <Typography
                    fontSize={12}
                    sx={{
                      color: (theme) => theme.palette.text.disabled,
                      fontWeight: 500,
                    }}
                  >
                    Assunto principal
                  </Typography>
                  <Typography
                    fontSize={14}
                    sx={{
                      color: (theme) => theme.palette.onPrimaryContainer.main,
                      fontWeight: 500,
                    }}
                  >
                    {event.main_subject
                      ? event.main_subject.title
                      : "Nenhum assunto principal"}
                  </Typography>
                </Grid>
                <Grid item lg={4} md={4} xs={12}>
                  <Typography
                    fontSize={12}
                    sx={{
                      color: (theme) => theme.palette.text.disabled,
                      fontWeight: 500,
                    }}
                  >
                    Status
                  </Typography>

                  <Stack direction="row" alignItems="center" spacing={1}>
                    <DiamondsFour
                      color={getEventStatusColor(event.status)}
                      size={14}
                    />
                    <Typography
                      fontSize={14}
                      sx={{
                        color: getEventStatusColor(event.status),
                        fontWeight: 500,
                      }}
                    >
                      {getEventStatus(event.status)}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item lg={4} md={4} xs={12}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography
                      fontSize={12}
                      sx={{
                        color: (theme) => theme.palette.text.disabled,
                        fontWeight: 500,
                      }}
                    >
                      Visibilidade
                    </Typography>
                    <Tooltip
                      title={
                        <Typography fontSize={12}>
                          Se você definir a visibilidade como público, o evento
                          poderá aparecer na ferramenta de buscas no Organizza
                          Eventos, no aplicativo do Organizza Eventos e poderá
                          ser recomendado pelo nosso site para os demais
                          participantes.
                        </Typography>
                      }
                    >
                      <Info size={12} />
                    </Tooltip>
                  </Stack>

                  <Typography
                    fontSize={14}
                    sx={{
                      color: (theme) => theme.palette.onPrimaryContainer.main,
                      fontWeight: 500,
                    }}
                  >
                    {event.is_private ? "Privado" : "Público"}
                  </Typography>
                </Grid>
                <Grid item lg={4} md={4} xs={12}>
                  <Typography
                    fontSize={12}
                    sx={{
                      color: (theme) => theme.palette.text.disabled,
                      fontWeight: 500,
                    }}
                  >
                    Visualizações da página de vendas
                  </Typography>

                  <Typography
                    fontSize={14}
                    sx={{
                      color: (theme) => theme.palette.onPrimaryContainer.main,
                      fontWeight: 500,
                    }}
                  >
                    0
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      )}

      <Grid item lg={4} md={4} sm={4} xs={6}>
        <Card variant="elevation" elevation={0}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item lg={10} md={10} sm={10} xs={10}>
                <Typography
                  fontSize={14}
                  sx={{
                    color: (theme) => theme.palette.onSurfaceVariant.main,
                    fontWeight: 500,
                  }}
                >
                  Ingressos vendidos
                </Typography>
              </Grid>
              <Grid
                item
                lg={2}
                md={2}
                sm={2}
                xs={2}
                justifyContent="end"
                alignItems="center"
                display="flex"
              >
                <Ticket size={32} color={theme.palette.success.main} />
              </Grid>
            </Grid>
            <Grid container mt={1}>
              <Grid item>
                <Typography
                  fontSize={18}
                  sx={{
                    color: (theme) => theme.palette.onPrimaryContainer.main,
                    fontWeight: 500,
                  }}
                >
                  0
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item lg={4} md={4} sm={4} xs={6}>
        <Card variant="elevation" elevation={0}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item lg={10} md={10} sm={10} xs={10}>
                <Typography
                  fontSize={14}
                  sx={{
                    color: (theme) => theme.palette.onSurfaceVariant.main,
                    fontWeight: 500,
                  }}
                >
                  Ingressos cancelados
                </Typography>
              </Grid>
              <Grid
                item
                lg={2}
                md={2}
                sm={3}
                xs={4}
                justifyContent="end"
                alignItems="center"
                display="flex"
              >
                <Ticket size={32} color={theme.palette.error.light} />
              </Grid>
            </Grid>
            <Grid container mt={1}>
              <Grid item>
                <Typography
                  fontSize={18}
                  sx={{
                    color: (theme) => theme.palette.onPrimaryContainer.main,
                    fontWeight: 500,
                  }}
                >
                  0
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item lg={4} md={4} sm={4} xs={6}>
        <Card variant="elevation" elevation={0}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item lg={10} md={10} sm={10} xs={10}>
                <Typography
                  fontSize={14}
                  sx={{
                    color: (theme) => theme.palette.onSurfaceVariant.main,
                    fontWeight: 500,
                  }}
                >
                  Ingressos restantes
                </Typography>
              </Grid>
              <Grid
                item
                lg={2}
                md={2}
                sm={2}
                xs={2}
                justifyContent="end"
                alignItems="center"
                display="flex"
              >
                <Ticket size={32} color={theme.palette.primary.main} />
              </Grid>
            </Grid>
            <Grid container mt={1}>
              <Grid item>
                <Typography
                  fontSize={18}
                  sx={{
                    color: (theme) => theme.palette.onPrimaryContainer.main,
                    fontWeight: 500,
                  }}
                >
                  0
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item lg={6} md={6} sm={6} xs={12}>
        <Card variant="elevation" elevation={0}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item lg={6} md={6} sm={6} xs={6}>
                <Typography
                  fontSize={14}
                  sx={{
                    color: (theme) => theme.palette.onSurfaceVariant.main,
                    fontWeight: 500,
                  }}
                >
                  Vendas totais
                </Typography>
              </Grid>
              <Grid
                item
                lg={6}
                md={6}
                sm={6}
                xs={6}
                justifyContent="end"
                alignItems="center"
                display="flex"
              >
                <Wallet size={32} color={theme.palette.success.main} />
              </Grid>
            </Grid>
            <Grid container mt={1}>
              <Grid item>
                <Typography
                  fontSize={18}
                  sx={{
                    color: (theme) => theme.palette.onPrimaryContainer.main,
                    fontWeight: 500,
                  }}
                >
                  R$ 0,00
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item lg={6} md={6} sm={6} xs={12}>
        <Card variant="elevation" elevation={0}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item lg={10} md={10} sm={10} xs={10}>
                <Typography
                  fontSize={14}
                  sx={{
                    color: (theme) => theme.palette.onSurfaceVariant.main,
                    fontWeight: 500,
                  }}
                >
                  Vendas em processamento (pendentes)
                </Typography>
              </Grid>
              <Grid
                item
                lg={2}
                md={2}
                sm={2}
                xs={2}
                justifyContent="end"
                alignItems="center"
                display="flex"
              >
                <Wallet size={32} color={theme.palette.secondary.main} />
              </Grid>
            </Grid>
            <Grid container mt={1}>
              <Grid item>
                <Typography
                  fontSize={18}
                  sx={{
                    color: (theme) => theme.palette.onPrimaryContainer.main,
                    fontWeight: 500,
                  }}
                >
                  R$ 0,00
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item lg={6} md={6} sm={6} xs={12}>
        <Card variant="elevation" elevation={0}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item lg={10} md={10} sm={10} xs={10}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <UsersThree size={32} color={theme.palette.primary.main} />
                  <Typography
                    fontSize={14}
                    sx={{
                      color: (theme) => theme.palette.onSurfaceVariant.main,
                      fontWeight: 500,
                    }}
                  >
                    Total de inscritos no evento
                  </Typography>
                </Stack>
              </Grid>

              <Grid
                item
                lg={2}
                md={2}
                sm={2}
                xs={2}
                justifyContent="end"
                alignItems="center"
                display="flex"
              >
                <Typography
                  fontSize={18}
                  sx={{
                    color: (theme) => theme.palette.onPrimaryContainer.main,
                    fontWeight: 500,
                  }}
                >
                  0
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item lg={6} md={6} sm={6} xs={12}>
        <Card variant="elevation" elevation={0}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item lg={10} md={10} sm={10} xs={10}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <GraduationCap size={32} color={theme.palette.primary.main} />
                  <Typography
                    fontSize={14}
                    sx={{
                      color: (theme) => theme.palette.onSurfaceVariant.main,
                      fontWeight: 500,
                    }}
                  >
                    Total de incritos nas sessões
                  </Typography>
                </Stack>
              </Grid>

              <Grid
                item
                lg={2}
                md={2}
                sm={2}
                xs={2}
                justifyContent="end"
                alignItems="center"
                display="flex"
              >
                <Typography
                  fontSize={18}
                  sx={{
                    color: (theme) => theme.palette.onPrimaryContainer.main,
                    fontWeight: 500,
                  }}
                >
                  0
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Card
          variant="elevation"
          elevation={0}
          sx={{
            height: 450,
          }}
        >
          <CardContent>
            <Grid container spacing={2}>
              <Grid item lg={10} md={10} sm={10} xs={10}>
                <Typography
                  fontSize={14}
                  sx={{
                    color: (theme) => theme.palette.onSurfaceVariant.main,
                    fontWeight: 500,
                  }}
                >
                  Inscritos no evento
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default EventPanel;
