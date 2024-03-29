import { Box, Chip, Typography } from "@mui/material";

interface ICreateCard {
  label: string;
  color: "default" | "primary" | "secondary" | "tertiary";
  onClick: () => void;
}

enum CARD_COLORS {
  "primary" = "rgba(154, 64, 90, 0.4)",
  "secondary" = "rgba(241, 148, 19, 0.3)",
  "tertiary" = "rgba(68, 230, 181, 1)",
  "default" = "rgba(186, 26, 26, 0.4)",
}

export const CreateCard = ({ label, color, onClick }: ICreateCard) => {
  return (
    <Box
      sx={{
        background: (theme) =>
          `linear-gradient(249.6deg, ${theme.palette.primary.main} 70.14%, ${CARD_COLORS[color]} 99.16%)`,
        backdropFilter: "blur(22.5px)",
        transition: "all .5s ease",
        ":hover": {
          transform: "scale(1.02)",
          background: (theme) =>
            `linear-gradient(249.6deg, ${theme.palette.primary.main} 65.14%, ${CARD_COLORS[color]} 99.16%)`,
        },
      }}
      height="193px"
      borderRadius={1}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      p={2}
    >
      <Typography
        sx={{
          color: (theme) => theme.palette.background.paper,
          fontSize: 16,
          fontWeight: "600",
        }}
      >
        {label}
      </Typography>
      <Typography
        sx={{
          color: (theme) => theme.palette.onPrimary.main,
          fontSize: 12,
          fontWeight: "500",
          overflow: "hidden",
          textOverflow: "...",
          display: "-webkit-box",
          WebkitLineClamp: "4",
          WebkitBoxOrient: "vertical",
          textAlign: "center"
        }}
        // noWrap
      >
        Mais uma noite como todas as anteriores. Pego minha caneca de café
        cheia, acendo meu ultimo cigarro e corro pra velha janela do quarto.
      </Typography>
      <Chip
        onClick={() => onClick()}
        color="secondary"
        sx={{
          color: (theme) => theme.palette.background.paper,
        }}
        label="Criar agora"
      />
    </Box>
  );
};
