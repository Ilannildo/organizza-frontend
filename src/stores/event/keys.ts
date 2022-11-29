import { QueryKey } from "@tanstack/react-query";

export const createEventByIdKey = (event_id: string): QueryKey => [
  "useUserAuthKey",
  event_id,
];
