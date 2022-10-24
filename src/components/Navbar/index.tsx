import {
  AppBar,
  Avatar,
  Badge,
  Button,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Grid,
  IconButton,
  Link,
  styled,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

import Logo from "../../assets/images/logo.svg";
import { useAuthenticatedUser } from "../../stores/user";
import { stringAvatar } from "../../utils/masks";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#2E7D32",
    color: "#2E7D32",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      // top: 0,
      // left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export const Navbar = () => {
  const { data: user, isLoading } = useAuthenticatedUser();

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Grid container>
              <Grid
                item
                xl={3}
                lg={3}
                md={4}
                xs={9}
                alignItems="center"
                display="flex"
              >
                <Link href="/dashboard" sx={{ display: "flex", alignItems: "center" }}>
                  <img src={Logo} alt="" width="45" />
                  <Divider
                    orientation="vertical"
                    variant="middle"
                    flexItem
                    sx={{
                      ml: 2,
                    }}
                  />
                  <Typography
                    ml={2}
                    sx={{
                      color: (theme) => theme.palette.text.primary,
                    }}
                  >
                    Área do organizador
                  </Typography>
                </Link>
              </Grid>
              <Grid
                item
                xl={6}
                lg={6}
                md={4}
                xs={false}
                justifyContent="center"
                alignItems="center"
                display="flex"
              >
                <Chip
                  onClick={() => {}}
                  color="secondary"
                  sx={{
                    display: {
                      md: "flex",
                      xs: "none",
                    },
                    color: (theme) => theme.palette.background.paper,
                  }}
                  label="MEUS EVENTOS"
                />
              </Grid>
              <Grid
                item
                xl={3}
                lg={3}
                md={4}
                xs={3}
                justifyContent="flex-end"
                alignItems="center"
                display="flex"
              >
                {user !== undefined ? (
                  <Tooltip title="Meu perfil">
                    <IconButton onClick={() => {}} sx={{ p: 0 }}>
                      <StyledBadge
                        overlap="circular"
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        variant="dot"
                      >
                        <Avatar
                          alt={`Foto de perfil`}
                          {...stringAvatar(
                            user !== undefined ? user.name : "usuário",
                            40,
                            40
                          )}
                          src={user.photo_url}
                        />
                      </StyledBadge>
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Tooltip title="Login">
                    <Button variant="outlined" href="/login">
                      {isLoading ? (
                        <CircularProgress color="inherit" />
                      ) : (
                        `Login`
                      )}
                    </Button>
                  </Tooltip>
                )}
              </Grid>
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
