import { Button, useTheme } from "@mui/material";

interface IBannerTicketButton {
  label: string;
  color: "default" | "primary" | "secondary" | "tertiary";
  disabled: boolean;
  onClick: () => void;
}

enum CARD_COLORS {
  "primary" = "rgba(154, 64, 90, 0.4)",
  "secondary" = "rgba(241, 148, 19, 0.3)",
  "tertiary" = "rgba(68, 230, 181, 1)",
  "default" = "rgba(186, 26, 26, 0.4)",
}

export const BannerTicketButton = ({
  color,
  label,
  onClick,
  disabled,
}: IBannerTicketButton) => {
  const theme = useTheme();
  return (
    <Button
      variant="contained"
      onClick={onClick}
      disabled={disabled}
      sx={{
        background: (theme) =>
          !disabled
            ? `linear-gradient(249.6deg, ${theme.palette.primary.main} 70.14%, ${CARD_COLORS[color]} 99.16%)`
            : "inherit",
        backdropFilter: "blur(22.5px)",
        color: theme.palette.primaryContainer.main,
        fontSize: 12,
      }}
    >
      {label}
    </Button>
  );
};
