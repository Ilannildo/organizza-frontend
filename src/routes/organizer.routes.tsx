import { lazy } from "react";
import { Loadable } from "../layout/Loadable";
import MainPanelLayout from "../layout/MainPanelLayout";
import { AllowedRolesNames, ProtectedRoute } from "../layout/ProtectedRoute";
import EventPanel from "../pages/Organizer/Event/Panel";

// import pages with lazy load
// const EventPanel = Loadable(
//   lazy(() => import("../pages/Organizer/Event/Panel"))
// );
const EventSession = Loadable(
  lazy(() => import("../pages/Organizer/Event/Session"))
);
export const OrganizerRoutes = {
  path: "organizador/painel-evento",
  element: (
    <ProtectedRoute allowedRoles={[AllowedRolesNames["ORGANIZER"]]}>
      <MainPanelLayout />
    </ProtectedRoute>
  ),
  children: [
    {
      path: "",
      element: <EventPanel />,
    },
    {
      path: "programacao/cursos",
      element: <EventSession />,
    },
  ],
};
