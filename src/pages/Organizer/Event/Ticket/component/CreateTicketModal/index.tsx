import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Ticket } from "../../../../../../components/Ticket";
import { ITicketPriceType } from "../../../../../../models/ticket";
import { useCreateEventTicket } from "../../../../../../stores/ticket";

interface ICreateTicketModal {
  eventId: string;
  type: ITicketPriceType;
  open: boolean;
  onClose: () => void;
}

export const CreateTicketModal = ({
  eventId,
  type,
  open,
  onClose,
}: ICreateTicketModal) => {
  const [categoryTitle, setCategoryTitle] = useState<string>("");
  const [ticketCodeRef, setTicketCodeRef] = useState<string>("");
  const [includeFee, setIncludeFee] = useState<boolean>(false);
  const [participantLimit, setParticipantLimit] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [value, setValue] = useState<number>(0);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [dueTime, setDueTime] = useState<Date | null>(null);

  const [categoryTitleError, setCategoryTitleError] = useState<string>(" ");
  const [participantLimitError, setParticipantLimitError] =
    useState<string>(" ");
  const [valueError, setValueError] = useState<string>(" ");
  const [startDateError, setStartDateError] = useState<string>(" ");
  const [startTimeError, setStartTimeError] = useState<string>(" ");
  const [dueDateError, setDueDateError] = useState<string>(" ");
  const [dueTimeError, setDueTimeError] = useState<string>(" ");

  const createEventTicketMutation = useCreateEventTicket();

  const handleGenerateTicketCodeRef = async () => {
    setTicketCodeRef("COD-123");
  };

  const onValidateForm = () => {
    if (categoryTitle === "") {
      setCategoryTitleError("O nome é obrigatório");
      return false;
    }
    if (participantLimit === 0) {
      setParticipantLimitError("A quantidade é obrigatório");
      return false;
    }
    if (!type.is_free && value <= 0) {
      setValueError("O valor é obrigatório");
      return false;
    }
    if (!startDate) {
      setStartDateError("A data de início das vendas é obrigatório");
      return false;
    }
    if (startDate < new Date()) {
      setStartDateError("Data inválida. Escolha uma data futura");
      return false;
    }
    if (!startTime) {
      setStartTimeError("A hora de início das vendas é obrigatório");
      return false;
    }
    if (!dueDate) {
      setDueDateError("A data de término das vendas é obrigatório");
      return false;
    }
    if (dueDate < startDate) {
      setDueDateError(
        "Data inválida. Escolha uma data maior que a data de início"
      );
      return false;
    }
    if (!dueTime) {
      setDueTimeError("A hora de término das vendas é obrigatório");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    try {
      if (!onValidateForm()) {
        return;
      }
      createEventTicketMutation.mutate({
        ticket: {
          category_title: categoryTitle,
          start_date: startDate,
          start_time: startTime,
          description,
          due_date: dueDate,
          due_time: dueTime,
          event_id: eventId,
          include_fee: includeFee,
          participant_limit: participantLimit,
          ticket_price_type_id: type.id,
          value,
        },
      });
      console.log("LOG 1 - submit :::");
    } catch (error: any) {}
  };

  useEffect(() => {
    if(createEventTicketMutation.isSuccess) {
      onClose();
    }
  }, [createEventTicketMutation, onClose])

  useEffect(() => {
    handleGenerateTicketCodeRef();
  }, []);

  return (
    <Dialog open={open} maxWidth="md">
      <DialogTitle>Criar ingresso {type.title.toUpperCase()}</DialogTitle>
      <DialogContent>
        {ticketCodeRef !== "" ? (
          <Ticket
            categoryTitle={categoryTitle}
            ticketCodeRef={ticketCodeRef}
            setCategoryTitle={setCategoryTitle}
            includeFee={includeFee}
            setIncludeFee={setIncludeFee}
            participantLimit={participantLimit}
            setParticipantLimit={setParticipantLimit}
            description={description}
            setDescription={setDescription}
            value={value}
            setValue={setValue}
            startDate={startDate}
            setStartDate={setStartDate}
            startTime={startTime}
            setStartTime={setStartTime}
            dueDate={dueDate}
            setDueDate={setDueDate}
            dueTime={dueTime}
            setDueTime={setDueTime}
            ticket_price_type={type}
            categoryTitleError={categoryTitleError}
            participantLimitError={participantLimitError}
            valueError={valueError}
            startDateError={startDateError}
            startTimeError={startTimeError}
            dueDateError={dueDateError}
            dueTimeError={dueTimeError}
            setCategoryTitleError={setCategoryTitleError}
            setParticipantLimitError={setParticipantLimitError}
            setValueError={setValueError}
            setStartDateError={setStartDateError}
            setStartTimeError={setStartTimeError}
            setDueDateError={setDueDateError}
            setDueTimeError={setDueTimeError}
          />
        ) : (
          <Typography
            component="h1"
            variant="h3"
            sx={{
              fontWeight: 600,
              fontSize: 16,
            }}
          >
            Gerando um novo ingresso... Aguarde!
          </Typography>
        )}
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
          disabled={createEventTicketMutation.isLoading}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          disableElevation
          disabled={
            categoryTitle === "" ||
            participantLimit === 0 ||
            (!type.is_free && value <= 0) ||
            !startDate ||
            !dueDate ||
            !startTime ||
            !dueTime ||
            createEventTicketMutation.isLoading
          }
          size="small"
          onClick={() => handleSubmit()}
        >
          {createEventTicketMutation.isLoading ? (
            <CircularProgress color="inherit" size={24} />
          ) : (
            `Salvar ingresso`
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
