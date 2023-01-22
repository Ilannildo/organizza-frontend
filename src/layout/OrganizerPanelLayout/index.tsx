import {
  AppBar,
  Box,
  styled,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { Calendar, Ticket, UserCircle } from "phosphor-react";
import { Outlet } from "react-router-dom";
import { useCustomization } from "../../hooks/useCustomization";
import { drawerWidth } from "../../utils/constant";
import { OrganizerPanelSidebar } from "./components/Sidebar";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open: boolean;
}>(({ theme, open }) => ({
  backgroundColor: "rgba(221,227,234, 0.5)",
  width: "100%",
  minHeight: "calc(100vh - 70px)",
  flexGrow: 1,
  padding: "16px",
  marginTop: "70px",
  ...(!open && {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  }),
  ...(open && {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: `calc(100% - ${drawerWidth}px)`,
    [theme.breakpoints.down("md")]: {
      marginLeft: "20px",
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: "10px",
    },
  }),
}));

const OrganizerPanelLayout = () => {
  const theme = useTheme();
  const { opened, setMenu } = useCustomization();

  const sidebarItems = {
    id: "pages",
    type: "group",
    children: [
      {
        id: "",
        title: "Meus eventos",
        type: "item",
        url: "",
        icon: Calendar,
        breadcrumbs: false,
      },
      {
        id: "inscricoes",
        title: "Minhas inscrições",
        type: "item",
        url: "inscricoes",
        icon: Ticket,
        breadcrumbs: false,
      },
      {
        id: "minha-conta",
        title: "Minha conta",
        type: "item",
        url: "minha-conta",
        icon: UserCircle,
        breadcrumbs: false,
      },
    ],
  };

  const handleLeftDrawerToggle = () => {
    setMenu(!opened);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        color="inherit"
        elevation={0}
        position="fixed"
        sx={{
          bgcolor: theme.palette.background.default,
          transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),

          ...(opened && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(["width", "margin"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }),
          ...(!opened && {
            marginLeft: `calc(${theme.spacing(7)} + 1px)`,
            width: `calc(100% - ${theme.spacing(7)} + 1px)`,
            transition: theme.transitions.create(["width", "margin"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          }),
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography>Módulo do organizador</Typography>
        </Toolbar>
      </AppBar>
      <OrganizerPanelSidebar
        drawerOpen={opened}
        drawerToggle={handleLeftDrawerToggle}
        items={[sidebarItems]}
      />
      <Main theme={theme} open={opened}>
        <Outlet />
      </Main>
    </Box>
  );
};

export default OrganizerPanelLayout;
