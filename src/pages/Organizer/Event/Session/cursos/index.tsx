import { Card, CardContent, Grid, Typography, useTheme } from "@mui/material";
import { Checks, UserList, ChalkboardTeacher } from "phosphor-react";
import { SessionTable } from "../component/Table";




const EventSessionCursos = () => {
  const theme = useTheme();

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
                  Total de Cursos
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
                <ChalkboardTeacher size={32} color={theme.palette.success.main} />
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

      {/* table */}
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Card variant="elevation" elevation={0}>
          <CardContent>
            <SessionTable />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default EventSessionCursos;
