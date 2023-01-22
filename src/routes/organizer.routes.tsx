import { lazy } from "react";
import { Loadable } from "../layout/Loadable";
import { AllowedRolesNames, ProtectedRoute } from "../layout/ProtectedRoute";
import { UserAccount } from "../pages/Organizer/Account";

import { CreateEvent } from "../pages/Organizer/CreateEvent";
import { OrganizerDashboard } from "../pages/Organizer/Dashboard";
import { UserSubscriptionDetail } from "../pages/User/Subscription/UserSubscriptionDetail";
import { UserSubscriptions } from "../pages/User/Subscription/UserSubscriptions";

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
    {
      path: "minha-conta",
      element: <UserAccount />,
    },
  ],
};
