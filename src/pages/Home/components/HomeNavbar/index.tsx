import { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { SquaresFour, X } from "phosphor-react";
import LogoSection from "../../../../layout/MainPanelLayout/components/LogoSection";
import ProfileSection from "../../../../layout/MainPanelLayout/components/ProfileSection";

export const HomeNavbar = () => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const [open, setOpen] = useState<boolean>(false);
  const pages = [
    {
      id: "1",
      title: "Recursos",
      url: "/recursos",
    },
    {
      id: "2",
      title: "Preços",
      url: "/precos-taxas",
    },
    {
      id: "3",
      title: "Encontre eventos",
      url: "/eventos",
    },
    {
      id: "4",
      title: "Tire suas dúvidas",
      url: "/suporte",
    },
  ];

  const handleOpen = () => {
    setOpen((old) => !old);
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: (theme) => theme.palette.primary.main,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Grid
            container
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Grid
              item
              xl={3}
              lg={3}
              md={3}
              xs={4}
              alignItems="center"
              display="flex"
            >
              <LogoSection />
            </Grid>

            {matchUpMd && (
              <Grid
                item
                xl={7}
                lg={7}
                md={7}
                alignItems="center"
                display="flex"
                justifyContent="flex-end"
              >
                {pages.map((page) => (
                  <Button
                    key={page.id}
                    onClick={() => {}}
                    sx={{ color: "white", display: "block" }}
                  >
                    {page.title}
                  </Button>
                ))}
              </Grid>
            )}
            {matchUpMd ? (
              <ProfileSection />
            ) : (
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => handleOpen()}
                color="inherit"
              >
                <SquaresFour size={32} />
              </IconButton>
            )}
          </Grid>
        </Toolbar>
      </Container>
      {!matchUpMd && (
        <Box
          sx={{
            width: "auto",
            backgroundColor: (theme) => theme.palette.background.default,
          }}
          role="presentation"
          onClick={() => handleOpen()}
          onKeyDown={() => handleOpen()}
        >
          <Drawer anchor="top" open={open} onClose={() => handleOpen()}>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              sx={{
                p: 2,
              }}
            >
              <LogoSection dark={true} />
              <IconButton>
                <X />
              </IconButton>
            </Box>
            <List>
              {pages.map((page) => (
                <ListItem key={page.id} disablePadding>
                  <ListItemButton href={page.url}>
                    <ListItemText
                      primary={page.title}
                      sx={{
                        textAlign: "center",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="center"
              sx={{
                p: 2,
              }}
            >
              <Tooltip title="Criar evento">
                <Button
                  variant="contained"
                  color="secondary"
                  disableElevation
                  href="/organizador/evento"
                >
                  Criar um evento
                </Button>
              </Tooltip>
            </Box>
          </Drawer>
        </Box>
      )}
    </AppBar>
  );
};
