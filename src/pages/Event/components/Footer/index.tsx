import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";

import Logo from "../../../../assets/images/logo-white.svg";

export const Footer = () => {
  return (
    <Box
      id="início"
      component="footer"
      sx={{
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Grid container mt={6} mb={4} columnSpacing={6}>
          <Grid item lg={5}>
            <img src={Logo} alt="Logo do responsável do evento" />
            <Typography
              component="h1"
              variant="h3"
              sx={{
                color: (theme) => theme.palette.onSurfaceVariant.main,
                fontSize: 14,
                mb: 2,
                mt: 2,
              }}
            >
              A Organizza Eventos é uma plataforma que torna a organização do
              seu evento mais simples e rápida.
            </Typography>
          </Grid>
          <Grid item lg={7}>
            <Grid container spacing={2}>
              <Grid item lg={4} md={4} sm={4} xs={12}>
                <Stack spacing={2}>
                  <Typography
                    component="h1"
                    variant="h3"
                    sx={{
                      color: (theme) => theme.palette.primary.main,
                      fontSize: 14,
                    }}
                  >
                    Serviços
                  </Typography>
                  <Typography
                    component="h1"
                    variant="h3"
                    sx={{
                      color: (theme) => theme.palette.onSurfaceVariant.main,
                      fontSize: 14,
                    }}
                  >
                    Venda ingressos
                  </Typography>
                  <Typography
                    component="h1"
                    variant="h3"
                    sx={{
                      color: (theme) => theme.palette.onSurfaceVariant.main,
                      fontSize: 14,
                    }}
                  >
                    Gerencie tudo
                  </Typography>
                  <Typography
                    component="h1"
                    variant="h3"
                    sx={{
                      color: (theme) => theme.palette.onSurfaceVariant.main,
                      fontSize: 14,
                    }}
                  >
                    Organizza eventos
                  </Typography>
                </Stack>
              </Grid>
              <Grid item lg={4} md={4} sm={4} xs={12}>
                <Stack spacing={2}>
                  <Typography
                    component="h1"
                    variant="h3"
                    sx={{
                      color: (theme) => theme.palette.primary.main,
                      fontSize: 14,
                    }}
                  >
                    Sobre
                  </Typography>
                  <Typography
                    component="h1"
                    variant="h3"
                    sx={{
                      color: (theme) => theme.palette.onSurfaceVariant.main,
                      fontSize: 14,
                    }}
                  >
                    Nossa história
                  </Typography>
                  <Typography
                    component="h1"
                    variant="h3"
                    sx={{
                      color: (theme) => theme.palette.onSurfaceVariant.main,
                      fontSize: 14,
                    }}
                  >
                    Benefícios
                  </Typography>
                  <Typography
                    component="h1"
                    variant="h3"
                    sx={{
                      color: (theme) => theme.palette.onSurfaceVariant.main,
                      fontSize: 14,
                    }}
                  >
                    Nossa equipe
                  </Typography>
                </Stack>
              </Grid>
              <Grid item lg={4} md={4} sm={4} xs={12}>
                <Stack spacing={2}>
                  <Typography
                    component="h1"
                    variant="h3"
                    sx={{
                      color: (theme) => theme.palette.primary.main,
                      fontSize: 14,
                    }}
                  >
                    Siga-nos
                  </Typography>
                  <Typography
                    component="h1"
                    variant="h3"
                    sx={{
                      color: (theme) => theme.palette.onSurfaceVariant.main,
                      fontSize: 14,
                    }}
                  >
                    Youtube
                  </Typography>
                  <Typography
                    component="h1"
                    variant="h3"
                    sx={{
                      color: (theme) => theme.palette.onSurfaceVariant.main,
                      fontSize: 14,
                    }}
                  >
                    Instagram
                  </Typography>
                  <Typography
                    component="h1"
                    variant="h3"
                    sx={{
                      color: (theme) => theme.palette.onSurfaceVariant.main,
                      fontSize: 14,
                    }}
                  >
                    Facebook
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container mt={4} mb={2} columnSpacing={2} alignItems="center">
          <Grid item lg={6}>
            <Typography
              sx={{
                color: (theme) => theme.palette.onSurfaceVariant.main,
                fontSize: 14,
              }}
            >
              Copyright © {new Date().getFullYear()}. Organizza Eventos. Todos
              os direitos reservados.
            </Typography>
          </Grid>
          <Grid item lg={6}>
            <Stack
              justifyContent="flex-end"
              spacing={4}
              direction="row"
              alignItems="center"
            >
              <Button>Termos & Condições</Button>
              <Button>Política de privacidade</Button>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
