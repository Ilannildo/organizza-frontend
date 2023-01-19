import { lazy } from "react";
import { Loadable } from "../layout/Loadable";
import { AllowedRolesNames, ProtectedRoute } from "../layout/ProtectedRoute";

import CreateEvent from "../pages/Organizer/CreateEvent";
import OrganizerDashboard from "../pages/Organizer/Dashboard";
import { UserSubscriptionDetail } from "../pages/Organizer/Subscription/UserSubscriptionDetail";
import { UserSubscriptions } from "../pages/Organizer/Subscription/UserSubscriptions";

const OrganizerPanelLayout = Loadable(
  lazy(() => import("../layout/OrganizerPanelLayout"))
);

export const OrganizerRoutes = {
  path: "organizador",
  element: (
    <ProtectedRoute allowedRoles={[AllowedRolesNames["ORGANIZER"]]}>
      <OrganizerPanelLayout />
    </ProtectedRoute>
  ),
  children: [
    {
      path: "",
      element: <OrganizerDashboard />,
    },
    {
      path: "criar-evento",
      element: <CreateEvent />,
    },
    {
      path: "inscricoes",
      element: <UserSubscriptions />,
    },
    {
      path: "inscricoes/:subscriptionId",
      element: <UserSubscriptionDetail />,
    },
  ],
};
