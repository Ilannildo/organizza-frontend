import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { differenceInDays } from "date-fns";
import { useEffect, useState } from "react";
import { ISessionDatesForm } from "../../../../../../models/sessionDate";
import { ITicketPriceType } from "../../../../../../models/ticket";
import { useEventById } from "../../../../../../stores/event";
import { useCreateEventSession } from "../../../../../../stores/session";
import { useTicketPriceType } from "../../../../../../stores/ticket";
import { removeCurrencyMask } from "../../../../../../utils/masks";
import {
  calculateFee,
  getNumberInWords,
  getOrdinalNumberInWords,
} from "../../../../../../utils/roles";

interface ICreateSessionModal {
  sessionTypeId: string;
  eventId: string;
  type: string;
  open: boolean;
  onClose: () => void;
}

interface IDaysLong {
  label: string;
  value: number;
}

interface ISessionDaysLong {
  position: number;
  day: string;
}

interface ISessionDaysPosition {
  position: number;
  date: Date | null;
  start_time: Date | null;
  end_time: Date | null;
}

export const CreateSessionModal = ({
  sessionTypeId,
  eventId,
  type,
  open,
  onClose,
}: ICreateSessionModal) => {
  const [title, setTitle] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedTicketType, setSelectedTicketType] =
    useState<ITicketPriceType | null>(null);
  const [participantLimit, setParticipantLimit] = useState<number>(0);
  const [value, setValue] = useState<number>(0);
  const [amount, setAmount] = useState<string>("");
  const [place, setPlace] = useState<string>("");
  const [creditHour, setCreditHour] = useState<number>(0);
  const [sessionDates, setSessionDates] = useState<ISessionDaysPosition[]>([]);
  const [sessionDayLong, setSessionDayLong] = useState<ISessionDaysLong[]>([]);
  const [daysLongOptions, setDaysLongOptions] = useState<IDaysLong[]>([]);
  const [selectedSessionDayLong, setSelectedSessionDayLong] =
    useState<IDaysLong | null>(daysLongOptions[0]);

  const [titleError, setTitleError] = useState<string>(" ");
  const [summaryError, setSummaryError] = useState<string>(" ");
  const [startDateError, setStartDateError] = useState<string>(" ");
  const [participantLimitError, setParticipantLimitError] =
    useState<string>(" ");
  const [selectedTicketTypeError, setSelectedTicketTypeError] = useState(" ");
  const [valueError, setValueError] = useState<string>(" ");
  const [placeError, setPlaceError] = useState<string>(" ");
  const [creditHourError, setCreditHourError] = useState(" ");
  const [selectedSessionDayLongError, setSelectedSessionDayLongError] =
    useState(" ");

  const createEventSessionMutation = useCreateEventSession();
  const { data: event, isLoading: isLoadingEvent } = useEventById(eventId);

  const hasSubmitDisable =
    title === "" ||
    summary === "" ||
    participantLimit === 0 ||
    !selectedTicketType ||
    (!selectedTicketType.is_free && value <= 0) ||
    !startDate ||
    !endDate ||
    place === "" ||
    createEventSessionMutation.isLoading;

  const { data: ticketPriceTypes, isLoading: isLoadingTicketPriceTypes } =
    useTicketPriceType();

  const handleSubmit = async () => {
    const dates: ISessionDatesForm[] = [];
    for (const sessionDate of sessionDates) {
      if (sessionDate.date && sessionDate.start_time && sessionDate.end_time) {
        const startDate = new Date(
          sessionDate.date.getFullYear(),
          sessionDate.date.getMonth(),
          sessionDate.date.getDate(),
          sessionDate.start_time.getHours(),
          sessionDate.start_time.getMinutes(),
          sessionDate.start_time.getSeconds()
        );
        const endDate = new Date(
          sessionDate.date.getFullYear(),
          sessionDate.date.getMonth(),
          sessionDate.date.getDate(),
          sessionDate.end_time.getHours(),
          sessionDate.end_time.getMinutes(),
          sessionDate.end_time.getSeconds()
        );

        dates.push({
          date: startDate,
          position: sessionDate.position,
          type: "start",
        });
        dates.push({
          date: endDate,
          position: sessionDate.position,
          type: "end",
        });
      } else {
        return setStartDateError("Você precisa preencher todas datas e horas");
      }
    }

    createEventSessionMutation.mutate({
      session: {
        end_date: null,
        event_id: eventId,
        participant_limit: participantLimit,
        place,
        session_type_id: sessionTypeId,
        start_date: null,
        summary,
        ticket_price_type_id: selectedTicketType?.id,
        title,
        value,
        credit_hour: creditHour,
        dates,
      },
    });
  };

  const onChangeTitle = (value: string) => {
    setTitle(value);
    setTitleError(" ");

    if (value === "") {
      return setTitleError("O título é obrigatório");
    }
  };

  const onChangeSummary = (value: string) => {
    setSummary(value);
    setSummaryError(" ");

    if (value === "") {
      return setSummaryError("A descrição/resumo é obrigatório");
    }
  };

  const onChangeDate = (value: Date | null, position: number) => {
    setStartDate(value);
    setStartDateError(" ");

    if (!value) {
      return setStartDateError("A date de início é obrigatório");
    }

    const dayAlreadyExistsIndex = sessionDates.findIndex(
      (day) => day.position === position
    );

    if (dayAlreadyExistsIndex < 0) {
      return setStartDateError("A date de início é obrigatório");
    }

    const tempSessionDates = [...sessionDates];
    tempSessionDates[dayAlreadyExistsIndex].date = value;
    setSessionDates(tempSessionDates);
  };

  const onChangeEndTime = (value: Date | null, position: number) => {
    setEndDate(value);

    const dayAlreadyExistsIndex = sessionDates.findIndex(
      (day) => day.position === position
    );

    if (dayAlreadyExistsIndex < 0) {
      return setStartDateError("A data é obrigatório");
    }

    const tempSessionDates = [...sessionDates];
    tempSessionDates[dayAlreadyExistsIndex].end_time = value;
    setSessionDates(tempSessionDates);
  };

  const onChangeStartTime = (value: Date | null, position: number) => {
    setEndDate(value);

    const dayAlreadyExistsIndex = sessionDates.findIndex(
      (day) => day.position === position
    );

    if (dayAlreadyExistsIndex < 0) {
      return setStartDateError("A data é obrigatório");
    }

    const tempSessionDates = [...sessionDates];
    tempSessionDates[dayAlreadyExistsIndex].start_time = value;
    setSessionDates(tempSessionDates);
  };

  const onChangeTicketType = (value: ITicketPriceType | null) => {
    setSelectedTicketType(value);
    setSelectedTicketTypeError(" ");

    if (!value) {
      return setSelectedTicketTypeError("O tipo de inscrição é obrigatório");
    }

    if (value.is_free) {
      setValue(0);
      setAmount("0");
    }

    if (!value.is_free) {
      setValue(value.quote ? value.quote.min_base_value : 3);
    }
  };

  const onChangeParticipantLimit = (value: string) => {
    setParticipantLimit(parseInt(value));
    setParticipantLimitError(" ");

    if (!value) {
      return setParticipantLimitError("O limite de vagas é obrigatório");
    }
  };

  const onChangeValue = (value: string) => {
    if (!selectedTicketType) {
      return setSelectedTicketTypeError("Selecione o tipo de inscrição");
    }

    if (selectedTicketType && selectedTicketType.quote) {
      setValue(
        value
          ? parseFloat(removeCurrencyMask(value)) <
            selectedTicketType.quote.min_base_value
            ? selectedTicketType.quote.min_base_value
            : parseFloat(removeCurrencyMask(value))
          : selectedTicketType.quote.min_base_value
      );
      setAmount(
        value
          .replace(/\D/g, "")
          .replace(/(\d)(\d{2})$/, "$1,$2")
          .replace(/(?=(\d{3})+(\D))\B/g, "")
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
      );
      setValueError(" ");

      if (!value) {
        setValueError("O valor é obrigatório");
      }
    }
  };

  const onChangePlace = (value: string) => {
    setPlace(value);
    setPlaceError(" ");

    if (!value) {
      setPlaceError("O local é obrigatório");
    }
  };

  const onChangeCreditHour = (value: string) => {
    setCreditHour(parseInt(value));
    setCreditHourError(" ");
  };

  const onChangeSessionDays = (value: IDaysLong | null) => {
    setSelectedSessionDayLong(value);
    setSelectedSessionDayLongError(" ");

    if (!value) {
      setSelectedSessionDayLongError("A duração da atividade é obrigatório");
      setSessionDayLong([]);
    }

    if (value) {
      const days: ISessionDaysLong[] = [];
      const sessionDays: ISessionDaysPosition[] = [];
      for (let index = 0; index < value.value; index++) {
        days.push({
          day: index > 0 ? `${index + 1} dias` : `${index + 1} dia`,
          position: index + 1,
        });

        const exists = sessionDates.find((day) => day.position === index + 1);

        if (!exists) {
          sessionDays.push({
            date: null,
            position: index + 1,
            end_time: null,
            start_time: null,
          });
        } else {
          sessionDays.push({
            date: exists.date,
            position: exists.position,
            end_time: exists.end_time,
            start_time: exists.start_time,
          });
        }
      }
      setSessionDayLong(days);
      setSessionDates(sessionDays);
    }
  };

  useEffect(() => {
    if (createEventSessionMutation.isSuccess) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createEventSessionMutation]);

  useEffect(() => {
    if (event) {
      const startDate = new Date(event.start_date);
      const endDate = new Date(event.end_date);

      const differenceOfDays = differenceInDays(endDate, startDate);
      const days: IDaysLong[] = [];
      for (let index = 0; index < differenceOfDays; index++) {
        days.push({
          label:
            index > 0
              ? `${getNumberInWords(index + 1)} dias`
              : `${getNumberInWords(index + 1)} dia`,
          value: index + 1,
        });
      }
      setDaysLongOptions(days);
    }
  }, [event]);

  return (
    <Dialog open={open} maxWidth="md">
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.primary.main,
          textAlign: "center",
          py: 2,
        }}
      >
        <Typography
          sx={{
            color: (theme) => theme.palette.onPrimary.main,
            fontSize: 18,
            fontWeight: 500,
          }}
        >
          Adicionar nova atividade: {type}
        </Typography>
      </Box>
      <DialogContent>
        <Grid container spacing={2} mb={2}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <TextField
              id="title"
              label="Título"
              variant="outlined"
              required
              size="small"
              fullWidth
              color="primary"
              onChange={(e) => onChangeTitle(e.target.value)}
              value={title}
              error={titleError !== " "}
              helperText={titleError}
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <TextField
              id="summary"
              label="Descrição/resumo"
              variant="outlined"
              required
              size="small"
              fullWidth
              color="primary"
              multiline
              rows={2}
              onChange={(e) => onChangeSummary(e.target.value)}
              value={summary}
              error={summaryError !== " "}
              helperText={summaryError}
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Autocomplete
              id="duration-session"
              options={daysLongOptions}
              getOptionLabel={(value) => value.label}
              isOptionEqualToValue={(value) =>
                value.value === selectedSessionDayLong?.value
              }
              loading={isLoadingEvent}
              onChange={(event, newValue) => {
                onChangeSessionDays(newValue);
              }}
              value={selectedSessionDayLong || null}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Duração"
                  variant="outlined"
                  size="small"
                  required
                  fullWidth
                  error={selectedSessionDayLongError !== " "}
                  helperText={selectedSessionDayLongError}
                />
              )}
            />
          </Grid>
          {sessionDayLong.length > 0 && (
            <Grid item lg={12} md={12} xs={12}>
              <Box
                sx={{
                  backgroundColor: "rgba(221,227,234,0.4)",
                  px: 2,
                  borderRadius: 1,
                }}
              >
                {sessionDayLong.map((day) => (
                  <Grid key={day.position} container spacing={2}>
                    <Grid item lg={12} md={12} xs={12} mt={1}>
                      <Typography
                        sx={{
                          fontSize: 12,
                          fontWeight: 500,
                        }}
                      >
                        {getOrdinalNumberInWords(day.position)} dia
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={6} xs={12}>
                      <DatePicker
                        label="Data"
                        value={
                          sessionDates.find(
                            (sessionDay) => sessionDay.position === day.position
                          )?.date || null
                        }
                        onChange={(newValue) => {
                          onChangeDate(newValue, day.position);
                        }}
                        minDate={new Date()}
                        disablePast
                        maxDate={event?.end_date}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            size="small"
                            required
                            fullWidth
                            error={startDateError !== " "}
                            helperText={startDateError}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item lg={3} md={3} xs={6}>
                      <TimePicker
                        label="Hora de início"
                        value={
                          sessionDates.find(
                            (sessionDay) => sessionDay.position === day.position
                          )?.start_time || null
                        }
                        onChange={(newValue) => {
                          onChangeStartTime(newValue, day.position);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            size="small"
                            required
                            fullWidth
                          />
                        )}
                      />
                    </Grid>
                    <Grid item lg={3} md={3} xs={6}>
                      <TimePicker
                        label="Hora de término"
                        value={
                          sessionDates.find(
                            (sessionDay) => sessionDay.position === day.position
                          )?.end_time || null
                        }
                        onChange={(newValue) => {
                          onChangeEndTime(newValue, day.position);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            size="small"
                            fullWidth
                            required
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                ))}
              </Box>
            </Grid>
          )}
        </Grid>

        <Divider variant="fullWidth" />

        <Grid container spacing={2} mt={2}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Autocomplete
              id="ticket"
              options={ticketPriceTypes !== undefined ? ticketPriceTypes : []}
              getOptionLabel={(value) => value.title}
              loading={isLoadingTicketPriceTypes}
              onChange={(event, newValue) => {
                onChangeTicketType(newValue);
              }}
              value={selectedTicketType || null}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Inscrição"
                  variant="outlined"
                  size="small"
                  fullWidth
                  error={selectedTicketTypeError !== " "}
                  helperText={selectedTicketTypeError}
                />
              )}
            />
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              id="ticket-name"
              label="Limite de vagas"
              variant="outlined"
              required
              size="small"
              type="number"
              fullWidth
              color="primary"
              value={participantLimit}
              onChange={(e) => onChangeParticipantLimit(e.target.value)}
              error={participantLimitError !== " "}
              helperText={participantLimitError}
            />
          </Grid>

          {selectedTicketType && !selectedTicketType.is_free && (
            <>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextField
                  id="ticket-amont"
                  label="Valor"
                  variant="outlined"
                  required
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">R$</InputAdornment>
                    ),
                  }}
                  value={amount}
                  fullWidth
                  color="primary"
                  placeholder="0,00"
                  onChange={(e) => onChangeValue(e.target.value)}
                  error={valueError !== " "}
                  helperText={valueError}
                />
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
                <TextField
                  id="ticket-value"
                  label="Você recebe"
                  variant="outlined"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">R$</InputAdornment>
                    ),
                  }}
                  value={
                    value -
                    calculateFee({
                      ticket_price_type: selectedTicketType,
                      value,
                    })
                  }
                  fullWidth
                  color="primary"
                  placeholder="0,00"
                  disabled={true}
                />
              </Grid>
            </>
          )}

          <Grid item lg={10} md={10} xs={12}>
            <TextField
              id="place"
              label="Local"
              variant="outlined"
              size="small"
              value={place}
              fullWidth
              color="primary"
              onChange={(e) => onChangePlace(e.target.value)}
              error={placeError !== " "}
              helperText={
                placeError !== " " ? placeError : "Dica: Audtiório, sala, etc."
              }
            />
          </Grid>

          <Grid item lg={2} md={2} sm={12} xs={12}>
            <TextField
              id="ticket-name"
              label="Carga horária"
              variant="outlined"
              size="small"
              type="number"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">horas</InputAdornment>
                ),
              }}
              color="primary"
              value={creditHour}
              onChange={(e) => onChangeCreditHour(e.target.value)}
              error={creditHourError !== " "}
              helperText={creditHourError}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions
        sx={{
          p: 2,
        }}
      >
        <Button
          variant="outlined"
          size="small"
          onClick={() => onClose()}
          disabled={createEventSessionMutation.isLoading}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          disableElevation
          disabled={hasSubmitDisable}
          size="small"
          onClick={() => handleSubmit()}
        >
          {createEventSessionMutation.isLoading ? (
            <CircularProgress color="inherit" size={24} />
          ) : (
            `Salvar atividade`
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
