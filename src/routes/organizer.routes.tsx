import { lazy } from "react";
import { Loadable } from "../layout/Loadable";
import { AllowedRolesNames, ProtectedRoute } from "../layout/ProtectedRoute";

import OrganizerDashboard from "../pages/Organizer/Dashboard";
import CreateEvent from "../pages/Organizer/CreateEvent";

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
  ],
};
