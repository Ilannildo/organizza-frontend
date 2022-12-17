import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { ITicketForm } from "../../models/ticket";
import { api } from "../../services/api";

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
        queryClient.invalidateQueries(["useFilteredProfessionals"]);
      },
    }
  );
};
