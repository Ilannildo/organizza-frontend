import {
  Box,
  Button,
  Card,
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
        position: "relative",
        "&:hover": {
          "& .cardOverlay": { height: matchUpMd ? 350 : 200, p: 3, opacity: 1 },
        },
        m: 1,
      }}
    >
      <Grid
        className="cardOverlay"
        // minHeight={matchUpMd ? 350 : 200}
        height="0"
        width="100%"
        sx={{
          zIndex: 1,
          opacity: 0,
          transition: 'all 0.3s ease-in-out',
          position: 'absolute',
          t: 0,
          background: 'rgba(20, 33, 61, 0.45)',
          backdropFilter: 'blur(12.5px)',
        }}
        container
      >
        <Grid height="100%" position="relative" lg={12} md={12} sm={12} xs={12} item sx={{
          display: "flex",
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Typography
            fontWeight={600}
            textAlign="center"
            sx={{
              color: (theme) => theme.palette.background.default,
              fontSize: { lg: 20, md: 20, sm: 17, xs: 14 },
              mx: 3,
              my: 3,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "3",
              WebkitBoxOrient: "vertical",
            }}
          >
            III Congresso da computação no Baixo tocantins
          </Typography>

          <Typography
            className="subtitle"
            sx={{
              color: (theme) => theme.palette.background.default,
              fontSize: { lg: 15, md: 15, sm: 13, xs: 11 },
              overflow: "hidden",
              textOverflow: "ellipsis",
              // display: "-webkit-box",
              WebkitLineClamp: "3",
              WebkitBoxOrient: "vertical",

            }}
          >
            Mais uma noite como todas as anteriores. Pego minha caneca de café cheia,
            acendo meu ultimo cigarro e corro pra velha janela do quarto.
          </Typography>
          <Grid container
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 4 }}
          >
            <Grid item
              lg={4} md={4} sm={6} xs={12}
            >
              <Button
                variant="contained"
                color="secondary"
                fullWidth
              >
                SAIBA MAIS
              </Button>
            </Grid>
          </Grid>

          <Grid container sx={{ position: 'absolute', bottom: 3, }}>
            <Grid lg={4} md={12} sm={12} xs={12} item >
              <Stack alignItems="center" direction="row" spacing={1}>
                <UsersFour color={theme.palette.onPrimary.main} size={24} />
                <Typography
                  sx={{
                    color: (theme) => theme.palette.onPrimary.main,
                    fontSize: 12,
                  }}
                >
                  Evento presencial
                </Typography>
              </Stack>
            </Grid>

            <Grid lg={4} md={12} sm={12} xs={12} sx={{ display: 'flex', justifyContent: "center", alignItems: "center", }} item>
              <Stack alignItems="center" direction="row" spacing={1}>
                <MapPinLine color={theme.palette.onPrimary.main} size={24} />
                <Typography
                  sx={{
                    color: (theme) => theme.palette.onPrimary.main,
                    fontSize: 12,
                  }}
                >
                  Cametá/PA
                </Typography>
              </Stack>
            </Grid>

            <Grid lg={4} md={12} sm={12} xs={12} item>
              <Stack alignItems="center" justifyContent="end" width='100%' direction="row" spacing={1}>
                <Calendar color={theme.palette.onPrimary.main} size={24} />
                <Typography
                  sx={{
                    color: (theme) => theme.palette.onPrimary.main,
                    fontSize: 12,
                  }}
                >
                  12 de dezembro
                </Typography>
              </Stack>
            </Grid>
          </Grid>

        </Grid>
      </Grid >

      <Grid
        minHeight={matchUpMd ? 350 : 200}
        height="100%"
        width="100%"
        sx={{
          background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 57.29%, rgba(0, 0, 0, 0.7) 70.83%), url(${Cover})`,
          display: "flex",
          justifyContent: 'end',
          flexDirection: 'column',
          pb: 3,

        }}
        container>
        <Grid lg={12} md={12} sm={12} xs={12} item>
          <Grid

          >
            <Typography
              fontWeight={600}
              textAlign="center"
              sx={{
                color: (theme) => theme.palette.background.default,
                fontSize: { lg: 20, md: 20, sm: 17, xs: 14 },
                mx: 3,
                my: 3,
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "3",
                WebkitBoxOrient: "vertical",
              }}
            >
              III Congresso da computação no Baixo tocantins
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", flexDirection: 'row', }}>
              <Grid lg={12} md={12} sm={12} xs={12} item sx={{ display: 'flex', justifyContent: "center", alignItems: "center", }}>
                <Stack alignItems="center" direction="row" spacing={1}>
                  <UsersFour color={theme.palette.onPrimary.main} size={24} />
                  <Typography
                    sx={{
                      color: (theme) => theme.palette.onPrimary.main,
                      fontSize: 12,
                    }}
                  >
                    Evento presencial
                  </Typography>
                </Stack>
              </Grid>

              <Grid lg={12} md={12} sm={12} xs={12} sx={{ display: 'flex', justifyContent: "center", alignItems: "center", }} item>
                <Stack alignItems="center" direction="row" spacing={1}>
                  <MapPinLine color={theme.palette.onPrimary.main} size={24} />
                  <Typography
                    sx={{
                      color: (theme) => theme.palette.onPrimary.main,
                      fontSize: 12,
                    }}
                  >
                    Cametá/PA
                  </Typography>
                </Stack>
              </Grid>

              <Grid lg={12} md={12} sm={12} xs={12} sx={{ display: 'flex', justifyContent: "center", alignItems: "center", }} item>
                <Stack alignItems="center" direction="row" spacing={1}>
                  <Calendar color={theme.palette.onPrimary.main} size={24} />
                  <Typography
                    sx={{
                      color: (theme) => theme.palette.onPrimary.main,
                      fontSize: 12,
                    }}
                  >
                    12 de dezembro
                  </Typography>
                </Stack>
              </Grid>
            </Box>
          </Grid>
          <Grid lg={4} md={6} sm={6} xs={6} item>
            <Typography
              sx={{
                zIndex: 0,
                position: "absolute",
                // width: 600,
                height: { lg: 200, md: 200, sm: 70, xs: 60 },
                left: { lg: 52, md: 52, sm: 40, xs: 20 },
                top: -100,
                borderLeft: "4px solid #fff",
                // transform: rotate 90deg,
                transform: "translateY(100px)",
              }}
            >

            </Typography>
            <Typography sx={{
              zIndex: 0,
              position: "absolute",
              width: { lg: 650, md: 650, sm: 420, xs: 260 },
              height: 200,
              left: 0,
              top: { lg: -80, md: -80, sm: -220, xs: -230 },
              borderBottom: "4px solid #fff",
              // transform: rotate 90deg,
              transform: "translateY(100px)",
            }}>

            </Typography>
          </Grid>
        </Grid>
      </Grid >
    </Card >
  );
};
