import { Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import { IEventPageTickets } from "../../models/ticket";
import CardBorder from "../../assets/ticket-card-border.svg";
import { formatCurrency } from "../../utils/masks";
import { BannerTicketButton } from "../BannerTicketButton";
import { format } from "date-fns";
interface IBannerTicket {
  ticket: IEventPageTickets;
}

export const BannerTicket = ({ ticket }: IBannerTicket) => {
  return (
    <Card
      elevation={0}
      sx={{
        height: 300,
        overflow: "none",
        background: `url(${CardBorder})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Box
        sx={{ backgroundColor: "rgba(115, 119, 127, 0.05)", height: "100%" }}
      >
        <CardContent
          sx={{
            height: "90%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Grid container>
            <Grid item>
              <Typography
                sx={{
                  fontSize: 12,
                  color: (theme) => theme.palette.onPrimaryContainer.main,
                }}
              >
                {ticket.category_title}
              </Typography>
              <Typography
                sx={{
                  fontSize: 24,
                  fontWeight: "bold",
                  color: (theme) => theme.palette.onPrimaryContainer.main,
                }}
              >
                {ticket.is_free ? "Grátis" : formatCurrency(ticket.value)}
              </Typography>

              <Typography
                sx={{
                  fontSize: 12,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "5",
                  WebkitBoxOrient: "vertical",
                  color: (theme) => theme.palette.onPrimaryContainer.main,
                }}
              >
                {ticket.description}
              </Typography>
            </Grid>
          </Grid>

          <Stack>
            <Typography
              sx={{
                fontSize: 10,
                mt: 2,
                mb: 1,
                color: (theme) => theme.palette.onPrimaryContainer.main,
              }}
            >
              Inscrições até {format(new Date(ticket.due_date), "dd/MM/yyyy")} às{" "}
              {format(new Date(ticket.due_time), "HH:mm")}
            </Typography>
            <BannerTicketButton
              label={ticket.status}
              disabled={!ticket.available}
              color={ticket.is_free ? "tertiary" : "secondary"}
              onClick={() => {}}
            />
          </Stack>
        </CardContent>
      </Box>
    </Card>
  );
};
