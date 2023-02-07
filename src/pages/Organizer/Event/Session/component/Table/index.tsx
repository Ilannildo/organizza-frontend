import {
  Chip,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { format } from "date-fns";
import { PencilSimple, TrashSimple } from "phosphor-react";
import { useState } from "react";

import { Params, useParams } from "react-router-dom";
import config from "../../../../../../config";
import { ISessionType } from "../../../../../../models/sessionType";
import { useSessionBySessionTypeId } from "../../../../../../stores/sessionTypes";
import {
  formatCurrency,
  getEventStatus,
  getEventStatusBackgroundColor,
  getEventStatusColor,
} from "../../../../../../utils/masks";

interface IColumn {
  id: "code_ref" | "title";
  label: string;
  minWidth?: number;
  align?: "right" | "center" | "left";
  format?: (value: boolean | number | string) => string;
}

const columns: readonly IColumn[] = [
  { id: "code_ref", label: "Código", minWidth: 100 },
  { id: "title", label: "Título", minWidth: 250 },
];

interface ISessionTable {
  sessionType: ISessionType;
}

interface IParams extends Params {
  eventId: string;
}

export const SessionTable = ({ sessionType }: ISessionTable) => {
  const { eventId } = useParams<IParams>();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { data: sessionResponse } = useSessionBySessionTypeId(
    {
      eventId: eventId || "",
      sessionTypeId: sessionType?.id || "",
      limit: rowsPerPage,
      page,
    },
    {
      enabled: !!sessionType?.id && !!eventId,
    }
  );
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
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
        <Table sx={{ minWidth: 500 }} stickyHeader aria-label="sticky table">
          <>
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
                <TableCell style={{ minWidth: 100, fontWeight: 500 }}>
                  Data de início
                </TableCell>
                <TableCell style={{ minWidth: 100, fontWeight: 500 }}>
                  Data de término
                </TableCell>
                <TableCell style={{ minWidth: 50, fontWeight: 500 }}>
                  Valor
                </TableCell>
                <TableCell style={{ minWidth: 50, fontWeight: 500 }}>
                  Status
                </TableCell>
                <TableCell style={{ minWidth: 100, fontWeight: 500 }}>
                  Ações
                </TableCell>
              </TableRow>
            </TableHead>
            {sessionResponse && (
              <TableBody>
                {sessionResponse.sessions.map((row) => {
                  return (
                    <TableRow
                      hover
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                      role="checkbox"
                      tabIndex={-1}
                      key={row.id}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      })}
                      <TableCell>
                        {`${format(
                          new Date(row.start_date),
                          "dd 'de' MMM 'de' yyyy 'às' HH:mm"
                        )}`}
                      </TableCell>
                      <TableCell>
                        {`${format(
                          new Date(row.end_date),
                          "dd 'de' MMM 'de' yyyy 'às' HH:mm"
                        )}`}
                      </TableCell>
                      <TableCell>
                        {!row.is_free ? formatCurrency(row.value) : "Grátis"}
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
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <IconButton
                            // disabled={mutation.isLoading}
                            size="small"
                            color="warning"
                            onClick={() => {
                              // handleToEditUser(row.id)
                            }}
                          >
                            <PencilSimple size={24} />
                          </IconButton>
                          <IconButton
                            // disabled={mutation.isLoading}
                            size="small"
                            color="error"
                            onClick={() => {
                              // setOpenDeleteUser(row.id);
                              // mutation.mutate(row.id);
                            }}
                          >
                            <TrashSimple size={24} />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            )}
          </>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={config.rowsPerPage}
        component="div"
        count={sessionResponse !== undefined ? sessionResponse.total : 0}
        rowsPerPage={rowsPerPage}
        page={sessionResponse !== undefined ? page : 0}
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
