import PropTypes from "prop-types";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  ButtonBase,
  Divider,
  IconButton,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { ArrowSquareOut, List } from "phosphor-react";
import { format } from "date-fns";
import NotificationSection from "../NotificationSection";
import ProfileSection from "../ProfileSection";
import { IEvent } from "../../../../models/event";

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

interface IHeader {
  handleLeftDrawerToggle: () => void;
  event?: IEvent;
  isLoadingEvent: boolean;
}

const Header = ({ handleLeftDrawerToggle, event, isLoadingEvent }: IHeader) => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <>
      <Box
        sx={{
          marginLeft: matchUpMd ? 32 : 0,
          display: "flex",
          [theme.breakpoints.down("md")]: {
            width: "auto",
          },
        }}
      >
        {!matchUpMd && (
          <ButtonBase sx={{ borderRadius: "12px", overflow: "hidden" }}>
            <Avatar
              variant="rounded"
              sx={{
                transition: "all .2s ease-in-out",
                background: theme.palette.primaryContainer.main,
                color: theme.palette.primary.main,
                "&:hover": {
                  background: theme.palette.secondary.dark,
                  color: theme.palette.secondary.light,
                },
              }}
              onClick={handleLeftDrawerToggle}
              color="primary"
            >
              <List size="1.3rem" />
            </Avatar>
          </ButtonBase>
        )}
      </Box>

      {isLoadingEvent && (
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
      {!isLoadingEvent && event && (
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
              "dd 'de' MMM 'de' yyyy"
            )}, às ${format(
              new Date(event.start_time),
              "HH:mm"
            )} - Até: ${format(
              new Date(event.end_date),
              "dd 'de' MMM 'de' yyyy"
            )}, às ${format(new Date(event.end_time), "HH:mm")}`}
          </Typography>
        </Box>
      )}

      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 1 }} />

      {/* notification & profile */}
      <NotificationSection />
      <Divider
        orientation="vertical"
        flexItem
        variant="middle"
        sx={{
          color: theme.palette.surfaceVariant.main,
        }}
      />
      <ProfileSection />
    </>
  );
};

Header.propTypes = {
  handleLeftDrawerToggle: PropTypes.func,
};

export default Header;
