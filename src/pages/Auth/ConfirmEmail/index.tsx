import {
  AppBar,
  Box,
  Button,
  Grid,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { EnvelopeOpen } from "phosphor-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Logo from "../../../assets/images/logo-color.svg";
import Loader from "../../../layout/Loader";
import { api } from "../../../services/api";

const ConfirmEmail = () => {
  const [isFetching, setIsFetching] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  const handleConfimEmail = async (code: string) => {
    try {
      setIsFetching(true);
      const res = await api.post("/auth/confirm-email", {
        code,
      });
      console.log("Teste >>>>", res.data);
      setIsFetching(false);
    } catch (error) {
      setIsFetching(false);
      console.log("Errror >>>>", error);
    }
  };

  useEffect(() => {
    if (params.code) {
      handleConfimEmail(params?.code);
    } else {
      navigate("/", {
        replace: true,
      });
    }
  }, [params, navigate]);

  return (
    <>
      <AppBar
        position="relative"
        elevation={0}
        sx={{
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Grid container>
              <Grid
                item
                xl={3}
                lg={3}
                md={4}
                xs={9}
                alignItems="center"
                display="flex"
              >
                <Link href="/" sx={{ display: "flex", alignItems: "center" }}>
                  <img src={Logo} alt="" width="200" />
                </Link>
              </Grid>
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>
      <Loader isLoading={isFetching} />
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.background.default,
          pt: 4,
        }}
      >
        <Container
          sx={{
            minHeight: "90vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pb: 10,
          }}
        >
          {!isFetching && (
            <Grid container>
              <Grid
                item
                lg={12}
                sm={12}
                md={12}
                alignItems="center"
                display="flex"
                flexDirection="column"
              >
                <EnvelopeOpen size={80} color="#55DAD2" />
                <Typography mt={2} component="h1" variant="h4">
                  Email confirmado com sucesso!
                </Typography>
                <Typography
                  component="h1"
                  variant="h6"
                  fontWeight={400}
                  fontSize={16}
                  mt={1}
                >
                  Agora você já pode começar a se divertir
                </Typography>
              </Grid>
              <Grid
                item
                lg={12}
                sm={12}
                md={12}
                justifyContent="center"
                display="flex"
                mt={6}
              >
                <Button variant="contained" onClick={() => navigate("/login")}>
                  Acessar minha conta
                </Button>
              </Grid>
            </Grid>
          )}
        </Container>
      </Box>
    </>
  );
};

export default ConfirmEmail;
