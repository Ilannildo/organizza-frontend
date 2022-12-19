import { ITicketPriceType } from "../models/ticket";

export function validateCpf(cpf: string) {
  let Soma;
  let Resto;
  Soma = 0;

  if (cpf === "00000000000") {
    return false;
  }

  for (let i = 1; i <= 9; i++) {
    Soma += parseInt(cpf.substring(i - 1, i), 10) * (11 - i);
  }

  Resto = (Soma * 10) % 11;

  if (Resto === 10 || Resto === 11) {
    Resto = 0;
  }

  if (Resto !== parseInt(cpf.substring(9, 10), 10)) {
    return false;
  }

  Soma = 0;
  for (let i = 1; i <= 10; i++) {
    Soma += parseInt(cpf.substring(i - 1, i), 10) * (12 - i);
  }

  Resto = (Soma * 10) % 11;

  if (Resto === 10 || Resto === 11) {
    Resto = 0;
  }
  if (Resto !== parseInt(cpf.substring(10, 11), 10)) {
    return false;
  }
  return true;
}

export const validateEmail = (email: string) => {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export const calculateFee = ({
  ticket_price_type,
  value,
}: {
  ticket_price_type: ITicketPriceType;
  value: number;
}) => {
  let fee = 0;
  // verificar se o ingresso é gratuito
  // verificar se a taxa é repassada para o participante
  if (!ticket_price_type.is_free && ticket_price_type.quote) {
    // recebe o valor mínimo
    fee = ticket_price_type.quote.min_base_value;
    // calcular a taxa
    if (value >= ticket_price_type.quote.min_value) {
      fee = value * ticket_price_type.quote.percentage;
    }

    // calcular o valor do ingresso
    // calcular o valor a receber por ingresso
    // if (includeFee) {
    //   ticketValue = value + fee;
    //   ticketValueReceived = value;
    // } else {
    //   ticketValue = value;
    //   ticketValueReceived = value > 0 ? value - fee : value;
    // }
  }
  return fee;
};
