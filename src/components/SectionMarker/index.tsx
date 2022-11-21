import { styled, Typography } from "@mui/material";

const Container = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default
}));

export const SectionMarker = () => {
  return (
    <Container>
      <Typography>Sessão</Typography>
    </Container>
  );
};
