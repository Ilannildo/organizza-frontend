import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Chip,
  ClickAwayListener,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
// third-party
import PerfectScrollbar from "react-perfect-scrollbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../hooks/useAuth";
import { useAuthenticatedUser } from "../../../../stores/user";
import { stringAvatar } from "../../../../utils/masks";
import Transitions from "../../../Extends/Transitions";
import MainCard from "../MainCard";
import {
  Calendar,
  CalendarCheck,
  CaretDown,
  SignOut,
  User,
} from "phosphor-react";

const ProfileSection: React.FC = () => {
  const theme = useTheme();
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { signOut, isLoading } = useAuth();
  const { data: user, isLoading: isLoadingAuthUser } = useAuthenticatedUser();

  const handleLogout = async () => {
    await signOut();
  };

  const handleClose = (event: any) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleListItemClick = (event: any, index: number, route = "") => {
    setSelectedIndex(index);
    handleClose(event);

    if (route && route !== "") {
      navigate(route);
    }
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      if (anchorRef.current) {
        anchorRef.current.focus();
      }
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Box
      sx={{
        ml: 3,
        [theme.breakpoints.down("md")]: {
          ml: 2,
        },
      }}
    >
      {user !== undefined ? (
        <Chip
          sx={{
            height: "44px",
            alignItems: "center",
            borderRadius: "24px",
            transition: "all .2s ease-in-out",
            border: "none",
          }}
          icon={
            <Avatar
              {...stringAvatar(user.name, 34, 34)}
              sx={{
                fontSize: "1.2rem",
                cursor: "pointer",
              }}
              ref={anchorRef}
              aria-controls={open ? "menu-list-grow" : undefined}
              aria-haspopup="true"
              color="inherit"
            />
          }
          label={<CaretDown />}
          variant="outlined"
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          color="primary"
        />
      ) : (
        !isLoadingAuthUser && (
          <Tooltip title="Entre na sua conta">
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              href="/login"
              disableElevation
            >
              Login
            </Button>
          </Tooltip>
        )
      )}
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 14],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Transitions in={open} {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard
                  border={false}
                  elevation={16}
                  content={false}
                  sx={{
                    height: 350,
                  }}
                  boxShadow
                  shadow={theme.shadows[16]}
                >
                  <Box sx={{ p: 2 }}>
                    <Stack>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <Typography>Olá,</Typography>
                        <Typography sx={{ fontWeight: 600 }}>
                          {user?.name}
                        </Typography>
                      </Stack>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: theme.palette.text.disabled,
                          fontWeight: 400,
                        }}
                      >
                        Organizador
                      </Typography>
                    </Stack>
                  </Box>
                  <PerfectScrollbar
                    style={{
                      // height: "100%",
                      // maxHeight: "calc(100vh - 400px)",
                      overflowX: "hidden",
                    }}
                  >
                    <Box sx={{ p: 2 }}>
                      <Divider />
                      <List
                        component="nav"
                        sx={{
                          width: "100%",
                          maxWidth: 350,
                          minWidth: 200,
                          backgroundColor: theme.palette.background.default,
                          borderRadius: "10px",
                          [theme.breakpoints.down("md")]: {
                            minWidth: "100%",
                          },
                        }}
                      >
                        <ListItemButton
                          selected={selectedIndex === 1}
                          onClick={(event) =>
                            handleListItemClick(event, 1, "/organizador")
                          }
                        >
                          <ListItemIcon>
                            <Calendar />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="body1">
                                Meus eventos
                              </Typography>
                            }
                          />
                        </ListItemButton>
                        <ListItemButton
                          selected={selectedIndex === 1}
                          onClick={(event) =>
                            handleListItemClick(event, 1, "/organizador")
                          }
                        >
                          <ListItemIcon>
                            <CalendarCheck />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="body1">
                                Perfil Organizador
                              </Typography>
                            }
                          />
                        </ListItemButton>
                        <ListItemButton
                          selected={selectedIndex === 1}
                          onClick={(event) =>
                            handleListItemClick(event, 1, "/organizador")
                          }
                        >
                          <ListItemIcon>
                            <User />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="body1">
                                Minha conta
                              </Typography>
                            }
                          />
                        </ListItemButton>
                        <ListItemButton
                          selected={selectedIndex === 4}
                          disabled={isLoading}
                          onClick={handleLogout}
                        >
                          <ListItemIcon>
                            <SignOut />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="body1">Sair</Typography>
                            }
                          />
                        </ListItemButton>
                      </List>
                    </Box>
                  </PerfectScrollbar>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </Box>
  );
};

export default ProfileSection;
