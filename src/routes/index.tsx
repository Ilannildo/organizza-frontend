import { useRoutes } from "react-router-dom";
import config from "../config";
import { CheckoutRoutes } from "./checkout.routes";
import { MainRoutes } from "./main.routes";
import { OrganizerRoutes } from "./organizer.routes";

export const AppRoutes = () => {
  return useRoutes([OrganizerRoutes, MainRoutes, CheckoutRoutes], config.basename);
};