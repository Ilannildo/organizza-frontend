import {
  Button,
  Card,
  CardContent,
  Grid,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { Ticket } from "phosphor-react";
import { Params, useParams } from "react-router-dom";

import { TicketTable } from "./component/Table";
import { CreateTicketModal } from "./component/CreateTicketModal";
import { useState } from "react";
import { ITicketPriceType } from "../../../../models/ticket";
import { useEventPanelTicketInformation } from "../../../../stores/eventPanel";

interface IEventTicketParams extends Params {
  eventId: string;
}

const EventTicket = () => {
  const theme = useTheme();
  const { eventId } = useParams<IEventTicketParams>();
  const [selectedCreateTicketType, setSelectedCreateTicketType] =
    useState<ITicketPriceType | null>(null);

  const {
    data: eventTicketInformation,
    isLoading: isLoadingEventTicketInformation,
  } = useEventPanelTicketInformation(
    {
      eventId,
    },
    {
      enabled: !!eventId,
    }
  );

  const onChangeModalCreateTicket = () => {
    setSelectedCreateTicketType(null);
  };

  return (
    <Grid container spacing={2}>
      {/* tickets */}
      {/* buscando informações dos ingressos */}
      {isLoadingEventTicketInformation && (
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Grid container spacing={2}>
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
                      <Skeleton variant="rectangular" width={75} height={21} />
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
                        Ingressos cancelados/recusados
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
                      <Skeleton variant="rectangular" width={50} height={21} />
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
                      <Skeleton variant="rectangular" width={100} height={21} />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      )}

      {/* mostrando informações dos ingressos */}
      {eventTicketInformation && !isLoadingEventTicketInformation && (
        <Grid item lg={12} xs={12} md={12} sm={12}>
          <Grid container spacing={2}>
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
                          color: (theme) =>
                            theme.palette.onPrimaryContainer.main,
                          fontWeight: 500,
                        }}
                      >
                        {eventTicketInformation.sold}
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
                        Ingressos cancelados/recusados
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
                          color: (theme) =>
                            theme.palette.onPrimaryContainer.main,
                          fontWeight: 500,
                        }}
                      >
                        {eventTicketInformation.canceled}
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
                          color: (theme) =>
                            theme.palette.onPrimaryContainer.main,
                          fontWeight: 500,
                        }}
                      >
                        {eventTicketInformation.remaining}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      )}

      {/* table */}
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Card variant="elevation" elevation={0}>
          <CardContent>
            <Grid container alignItems="center" rowSpacing={2} mb={2}>
              <Grid item xl={6} lg={6} xs={6}>
                <Typography
                  component="h1"
                  variant="h3"
                  sx={{
                    fontWeight: 600,
                    fontSize: 16,
                  }}
                >
                  Tipos de ingressos
                </Typography>
              </Grid>
              <Grid
                item
                xl={6}
                lg={6}
                xs={6}
                alignItems="center"
                justifyContent="center"
              >
                <Stack direction="row" spacing={2} justifyContent="end">
                  <Button
                    variant="contained"
                    disableElevation
                    color="info"
                    size="small"
                    disabled={!!selectedCreateTicketType}
                    onClick={() =>
                      setSelectedCreateTicketType({
                        id: "5a14ab5a-94b5-4f15-96fa-9e2b18ab5dba",
                        title: "Gratuito",
                        is_free: true,
                        quote_id: "809d1936-bab6-46b6-8b5a-3a957d959a59",
                        quote: {
                          id: "809d1936-bab6-46b6-8b5a-3a957d959a59",
                          min_base_value: 0,
                          min_value: 0,
                          name: "Taxa grátis",
                          percentage: 0,
                        },
                      })
                    }
                  >
                    Adicionar ingresso grátis
                  </Button>
                  <Button
                    variant="contained"
                    disableElevation
                    size="small"
                    disabled={!!selectedCreateTicketType}
                    onClick={() =>
                      setSelectedCreateTicketType({
                        id: "ae9ecea2-8024-4d48-9595-612a552cb5ee",
                        is_free: false,
                        quote_id: "15f57147-50f9-4712-a5b2-65d623ec1cb6",
                        title: "Pago",
                        quote: {
                          id: "15f57147-50f9-4712-a5b2-65d623ec1cb6",
                          min_base_value: 2.5,
                          min_value: 30,
                          name: "Taxa pago",
                          percentage: 0.1,
                        },
                      })
                    }
                  >
                    Adicionar ingresso pago
                  </Button>
                </Stack>
              </Grid>
            </Grid>
            <TicketTable />
          </CardContent>
        </Card>
      </Grid>

      {/* create ticket modal */}
      {selectedCreateTicketType && eventId && (
        <CreateTicketModal
          eventId={eventId}
          type={selectedCreateTicketType}
          open={!!selectedCreateTicketType}
          onClose={() => onChangeModalCreateTicket()}
        />
      )}
    </Grid>
  );
};

export default EventTicket;
