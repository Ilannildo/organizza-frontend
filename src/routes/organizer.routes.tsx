import MainPanelLayout from "../layout/MainPanelLayout";
import { AllowedRolesNames, ProtectedRoute } from "../layout/ProtectedRoute";

import EventPanel from "../pages/Organizer/Event/Panel";
import EventSession from "../pages/Organizer/Event/Session";
import EventSubscription from "../pages/Organizer/Event/Subscription";
import EventTicket from "../pages/Organizer/Event/Ticket";

export const OrganizerRoutes = {
  path: "organizador/painel-evento/:eventId",
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
      path: "programacao/:sessionId",
      element: <EventSession />,
    },
    {
      path: "ingressos",
      element: <EventTicket />,
    },
    {
      path: "participantes",
      element: <EventSubscription />,
    },
  ],
};
