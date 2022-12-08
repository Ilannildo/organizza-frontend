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
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { PencilSimple, TrashSimple } from "phosphor-react";
import { useState } from "react";
import { ISession } from "../../../../../../models/session";

interface IColumn {

  id: "ref_code" | "title";
  label: string;
  minWidth?: number;
  align?: "right" | "center" | "left";
  format?: (value: boolean | number | string) => string;
}

const columns: readonly IColumn[] = [
  { id: "ref_code", label: "Código", minWidth: 80 },
  { id: "title", label: "Título", minWidth: 250 },
];

export const SessionTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const session: ISession[] = [
    {
      id: "1",
      ref_code: "121",
      title: "Criando jogos 3D",
      summary: "Teste",
      responsible_name: "Natanel G.",
      event_id: "123",
      session_type_id: "555",
      place: "Laboratório de informática",
      start_date: new Date(),
      start_time: new Date(),
      end_date: new Date(),
      end_time: new Date(),
      status: "published",
    },
    {
      id: "2",
      ref_code: "121",
      title: "Criando jogos 3D",
      summary: "Teste",
      responsible_name: "Natanel G.",
      event_id: "123",
      session_type_id: "555",
      place: "Laboratório de informática",
      start_date: new Date(),
      start_time: new Date(),
      end_date: new Date(),
      end_time: new Date(),
      status: "published",
    }
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
            <Button variant="contained" disableElevation color="info" size="small" onClick={() => { }}>
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
                  Data e hora
                </TableCell>
                <TableCell style={{ minWidth: 100, fontWeight: 500 }}>
                  Valor
                </TableCell>
                <TableCell style={{ minWidth: 100, fontWeight: 500 }}>
                  Ações
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {session.map((row) => {
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
                      {`${format(row.start_date, "dd 'de' MMM 'de' yyyy", {locale: ptBR})}, 
                        ${format(row.start_time, "HH:mm", {locale: ptBR})} - 
                        ${format(row.end_time, "HH:mm", {locale: ptBR})}`}
                    </TableCell>
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
        count={session !== undefined ? session.length : 0}
        rowsPerPage={rowsPerPage}
        page={session !== undefined ? page : 0}
        labelRowsPerPage="Registros por página"
        labelDisplayedRows={({ from, to, count }) => {
          return `Exibindo de ${from} até ${to} de ${count !== -1 ? count : `mais de ${to}`
            }`;
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};
