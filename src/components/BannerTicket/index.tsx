import { Box, Grid, Typography } from "@mui/material";
import { formatCurrency } from "../../utils/masks";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

import { IEventPageTickets } from "../../models/ticket";
import TicketBackground from "../../assets/images/ticket.svg";

import "./styles.css";
interface IBannerTicket {
  ticket: IEventPageTickets;
}

export const BannerTicket = ({ ticket }: IBannerTicket) => {
  const navigate = useNavigate();

  const handleCheckoutTicket = ({ ticketId }: { ticketId: string }) => {
    navigate(`checkout/${ticketId}`);
  };
  return (
    <Box
      className={ticket.available ? "ticket-container" : ""}
      onClick={() => {
        if (ticket.available) {
          handleCheckoutTicket({
            ticketId: ticket.ticket_id,
          });
        }
      }}
      sx={{
        height: 300,
        backgroundImage: `url(${TicketBackground})`,
        backgroundRepeat: "no-repeat",
        backgroundColor: "transparent",
        backgroundSize: "cover",
        px: 2,
        py: 4,
        backgroundPosition: "center",
        width: 165,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <Grid
        container
        className="ticket-front"
        sx={{
          display: "block",
        }}
      >
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Typography
            sx={{
              fontSize: 14,
              color: (theme) => theme.palette.onSurfaceVariant.main,
              textAlign: "center",
              fontWeight: "600",
              mb: 2,
              mt: 2,
            }}
          >
            {ticket.category_title}
          </Typography>
          <Typography
            sx={{
              fontSize: 12,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "5",
              WebkitBoxOrient: "vertical",
              textAlign: "center",
              color: (theme) => theme.palette.text.disabled,
            }}
          >
            {ticket.description}
          </Typography>
        </Grid>
      </Grid>
      {
        <Grid
          container
          className="ticket-back"
          sx={{
            display: "none",
          }}
        >
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Typography
              sx={{
                fontSize: 24,
                color: (theme) => theme.palette.onSurfaceVariant.main,
                textAlign: "center",
                fontWeight: "600",
                mb: 2,
                mt: 4,
              }}
            >
              {ticket.is_free
                ? "Clique para se inscrever"
                : "Clique para comprar"}
            </Typography>
          </Grid>
        </Grid>
      }
      <Grid container>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Typography
            sx={{
              fontSize: 24,
              fontWeight: "bold",
              color: (theme) =>
                !ticket.available
                  ? theme.palette.text.disabled
                  : theme.palette.onSurfaceVariant.main,
              mt: 3,
              textAlign: "center",
            }}
          >
            {!ticket.available
              ? ticket.status
              : ticket.is_free
              ? "Grátis"
              : formatCurrency(ticket.value)}
          </Typography>
          {ticket.available && (
            <Typography
              sx={{
                fontSize: 10,
                textAlign: "center",
                mb: 2,
                color: (theme) => theme.palette.onSurfaceVariant.main,
              }}
            >
              Inscrições até{" "}
              {format(new Date(ticket.due_date), "dd/MM/yyyy 'às' HH:mm")}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};
