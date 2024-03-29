import { FormEvent, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import { api } from "../../../services/api";
import { validateEmail } from "../../../utils/roles";
import Logo from "../../../assets/images/logo-text.svg";
import BackgroundLoginImage from "../../../assets/images/background-login.png";

const Register = () => {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));
  const [searchparams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  // states
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // errors
  const [nameError, setNameError] = useState(" ");
  const [emailError, setEmailError] = useState(" ");
  const [passwordError, setPasswordError] = useState(" ");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setEmailError(" ");
    setNameError(" ");
    setPasswordError(" ");
    if (name === "") {
      return setNameError("Nome é obrigatório");
    }
    if (email === "") {
      return setEmailError("e-mail é obrigatório");
    }

    if (!validateEmail(email)) {
      return setEmailError("e-mail inválido");
    }

    if (password === "") {
      return setPasswordError("senha é obrigatório");
    }

    if (passwordConfirm !== password) {
      return setPasswordError("Senhas diferentes");
    }
    setIsLoading(true);

    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      toast.success("Cadastro realizado com sucesso!");
      //verificar se existe parametro
      if (searchparams.get("callback-url")) {
        setIsLoading(false);
        navigate(searchparams.get("callback-url") || "/", {
          replace: true,
        });
      } else {
        setIsLoading(false);
        navigate("/login", {
          replace: true,
        });
      }
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.response.data.error.message);
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
              <Typography fontSize={18} variant="h1" fontWeight="500" mt={2}>
                Crie sua conta!
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
                id="name"
                label="Nome completo"
                name="name"
                value={name}
                error={nameError !== " "}
                helperText={nameError}
                onChange={(e) => setName(e.target.value)}
              />
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
              <TextField
                margin="dense"
                fullWidth
                name="password-confirm"
                label="Confirma a senha"
                type="password"
                id="password-confirm"
                autoComplete="current-password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                error={passwordError !== " "}
                helperText={passwordError}
              />
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
              <FormControlLabel
                onChange={(e, value) => setAcceptTerms(value)}
                value={acceptTerms}
                control={<Checkbox />}
                label={
                  <Typography fontSize={14} variant="h1" fontWeight="500">
                    Aceito os{" "}
                    <Link
                      href="#terms"
                      sx={{
                        color: (theme) => theme.palette.secondary.main,
                      }}
                    >
                      Termos de Uso
                    </Link>{" "}
                    e a{" "}
                    <Link
                      href="#privacy"
                      sx={{
                        color: (theme) => theme.palette.secondary.main,
                      }}
                    >
                      Política de Privacidade
                    </Link>{" "}
                    da Organizza
                  </Typography>
                }
              />
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
                disabled={
                  isLoading || !acceptTerms || !name || !email || !password
                }
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
                  `Cadastrar`
                )}
              </Button>
              <Typography fontSize={14} variant="h1" mb={2}>
                Já tem uma conta?{" "}
                <Link
                  href="/login"
                  sx={{
                    color: (theme) => theme.palette.primary.main,
                  }}
                >
                  Entre
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
              <Typography fontSize={14} variant="h4" color="#C2C7CF">
                © Organizza Eventos 2022
              </Typography>
            </Grid>
            <Grid item lg={6} xs={false} display="flex" justifyContent="end">
              <Typography fontSize={14} variant="h4" color="#C2C7CF">
                help@organizza.online
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};
export default Register;
