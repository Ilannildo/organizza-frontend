import {
  AppBar,
  Button,
  Container,
  Grid,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { CheckCircle } from "phosphor-react";
import { Params, useNavigate, useParams } from "react-router-dom";
import { Main } from "../../../layout/CheckoutLayout";
import LogoSection from "../../../layout/MainPanelLayout/components/LogoSection";

interface IParams extends Params {
  slug: string;
}

const CheckoutOrderCreatedApproved = () => {
  const theme = useTheme();
  const { slug } = useParams<IParams>();
  const navigate = useNavigate();

  const goToEventPage = () => {
    navigate(`/evento/${slug}`, {
      replace: true,
    });
  };

  return (
    <>
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
            height: "100%"
          }}
        >
          <Grid
            container
            sx={{ py: 3, px: 1 }}
            justifyContent="center"
            alignItems="center"
            display="flex"
          >
            <Grid item lg={7} md={8} sm={12} xs={12}>
              <Grid container spacing={2}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
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
                      <CheckCircle
                        size={56}
                        color={theme.palette.success.main}
                      />

                      <Typography
                        fontSize={22}
                        sx={{
                          color: (theme) =>
                            theme.palette.onPrimaryContainer.main,
                          fontWeight: 600,
                        }}
                      >
                        Pagamento aprovado
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
                        O seu pedido de inscrição foi realizado e o pagamento
                        foi aprovado. Agora é só desfrutar de um bom evento
                      </Typography>
                    </Grid>

                    <Grid item lg={8} md={8} xs={12} mt={6}>
                      <Stack direction="row" justifyContent="space-between">
                        <Button
                          variant="text"
                          disableElevation
                          onClick={() => goToEventPage()}
                        >
                          Visualizar comprovante
                        </Button>
                        <Button
                          variant="contained"
                          disableElevation
                          onClick={() => goToEventPage()}
                        >
                          Ir à Página do evento
                        </Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Main>
    </>
  );
};

export default CheckoutOrderCreatedApproved;
