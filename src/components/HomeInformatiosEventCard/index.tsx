import { Box, Button, Card, CardContent, CardMedia, Grid, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { UsersFour } from "phosphor-react";
export const HomeInformatiosEventCard = () => {
  const theme = useTheme();
  const matchUpMD = useMediaQuery(theme.breakpoints.up('sm'));
  return (
    <Card
      elevation={0}
      sx={{
        boxShadow: "1px 1px 16px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(22.5px)",
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: (theme) => theme.palette.primaryContainer.main,
      }}
    >
      <Grid container>
        <Grid
          lg={6}
          md={6}
          sm={6}
          xs={12}
          item
          sx={{
            display: 'flex', alignItems: 'center',
            position: 'relative',
            backgroundColor: !matchUpMD ? theme.palette.primaryContainer.dark : 'transparent',
          }}
        >
          <CardContent
            sx={{ zIndex: 2 }}
          >
            <Grid container>
              <Grid
                lg={12}
                md={12}
                sm={12}
                xs={12}
                item
              >
                <Typography
                  fontWeight='bold'
                  sx={{
                    color: (theme) => theme.palette.text.primary,
                    fontSize: matchUpMD ? 32 : 24,
                  }}
                >
                  Seus eventos muito bem gerenciados
                </Typography>
              </Grid>
            </Grid>
            <Grid
              spacing={2}
              mt={2}
              container>
              <Grid
                lg={12}
                md={12}
                sm={12}
                xs={12}
                item>
                <Stack
                  alignItems='center'
                  direction='row'
                  spacing={2}
                >
                  <Typography
                    fontWeight='bold'
                    sx={{
                      color: (theme) => theme.palette.text.primary,
                      fontSize: matchUpMD ? 18 : 16,
                    }}
                  >
                    Simples e acessível
                  </Typography>
                </Stack>
              </Grid>


            </Grid>
          </CardContent>

          {matchUpMD && <Box
            sx={{
              width: '100%',
              height: '100%',
              backgroundColor: (theme) => theme.palette.primaryContainer.dark,
              position: 'absolute',
              clipPath: 'polygon(0 0, 100% 0, 86% 100%, 0% 100%)',
              zIndex: 1
            }}
          />}
        </Grid>
        <Grid
          lg={6}
          md={6}
          sm={6}
          xs={12}
          item
          sx={{
            display: 'flex', alignItems: 'center',
          }}
        >
          <CardContent>
            <Grid container>
              <Grid
                sx={{
                  textAlign: 'center',

                }}
                item>
                <Typography
                  fontWeight='bold'
                  sx={{
                    textAlign: 'center',
                    color: (theme) => theme.palette.text.primary,
                    fontSize: 24,
                  }}
                >
                  Depoimentos
                </Typography>
              </Grid>
            </Grid>
            <Grid
              spacing={2}
              mt={2}
              container>
              <Grid
                lg={12}
                md={12}
                sm={12}
                xs={12}
                item>
                <Stack
                  alignItems='center'
                  direction='row'
                  spacing={2}
                >
                  <UsersFour size={32} />
                  <Typography
                    sx={{
                      color: (theme) => theme.palette.primary.main,
                      fontSize: 16,
                      fontWeight: 'bold'
                    }}
                  >
                    Natanel G. Wanzeler
                  </Typography>
                </Stack>
              </Grid>

              <Grid
                lg={12}
                md={12}
                sm={12}
                xs={12}
                item>
                <Stack
                  alignItems='center'
                  direction='row'
                >
                  <Typography
                    sx={{
                      color: '#000',
                      fontSize: 16,
                      ml: 8,
                      textAlign: 'justify',
                    }}
                  >
                    Hoje, qualquer estabelecimento pode ser avaliado na web,
                    por meios de reviews, e ser classificado como bom, mediano ou ruim
                  </Typography>
                </Stack>
              </Grid>

              <Grid
                lg={6}
                md={6}
                sm={6}
                xs={12}
                item>
                <Button
                  variant='contained'
                  color='secondary'
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
}