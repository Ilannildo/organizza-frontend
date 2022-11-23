import { useRoutes } from "react-router-dom";
import config from "../config";
import { MainRoutes } from "./main.routes";
import { OrganizerRoutes } from "./organizer.routes";

export const AppRoutes = () => {
  return useRoutes([OrganizerRoutes, MainRoutes], config.basename);
};

// export const AppRoutes = () => {
//   return (
//     <Routes>
//       <Route index element={<Home />} />
//       <Route
//         path="organizador"
//         element={
//           <ProtectedRoute allowedRoles={[AllowedRolesNames["ORGANIZER"]]}>
//             <OrganizerDashboard />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="organizador/evento"
//         element={
//           <ProtectedRoute allowedRoles={[AllowedRolesNames["ORGANIZER"]]}>
//             <CreateEvent />
//           </ProtectedRoute>
//         }
//       />
//       <Route path="evento/:slug" element={<Event />} />
//       <Route path="login" element={<Login />} />
//       <Route path="cadastro" element={<Register />} />
//       <Route path="*" element={<NotFound />} />
//     </Routes>
//   );
// };
