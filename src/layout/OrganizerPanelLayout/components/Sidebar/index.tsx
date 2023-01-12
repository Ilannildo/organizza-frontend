import { Box, Drawer, useTheme } from "@mui/material";
import { BrowserView, MobileView } from "react-device-detect";
import PerfectScrollbar from "react-perfect-scrollbar";

import LogoSection from "../../../MainPanelLayout/components/LogoSection";
import { drawerWidth } from "../../../../utils/constant";
import MenuList from "../MenuList";

interface ISidebar {
  drawerOpen: boolean;
  drawerToggle: () => void;
  window?: any;
  items: any[];
}

export const OrganizerPanelSidebar = ({
  drawerOpen,
  drawerToggle,
  window,
  items,
}: ISidebar) => {
  const theme = useTheme();

  const container =
    window !== undefined ? () => window.document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{ flexShrink: { md: 0 } }}
    >
      <Drawer
        container={container}
        variant="permanent"
        anchor="left"
        open={drawerOpen}
        onClose={drawerToggle}
        sx={{
          ...(drawerOpen && {
            width: drawerWidth,
            transition: theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            overflowX: "hidden",
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              background: theme.palette.primary.main,
              color: theme.palette.text.primary,
              borderRight: "none",
              transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
              overflowX: "hidden",
            },
          }),
          ...(!drawerOpen && {
            transition: theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
            overflowX: "hidden",
            width: `calc(${theme.spacing(7)} + 1px)`,
            [theme.breakpoints.up("sm")]: {
              width: `calc(${theme.spacing(8)} + 1px)`,
            },
            "& .MuiDrawer-paper": {
              transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
              background: theme.palette.primary.main,
              color: theme.palette.text.primary,
              borderRight: "none",
              overflowX: "hidden",
              width: `calc(${theme.spacing(7)} + 1px)`,
              [theme.breakpoints.up("sm")]: {
                width: `calc(${theme.spacing(8)} + 1px)`,
              },
            },
          }),
        }}
        ModalProps={{ keepMounted: true }}
        color="inherit"
      >
        <Box mb={2}>
          <Box sx={{ display: "flex", p: 2, mx: "auto" }}>
            <LogoSection mini={!drawerOpen} />
          </Box>
        </Box>
        <BrowserView>
          <PerfectScrollbar
            component="div"
            style={{
              paddingRight: drawerOpen ? "16px" : 0,
            }}
          >
            <MenuList items={items} />
          </PerfectScrollbar>
        </BrowserView>
        <MobileView>
          <Box sx={{ px: 2 }}>
            <MenuList items={items} />
          </Box>
        </MobileView>
      </Drawer>
    </Box>
  );
};
