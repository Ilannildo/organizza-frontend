import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Calendar, MapPinLine, UsersFour } from "phosphor-react";
import Cover from "../../assets/images/cover.jpg";

export const HomeEventCard = () => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Card
      elevation={0}
      sx={{
        backgroundColor: (theme) => theme.palette.background.default,
        boxShadow: "1px 1px 16px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(22.5px)",
        m: 1,
      }}
    >
      <Grid container>
        <Grid position="relative" lg={7} md={8} sm={12} xs={12} item>
          <Box
            maxHeight={matchUpMd ? 350 : 200}
            height="100%"
            width="100%"
            sx={{
              background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 57.29%, #000 70.83%)`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain, cover",
              position: "absolute",
              display: "flex",
              alignItems: "end",
            }}
          >
            <Typography
              fontWeight={600}
              textAlign="center"
              sx={{
                color: (theme) => theme.palette.background.default,
                fontSize: 24,
                mx: 5,
                my: 2,
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "3",
                WebkitBoxOrient: "vertical",
              }}
            >
              Mais uma noite como todas as anteriores. Pego minha caneca de café
              cheia, acendo meu ultimo cigarro e corro pra velha janela do
              quarto.
            </Typography>
          </Box>
          <CardMedia
            component="img"
            image={Cover}
            alt=""
            height={matchUpMd ? 350 : 200}
          />
        </Grid>
        <Grid
          lg={5}
          md={4}
          sm={12}
          xs={12}
          item
          sx={{ display: "flex", alignItems: "center" }}
        >
          <CardContent>
            <Grid container>
              <Grid item>
                <Typography
                  fontWeight="bold"
                  sx={{
                    color: (theme) => theme.palette.text.primary,
                    fontSize: 24,
                  }}
                >
                  III Congresso da computação no Baixo tocantins
                </Typography>
              </Grid>
            </Grid>
            <Grid spacing={2} mt={2} container>
              <Grid lg={12} md={12} sm={12} xs={12} item>
                <Stack alignItems="center" direction="row" spacing={2}>
                  <UsersFour size={32} />
                  <Typography
                    sx={{
                      color: (theme) => theme.palette.text.disabled,
                      fontSize: 16,
                    }}
                  >
                    Evento presencial
                  </Typography>
                </Stack>
              </Grid>

              <Grid lg={12} md={12} sm={12} xs={12} item>
                <Stack alignItems="center" direction="row" spacing={2}>
                  <MapPinLine size={32} />
                  <Typography
                    sx={{
                      color: (theme) => theme.palette.text.disabled,
                      fontSize: 16,
                    }}
                  >
                    Cametá/PA - Rua Dos Parijos
                  </Typography>
                </Stack>
              </Grid>

              <Grid lg={12} md={12} sm={12} xs={12} item>
                <Stack alignItems="center" direction="row" spacing={2}>
                  <Calendar size={32} />
                  <Typography
                    sx={{
                      color: (theme) => theme.palette.text.disabled,
                      fontSize: 16,
                    }}
                  >
                    12 de dezembro de 2022
                  </Typography>
                </Stack>
              </Grid>

              <Grid lg={12} md={12} sm={12} xs={12} item>
                <Grid container alignItems="center" justifyContent="center">
                  <Grid item lg={6} md={6} sm={6} xs={12}>
                    <Button
                      variant="contained"
                      color="secondary"
                      disableElevation
                      fullWidth
                    >
                      SAIBA MAIS
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};
