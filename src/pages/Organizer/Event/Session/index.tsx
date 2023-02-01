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
import { ChalkboardTeacher, Checks, Plus, UserList } from "phosphor-react";
import { useState } from "react";
import { Params, useParams } from "react-router-dom";
import { useEventById } from "../../../../stores/event";
import { useSessionTypeById } from "../../../../stores/sessionTypes";
import { CreateSessionModal } from "./component/CreateSessionModal";
import { SessionTable } from "./component/Table";

interface IParams extends Params {
  sessionTypeId: string;
  eventId: string;
}

const EventSession = () => {
  const theme = useTheme();
  const { sessionTypeId, eventId } = useParams<IParams>();
  const [openCreateSessionModal, setOpenCreateSessionModal] = useState(false);
  const { data: event } = useEventById(eventId);

  const { data: sessionType, isLoading: isLoadingSessionType } =
    useSessionTypeById(
      {
        sessionTypeId: sessionTypeId || "",
      },
      {
        enabled: !!sessionTypeId,
      }
    );

  const handleOpenCreateSessionModal = () => {
    setOpenCreateSessionModal(true);
  };

  const handleCloseCreateSessionModal = () => {
    setOpenCreateSessionModal(false);
  };

  return (
    <Grid container spacing={2}>
      {/* tickets */}
      {isLoadingSessionType ? (
        <>
          <Grid item lg={4} md={4} sm={4} xs={6}>
            <Card variant="elevation" elevation={0}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item lg={6} md={6} sm={6} xs={6}>
                    <Skeleton variant="rectangular" width={200} height={21} />
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
                    <Skeleton variant="rectangular" width={32} height={32} />
                  </Grid>
                </Grid>
                <Grid container mt={1}>
                  <Grid item>
                    <Skeleton variant="rectangular" width={50} height={32} />
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
                    <Skeleton variant="rectangular" width={200} height={21} />
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
                    <Skeleton variant="rectangular" width={32} height={32} />
                  </Grid>
                </Grid>
                <Grid container mt={1}>
                  <Grid item>
                    <Skeleton variant="rectangular" width={50} height={32} />
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
                    <Skeleton variant="rectangular" width={200} height={21} />
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
                    <Skeleton variant="rectangular" width={32} height={32} />
                  </Grid>
                </Grid>
                <Grid container mt={1}>
                  <Grid item>
                    <Skeleton variant="rectangular" width={50} height={32} />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </>
      ) : (
        <>
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
                      Total de {sessionType?.title}
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
                    <ChalkboardTeacher
                      size={32}
                      color={theme.palette.success.main}
                    />
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
                      Total de inscritos
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
                    <UserList size={32} color={theme.palette.error.light} />
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
                    <Checks size={32} color={theme.palette.primary.main} />
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
        </>
      )}

      {/* table */}
      {sessionType !== undefined && (
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
                    {sessionType.title}
                  </Typography>
                </Grid>
                {event && event.status !== "finished" && (
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
                        size="small"
                        onClick={() => handleOpenCreateSessionModal()}
                        startIcon={<Plus />}
                      >
                        Adicionar
                      </Button>
                    </Stack>
                  </Grid>
                )}
              </Grid>
              <SessionTable sessionType={sessionType} />
            </CardContent>
          </Card>
        </Grid>
      )}

      {sessionTypeId && sessionType && eventId && openCreateSessionModal && (
        <CreateSessionModal
          sessionTypeId={sessionTypeId}
          type={sessionType.title}
          open={!!openCreateSessionModal}
          onClose={() => handleCloseCreateSessionModal()}
          eventId={eventId}
        />
      )}
    </Grid>
  );
};

export default EventSession;
