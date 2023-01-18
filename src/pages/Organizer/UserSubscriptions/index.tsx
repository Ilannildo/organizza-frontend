import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { MagnifyingGlass } from "phosphor-react";
import { UserSubscriptionTable } from "./Table";

export const UserSubscriptions = () => {
  const theme = useTheme();
  return (
    <Grid container>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Card variant="elevation" elevation={0}>
          <CardHeader
            sx={{
              backgroundColor: theme.palette.neutral.main,
            }}
            title={
              <Typography
                fontSize={14}
                sx={{
                  color: (theme) => theme.palette.onSurfaceVariant.main,
                  fontWeight: 500,
                }}
              >
                Inscrições
              </Typography>
            }
            action={
              <TextField
                placeholder="Buscar por evento ou código"
                variant="standard"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MagnifyingGlass />
                    </InputAdornment>
                  ),
                }}
              />
            }
          />
          <CardContent>
            <UserSubscriptionTable />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
