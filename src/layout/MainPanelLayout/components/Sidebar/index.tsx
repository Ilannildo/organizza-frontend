// material-ui
import { useTheme } from "@mui/material/styles";
import { Box, Drawer, useMediaQuery } from "@mui/material";

// third-party
import PerfectScrollbar from "react-perfect-scrollbar";
import { BrowserView, MobileView } from "react-device-detect";
import { drawerWidth } from "../../../../utils/constant";
import LogoSection from "../LogoSection";
import MenuList from "../MenuList";

// project imports
interface ISidebar {
  drawerOpen: boolean;
  drawerToggle: () => void;
  window?: any;
}

// ==============================|| SIDEBAR DRAWER ||============================== //

const Sidebar = ({ drawerOpen, drawerToggle, window }: ISidebar) => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));

  const drawer = (
    <>
      <Box mb={2}>
        <Box sx={{ display: "flex", p: 2, mx: "auto" }}>
          <LogoSection />
        </Box>
      </Box>
      <BrowserView>
        <PerfectScrollbar
          component="div"
          style={{
            height: !matchUpMd ? "calc(100vh - 88px)" : "calc(100vh - 88px)",
            paddingRight: "16px",
          }}
        >
          <MenuList />
        </PerfectScrollbar>
      </BrowserView>
      <MobileView>
        <Box sx={{ px: 2 }}>
          {/* <MenuList /> */}
          {/* <MenuCard /> */}
        </Box>
      </MobileView>
    </>
  );

  const container =
    window !== undefined ? () => window.document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{ flexShrink: { md: 0 }, width: matchUpMd ? drawerWidth : "auto" }}
      aria-label="mailbox folders"
    >
      <Drawer
        container={container}
        variant={matchUpMd ? "persistent" : "temporary"}
        anchor="left"
        open={drawerOpen}
        onClose={drawerToggle}
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            background: theme.palette.primary.main,
            color: theme.palette.text.primary,
            borderRight: "none",
          },
        }}
        ModalProps={{ keepMounted: true }}
        color="inherit"
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
