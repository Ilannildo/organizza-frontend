import {
  Badge,
  Box,
  Button,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { CalendarCheck } from "phosphor-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { IEvent } from "../../models/event";
import { useNavigate } from "react-router-dom";

interface IEventCard {
  event: IEvent;
}

export const EventCard = ({ event }: IEventCard) => {
  const theme = useTheme();

  const navigate = useNavigate();

  const goToEventPanel = () => {
    navigate(`/organizador/painel-evento/${event.id}`);
  };
  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.background.default,
        boxShadow: "1px 1px 16px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(22.5px)",
      }}
      // width="100%"
      overflow="hidden"
      height="250px"
      borderRadius={1}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box
        height="190px"
        width="100%"
        sx={{
          background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 57.29%, rgba(0,0,0,0.7) 70.83%), url(${
            event.event_cover ? event.event_cover.url : "cover2.jpeg"
          })`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain, cover",
          display: "flex",
          alignItems: "end",
        }}
      >
        <Typography
          fontWeight={600}
          textAlign="center"
          sx={{
            color: (theme) => theme.palette.background.default,
            fontSize: 12,
            mx: 3,
            my: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "3",
            WebkitBoxOrient: "vertical",
          }}
          // noWrap
        >
          {event.short_description}
        </Typography>
      </Box>
      <Box
        width="100%"
        sx={{
          backgroundColor: (theme) => theme.palette.background.default,
        }}
        height="65px"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box mx={2} my={1} display="flex" flexDirection="column">
          <Tooltip
            title={
              event.status === "published"
                ? "O seu evento está publicado"
                : event.status === "started"
                ? "O seu evento está criado, mas não está publicado"
                : "O seu evento está pendente de informações"
            }
          >
            <Badge
              color={
                event.status === "published"
                  ? "primary"
                  : event.status === "started"
                  ? "warning"
                  : "error"
              }
              variant="dot"
            >
              <Typography
                fontWeight={600}
                sx={{
                  color: (theme) => theme.palette.text.primary,
                  fontSize: 14,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "1",
                  WebkitBoxOrient: "vertical",
                }}
              >
                {event.title}
              </Typography>
            </Badge>
          </Tooltip>
          <Stack direction="row" spacing={1} mt={1}>
            <CalendarCheck color={theme.palette.text.disabled} />
            <Typography
              fontWeight={500}
              sx={{
                color: (theme) => theme.palette.text.disabled,
                fontSize: 12,
              }}
            >
              {format(new Date(event.start_date), "dd 'de' LLLL 'de' yyyy", {
                locale: ptBR,
              })}
            </Typography>
          </Stack>
        </Box>

        <Button
          sx={{
            mr: 2,
          }}
          onClick={() => goToEventPanel()}
        >
          GERENCIAR
        </Button>
      </Box>
    </Box>
  );
};
