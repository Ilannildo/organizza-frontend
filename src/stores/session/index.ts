import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { ISessionForm } from "../../models/session";
import { api } from "../../services/api";

export const useCreateEventSession = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ session }: { session: ISessionForm }) =>
      api
        .post(`/events/${session.event_id}/sessions`, session)
        .then((res) => {
          toast.success("Atividade cadastrada com sucesso");
          return res.data.data;
        })
        .catch((err) => {
          if (err.response) {
            return toast.error(err.response.data.error.message);
          }
          return toast.error("Ocorreu um erro ao cadastrar a atividade");
        }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["useSessionBySessionTypeIdKey"]);
      },
    }
  );
};
