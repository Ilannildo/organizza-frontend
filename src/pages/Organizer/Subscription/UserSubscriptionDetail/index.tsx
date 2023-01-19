import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { Printer } from "phosphor-react";
import { Params, useParams } from "react-router-dom";
import { useSubscriptionById } from "../../../../stores/subscription";
import {
  formatCurrency,
  getServiceOrderStatus,
  getServiceOrderStatusBackgroundColor,
  getServiceOrderStatusColor,
  getSubscriptionStatus,
  getSubscriptionStatusBackgroundColor,
  getSubscriptionStatusColor,
} from "../../../../utils/masks";

interface IParams extends Params {
  subscriptionId: string;
}

export const UserSubscriptionDetail = () => {
  const { subscriptionId } = useParams<IParams>();

  const { data: subscription, isLoading: isLoadingSubscription } =
    useSubscriptionById(
      {
        subscription_id: subscriptionId,
      },
      {
        enabled: !!subscriptionId,
      }
    );

  return (
    <>
      {isLoadingSubscription ? (
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
        subscription && (
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
                      Inscrição {subscription.code}
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
                            {subscription.participant.name}
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
                            {subscription.participant.email}
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
                                {subscription.ticket.title}
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
                                {subscription.ticket.is_free
                                  ? `GRÁTIS`
                                  : formatCurrency(subscription.ticket.price)}
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
                                <Chip
                                  label={getSubscriptionStatus(
                                    subscription.status
                                  )}
                                  sx={{
                                    backgroundColor:
                                      getSubscriptionStatusBackgroundColor(
                                        subscription.status
                                      ),
                                    color: getSubscriptionStatusColor(
                                      subscription.status
                                    ),
                                    fontWeight: 500,
                                  }}
                                />
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
                      Informações do evento
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
                            Título
                          </Typography>
                          <Typography
                            fontSize={14}
                            sx={{
                              color: (theme) =>
                                theme.palette.onPrimaryContainer.main,
                              fontWeight: 500,
                            }}
                          >
                            {subscription.event.title}
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
                            Local
                          </Typography>
                          <Typography
                            fontSize={14}
                            sx={{
                              color: (theme) =>
                                theme.palette.onPrimaryContainer.main,
                              fontWeight: 500,
                            }}
                          >
                            {subscription.event.place}
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
                            Data de início
                          </Typography>
                          <Typography
                            fontSize={14}
                            sx={{
                              color: (theme) =>
                                theme.palette.onPrimaryContainer.main,
                              fontWeight: 500,
                            }}
                          >
                            {format(
                              new Date(subscription.event.start_date),
                              "dd 'de' MMMM 'de' yyyy 'às' HH:mm"
                            )}
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
                            Data de término
                          </Typography>
                          <Typography
                            fontSize={14}
                            sx={{
                              color: (theme) =>
                                theme.palette.onPrimaryContainer.main,
                              fontWeight: 500,
                            }}
                          >
                            {format(
                              new Date(subscription.event.end_date),
                              "dd 'de' MMMM 'de' yyyy 'às' HH:mm"
                            )}
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
                      Resumo da inscrição
                    </Typography>
                  }
                  action={
                    <Tooltip title="Imprimir comprovante">
                      <IconButton size="small" color="primary">
                        <Printer size={24} />
                      </IconButton>
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
                            Código de referência
                          </Typography>
                          <Typography
                            fontSize={14}
                            sx={{
                              color: (theme) =>
                                theme.palette.onPrimaryContainer.main,
                              fontWeight: 500,
                            }}
                          >
                            {subscription.summary.code_ref}
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
                            Forma de pagamento
                          </Typography>
                          <Typography
                            fontSize={14}
                            sx={{
                              color: (theme) =>
                                theme.palette.onPrimaryContainer.main,
                              fontWeight: 500,
                            }}
                          >
                            {subscription.summary.payment_method
                              ? subscription.summary.payment_method
                              : `-`}
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
                            Data de pagamento
                          </Typography>
                          <Typography
                            fontSize={14}
                            sx={{
                              color: (theme) =>
                                theme.palette.onPrimaryContainer.main,
                              fontWeight: 500,
                            }}
                          >
                            {subscription.summary.payment_date
                              ? format(
                                  new Date(subscription.summary.payment_date),
                                  "dd 'de' MMMM 'de' yyyy 'às' HH:mm"
                                )
                              : `-`}
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
                            Data de inscrição
                          </Typography>
                          <Typography
                            fontSize={14}
                            sx={{
                              color: (theme) =>
                                theme.palette.onPrimaryContainer.main,
                              fontWeight: 500,
                            }}
                          >
                            {format(
                              new Date(subscription.summary.subscription_date),
                              "dd 'de' MMMM 'de' yyyy 'às' HH:mm"
                            )}
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
                            {formatCurrency(subscription.summary.value || 0)}
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
                            Taxa
                          </Typography>
                          <Typography
                            fontSize={14}
                            sx={{
                              color: (theme) =>
                                theme.palette.onPrimaryContainer.main,
                              fontWeight: 500,
                            }}
                          >
                            {formatCurrency(subscription.summary.fee || 0)}
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
                            Total
                          </Typography>
                          <Typography
                            fontSize={14}
                            sx={{
                              color: (theme) =>
                                theme.palette.onPrimaryContainer.main,
                              fontWeight: 500,
                            }}
                          >
                            {formatCurrency(subscription.summary.amount_total)}
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
                            Status do pagamento
                          </Typography>
                          <Typography
                            fontSize={14}
                            sx={{
                              color: (theme) =>
                                theme.palette.onPrimaryContainer.main,
                              fontWeight: 500,
                            }}
                          >
                            <Chip
                              label={getServiceOrderStatus(
                                subscription.summary.status_payment
                              )}
                              sx={{
                                backgroundColor:
                                  getServiceOrderStatusBackgroundColor(
                                    subscription.summary.status_payment
                                  ),
                                color: getServiceOrderStatusColor(
                                  subscription.summary.status_payment
                                ),
                                fontWeight: 500,
                              }}
                            />
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
