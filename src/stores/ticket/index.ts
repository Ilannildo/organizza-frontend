import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { toast } from "react-toastify";
import { ITicket, ITicketForm, ITicketPriceType } from "../../models/ticket";
import { api } from "../../services/api";
import { createTicketByEventIdKey, createTicketPriceTypeKey } from "./keys";

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
  {
    eventId,
    limit,
    page = 1,
  }: { eventId?: string; limit: number; page: number },
  options?: UseQueryOptions<{
    tickets: ITicket[];
    limit: number;
    page: number;
    total: number;
  }>
) => {
  return useQuery(
    createTicketByEventIdKey(page, limit, eventId),
    () =>
      api
        .get(`/events/${eventId}/tickets?page=${page + 1}&limit=${limit}`)
        .then((res) => res.data.data),
    {
      ...options,
      retry: 1,
    }
  );
};

export const useTicketPriceType = (
  options?: UseQueryOptions<ITicketPriceType[]>
) => {
  return useQuery(
    createTicketPriceTypeKey(),
    () => api.get(`/ticket-price-types`).then((res) => res.data.data),
    {
      ...options,
      retry: 1,
    }
  );
};
