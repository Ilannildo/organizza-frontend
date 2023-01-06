import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Link,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FormEvent, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import Logo from "../../../assets/images/logo-color.svg";
import { useAuth } from "../../../hooks/useAuth";
import { validateEmail } from "../../../utils/roles";

const Login = () => {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));
  const [searchparams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, isLoading } = useAuth();

  // states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // errors
  const [emailError, setEmailError] = useState(" ");
  const [passwordError, setPasswordError] = useState(" ");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setEmailError(" ");
    setPasswordError(" ");
    if (email === "") {
      return setEmailError("e-mail é obrigatório");
    }

    if (!validateEmail(email)) {
      return setEmailError("e-mail inválido");
    }

    if (password === "") {
      return setPasswordError("senha é obrigatório");
    }

    try {
      const result = await signIn(email, password);

      if (result) {
        //verificar se existe parametro
        if (searchparams.get("callback-url")) {
          navigate(searchparams.get("callback-url") || "/", {
            replace: true,
          });
        } else {
          navigate("/organizador", {
            replace: true,
          });
        }
      }
    } catch (error: any) {
      console.log("Error", error);
      if (error.response) {
        toast.error(error.response.data.error.message);
      }
    }
  };

  return (
    <Grid container component="main" minHeight="100vh">
      <Grid
        item
        xs={false}
        md={5}
        lg={4}
        xl={4}
        sx={{
          backgroundColor: (theme) => theme.palette.primary.main,
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <Box mt={4} p={3} display={matchesSM ? "none" : "block"}>
          <Typography fontSize={42} variant="h3" color="Background">
            Vamos construir relacionamentos, não apenas eventos.
          </Typography>
          <Typography fontSize={16} variant="h4" mt={2} color="Background">
            — I. Viana, CEO & Co-Founder Organizza
          </Typography>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={7}
        lg={8}
        xl={7}
        p={2}
        sx={{
          backgroundColor: (theme) => theme.palette.background.default,
          position: "relative",
        }}
      >
        <Box
          sx={{
            // backgroundColor: (theme) => theme.palette.primary.main,
            alignItems: "center",
            height: "100%",
            width: "100%",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
          }}
          onSubmit={handleSubmit}
          component="form"
        >
          <Grid container justifyContent="center" spacing={2}>
            <Grid
              item
              sx={{ userSelect: "none" }}
              lg={6}
              xl={4}
              xs={12}
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
            >
              <img src={Logo} alt="Logo Organizza" draggable="false" />
              <Typography fontSize={16} variant="h1" fontWeight="500">
                Deixando o seu evento melhor!
              </Typography>
              {location.state && location.state.checkout && (
                <Typography
                  fontSize={16}
                  variant="h1"
                  mt={2}
                  fontWeight="500"
                  color="secondary"
                >
                  Realize seu login para continuar a inscrição
                </Typography>
              )}
            </Grid>
          </Grid>
          <Grid container justifyContent="center" mt={2}>
            <Grid
              item
              lg={6}
              xl={4}
              xs={12}
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
            >
              <TextField
                margin="dense"
                fullWidth
                id="email"
                label="E-mail"
                name="email"
                autoComplete="email"
                value={email}
                error={emailError !== " "}
                helperText={emailError}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container justifyContent="center">
            <Grid
              item
              lg={6}
              xl={4}
              xs={12}
              display="flex"
              justifyContent="center"
              alignItems="end"
              flexDirection="column"
            >
              <TextField
                margin="dense"
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={passwordError !== " "}
                helperText={passwordError}
              />
              <Link
                href="/forgot-password"
                sx={{
                  color: (theme) => theme.palette.primary.main,
                }}
              >
                Esqueci minha senha
              </Link>
            </Grid>
          </Grid>
          <Grid container justifyContent="center">
            <Grid
              item
              lg={6}
              xl={4}
              xs={12}
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
            >
              <Button
                type="submit"
                fullWidth
                disabled={isLoading}
                size="large"
                color="primary"
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                }}
              >
                {isLoading ? (
                  <CircularProgress color="inherit" size={26} />
                ) : (
                  `Entrar`
                )}
              </Button>
              <Typography fontSize={14} variant="h1" mt={1}>
                Não tem uma conta?{" "}
                <Link
                  href={
                    searchparams.get("callback-url")
                      ? `/cadastro?callbak-url=${searchparams.get(
                          "callback-url"
                        )}`
                      : `/cadastro`
                  }
                  sx={{
                    color: (theme) => theme.palette.primary.main,
                  }}
                >
                  Cadastre-se
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box
          position="absolute"
          left={0}
          bottom={0}
          width="100%"
          display={matchesSM ? "none" : "block"}
        >
          <Grid container px={2} py={1}>
            <Grid item lg={6} xs={false}>
              <Typography fontSize={16} variant="h4" color="#C2C7CF">
                © Organizza Eventos 2022
              </Typography>
            </Grid>
            <Grid item lg={6} xs={false} display="flex" justifyContent="end">
              <Typography fontSize={16} variant="h4" color="#C2C7CF">
                help@organizza.online
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid
        item
        xs={false}
        md={false}
        lg={false}
        xl={1}
        sx={{
          backgroundColor: (theme) => theme.palette.secondary.main,
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      ></Grid>
    </Grid>
  );
};
export default Login;
