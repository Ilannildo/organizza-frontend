import PropTypes from "prop-types";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Avatar, Box, ButtonBase, useMediaQuery } from "@mui/material";
import { List } from "phosphor-react";
// ==============================|| MAIN NAVBAR / HEADER ||============================== //

interface IHeader {
  handleLeftDrawerToggle: () => void;
}

const Header = ({ handleLeftDrawerToggle }: IHeader) => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <>
      <Box
        sx={{
          marginLeft: matchUpMd ? 32 : 0,
          display: "flex",
          [theme.breakpoints.down("md")]: {
            width: "auto",
          },
        }}
      >
        {!matchUpMd && (
          <ButtonBase sx={{ borderRadius: "12px", overflow: "hidden" }}>
            <Avatar
              variant="rounded"
              sx={{
                transition: "all .2s ease-in-out",
                background: theme.palette.primaryContainer.main,
                color: theme.palette.primary.main,
                "&:hover": {
                  background: theme.palette.secondary.dark,
                  color: theme.palette.secondary.light,
                },
              }}
              onClick={handleLeftDrawerToggle}
              color="primary"
            >
              <List size="1.3rem" />
            </Avatar>
          </ButtonBase>
        )}
      </Box>

      {/* header search */}
      {/* <SearchSection /> */}
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 1 }} />

      {/* notification & profile */}
      {/* <NotificationSection /> */}
      {/* <ProfileSection /> */}
    </>
  );
};

Header.propTypes = {
  handleLeftDrawerToggle: PropTypes.func,
};

export default Header;
