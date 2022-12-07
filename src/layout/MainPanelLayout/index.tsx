import React, { useEffect } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  styled,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Outlet, Params, useNavigate, useParams } from "react-router-dom";
import { drawerWidth } from "../../utils/constant";
import { useCustomization } from "../../hooks/useCustomization";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { useEventById } from "../../stores/event";
import {
  Article,
  CalendarCheck,
  ChalkboardTeacher,
  CurrencyDollar,
  Handshake,
  PresentationChart,
  Ticket,
  UserCirclePlus,
  UsersThree,
} from "phosphor-react";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open: boolean;
}>(({ theme, open }) => ({
  backgroundColor: "rgba(0,98,161, 0.05)",
  // backgroundColor: "#EBF0FF",
  width: "100%",
  minHeight: "calc(100vh - 70px)",
  flexGrow: 1,
  padding: "20px",
  marginTop: "70px",
  // marginRight: "20px",
  ...(!open && {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.up("md")]: {
      marginLeft: -(drawerWidth - 20),
      width: `calc(100% - ${drawerWidth}px)`,
    },
    [theme.breakpoints.down("md")]: {
      marginLeft: "20px",
      width: `calc(100% - ${drawerWidth}px)`,
      padding: "16px",
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: "10px",
      width: `calc(100% - ${drawerWidth}px)`,
      padding: "16px",
      marginRight: "10px",
    },
  }),
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
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

interface IParams extends Params {
  eventId: string;
}

const MainPanelLayout = () => {
  const theme = useTheme();
  const { eventId } = useParams<IParams>();

  const { data: event, isLoading: isLoadingEvent } = useEventById(eventId);
  const matchDownMd = useMediaQuery(theme.breakpoints.down("lg"));
  const { opened, setMenu } = useCustomization();
  const navigate = useNavigate();

  const sidebarItems = {
    id: "pages",
    type: "group",
    children: [
      {
        id: "painel-evento",
        title: "Meu evento",
        type: "item",
        url: "",
        icon: CalendarCheck,
        breadcrumbs: false,
      },
      {
        id: "programacao",
        title: "Programação",
        type: "collapse",
        url: "programacao",
        icon: ChalkboardTeacher,
        breadcrumbs: false,
        children: [
          {
            id: "cursos",
            title: "Cursos",
            type: "item",
            url: "programacao/cursos",
            breadcrumbs: false,
          },
          {
            id: "palestras",
            title: "Palestras",
            type: "item",
            url: "programacao/palestras",
            breadcrumbs: false,
          },
          {
            id: "certificados",
            title: "Certificados",
            type: "item",
            url: "programacao/certificados",
            breadcrumbs: false,
          },
        ],
      },
      {
        id: "ingressos",
        title: "Inscrições",
        type: "item",
        url: "ingressos",
        icon: Ticket,
        breadcrumbs: false,
      },
      {
        id: "participantes",
        title: "Participantes",
        type: "item",
        url: "participantes",
        icon: UsersThree,
        breadcrumbs: false,
      },
      {
        id: "submissoes",
        title: "Submissões",
        type: "collapse",
        url: "submissoes",
        icon: Article,
        breadcrumbs: false,
        children: [
          {
            id: "cursos",
            title: "Cursos",
            type: "item",
            url: "atividades/cursos",
            breadcrumbs: false,
          },
          {
            id: "palestras",
            title: "Palestras",
            type: "item",
            url: "atividades/palestras",
            breadcrumbs: false,
          },
          {
            id: "certificados",
            title: "Certificados",
            type: "item",
            url: "atividades/certificados",
            breadcrumbs: false,
          },
        ],
      },
      {
        id: "voluntarios",
        title: "Equipe de apoio",
        type: "collapse",
        url: "voluntarios",
        icon: UserCirclePlus,
        breadcrumbs: false,
        children: [
          {
            id: "cursos",
            title: "Cursos",
            type: "item",
            url: "atividades/cursos",
            breadcrumbs: false,
          },
          {
            id: "palestras",
            title: "Palestras",
            type: "item",
            url: "atividades/palestras",
            breadcrumbs: false,
          },
          {
            id: "certificados",
            title: "Certificados",
            type: "item",
            url: "atividades/certificados",
            breadcrumbs: false,
          },
        ],
      },
      {
        id: "estatisticas",
        title: "Estatísticas",
        type: "item",
        url: "estatisticas",
        icon: PresentationChart,
        breadcrumbs: false,
      },
      {
        id: "financeiro",
        title: "Financeiro",
        type: "item",
        url: "financeiro",
        icon: CurrencyDollar,
        breadcrumbs: false,
      },
      {
        id: "patrocinadores",
        title: "Patrocinadores",
        type: "item",
        url: "patrocinadores",
        icon: Handshake,
        breadcrumbs: false,
      },
    ],
  };

  const handleLeftDrawerToggle = () => {
    setMenu(!opened);
  };

  useEffect(() => {
    setMenu(!matchDownMd);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchDownMd]);

  useEffect(() => {
    if (!isLoadingEvent && event === undefined) {
      return navigate("/organizador");
    }
  }, [isLoadingEvent, event, navigate]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          bgcolor: theme.palette.background.default,
          transition: opened ? theme.transitions.create("width") : "none",
        }}
      >
        <Toolbar>
          <Header
            handleLeftDrawerToggle={handleLeftDrawerToggle}
            event={event}
            isLoadingEvent={isLoadingEvent}
          />
        </Toolbar>
      </AppBar>
      <Sidebar
        drawerOpen={opened}
        drawerToggle={handleLeftDrawerToggle}
        event={event}
        isLoadingEvent={isLoadingEvent}
        items={[sidebarItems]}
      />

      <Main theme={theme} open={opened}>
        <Outlet />
      </Main>
    </Box>
  );
};

export default MainPanelLayout;
