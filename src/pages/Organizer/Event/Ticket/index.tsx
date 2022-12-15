import {
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { Ticket as TicketIcon } from "phosphor-react";

import { TicketTable } from "./component/Table";
import { CreateTicketModal } from "./component/CreateTicketModal";
import { useState } from "react";
import { ITicketPriceType } from "../../../../models/ticket";

const EventTicket = () => {
  const theme = useTheme();
  const [selectedCreateTicketType, setSelectedCreateTicketType] =
    useState<ITicketPriceType | null>(null);

  const onChangeModalCreateTicket = () => {
    setSelectedCreateTicketType(null);
  };

  return (
    <Grid container spacing={2}>
      {/* tickets */}
      <Grid item lg={4} md={4} sm={4} xs={6}>
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
                  Ingressos vendidos
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
                <TicketIcon size={32} color={theme.palette.success.main} />
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
              <Grid item lg={6} md={6} sm={6} xs={6}>
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
                lg={6}
                md={6}
                sm={6}
                xs={6}
                justifyContent="end"
                alignItems="center"
                display="flex"
              >
                <TicketIcon size={32} color={theme.palette.error.light} />
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
              <Grid item lg={6} md={6} sm={6} xs={6}>
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
                lg={6}
                md={6}
                sm={6}
                xs={6}
                justifyContent="end"
                alignItems="center"
                display="flex"
              >
                <TicketIcon size={32} color={theme.palette.primary.main} />
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
                        id: "123",
                        is_free: true,
                        quote_id: "321",
                        title: "Grátis",
                        quote: {
                          id: "321",
                          min_base_value: 0,
                          min_value: 0,
                          name: "Ingresso grátis",
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
                        id: "213",
                        is_free: false,
                        quote_id: "231",
                        title: "Pago",
                        quote: {
                          id: "231",
                          min_base_value: 2.5,
                          min_value: 30,
                          name: "Ingresso Pago",
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
      {selectedCreateTicketType && (
        <CreateTicketModal
          type={selectedCreateTicketType}
          open={!!selectedCreateTicketType}
          onClose={() => onChangeModalCreateTicket()}
        />
      )}
    </Grid>
  );
};

export default EventTicket;
