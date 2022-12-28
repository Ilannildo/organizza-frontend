import {
  Button,
  Card,
  CardContent,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Radio,
  Typography,
} from "@mui/material";

const CheckoutPaymentMethod = () => {
  return (
    <Grid container sx={{ py: 3, px: 1 }}>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Grid container spacing={2}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Typography
              fontSize={14}
              sx={{
                color: (theme) => theme.palette.onPrimaryContainer.main,
                fontWeight: 500,
              }}
            >
              Dados do participante
            </Typography>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Grid container>
                  <Grid item lg={4} md={4} xs={12}>
                    <Typography
                      fontSize={12}
                      sx={{
                        color: (theme) => theme.palette.text.disabled,
                      }}
                    >
                      Nome
                    </Typography>
                    <Typography
                      fontSize={16}
                      sx={{
                        color: (theme) => theme.palette.onPrimaryContainer.main,
                      }}
                    >
                      Ilannildo Viana da Cruz
                    </Typography>
                  </Grid>
                  <Grid item lg={4} md={4} xs={12}>
                    <Typography
                      fontSize={12}
                      sx={{
                        color: (theme) => theme.palette.text.disabled,
                      }}
                    >
                      Email
                    </Typography>
                    <Typography
                      fontSize={16}
                      sx={{
                        color: (theme) => theme.palette.onPrimaryContainer.main,
                      }}
                    >
                      ilannildoviana12@gmail.com
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    lg={4}
                    md={4}
                    xs={12}
                    justifyContent="flex-end"
                    alignItems="center"
                    display="flex"
                  >
                    <Button>Alterar</Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Grid container spacing={2}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Typography
                  fontSize={18}
                  sx={{
                    color: (theme) => theme.palette.onPrimaryContainer.main,
                    fontWeight: 500,
                  }}
                >
                  Escolha a forma de pagamento
                </Typography>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <List>
                  <Grid container spacing={2}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Card variant="outlined">
                        <ListItemButton
                          sx={{
                            borderWidth: 1,
                          }}
                        >
                          <ListItemIcon>
                            <Radio
                              edge="start"
                              checked
                              disableRipple
                              tabIndex={-1}
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary="Cartão de crédito"
                            secondary="Pague em até 12x sem juros"
                          />
                        </ListItemButton>
                      </Card>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Card variant="outlined">
                        <ListItemButton
                          sx={{
                            borderWidth: 1,
                          }}
                        >
                          <ListItemIcon>
                            <Radio edge="start" disableRipple tabIndex={-1} />
                          </ListItemIcon>
                          <ListItemText
                            primary="Pix"
                            secondary="Aprovação imediata"
                          />
                        </ListItemButton>
                      </Card>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Card variant="outlined">
                        <ListItemButton
                          sx={{
                            borderWidth: 1,
                          }}
                        >
                          <ListItemIcon>
                            <Radio edge="start" disableRipple tabIndex={-1} />
                          </ListItemIcon>
                          <ListItemText
                            primary="Boleto"
                            secondary="Será aprovado em 1 ou 2 dias"
                          />
                        </ListItemButton>
                      </Card>
                    </Grid>
                  </Grid>
                </List>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Grid
                  container
                  justifyContent="flex-end"
                  alignItems="center"
                  display="flex"
                >
                  <Grid item lg={3} md={4} sm={6} xs={12}>
                    <Button variant="contained" fullWidth>
                      Continuar
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CheckoutPaymentMethod;
