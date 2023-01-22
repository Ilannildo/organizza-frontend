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

import BackgroundLoginImage from "../../../assets/images/background-login.png";
import Logo from "../../../assets/images/logo-text.svg";
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
        xs={12}
        md={5}
        lg={5}
        xl={4}
        sx={{
          backgroundColor: (theme) => theme.palette.background.default,
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          p: 2,
          maxWidth: 640,
        }}
      >
        <Box
          sx={{
            alignItems: "center",
            height: "100%",
            width: "100%",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            maxWidth: 375,
          }}
          onSubmit={handleSubmit}
          component="form"
        >
          <Grid container justifyContent="center" spacing={2}>
            <Grid
              item
              sx={{ userSelect: "none" }}
              lg={12}
              xl={12}
              xs={12}
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
            >
              <img
                src={Logo}
                alt="Logo Organizza"
                draggable="false"
                width="256"
              />
              <Typography fontSize={16} variant="h1" fontWeight="500" mt={2}>
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
          <Grid container justifyContent="center" mt={4}>
            <Grid
              item
              lg={12}
              xl={12}
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
                size="medium"
                name="email"
                autoComplete="email"
                value={email}
                error={emailError !== " "}
                helperText={emailError}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid
              item
              lg={12}
              xl={12}
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
                size="medium"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={passwordError !== " "}
                helperText={passwordError}
              />
              <Link
                href="/forgot-password"
                fontSize={14}
                variant="h1"
                sx={{
                  color: (theme) => theme.palette.primary.main,
                }}
              >
                Esqueci minha senha
              </Link>
            </Grid>
            <Grid
              item
              lg={12}
              xl={12}
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
      </Grid>
      <Grid
        item
        xs={false}
        sm={12}
        md={7}
        lg={7}
        xl={8}
        p={2}
        sx={{
          backgroundColor: (theme) => theme.palette.primary.main,
          background: `url(${BackgroundLoginImage})`,
          backgroundRepeat: "no-repeat",
          backgroundBlendMode: "multiply",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
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
    </Grid>
  );
};
export default Login;
