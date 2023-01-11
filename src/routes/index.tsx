import { useRoutes } from "react-router-dom";
import config from "../config";
import { CheckoutRoutes } from "./checkout.routes";
import { MainRoutes } from "./main.routes";
import { OrganizerRoutes } from "./organizer.routes";
import { OrganizerEventPanelRoutes } from "./organizerEventPanel.routes";

export const AppRoutes = () => {
  return useRoutes([OrganizerEventPanelRoutes, MainRoutes, CheckoutRoutes, OrganizerRoutes], config.basename);
};