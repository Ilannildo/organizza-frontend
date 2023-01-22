import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { CalendarCheck, CalendarPlus, CalendarX, Plus } from "phosphor-react";
import { useState } from "react";
import { useEventInformationByUserId } from "../../../stores/event";
import { useAuthenticatedUser } from "../../../stores/user";
import { SelectEventTypeModal } from "./components/SelectEventTypeModal";
import { EventTable } from "./components/Table";

export const OrganizerDashboard = () => {
  const theme = useTheme();
  const [isOpenSelectEvenTypeModal, setIsOpenSelectEventTypeModal] =
    useState(false);

  const { data: user } = useAuthenticatedUser();

  const { data: eventInformations, isLoading: isLoadingEventInfomations } =
    useEventInformationByUserId(
      {
        user_id: user?.uid,
      },
      {
        enabled: !!user,
      }
    );

  const handleCloseIsOpenSelectEvenTypeModal = () =>
    setIsOpenSelectEventTypeModal(false);

  const handleOpenIsOpenSelectEvenTypeModal = () =>
    setIsOpenSelectEventTypeModal(true);

  return (
    <>
      <Grid container>
        <Grid item lg={12}>
          <Grid container spacing={2}>
            {isLoadingEventInfomations && (
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
                                color: (theme) =>
                                  theme.palette.onSurfaceVariant.main,
                                fontWeight: 500,
                              }}
                            >
                              Eventos criados
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
                            <CalendarPlus
                              size={32}
                              color={theme.palette.success.main}
                            />
                          </Grid>
                        </Grid>
                        <Grid container mt={1}>
                          <Grid item>
                            <Skeleton
                              variant="rectangular"
                              width={75}
                              height={21}
                            />
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
                                color: (theme) =>
                                  theme.palette.onSurfaceVariant.main,
                                fontWeight: 500,
                              }}
                            >
                              Eventos encerrados
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
                            <CalendarX
                              size={32}
                              color={theme.palette.error.light}
                            />
                          </Grid>
                        </Grid>
                        <Grid container mt={1}>
                          <Grid item>
                            <Skeleton
                              variant="rectangular"
                              width={50}
                              height={21}
                            />
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
                                color: (theme) =>
                                  theme.palette.onSurfaceVariant.main,
                                fontWeight: 500,
                              }}
                            >
                              Eventos disponíveis
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
                            <CalendarCheck
                              size={32}
                              color={theme.palette.primary.main}
                            />
                          </Grid>
                        </Grid>
                        <Grid container mt={1}>
                          <Grid item>
                            <Skeleton
                              variant="rectangular"
                              width={100}
                              height={21}
                            />
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            )}
            {eventInformations && (
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
                                color: (theme) =>
                                  theme.palette.onSurfaceVariant.main,
                                fontWeight: 500,
                              }}
                            >
                              Eventos criados
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
                            <CalendarPlus
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
                                color: (theme) =>
                                  theme.palette.onPrimaryContainer.main,
                                fontWeight: 500,
                              }}
                            >
                              {eventInformations.total}
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
                                color: (theme) =>
                                  theme.palette.onSurfaceVariant.main,
                                fontWeight: 500,
                              }}
                            >
                              Eventos encerrados
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
                            <CalendarX
                              size={32}
                              color={theme.palette.error.light}
                            />
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
                              {eventInformations.finished}
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
                                color: (theme) =>
                                  theme.palette.onSurfaceVariant.main,
                                fontWeight: 500,
                              }}
                            >
                              Eventos disponíveis
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
                            <CalendarCheck
                              size={32}
                              color={theme.palette.primary.main}
                            />
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
                              {eventInformations.available}
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            )}

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
                      Todos os eventos
                    </Typography>
                  }
                  action={
                    <Stack
                      direction="row"
                      spacing={2}
                      justifyContent="end"
                      alignItems="center"
                    >
                      <Button
                        variant="contained"
                        size="medium"
                        onClick={() => handleOpenIsOpenSelectEvenTypeModal()}
                        startIcon={<Plus size={16} />}
                      >
                        Criar evento
                      </Button>
                    </Stack>
                  }
                />
                <CardContent>
                  <EventTable />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <SelectEventTypeModal
        open={isOpenSelectEvenTypeModal}
        onClose={() => handleCloseIsOpenSelectEvenTypeModal()}
      />
    </>
  );
};
