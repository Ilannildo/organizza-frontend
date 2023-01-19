import {
  Chip,
  CircularProgress,
  Grid,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { ArrowRight } from "phosphor-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../../../../config";
import LoaderProgress from "../../../../../layout/LoaderProgress";
import { useUserSubscriptions } from "../../../../../stores/subscription";
import { useAuthenticatedUser } from "../../../../../stores/user";
import {
  getSubscriptionStatus,
  getSubscriptionStatusBackgroundColor,
  getSubscriptionStatusColor,
} from "../../../../../utils/masks";

interface IColumn {
  id: "code" | "event_title" | "start_date" | "subscription_date" | "status";
  label: string;
  minWidth?: number;
  align?: "right" | "center" | "left";
  format?: (value: number) => string;
}

const columns: readonly IColumn[] = [
  { id: "code", label: "Código", minWidth: 75 },
  { id: "event_title", label: "Evento", minWidth: 200 },
  {
    id: "start_date",
    label: "Data de início",
    minWidth: 150,
  },
  {
    id: "subscription_date",
    label: "Data da inscrição",
    minWidth: 150,
  },
  {
    id: "status",
    label: "Status",
    minWidth: 75,
  },
];

interface IUserSubscriptionTable {
  searchTerm: string;
}

export const UserSubscriptionTable = ({
  searchTerm,
}: IUserSubscriptionTable) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

  const { data: user } = useAuthenticatedUser();
  const {
    data: userSubscriptionsResponse,
    isLoading: isLoadingUserSubscriptions,
  } = useUserSubscriptions(
    {
      user_id: user?.uid,
      page,
      limit: rowsPerPage,
      search: searchTerm,
    },
    {
      enabled: !!user,
    }
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const goToSubscriptionDetail = (subscriptionId: string) => {
    navigate(`/organizador/inscricoes/${subscriptionId}`);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <TableContainer
        sx={{
          minHeight: 280,
        }}
      >
        {isLoadingUserSubscriptions ? (
          <>
            <Grid container>
              <Grid item lg={12} xs={12} textAlign="center">
                <CircularProgress size={32} color="primary" />
                <Typography>Buscando suas inscrições :)</Typography>
              </Grid>
            </Grid>
            <LoaderProgress />
          </>
        ) : (
          userSubscriptionsResponse && (
            <>
              <Table
                sx={{ minWidth: 400 }}
                stickyHeader
                aria-label="sticky table"
              >
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth, fontWeight: 500 }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                    <TableCell style={{ minWidth: 50, fontWeight: 500 }}>
                      Ações
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userSubscriptionsResponse.subscriptions.map((row) => (
                    <TableRow
                      hover
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                      tabIndex={-1}
                      key={row.id}
                    >
                      <TableCell>{row.code}</TableCell>
                      <TableCell>{row.event_title}</TableCell>
                      <TableCell>
                        {format(
                          new Date(row.start_date),
                          "dd/MM/yyyy 'às' HH:mm"
                        )}
                      </TableCell>
                      <TableCell>
                        {format(
                          new Date(row.subscription_date),
                          "dd/MM/yyyy 'às' HH:mm"
                        )}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={getSubscriptionStatus(row.status)}
                          sx={{
                            backgroundColor:
                              getSubscriptionStatusBackgroundColor(row.status),
                            color: getSubscriptionStatusColor(row.status),
                            fontWeight: 500,
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <Tooltip title="Ver detalhes">
                            <IconButton
                              // disabled={mutation.isLoading}
                              size="medium"
                              color="primary"
                              onClick={() => {
                                goToSubscriptionDetail(row.id);
                              }}
                            >
                              <ArrowRight size={24} />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          )
        )}
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={config.rowsPerPage}
        component="div"
        count={
          userSubscriptionsResponse !== undefined
            ? userSubscriptionsResponse.total
            : 0
        }
        rowsPerPage={rowsPerPage}
        page={userSubscriptionsResponse !== undefined ? page : 0}
        labelRowsPerPage="Registros por página"
        labelDisplayedRows={({ from, to, count }) => {
          return `Exibindo de ${from} até ${to} de ${
            count !== -1 ? count : `mais de ${to}`
          }`;
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};
