import { styled, Typography } from "@mui/material";

interface IContainer {
  backColor: ISectionMarkerColor;
}

const Container = styled("div")<IContainer>(({ theme, backColor }) => ({
  backgroundColor:
    backColor === "primary"
      ? theme.palette.primaryContainer.main
      : backColor === "secondary"
      ? theme.palette.secondaryContainer.main
      : theme.palette.tertiaryContainer.main,
  padding: "8px 4px",
  borderRadius: 4,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: 75,
}));

interface ISectionMarker {
  color: ISectionMarkerColor;
  label: string;
}

type ISectionMarkerColor = "primary" | "secondary" | "tertiary";

export const SectionMarker = ({ color, label }: ISectionMarker) => {
  return (
    <Container backColor={color}>
      <Typography
        component="h1"
        variant="h3"
        sx={{
          color: (theme) =>
            color === "primary"
              ? theme.palette.primary.main
              : color === "secondary"
              ? theme.palette.secondary.main
              : color === "tertiary"
              ? theme.palette.tertiary.main
              : theme.palette.primary.main,
          fontSize: 12,
        }}
      >
        {label}
      </Typography>
    </Container>
  );
};
