import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CreateCard } from "../../../../../components/CreateCard";

interface ICreateTicketModal {
  open: boolean;
  onClose: () => void;
}

export const SelectEventTypeModal = ({ open, onClose }: ICreateTicketModal) => {
  const navigate = useNavigate();

  const goToCreateEvent = (venue?: string, type?: string) => {
    let params;
    if (venue) {
      params = `?venue=${venue}`;
    }
    if (type) {
      params = `?type=${type}`;
    }

    onClose();
    return navigate(`/organizador/criar-evento${params}`);
    
  };

  return (
    <Dialog open={open} maxWidth="lg" onClose={onClose}>
      <DialogTitle textAlign="center">Escolha o tipo de evento</DialogTitle>
      <DialogContent>
        <Grid container mt={2} spacing={2}>
          <Grid item lg={3} md={4} sm={6} xs={12}>
            <CreateCard
              label="Evento online"
              color="primary"
              onClick={() => goToCreateEvent("online")}
            />
          </Grid>
          <Grid item lg={3} md={4} sm={6} xs={12}>
            <CreateCard
              label="Evento Presencial"
              color="secondary"
              onClick={() => goToCreateEvent("presential")}
            />
          </Grid>
          <Grid item lg={3} md={4} sm={6} xs={12}>
            <CreateCard
              label="Acadêmico ou Jornada"
              color="tertiary"
              onClick={() => goToCreateEvent("presential", "1")}
            />
          </Grid>
          <Grid item lg={3} md={4} sm={6} xs={12}>
            <CreateCard
              label="Personalizado"
              color="default"
              onClick={() => goToCreateEvent()}
            />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
