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
import { Outlet } from "react-router-dom";
import { drawerWidth } from "../../utils/constant";
import { useCustomization } from "../../hooks/useCustomization";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
// import Header from "../../../components/Header";
// import Sidebar from "../../../components/Sidebar";

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

const MainPanelLayout = () => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down("lg"));
  const { opened, setMenu } = useCustomization();

  const handleLeftDrawerToggle = () => {
    setMenu(!opened);
  };

  useEffect(() => {
    setMenu(!matchDownMd);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchDownMd]);

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
          <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
        </Toolbar>
      </AppBar>
      <Sidebar drawerOpen={opened} drawerToggle={handleLeftDrawerToggle} />

      <Main theme={theme} open={opened}>
        <Outlet />
      </Main>
    </Box>
  );
};

export default MainPanelLayout;
