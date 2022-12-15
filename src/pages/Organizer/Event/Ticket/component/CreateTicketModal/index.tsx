import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Ticket } from "../../../../../../components/Ticket";
import { ITicketPriceType } from "../../../../../../models/ticket";

interface ICreateTicketModal {
  type: ITicketPriceType;
  open: boolean;
  onClose: () => void;
}

export const CreateTicketModal = ({
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

  const handleGenerateTicketCodeRef = async () => {
    setTicketCodeRef("b4ef2ec9-f4ae-43a4-b492-846b9aceb0c4");
  };

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
        <Button variant="outlined" size="small" onClick={() => onClose()}>
          Cancelar
        </Button>
        <Button
          variant="contained"
          disableElevation
          size="small"
          onClick={() => {}}
        >
          Salvar ingresso
        </Button>
      </DialogActions>
    </Dialog>
  );
};
