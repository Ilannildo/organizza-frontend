import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import { PencilSimple } from "phosphor-react";
import { useAuthenticatedUser } from "../../../stores/user";

export const UserAccount = () => {
  const { data: user, isLoading: isLoadingUser } = useAuthenticatedUser();

  return (
    <>
      {isLoadingUser ? (
        <Grid container spacing={2}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Card variant="elevation" elevation={0}>
              <CardHeader
                sx={{
                  backgroundColor: (theme) => theme.palette.neutral.main,
                }}
                title={
                  <Typography
                    fontSize={14}
                    sx={{
                      color: (theme) => theme.palette.onSurfaceVariant.main,
                      fontWeight: 500,
                    }}
                  >
                    Inscrição COD-123
                  </Typography>
                }
              />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item lg={6} md={6} xs={12}>
                    <Grid container spacing={2}>
                      <Grid item lg={12} md={12} xs={12}>
                        <Typography
                          fontSize={12}
                          sx={{
                            color: (theme) => theme.palette.text.disabled,
                            fontWeight: 500,
                          }}
                        >
                          Nome do participante
                        </Typography>
                        <Typography
                          fontSize={14}
                          sx={{
                            color: (theme) =>
                              theme.palette.onPrimaryContainer.main,
                            fontWeight: 500,
                          }}
                        >
                          Ilannildo Viana da Cruz
                        </Typography>
                      </Grid>
                      <Grid item lg={12} md={12} xs={12}>
                        <Typography
                          fontSize={12}
                          sx={{
                            color: (theme) => theme.palette.text.disabled,
                            fontWeight: 500,
                          }}
                        >
                          Email do participante
                        </Typography>
                        <Typography
                          fontSize={14}
                          sx={{
                            color: (theme) =>
                              theme.palette.onPrimaryContainer.main,
                            fontWeight: 500,
                          }}
                        >
                          ilannildoviana12@gmail.com
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item lg={6} md={6} xs={12}>
                    <Card
                      elevation={0}
                      sx={{
                        backgroundColor: "rgba(221,227,234,0.4)",
                        height: "100%",
                      }}
                    >
                      <Box
                        sx={{
                          backgroundColor: (theme) =>
                            theme.palette.success.main,
                          height: 4,
                        }}
                      />
                      <CardContent>
                        <Grid container spacing={2}>
                          <Grid item lg={6} md={6} xs={12}>
                            <Typography
                              fontSize={12}
                              sx={{
                                color: (theme) => theme.palette.text.disabled,
                                fontWeight: 500,
                              }}
                            >
                              Ingresso
                            </Typography>
                            <Typography
                              fontSize={14}
                              sx={{
                                color: (theme) =>
                                  theme.palette.onPrimaryContainer.main,
                                fontWeight: 500,
                              }}
                            >
                              Nome do ingresso
                            </Typography>
                          </Grid>
                          <Grid item lg={3} md={3} xs={12}>
                            <Typography
                              fontSize={12}
                              sx={{
                                color: (theme) => theme.palette.text.disabled,
                                fontWeight: 500,
                              }}
                            >
                              Valor
                            </Typography>
                            <Typography
                              fontSize={14}
                              sx={{
                                color: (theme) =>
                                  theme.palette.onPrimaryContainer.main,
                                fontWeight: 500,
                              }}
                            >
                              GRÁTIS
                            </Typography>
                          </Grid>
                          <Grid item lg={3} md={3} xs={12}>
                            <Typography
                              fontSize={12}
                              sx={{
                                color: (theme) => theme.palette.text.disabled,
                                fontWeight: 500,
                              }}
                            >
                              Status
                            </Typography>
                            <Typography
                              fontSize={14}
                              sx={{
                                color: (theme) =>
                                  theme.palette.onPrimaryContainer.main,
                                fontWeight: 500,
                              }}
                            >
                              Confirmado
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ) : (
        user && (
          <Grid container spacing={2}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Card variant="elevation" elevation={0}>
                <CardHeader
                  sx={{
                    backgroundColor: (theme) => theme.palette.neutral.main,
                  }}
                  title={
                    <Typography
                      fontSize={14}
                      sx={{
                        color: (theme) => theme.palette.onSurfaceVariant.main,
                        fontWeight: 500,
                      }}
                    >
                      Dados pessoais
                    </Typography>
                  }
                  action={
                    <Tooltip title="Editar dados pessoais">
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<PencilSimple size={16} />}
                      >
                        Editar
                      </Button>
                    </Tooltip>
                  }
                />
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item lg={6} md={6} xs={12}>
                      <Grid container spacing={2}>
                        <Grid item lg={12} md={12} xs={12}>
                          <Typography
                            fontSize={12}
                            sx={{
                              color: (theme) => theme.palette.text.disabled,
                              fontWeight: 500,
                            }}
                          >
                            Nome
                          </Typography>
                          <Typography
                            fontSize={14}
                            sx={{
                              color: (theme) =>
                                theme.palette.onPrimaryContainer.main,
                              fontWeight: 500,
                            }}
                          >
                            {user.name}
                          </Typography>
                        </Grid>
                        <Grid item lg={12} md={12} xs={12}>
                          <Typography
                            fontSize={12}
                            sx={{
                              color: (theme) => theme.palette.text.disabled,
                              fontWeight: 500,
                            }}
                          >
                            Email
                          </Typography>
                          <Typography
                            fontSize={14}
                            sx={{
                              color: (theme) =>
                                theme.palette.onPrimaryContainer.main,
                              fontWeight: 500,
                            }}
                          >
                            {user.email}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item lg={6} md={6} xs={12}>
                      <Grid container spacing={2}>
                        <Grid item lg={12} md={12} xs={12}>
                          <Typography
                            fontSize={12}
                            sx={{
                              color: (theme) => theme.palette.text.disabled,
                              fontWeight: 500,
                            }}
                          >
                            Gênero
                          </Typography>
                          <Typography
                            fontSize={14}
                            sx={{
                              color: (theme) =>
                                theme.palette.onPrimaryContainer.main,
                              fontWeight: 500,
                            }}
                          >
                            {user.gender || `-`}
                          </Typography>
                        </Grid>
                        <Grid item lg={12} md={12} xs={12}>
                          <Typography
                            fontSize={12}
                            sx={{
                              color: (theme) => theme.palette.text.disabled,
                              fontWeight: 500,
                            }}
                          >
                            Telefone (contato)
                          </Typography>
                          <Typography
                            fontSize={14}
                            sx={{
                              color: (theme) =>
                                theme.palette.onPrimaryContainer.main,
                              fontWeight: 500,
                            }}
                          >
                            {user.phone || `-`}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Card variant="elevation" elevation={0}>
                <CardHeader
                  sx={{
                    backgroundColor: (theme) => theme.palette.neutral.main,
                  }}
                  title={
                    <Typography
                      fontSize={14}
                      sx={{
                        color: (theme) => theme.palette.onSurfaceVariant.main,
                        fontWeight: 500,
                      }}
                    >
                      Endereço
                    </Typography>
                  }
                  action={
                    <Tooltip title="Editar endereço">
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<PencilSimple size={16} />}
                      >
                        Editar
                      </Button>
                    </Tooltip>
                  }
                />
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item lg={6} md={6} xs={12}>
                      <Grid container spacing={2}>
                        <Grid item lg={12} md={12} xs={12}>
                          <Typography
                            fontSize={12}
                            sx={{
                              color: (theme) => theme.palette.text.disabled,
                              fontWeight: 500,
                            }}
                          >
                            Logradouro (rua/avenida)
                          </Typography>
                          <Typography
                            fontSize={14}
                            sx={{
                              color: (theme) =>
                                theme.palette.onPrimaryContainer.main,
                              fontWeight: 500,
                            }}
                          >
                            -
                          </Typography>
                        </Grid>
                        <Grid item lg={12} md={12} xs={12}>
                          <Typography
                            fontSize={12}
                            sx={{
                              color: (theme) => theme.palette.text.disabled,
                              fontWeight: 500,
                            }}
                          >
                            Bairro
                          </Typography>
                          <Typography
                            fontSize={14}
                            sx={{
                              color: (theme) =>
                                theme.palette.onPrimaryContainer.main,
                              fontWeight: 500,
                            }}
                          >
                            -
                          </Typography>
                        </Grid>
                        <Grid item lg={12} md={12} xs={12}>
                          <Typography
                            fontSize={12}
                            sx={{
                              color: (theme) => theme.palette.text.disabled,
                              fontWeight: 500,
                            }}
                          >
                            Cidade
                          </Typography>
                          <Typography
                            fontSize={14}
                            sx={{
                              color: (theme) =>
                                theme.palette.onPrimaryContainer.main,
                              fontWeight: 500,
                            }}
                          >
                            -
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item lg={6} md={6} xs={12}>
                      <Grid container spacing={2}>
                        <Grid item lg={12} md={12} xs={12}>
                          <Typography
                            fontSize={12}
                            sx={{
                              color: (theme) => theme.palette.text.disabled,
                              fontWeight: 500,
                            }}
                          >
                            Número
                          </Typography>
                          <Typography
                            fontSize={14}
                            sx={{
                              color: (theme) =>
                                theme.palette.onPrimaryContainer.main,
                              fontWeight: 500,
                            }}
                          >
                            -
                          </Typography>
                        </Grid>
                        <Grid item lg={12} md={12} xs={12}>
                          <Typography
                            fontSize={12}
                            sx={{
                              color: (theme) => theme.palette.text.disabled,
                              fontWeight: 500,
                            }}
                          >
                            CEP
                          </Typography>
                          <Typography
                            fontSize={14}
                            sx={{
                              color: (theme) =>
                                theme.palette.onPrimaryContainer.main,
                              fontWeight: 500,
                            }}
                          >
                            -
                          </Typography>
                        </Grid>
                        <Grid item lg={12} md={12} xs={12}>
                          <Typography
                            fontSize={12}
                            sx={{
                              color: (theme) => theme.palette.text.disabled,
                              fontWeight: 500,
                            }}
                          >
                            Estado
                          </Typography>
                          <Typography
                            fontSize={14}
                            sx={{
                              color: (theme) =>
                                theme.palette.onPrimaryContainer.main,
                              fontWeight: 500,
                            }}
                          >
                            -
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Card variant="elevation" elevation={0}>
                <CardHeader
                  sx={{
                    backgroundColor: (theme) => theme.palette.neutral.main,
                  }}
                  title={
                    <Typography
                      fontSize={14}
                      sx={{
                        color: (theme) => theme.palette.onSurfaceVariant.main,
                        fontWeight: 500,
                      }}
                    >
                      Conta de repasse (Recebedor)
                    </Typography>
                  }
                />
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item lg={6} md={6} xs={12}>
                      <Grid container spacing={2}>
                        <Grid item lg={12} md={12} xs={12}>
                          <Typography
                            fontSize={12}
                            sx={{
                              color: (theme) => theme.palette.text.disabled,
                              fontWeight: 500,
                            }}
                          >
                            Titular
                          </Typography>
                          <Typography
                            fontSize={14}
                            sx={{
                              color: (theme) =>
                                theme.palette.onPrimaryContainer.main,
                              fontWeight: 500,
                            }}
                          >
                            -
                          </Typography>
                        </Grid>
                        <Grid item lg={12} md={12} xs={12}>
                          <Typography
                            fontSize={12}
                            sx={{
                              color: (theme) => theme.palette.text.disabled,
                              fontWeight: 500,
                            }}
                          >
                            Banco
                          </Typography>
                          <Typography
                            fontSize={14}
                            sx={{
                              color: (theme) =>
                                theme.palette.onPrimaryContainer.main,
                              fontWeight: 500,
                            }}
                          >
                            -
                          </Typography>
                        </Grid>
                        <Grid item lg={12} md={12} xs={12}>
                          <Typography
                            fontSize={12}
                            sx={{
                              color: (theme) => theme.palette.text.disabled,
                              fontWeight: 500,
                            }}
                          >
                            Conta
                          </Typography>
                          <Typography
                            fontSize={14}
                            sx={{
                              color: (theme) =>
                                theme.palette.onPrimaryContainer.main,
                              fontWeight: 500,
                            }}
                          >
                            -
                          </Typography>
                        </Grid>
                        <Grid item lg={12} md={12} xs={12}>
                          <Typography
                            fontSize={12}
                            sx={{
                              color: (theme) => theme.palette.text.disabled,
                              fontWeight: 500,
                            }}
                          >
                            Status
                          </Typography>
                          <Typography
                            fontSize={14}
                            sx={{
                              color: (theme) =>
                                theme.palette.onPrimaryContainer.main,
                              fontWeight: 500,
                            }}
                          >
                            -
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item lg={6} md={6} xs={12}>
                      <Grid container spacing={2}>
                        <Grid item lg={12} md={12} xs={12}>
                          <Typography
                            fontSize={12}
                            sx={{
                              color: (theme) => theme.palette.text.disabled,
                              fontWeight: 500,
                            }}
                          >
                            Documento (CPF)
                          </Typography>
                          <Typography
                            fontSize={14}
                            sx={{
                              color: (theme) =>
                                theme.palette.onPrimaryContainer.main,
                              fontWeight: 500,
                            }}
                          >
                            -
                          </Typography>
                        </Grid>
                        <Grid item lg={12} md={12} xs={12}>
                          <Typography
                            fontSize={12}
                            sx={{
                              color: (theme) => theme.palette.text.disabled,
                              fontWeight: 500,
                            }}
                          >
                            Agência
                          </Typography>
                          <Typography
                            fontSize={14}
                            sx={{
                              color: (theme) =>
                                theme.palette.onPrimaryContainer.main,
                              fontWeight: 500,
                            }}
                          >
                            -
                          </Typography>
                        </Grid>
                        <Grid item lg={12} md={12} xs={12}>
                          <Typography
                            fontSize={12}
                            sx={{
                              color: (theme) => theme.palette.text.disabled,
                              fontWeight: 500,
                            }}
                          >
                            DV
                          </Typography>
                          <Typography
                            fontSize={14}
                            sx={{
                              color: (theme) =>
                                theme.palette.onPrimaryContainer.main,
                              fontWeight: 500,
                            }}
                          >
                            -
                          </Typography>
                        </Grid>
                        <Grid item lg={12} md={12} xs={12}>
                          <Typography
                            fontSize={12}
                            sx={{
                              color: (theme) => theme.palette.text.disabled,
                              fontWeight: 500,
                            }}
                          >
                            Criado em
                          </Typography>
                          <Typography
                            fontSize={14}
                            sx={{
                              color: (theme) =>
                                theme.palette.onPrimaryContainer.main,
                              fontWeight: 500,
                            }}
                          >
                            -
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )
      )}
    </>
  );
};
