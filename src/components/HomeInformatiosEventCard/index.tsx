import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { UsersFour } from "phosphor-react";
import { Carousel } from "react-responsive-carousel";
export const HomeInformatiosEventCard = () => {
  const theme = useTheme();
  const matchUpMD = useMediaQuery(theme.breakpoints.up("lg"));
  return (
    <Card
      elevation={0}
      sx={{
        boxShadow: "1px 1px 16px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(22.5px)",
        display: "flex",
        flexDirection: "row",
        backgroundColor: (theme) => theme.palette.primaryContainer.main,
      }}
    >
      <Grid container>
        <Grid
          lg={6}
          md={12}
          sm={12}
          xs={12}
          item
          sx={{
            display: "flex",
            justifyContent: "center",
            position: "relative",
            backgroundColor: !matchUpMD
              ? theme.palette.secondaryContainer.main
              : "transparent",
          }}
        >
          <CardContent sx={{ zIndex: 2 }}>
            <Grid container>
              <Grid lg={10} md={12} sm={12} xs={12} item>
                <Typography
                  fontWeight="bold"
                  sx={{
                    color: (theme) => theme.palette.onSurfaceVariant.main,
                    textAlign: matchUpMD ? "start" : "center",
                    fontSize: matchUpMD ? 32 : 24,
                  }}
                >
                  Seus eventos muito bem gerenciados
                </Typography>
              </Grid>
            </Grid>
            <Grid mt={2} container>
              <Grid lg={10} md={12} sm={12} xs={12} item>
                <Carousel
                  autoPlay={true}
                  interval={5000}
                  showArrows={false}
                  showStatus={false}
                  swipeable={true}
                  showThumbs={false}
                  infiniteLoop={true}
                  emulateTouch={true}
                  showIndicators={false}
                >
                  <Box>
                    <Typography
                      fontWeight="bold"
                      sx={{
                        pl: 4,
                        color: (theme) => theme.palette.onSurfaceVariant.main,
                        fontSize: matchUpMD ? 22 : 16,
                      }}
                    >
                      Simples e acessível
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "Poppins",
                        fontSize: matchUpMD ? 16 : 16,
                        color: (theme) => theme.palette.onSurfaceVariant.main,
                      }}
                    >
                      No organizza o criador do evento tem uma gama ferremantas
                      para auxiliá-lo durante a criação do seu evento, além
                      disso, a plataforma
                    </Typography>
                  </Box>

                  <Box>
                    <Typography
                      fontWeight="bold"
                      sx={{
                        pl: 4,
                        color: (theme) => theme.palette.onSurfaceVariant.main,
                        fontSize: matchUpMD ? 22 : 16,
                      }}
                    >
                      Simples e acessível
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "Poppins",
                        fontSize: matchUpMD ? 16 : 16,
                        color: (theme) => theme.palette.text.disabled,
                      }}
                    >
                      No organizza o criador do evento tem uma gama ferremantas
                      para auxiliá-lo durante a criação do seu evento, além
                      disso, a plataforma
                    </Typography>
                  </Box>
                </Carousel>
              </Grid>
            </Grid>
          </CardContent>

          {matchUpMD && (
            <Box
              sx={{
                width: "100%",
                height: "100%",
                backgroundColor: (theme) =>
                  theme.palette.secondaryContainer.main,
                position: "absolute",
                clipPath: "polygon(0 0, 100% 0, 86% 100%, 0% 100%)",
                zIndex: 1,
              }}
            />
          )}
        </Grid>
        <Grid
          lg={6}
          md={12}
          sm={12}
          xs={12}
          item
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <CardContent>
            <Grid container>
              <Grid
                sx={{
                  textAlign: "center",
                }}
                item
              >
                <Typography
                  fontWeight="bold"
                  sx={{
                    textAlign: "center",
                    color: (theme) => theme.palette.onSurfaceVariant.main,
                    fontSize: 24,
                  }}
                >
                  Depoimentos
                </Typography>
              </Grid>
            </Grid>
            <Grid spacing={2} mt={2} container>
              <Grid lg={12} md={12} sm={12} xs={12} item>
                <Stack alignItems="center" direction="row" spacing={2}>
                  <UsersFour size={32} />
                  <Typography
                    sx={{
                      color: (theme) => theme.palette.primary.main,
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    Natanel G. Wanzeler
                  </Typography>
                </Stack>
              </Grid>

              <Grid lg={12} md={12} sm={12} xs={12} item>
                <Stack alignItems="center" direction="row">
                  <Typography
                    sx={{
                      color: "#000",
                      fontSize: 16,
                      ml: 8,
                      textAlign: "justify",
                    }}
                  >
                    Hoje, qualquer estabelecimento pode ser avaliado na web, por
                    meios de reviews, e ser classificado como bom, mediano ou
                    ruim
                  </Typography>
                </Stack>
              </Grid>

              <Grid lg={6} md={6} sm={6} xs={12} item>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: (theme) => theme.palette.tertiary.main,
                  }}
                  disableElevation
                  fullWidth
                >
                  Ver MAIS
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};
