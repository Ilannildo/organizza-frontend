// material-ui
import {
  Box,
  IconButton,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { format } from "date-fns";
import { ArrowSquareOut, List, X } from "phosphor-react";
import LogoWhite from "../../../../assets/images/logo-white.svg";
import { useCustomization } from "../../../../hooks/useCustomization";
import { IEvent } from "../../../../models/event";
import ProfileSection from "../ProfileSection";
// ==============================|| MAIN NAVBAR / HEADER ||============================== //

interface IHeader {
  handleLeftDrawerToggle: () => void;
  event?: IEvent;
  isLoadingEvent: boolean;
}

const Header = ({ handleLeftDrawerToggle, event, isLoadingEvent }: IHeader) => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down("lg"));
  const matchUpMd = useMediaQuery(theme.breakpoints.up("sm"));
  const { opened } = useCustomization();

  return (
    <>
      <Box
        sx={{
          display: "flex",
        }}
      >
        {matchDownMd && (
          // <ButtonBase sx={{ borderRadius: "12px", overflow: "hidden" }}>
          //   <Avatar
          //     variant="rounded"
          //     sx={{
          //       transition: "all .2s ease-in-out",
          //       background: theme.palette.primaryContainer.main,
          //       color: theme.palette.primary.main,
          //       "&:hover": {
          //         background: theme.palette.secondary.dark,
          //         color: theme.palette.secondary.light,
          //       },
          //     }}
          //     onClick={handleLeftDrawerToggle}
          //     color="primary"
          //   >
          //     <List size="1.3rem" />
          //   </Avatar>
          // </ButtonBase>
          <IconButton
            size="medium"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleLeftDrawerToggle}
            color="primary"
          >
            {!opened ? <List /> : <X />}
          </IconButton>
        )}
      </Box>

      {matchUpMd && isLoadingEvent && (
        <Box
          sx={{
            marginLeft: 2,
            display: "flex",
            flexDirection: "column",
            [theme.breakpoints.down("md")]: {
              width: "auto",
            },
          }}
        >
          <Skeleton
            variant="rectangular"
            width={300}
            height={24}
            sx={{
              mb: 1,
            }}
          />
          <Skeleton variant="rectangular" width={250} height={16} />
        </Box>
      )}
      {matchUpMd && !isLoadingEvent && event && (
        <Box
          sx={{
            marginLeft: 2,
            display: "flex",
            width: "100%",
            flexDirection: "column",
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography
              fontWeight={600}
              fontSize={16}
              color={theme.palette.onPrimaryContainer.main}
            >
              {event.title}
            </Typography>

            <Tooltip
              title={
                <Typography fontSize={12}>Ver página de preview</Typography>
              }
            >
              <IconButton
                component="a"
                size="small"
                href={`/evento/${event.slug}`}
                target="_blank"
              >
                <ArrowSquareOut />
              </IconButton>
            </Tooltip>
          </Stack>
          <Typography
            fontWeight={400}
            fontSize={12}
            color={theme.palette.text.disabled}
          >
            {`De: ${format(
              new Date(event.start_date),
              "dd 'de' MMM 'de' yyyy, 'às' HH:mm"
            )} - Até: ${format(
              new Date(event.end_date),
              "dd 'de' MMM 'de' yyyy, 'às' HH:mm"
            )}`}
          </Typography>
        </Box>
      )}

      {!matchUpMd && (
        <Box
          sx={{
            marginLeft: 2,
            width: "100%",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <img
            src={LogoWhite}
            width="40"
            alt="Logo Organizza"
            draggable="false"
          />
        </Box>
      )}

      <ProfileSection />
    </>
  );
};

export default Header;
