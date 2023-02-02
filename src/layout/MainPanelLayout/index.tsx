import {
  AppBar,
  Box,
  styled,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
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
import { useEffect } from "react";
import { Outlet, Params, useNavigate, useParams } from "react-router-dom";
import { useCustomization } from "../../hooks/useCustomization";
import { useEventById } from "../../stores/event";
import { useAllSessionTypesMenu } from "../../stores/sessionTypes";
import { drawerWidth } from "../../utils/constant";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open: boolean;
}>(({ theme, open }) => ({
  backgroundColor: "rgba(221,227,234, 0.5)",
  // backgroundColor: "#EBF0FF",
  width: "100%",
  minHeight: "calc(100vh - 70px)",
  flexGrow: 1,
  padding: "16px",
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
  const { opened, setMenu } = useCustomization();
  const matchDownMd = useMediaQuery(theme.breakpoints.down("lg"));

  const { data: event, isLoading: isLoadingEvent } = useEventById(eventId);
  const navigate = useNavigate();

  const { data: sessionItems, isLoading: isLoadingSessionItens } =
    useAllSessionTypesMenu({
      enabled: !!event,
    });

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
        children: sessionItems,
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
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          bgcolor: theme.palette.background.default,
          transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          ...(!matchDownMd && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(["width", "margin"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }),
          // ...(!opened && {
          //   marginLeft: `calc(${theme.spacing(7)} + 1px)`,
          //   width: "100%",
          //   transition: theme.transitions.create(["width", "margin"], {
          //     easing: theme.transitions.easing.sharp,
          //     duration: theme.transitions.duration.leavingScreen,
          //   }),
          // }),
        }}
      >
        <Toolbar disableGutters>
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
        isLoadingEvent={isLoadingEvent || isLoadingSessionItens}
        items={[sidebarItems]}
      />

      <Main theme={theme} open={opened}>
        <Outlet />
      </Main>
    </Box>
  );
};

export default MainPanelLayout;
