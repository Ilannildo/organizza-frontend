import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { IMainSubject } from "../../models/mainSubject";
import { api } from "../../services/api";
import { createUseAllMainSubjectKey } from "./keys";

export const useAllMainSubjects = (options?: UseQueryOptions<IMainSubject[]>) => {
  return useQuery(
    createUseAllMainSubjectKey(),
    () => api.get("/main-subjects").then((res) => res.data.data),
    { ...options }
  );
};
