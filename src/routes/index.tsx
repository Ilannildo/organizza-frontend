import { useRoutes } from "react-router-dom";
import config from "../config";
import { MainRoutes } from "./main.routes";
import { OrganizerRoutes } from "./organizer.routes";

export const AppRoutes = () => {
  return useRoutes([OrganizerRoutes, MainRoutes], config.basename);
};