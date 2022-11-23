import {
  AppBar,
  Box,
  Button,
  Container,
  Link,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Logo from "../../../../assets/images/logo.svg";

export const Navbar = () => {
  const pages = ["Inscrição", "Programação", "Sobre"];
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      <AppBar
        position="relative"
        elevation={0}
        sx={{
          background: matchesSM
            ? "linear-gradient(152.97deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.1) 100%)"
            : "transparent",
          backdropFilter: matchesSM ? "blur(10px)" : "none",
          zIndex: 10,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link
              href="/evento/meu-evento-123"
              sx={{ display: "flex", alignItems: "center", mr: 5 }}
            >
              <img src={Logo} alt="" width="45" />
            </Link>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  size="small"
                  href={`#${page.toLowerCase()}`}
                  onClick={() => {}}
                  sx={{ mx: 2, display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
