import { Box, Button, Card, CardContent, CardMedia, Grid, Stack, Typography } from "@mui/material";
import { Calendar, MapPinLine, UsersFour } from "phosphor-react";
import Cover from '../../assets/images/cover.jpg';
export const HomeCategoryEventCard = () => {
    return (
        <Card
            elevation={0}
            sx={{
                backgroundColor: (theme) => theme.palette.background.default,
                boxShadow: "1px 1px 16px rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(22.5px)",
                // display: 'flex',
            }}
        >
            <Grid

                container>
                <Grid
                    position='relative'
                    lg={5}
                    md={6}
                    sm={12}
                    xs={12}
                    item

                >
                    <Box
                        height="100%"
                        width="100%"
                        sx={{
                            background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 57.29%, #000 70.83%)`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "contain, cover",
                            position: 'absolute',
                            display: "flex",
                            alignItems: "end",
                        }}
                    >
                        <Typography
                            fontWeight={600}
                            textAlign="center"
                            sx={{
                                color: (theme) => theme.palette.background.default,
                                fontSize: { md: 17, sm: 17, xs: 14 },
                                mx: 5,
                                my: 2,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: "3",
                                WebkitBoxOrient: "vertical",
                            }}
                        // noWrap
                        >
                            Mais uma noite como todas as anteriores.
                            Pego minha caneca de café cheia, acendo meu ultimo cigarro e corro pra velha janela do quarto.
                        </Typography>
                    </Box>
                    <CardMedia
                        component='img'
                        image={Cover}
                        alt=''
                    />

                </Grid>
                <Grid
                    lg={3}
                    md={6}
                    sm={12}
                    xs={12}
                    item
                    sx={{ display: 'flex', alignItems: 'center', }}
                >
                    <CardContent>
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
                                        color: (theme) => theme.palette.onSurfaceVariant.main,
                                        fontSize: 18,
                                        fontFamily: 'Poppins',
                                    }}
                                >
                                    III Congresso da computação no Baixo tocantins
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
                                            color: (theme) => theme.palette.onSurfaceVariant.main,
                                            fontSize: 16,
                                            fontFamily: 'Poppins',
                                        }}
                                    >
                                        Evento presencial
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
                                    spacing={2}
                                >
                                    <MapPinLine size={32} />
                                    <Typography
                                        sx={{
                                            color: (theme) => theme.palette.onSurfaceVariant.main,
                                            fontSize: 16,
                                            fontFamily: 'Poppins',
                                        }}
                                    >
                                        Cametá/PA - Rua Dos Parijos
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
                                    spacing={2}
                                >
                                    <Calendar size={32} />
                                    <Typography
                                        sx={{
                                            fontFamily: 'Poppins',
                                            color: (theme) => theme.palette.onSurfaceVariant.main,
                                            fontSize: 16,
                                        }}
                                    >
                                        12 de dezembro de 2022
                                    </Typography>
                                </Stack>
                            </Grid>


                            <Grid
                                lg={12}
                                md={12}
                                sm={12}
                                xs={12}
                                item>
                                <Button
                                    variant='contained'
                                    sx={{ backgroundColor: (theme) => theme.palette.tertiary.main }}
                                    disableElevation
                                    fullWidth
                                >
                                    SAIBA MAIS
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Grid>
            </Grid>
        </Card>
    );
}