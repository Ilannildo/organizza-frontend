import {
  Button,
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
  Typography,
} from "@mui/material";
import { PencilSimple, TrashSimple } from "phosphor-react";
import { useState } from "react";
import { ITicket } from "../../../../../../models/ticket";

interface IColumn {

  id: "id" | "category_title" | "participant_limit" | "sold" | "value";
  label: string;
  minWidth?: number;
  align?: "right" | "center" | "left";
  format?: (value: boolean | number | string) => string;
}

const columns: readonly IColumn[] = [
  {id: "id", label: "Código", minWidth: 80 },
  { id: "category_title", label: "Título", minWidth: 250 },
  {
    id: "participant_limit",
    label: "Data e hora",
    minWidth: 100,
  },
  {
    id: "value",
    label: "Vagas",
    minWidth: 100,
  },
];

export const SessionTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const tickets: ITicket[] = [
    {
      category_title: "Criando jogos 3D",
      description: "Teste",
      due_date: new Date(),
      due_time: new Date(),
      event_id: "123",
      id: "1",
      sold: 10,
      include_fee: true,
      participant_limit: 21,
      start_date: new Date(),
      start_time: new Date(),
      ticket_price_type_id: "123",
      value: 34.0,
    },
  ];

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
      <Grid container alignItems="center" rowSpacing={2} mb={2}>
        <Grid item xl={6} lg={6} xs={6}>
          <Typography
            component="h1"
            variant="h3"
            sx={{
              fontWeight: 600,
              fontSize: 16,
            }}
          >
           Cursos
          </Typography>
        </Grid>
        <Grid
          item
          xl={6}
          lg={6}
          xs={6}
          alignItems="center"
          justifyContent="center"
        >
          <Stack direction="row" spacing={2} justifyContent="end">
            <Button variant="contained" disableElevation color="info" size="small" onClick={() => {}}>
              Adicionar Curso
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <TableContainer sx={{
        minHeight: 280
      }}>
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
                  Valor
                </TableCell>
                <TableCell style={{ minWidth: 100, fontWeight: 500 }}>
                  Ações
                </TableCell>
              </TableRow>
            </TableHead>
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
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                    <TableCell>
                      Grátis
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
