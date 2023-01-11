import { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { CaretDown, Info } from "phosphor-react";
import Barcode from "react-barcode";

import { currencyMask, removeCurrencyMask } from "../../utils/masks";
import { ITicketPriceType } from "../../models/ticket";

interface ITicket {
  categoryTitle: string;
  setCategoryTitle: (value: string) => void;
  ticketCodeRef: string;
  includeFee: boolean;
  setIncludeFee: (value: boolean) => void;
  participantLimit: number;
  setParticipantLimit: (value: number) => void;
  description: string;
  setDescription: (value: string) => void;
  value: number;
  setValue: (value: number) => void;
  startDate: Date | null;
  setStartDate: (value: Date | null) => void;
  dueDate: Date | null;
  setDueDate: (value: Date | null) => void;
  ticket_price_type: ITicketPriceType;
  categoryTitleError: string;
  participantLimitError: string;
  valueError: string;
  startDateError: string;
  dueDateError: string;
  setCategoryTitleError: (value: string) => void;
  setParticipantLimitError: (value: string) => void;
  setValueError: (value: string) => void;
  setStartDateError: (value: string) => void;
  setDueDateError: (value: string) => void;
}

export const Ticket = ({
  categoryTitle,
  ticketCodeRef,
  setCategoryTitle,
  includeFee,
  setIncludeFee,
  participantLimit,
  setParticipantLimit,
  description,
  setDescription,
  value,
  setValue,
  startDate,
  setStartDate,
  dueDate,
  setDueDate,
  ticket_price_type,
  categoryTitleError,
  participantLimitError,
  valueError,
  startDateError,
  dueDateError,
  setCategoryTitleError,
  setParticipantLimitError,
  setValueError,
  setStartDateError,
  setDueDateError,
}: ITicket) => {
  const theme = useTheme();
  const [amount, setAmount] = useState<string>("");

  let ticketValue = value;
  let ticketValueReceived = 0;
  let fee = 0;
  // verificar se o ingresso é gratuito
  // verificar se a taxa é repassada para o participante
  if (!ticket_price_type.is_free && ticket_price_type.quote) {
    // recebe o valor mínimo
    fee = ticket_price_type.quote.min_base_value;
    // calcular a taxa
    if (value >= ticket_price_type.quote.min_value) {
      fee = value * ticket_price_type.quote.percentage;
    } else {
      console.log("Valor mínimo é R$ 2,50");
    }

    // calcular o valor do ingresso
    // calcular o valor a receber por ingresso
    if (includeFee) {
      ticketValue = value + fee;
      ticketValueReceived = value;
    } else {
      ticketValue = value;
      ticketValueReceived = value > 0 ? value - fee : value;
    }
  }

  return (
    <Box
      sx={{
        width: "100%",
        background: (theme) => theme.palette.background.default,
        borderColor: (theme) => theme.palette.surfaceVariant.main,
        borderWidth: 1,
        borderRadius: 1,
        px: 2,
        py: 1,
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
                required
                size="small"
                fullWidth
                color="primary"
                onChange={(e) => setCategoryTitle(e.target.value)}
                value={categoryTitle}
                onBlur={() => setCategoryTitleError(" ")}
                error={categoryTitleError !== " "}
                helperText={categoryTitleError}
              />
            </Grid>
            <Grid item lg={12}>
              <Grid container spacing={2}>
                <Grid item lg={6}>
                  <TextField
                    id="ticket-name"
                    label="Quantidade"
                    type="number"
                    required
                    variant="outlined"
                    size="small"
                    fullWidth
                    color="primary"
                    onChange={(e) =>
                      setParticipantLimit(Number(e.target.value))
                    }
                    value={participantLimit}
                    onBlur={() => setParticipantLimitError(" ")}
                    error={participantLimitError !== " "}
                    helperText={participantLimitError}
                  />
                </Grid>
                <Grid item lg={6}>
                  <TextField
                    id="ticket-name"
                    label="Valor"
                    variant="outlined"
                    required
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">R$</InputAdornment>
                      ),
                    }}
                    fullWidth
                    color="primary"
                    placeholder="0,00"
                    disabled={ticket_price_type.is_free}
                    onChange={(e) => {
                      setValue(parseFloat(removeCurrencyMask(e.target.value)));
                      setAmount(
                        e.target.value
                          .replace(/\D/g, "")
                          .replace(/(\d)(\d{2})$/, "$1,$2")
                          .replace(/(?=(\d{3})+(\D))\B/g, "")
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
                      );
                    }}
                    value={ticket_price_type.is_free ? "0,00" : amount}
                    onBlur={() => setValueError(" ")}
                    error={valueError !== " "}
                    helperText={valueError}
                  />
                </Grid>
              </Grid>
            </Grid>
            {!ticket_price_type.is_free && (
              <Grid item lg={12}>
                <Grid container spacing={2}>
                  <Grid item lg={7}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={(e, value) => setIncludeFee(value)}
                          checked={includeFee}
                        />
                      }
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
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Tooltip title={`Taxa: R$ ${currencyMask(fee)}`}>
                        <Info />
                      </Tooltip>
                      <Typography
                        sx={{
                          color: (theme) => theme.palette.text.primary,
                          fontSize: 12,
                        }}
                      >
                        Valor do ingresso: R$ {currencyMask(ticketValue)}
                      </Typography>
                    </Stack>

                    <Typography
                      sx={{
                        color: (theme) => theme.palette.text.primary,
                        fontSize: 12,
                      }}
                    >
                      Você recebe: R$ {currencyMask(ticketValueReceived)}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            )}
            <Grid item lg={12}>
              <Accordion
                variant="elevation"
                elevation={0}
                defaultExpanded={true}
              >
                <AccordionSummary
                  sx={{ px: 0 }}
                  centerRipple={false}
                  expandIcon={<CaretDown />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  Opções avançadas
                </AccordionSummary>
                <AccordionDetails sx={{ px: 0 }}>
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
                          <DateTimePicker
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
                                required
                                fullWidth
                                onBlur={() => setStartDateError(" ")}
                                error={startDateError !== " "}
                                helperText={startDateError}
                              />
                            )}
                          />
                        </Grid>
                        <Grid item lg={6} md={6} xs={12}>
                          <DateTimePicker
                            label="Data de término das vendas"
                            value={dueDate}
                            onChange={(newValue) => {
                              setDueDate(newValue);
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                variant="outlined"
                                size="small"
                                fullWidth
                                required
                                onBlur={() => setDueDateError(" ")}
                                error={dueDateError !== " "}
                                helperText={dueDateError}
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
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
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
              writingMode: "vertical-lr",
              color: (theme) => theme.palette.text.primary,
              fontSize: 14,
            }}
          >
            Ingresso {ticket_price_type.title.toLowerCase()}
          </Typography>
          <div
            style={{
              display: "inline-block",
              transform: "rotate(270deg)",
              position: "absolute",
            }}
          >
            <Barcode
              value={ticketCodeRef}
              background={theme.palette.background.default}
              width={1}
              height={50}
              fontSize={12}
              displayValue={false}
            />
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};
