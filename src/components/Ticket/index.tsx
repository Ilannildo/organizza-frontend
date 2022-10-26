import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { ArrowDown, CaretDown } from "phosphor-react";

import BarCodeImg from "../../assets/barcode.png";

export const Ticket = () => {
  return (
    <Card
      sx={{
        width: "100%",
        background: (theme) => theme.palette.background.default,
        boxShadow: "1px 1px 16px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(22.5px)",
        pb: 0,
      }}
      variant="elevation"
      elevation={0}
    >
      <CardContent
        sx={{
          pt: 3,
          px: 4,
        }}
      >
        <Grid container spacing={2}>
          <Grid item lg={10}>
            <Grid container spacing={2}>
              <Grid item lg={12}>
                <TextField
                  id="ticket-name"
                  label="Nome do ingresso"
                  variant="outlined"
                  size="small"
                  fullWidth
                  color="primary"
                />
              </Grid>
              <Grid item lg={12}>
                <Grid container spacing={2}>
                  <Grid item lg={6}>
                    <TextField
                      id="ticket-name"
                      label="Quantidade"
                      type="number"
                      variant="outlined"
                      size="small"
                      fullWidth
                      color="primary"
                    />
                  </Grid>
                  <Grid item lg={6}>
                    <TextField
                      id="ticket-name"
                      label="Valor"
                      variant="outlined"
                      size="small"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">R$</InputAdornment>
                        ),
                      }}
                      fullWidth
                      color="primary"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item lg={12}>
                <Grid container spacing={2}>
                  <Grid item lg={6}>
                    <FormControlLabel
                      control={<Checkbox />}
                      label={
                        <Typography
                          sx={{
                            color: (theme) => theme.palette.text.primary,
                            fontSize: 14,
                          }}
                        >
                          Repassar taxas ao participantes
                        </Typography>
                      }
                    />
                  </Grid>
                  <Grid
                    item
                    lg={6}
                    alignItems="flex-end"
                    display="flex"
                    flexDirection="column"
                  >
                    <Typography
                      mb={1}
                      sx={{
                        color: (theme) => theme.palette.text.primary,
                        fontSize: 14,
                      }}
                    >
                      Valor do ingresso: R$ 0,00
                    </Typography>
                    <Typography
                      sx={{
                        color: (theme) => theme.palette.text.primary,
                        fontSize: 14,
                      }}
                    >
                      Você recebe: R$ 0,00
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item lg={12}>
                <Button size="small" endIcon={<CaretDown />}>
                  Opções avançadas
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            lg={2}
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            position="relative"
          >
            <Box
              sx={{
                position: "absolute",
                left: "16%",
                backgroundImage: `url(
                  "data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23333' stroke-width='4' stroke-dasharray='6%2c 50' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e"
                )`,
                width: "2px",
                height: "80%",
              }}
            />

            <Typography
              sx={{
                transform: "rotate(-180deg)",
                // textOrientation: 'upright',
                writingMode: "vertical-lr",
                color: (theme) => theme.palette.text.primary,
                fontSize: 14,
              }}
            >
              Ingresso pago
            </Typography>
            <img src={BarCodeImg} alt="barcode" />
          </Grid>
          <Grid item lg={12}>
            <Button size="small" endIcon={<CaretDown />}>
              Opções avançadas
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
