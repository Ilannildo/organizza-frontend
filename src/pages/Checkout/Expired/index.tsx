import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { Params, useNavigate, useParams } from "react-router-dom";
import { Main } from "../../../layout/CheckoutLayout";
import LogoSection from "../../../layout/MainPanelLayout/components/LogoSection";

interface IParams extends Params {
  slug: string;
}

const CheckoutExpired = () => {
  const theme = useTheme();
  const { slug } = useParams<IParams>();
  const navigate = useNavigate();

  const goToEventPanel = () => {
    navigate(`/evento/${slug}`, {
      replace: true,
    });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          bgcolor: theme.palette.primary.main,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LogoSection />
          </Toolbar>
        </Container>
      </AppBar>
      <Main theme={theme}>
        <Container
          maxWidth="xl"
          sx={{
            display: "flex",
            flexDirection: "row",
            minHeight: "calc(100vh - 56px)",
          }}
        >
          <Grid
            container
            sx={{ py: 3, px: 1 }}
            justifyContent="center"
            alignItems="center"
            display="flex"
          >
            <Grid item lg={8} md={8} sm={12} xs={12}>
              <Grid container spacing={2}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Card variant="outlined">
                    <CardContent>
                      <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                        display="flex"
                      >
                        <Grid
                          item
                          lg={8}
                          md={8}
                          sm={12}
                          xs={12}
                          textAlign="center"
                          mb={2}
                        >
                          <Typography
                            fontSize={22}
                            sx={{
                              color: (theme) =>
                                theme.palette.onPrimaryContainer.main,
                              fontWeight: 600,
                            }}
                          >
                            Tempo de compra esgotado!
                          </Typography>
                        </Grid>
                        <Grid item lg={8} md={8} xs={12} textAlign="center">
                          <Typography
                            fontSize={16}
                            sx={{
                              color: (theme) =>
                                theme.palette.onPrimaryContainer.main,
                            }}
                          >
                            O tempo limite para a compra de um ingresso
                            terminou. O ingresso reservado está disponível para
                            compra novamente. Realize uma nova compra para não
                            perder o ingresso escolhido.
                          </Typography>
                        </Grid>

                        <Grid item lg={8} md={8} xs={12} mt={4}>
                          <Button
                            variant="contained"
                            fullWidth
                            disableElevation
                            onClick={() => goToEventPanel()}
                          >
                            Ir à Página do evento
                          </Button>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Main>
    </Box>
  );
};

export default CheckoutExpired;
