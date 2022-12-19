import { useState } from "react";
import {
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
import { PencilSimple, TrashSimple } from "phosphor-react";
import { Params, useParams } from "react-router-dom";
import { useTicketsByEventId } from "../../../../../../stores/ticket";
import { formatCurrency } from "../../../../../../utils/masks";
import { calculateFee } from "../../../../../../utils/roles";

interface IColumn {
  id: "category_title" | "participant_limit" | "sold" | "value";
  label: string;
  minWidth?: number;
  align?: "right" | "center" | "left";
  format?: (value: number) => string;
}

const columns: readonly IColumn[] = [
  { id: "category_title", label: "Título do ingresso", minWidth: 250 },
  {
    id: "participant_limit",
    label: "Quantidade",
    minWidth: 100,
  },
  {
    id: "sold",
    label: "Vendidos",
    minWidth: 100,
  },
  {
    id: "value",
    label: "Valor",
    minWidth: 100,
    format: (value) => formatCurrency(value),
  },
];

interface IEventTicketParams extends Params {
  eventId: string;
}

export const TicketTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { eventId } = useParams<IEventTicketParams>();
  const { data: tickets } = useTicketsByEventId({
    eventId,
  });
  // const tickets: ITicket[] = [
  //   {
  //     category_title: "Alunos",
  //     description: "Teste",
  //     due_date: new Date(),
  //     due_time: new Date(),
  //     event_id: "123",
  //     id: "123",
  //     sold: 10,
  //     include_fee: true,
  //     participant_limit: 50,
  //     start_date: new Date(),
  //     start_time: new Date(),
  //     ticket_price_type_id: "123",
  //     value: 1.0,
  //   },
  // ];

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
                  Taxa
                </TableCell>
                <TableCell style={{ minWidth: 100, fontWeight: 500 }}>
                  Ações
                </TableCell>
              </TableRow>
            </TableHead>
            {tickets && (
              <TableBody>
                {tickets.map((row) => {
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
                        if (
                          column.id === "value" &&
                          typeof value === "number" &&
                          column.format
                        ) {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format(value)}
                            </TableCell>
                          );
                        }
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      })}

                      <TableCell>
                        {row.ticket_price_type ? formatCurrency(
                          calculateFee({
                            ticket_price_type: row.ticket_price_type,
                            value: row.value,
                          })
                        ) : "R$ 0,00"}
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
        rowsPerPageOptions={[2, 5, 10]}
        component="div"
        count={tickets !== undefined ? tickets.length : 0}
        rowsPerPage={rowsPerPage}
        page={tickets !== undefined ? page : 0}
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
