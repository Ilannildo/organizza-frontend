import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { CaretDown } from "phosphor-react";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { addDays } from "date-fns";

import BarCodeImg from "../../assets/barcode.png";
import { useState } from "react";



export const Ticket = () => {
  const [startDate, setStartDate] = useState<Date | null>(
    addDays(new Date(), 1)
  );
  const [startTime, setStartTime] = useState<Date | null>(null);

  return (
    <Box
      sx={{
        width: "100%",
        background: (theme) => theme.palette.background.default,
        boxShadow: "1px 1px 16px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(22.5px)",
        borderRadius: 1,
        px: 3,
        py: 2,
      }}
    >
      <Grid container spacing={2}>
        <Grid item lg={9}>
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
                <Grid item lg={7}>
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
                  lg={5}
                  alignItems="flex-end"
                  display="flex"
                  flexDirection="column"
                >
                  <Typography
                    mb={1}
                    sx={{
                      color: (theme) => theme.palette.text.primary,
                      fontSize: 12,
                    }}
                  >
                    Valor do ingresso: R$ 0,00
                  </Typography>
                  <Typography
                    sx={{
                      color: (theme) => theme.palette.text.primary,
                      fontSize: 12,
                    }}
                  >
                    Você recebe: R$ 0,00
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item lg={12}>
              <Accordion variant="elevation" elevation={0}>
                <AccordionSummary
                  centerRipple={false}
                  expandIcon={<CaretDown />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography
                    sx={{
                      color: (theme) => theme.palette.text.primary,
                      fontSize: 14,
                    }}
                  >
                    Opções avançadas
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    <Grid
                      item
                      lg={12}
                      md={12}
                      sm={12}
                      xs={12}
                      justifyContent="center"
                      display="flex"
                    >
                      <Grid container spacing={2}>
                        <Grid item lg={6} md={6} xs={12}>
                          <DatePicker
                            label="Data de início das vendas"
                            value={startDate}
                            onChange={(newValue) => {
                              setStartDate(newValue);
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                variant="outlined"
                                size="small"
                                fullWidth
                              />
                            )}
                          />
                        </Grid>
                        <Grid item lg={6} md={6} xs={12}>
                          <TimePicker
                            label="Hora de início das vendas"
                            value={startTime}
                            onChange={(newValue) => {
                              setStartTime(newValue);
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                variant="outlined"
                                size="small"
                                fullWidth
                              />
                            )}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      lg={12}
                      md={12}
                      sm={12}
                      xs={12}
                      justifyContent="center"
                      display="flex"
                    >
                      <Grid container spacing={2}>
                        <Grid item lg={6} md={6} xs={12}>
                          <DatePicker
                            label="Data de término das vendas"
                            value={startDate}
                            onChange={(newValue) => {
                              setStartDate(newValue);
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                variant="outlined"
                                size="small"
                                fullWidth
                              />
                            )}
                          />
                        </Grid>
                        <Grid item lg={6} md={6} xs={12}>
                          <TimePicker
                            label="Hora de término das vendas"
                            value={startTime}
                            onChange={(newValue) => {
                              setStartTime(newValue);
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                variant="outlined"
                                size="small"
                                fullWidth
                              />
                            )}
                          />
                        </Grid>
                        <Grid item lg={12} md={12} xs={12}>
                          <TextField
                            id="outlined-multiline-static"
                            label="Descrição do ingresso"
                            variant="outlined"
                            multiline
                            rows={4}
                            size="small"
                            fullWidth
                            color="primary"
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          lg={3}
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          position="relative"
        >
          <Box
            sx={{
              position: "absolute",
              left: "30%",
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
      </Grid>
    </Box>
  );
};
