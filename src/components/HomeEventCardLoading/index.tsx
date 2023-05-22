import {
  Box,
  Card,
  Grid,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

export const HomeEventCardLoading = () => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Card
      elevation={0}
      sx={{
        position: "relative",
        background: "rgba(20, 33, 61, 0.1)",
        m: 1,
      }}
    >
      <Grid
        minHeight={matchUpMd ? 350 : 200}
        height="100%"
        width="100%"
        sx={{
          display: "flex",
          justifyContent: "end",
          flexDirection: "column",
          p: 3,
        }}
        container
      >
        <Grid lg={12} md={12} sm={12} xs={12} item>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
            mb={2}
          >
            <Skeleton variant="text" width={200} height={50} />
          </Box>
          <Grid
            container
            spacing={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Grid
              lg={4}
              md={4}
              sm={12}
              xs={12}
              item
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Skeleton variant="text" width="100%" height={30} />
            </Grid>

            <Grid
              lg={4}
              md={4}
              sm={12}
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              item
            >
              <Skeleton variant="text" width="100%" height={30} />
            </Grid>

            <Grid
              lg={4}
              md={4}
              sm={12}
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              item
            >
              <Skeleton variant="text" width="100%" height={30} />
            </Grid>
          </Grid>
          <Grid lg={4} md={6} sm={6} xs={6} item>
            <Typography
              sx={{
                zIndex: 0,
                position: "absolute",
                // width: 600,
                height: { lg: 200, md: 200, sm: 70, xs: 60 },
                left: { lg: 52, md: 52, sm: 40, xs: 20 },
                top: -100,
                borderLeft: "4px solid #fff",
                // transform: rotate 90deg,
                transform: "translateY(100px)",
              }}
            ></Typography>
            <Typography
              sx={{
                zIndex: 0,
                position: "absolute",
                width: { lg: 650, md: 650, sm: 420, xs: 260 },
                height: 200,
                left: 0,
                top: { lg: -80, md: -80, sm: -220, xs: -230 },
                borderBottom: "4px solid #fff",
                // transform: rotate 90deg,
                transform: "translateY(100px)",
              }}
            ></Typography>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};
