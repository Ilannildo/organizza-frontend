import { useState } from "react";
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
import { AlignBottom, ArrowRight } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useAuthenticatedUser } from "../../../../stores/user";
import { useEventByUserId } from "../../../../stores/event";
import LoaderProgress from "../../../../layout/LoaderProgress";
import { getEventStatus, getEventStatusBackgroundColor, getEventStatusColor } from "../../../../utils/masks";
import config from "../../../../config";

interface IColumn {
  id: "title" | "start_date" | "end_date" | "status";
  label: string;
  minWidth?: number;
  align?: "right" | "center" | "left";
  format?: (value: number) => string;
}

const columns: readonly IColumn[] = [
  { id: "title", label: "Evento", minWidth: 200 },
  {
    id: "start_date",
    label: "Data de início",
    minWidth: 150,
  },
  {
    id: "end_date",
    label: "Data de término",
    minWidth: 150,
  },
  {
    id: "status",
    label: "Status",
    minWidth: 75,
  },
];

export const UserSubscriptionTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

  const { data: user } = useAuthenticatedUser();
  const { data: eventsByUser, isLoading: isLoadingEventsByUserId } =
    useEventByUserId(
      { user_id: user?.uid, page, limit: rowsPerPage },
      {
        enabled: !!user,
      }
    );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const goToEventPanel = (eventId: string) => {
    navigate(`/organizador/painel-evento/${eventId}`);
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
        {isLoadingEventsByUserId ? (
          <>
            <Grid container>
              <Grid item lg={12} xs={12} textAlign="center">
                <CircularProgress size={32} color="primary" />
                <Typography>Buscando eventos criados por você :)</Typography>
              </Grid>
            </Grid>
            <LoaderProgress />
          </>
        ) : (
          eventsByUser && (
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
                      Ingressos
                    </TableCell>
                    <TableCell style={{ minWidth: 50, fontWeight: 500 }}>
                      Ações
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {eventsByUser.events.map((row) => (
                    <TableRow
                      hover
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                      tabIndex={-1}
                      key={row.event_id}
                    >
                      <TableCell>{row.title}</TableCell>
                      <TableCell>
                        {format(
                          new Date(row.start_date),
                          "dd/MM/yyyy 'às' HH:mm"
                        )}
                      </TableCell>
                      <TableCell>
                        {format(
                          new Date(row.end_date),
                          "dd/MM/yyyy 'às' HH:mm"
                        )}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={getEventStatus(row.status)}
                          sx={{
                            backgroundColor: getEventStatusBackgroundColor(
                              row.status
                            ),
                            color: getEventStatusColor(row.status),
                            fontWeight: 500,
                          }}
                        />
                      </TableCell>
                      <TableCell>{row.tickets}</TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <Tooltip title="Ver detalhes">
                            <IconButton
                              // disabled={mutation.isLoading}
                              size="medium"
                              color="primary"
                              onClick={() => {
                                goToEventPanel(row.event_id);
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
        count={eventsByUser !== undefined ? eventsByUser.total : 0}
        rowsPerPage={rowsPerPage}
        page={eventsByUser !== undefined ? page : 0}
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
