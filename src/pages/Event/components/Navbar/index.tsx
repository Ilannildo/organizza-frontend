import {
  AppBar,
  Chip,
  Container,
  Grid,
  Link,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import Logo from "../../../../assets/images/logo-white.svg";

interface INavbar {
  logo_url?: string;
  slug?: string;
}

export const Navbar = ({ logo_url, slug }: INavbar) => {
  const pages = [
    {
      title: "Inscrição",
      url: "inscricao",
    },
    {
      title: "Programação",
      url: "programacao",
    },
    {
      title: "Sobre",
      url: "sobre",
    },
    {
      title: "Organizador",
      url: "organizador",
    },
    {
      title: "Patrocinadores",
      url: "patrocinador",
    },
  ];
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));

  const location = useLocation();

  const activeRoute = location.hash;
  console.log("ACTIVE ::", activeRoute);

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: matchesSM
            ? "linear-gradient(152.97deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.1) 100%)"
            : "linear-gradient(152.97deg, rgba(1, 55,80, 0.1) 0%, rgba(1, 55,80, 0.5) 100%)",
          backdropFilter: "blur(1px)",
          zIndex: 10,
          top: 0,
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
                <Link
                  href={`/evento/${slug}`}
                  sx={{ display: "flex", alignItems: "center", mr: 5 }}
                >
                  <img src={logo_url || Logo} alt="" width="32" />
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
                {pages.map((page) => (
                  <Chip
                    label={page.title}
                    component="a"
                    key={page.url}
                    size="medium"
                    variant="filled"
                    color="default"
                    href={`#${page.url}`}
                    sx={{
                      mx: 2,
                      fontWeight:
                        `#${page.url}` === activeRoute ? "600" : "500",
                      color:
                        `#${page.url}` === activeRoute
                          ? theme.palette.primary.main
                          : theme.palette.onPrimary.main,
                      backgroundColor:
                        `#${page.url}` === activeRoute
                          ? theme.palette.primaryContainer.main
                          : "transparent",
                    }}
                    clickable
                  />
                ))}
              </Grid>
              {/* <Grid
                item
                xl={3}
                lg={3}
                md={4}
                xs={3}
                justifyContent="flex-end"
                alignItems="center"
                display="flex"
              >
                
              </Grid> */}
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
