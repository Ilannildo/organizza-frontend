import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FormEvent, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import Logo from "../../../assets/images/logo-color.svg";
import { validateEmail } from "../../../utils/roles";

const Login = () => {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));
  const [searchparams] = useSearchParams();
  const navigate = useNavigate();

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
      // const result = await signIn(emailType, email, password);
      const result = true;

      if (result) {
        //verificar se existe parametro
        if (searchparams.get("callback-url")) {
          navigate(searchparams.get("callback-url") || "/", {
            replace: true,
          });
        } else {
          navigate("/dashboard", {
            replace: true,
          });
        }
      }
    } catch (error: any) {
      // toast.error(error.response.data.error.message, {
      //   position: "top-right",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      // });
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
              <img src={Logo} alt="Logo Monitora Tocantins" draggable="false" />
              <Typography fontSize={16} variant="h1" fontWeight="500">
                Deixando o seu evento melhor!
              </Typography>
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
                // disabled={loading}
                size="large"
                color="primary"
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                }}
              >
                {false ? <CircularProgress color="inherit" /> : `Entrar`}
              </Button>
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
