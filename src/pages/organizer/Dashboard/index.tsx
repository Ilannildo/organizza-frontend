import { Button, Container, Typography } from "@mui/material";
import { useAuthenticatedUser } from "../../../stores/user";

const OrganizerDashboard = () => {
  const { data } = useAuthenticatedUser();
  return (
    <Container maxWidth="xl">
      <Typography>Bem vindo {data?.name}</Typography>
      <Button variant="contained">Criar evento</Button>
    </Container>
  );
};

export default OrganizerDashboard;
