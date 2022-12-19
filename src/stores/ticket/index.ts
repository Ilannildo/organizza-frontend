import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { toast } from "react-toastify";
import { ITicket, ITicketForm } from "../../models/ticket";
import { api } from "../../services/api";
import { createTicketByEventIdKey } from "./keys";

export const useCreateEventTicket = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ ticket }: { ticket: ITicketForm }) =>
      api
        .post(`/events/${ticket.event_id}/tickets`, ticket)
        .then((res) => {
          toast.success("Ingresso criado com sucesso");
          return res.data.data;
        })
        .catch((err) => {
          if (err.response) {
            return toast.error(err.response.data.error.message);
          }
          return toast.error("Ocorreu um erro ao criar o ingresso");
        }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["useTicketByEventIdKey"]);
      },
    }
  );
};

export const useTicketsByEventId = (
  { eventId }: { eventId?: string },
  options?: UseQueryOptions<ITicket[]>
) => {
  return useQuery(
    createTicketByEventIdKey(eventId),
    () =>
      api.get(`/events/${eventId}/tickets`).then((res) => res.data.data),
    {
      ...options,
      retry: 1,
    }
  );
};
