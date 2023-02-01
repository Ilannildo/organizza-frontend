import AmEx from "../assets/cards/amex.svg";
import DinersClub from "../assets/cards/diners.svg";
import Elo from "../assets/cards/elo.svg";
import Hipercard from "../assets/cards/hipercard.svg";
import MasterCard from "../assets/cards/mastercard-light.svg";
import Visa from "../assets/cards/visa-light.svg";
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
  }
  return fee;
};

export const formatExpirationDate = (value: string) => {
  return value
    .replace(
      /[^0-9]/g,
      "" // To allow only numbers
    )
    .replace(
      /^([2-9])$/g,
      "0$1" // To handle 3 > 03
    )
    .replace(
      /^(1{1})([3-9]{1})$/g,
      "0$1/$2" // 13 > 01/3
    )
    .replace(
      /^0{1,}/g,
      "0" // To handle 00 > 0
    )
    .replace(
      /^([0-1]{1}[0-9]{1})([0-9]{1,4}).*/g,
      "$1/$2" // To handle 113 > 11/3
    );
};

export const creditCardLogo = [
  {
    type: "visa",
    logo: Visa,
    color: "#192061",
  },
  {
    type: "american-express",
    logo: AmEx,
    color: "#629F86",
  },
  {
    type: "elo",
    logo: Elo,
    color: "#888e83",
  },
  {
    type: "mastercard",
    logo: MasterCard,
    color: "#374b5f",
  },
  {
    type: "hipercard",
    logo: Hipercard,
    color: "#bb1619",
  },
  {
    type: "diners-club",
    logo: DinersClub,
    color: "#888e83",
  },
];

export const creditCards = [
  {
    name: "Visa",
    length: "13,16",
    prefixes: "4",
    checkdigit: true,
    logo: Visa,
  },
  {
    name: "MasterCard",
    length: "16",
    prefixes: "51,52,53,54,55",
    checkdigit: true,
    logo: MasterCard,
  },
  {
    name: "DinersClub",
    length: "14,16",
    prefixes: "36,38,54,55",
    checkdigit: true,
    logo: Visa,
  },
  {
    name: "CarteBlanche",
    length: "14",
    prefixes: "300,301,302,303,304,305",
    checkdigit: true,
    logo: Visa,
  },
  {
    name: "AmEx",
    length: "15",
    prefixes: "34,37",
    checkdigit: true,
    logo: AmEx,
  },
  {
    name: "Discover",
    length: "16",
    prefixes: "6011,622,64,65",
    checkdigit: true,
    logo: Visa,
  },
  { name: "JCB", length: "16", prefixes: "35", checkdigit: true, logo: Visa },
  {
    name: "enRoute",
    length: "15",
    prefixes: "2014,2149",
    checkdigit: true,
    logo: Visa,
  },
  {
    name: "Solo",
    length: "16,18,19",
    prefixes: "6334,6767",
    checkdigit: true,
    logo: Visa,
  },
  {
    name: "Switch",
    length: "16,18,19",
    prefixes: "4903,4905,4911,4936,564182,633110,6333,6759",
    checkdigit: true,
    logo: Visa,
  },
  {
    name: "Maestro",
    length: "12,13,14,15,16,18,19",
    prefixes: "5018,5020,5038,6304,6759,6761,6762,6763",
    checkdigit: true,
    logo: Visa,
  },
  {
    name: "VisaElectron",
    length: "16",
    prefixes: "4026,417500,4508,4844,4913,4917",
    checkdigit: true,
    logo: Visa,
  },
  {
    name: "LaserCard",
    length: "16,17,18,19",
    prefixes: "6304,6706,6771,6709",
    checkdigit: true,
    logo: Visa,
  },
];

export function getNumberInWords(number: number): string {
  const unidades = [
    "",
    "Um",
    "Dois",
    "Três",
    "Quatro",
    "Cinco",
    "Seis",
    "Sete",
    "Oito",
    "Nove",
  ];
  const dezenas = [
    "Dez",
    "Vinte",
    "Trinta",
    "Quarenta",
    "Cinquenta",
    "Sessenta",
    "Setenta",
    "Oitenta",
    "Noventa",
  ];
  const dezenasComUnidade = [
    "Onze",
    "Doze",
    "Treze",
    "Quatorze",
    "Quinze",
    "Dezesseis",
    "Dezessete",
    "Dezoito",
    "Dezenove",
  ];

  if (number < 10) {
    return unidades[number];
  }
  if (number >= 10 && number < 20) {
    return dezenasComUnidade[number - 11];
  }
  if (number >= 20 && number < 100) {
    return (
      dezenas[Math.floor(number / 10) - 1] +
      (number % 10 !== 0 ? " e " + unidades[number % 10] : "")
    );
  }
  return "Valor fora do intervalo";
}

export function getOrdinalNumberInWords(number: number): string {
  const unidades = [
    "",
    "Primeiro",
    "Segundo",
    "Terceiro",
    "Quarto",
    "Quinto",
    "Sexto",
    "Sétimo",
    "Oitavo",
    "Nono",
  ];
  const dezenas = [
    "Décimo",
    "Vigésimo",
    "Trigésimo",
    "Quadragésimo",
    "Quinquagésimo",
    "Sexagésimo",
    "Septuagésimo",
    "Octogésimo",
    "Nonagésimo",
  ];
  const dezenasComUnidade = [
    "Décimo primeiro",
    "Décimo segundo",
    "Décimo terceiro",
    "Décimo quarto",
    "Décimo quinto",
    "Décimo sexto",
    "Décimo sétimo",
    "Décimo oitavo",
    "Décimo nono",
  ];

  if (number < 10) {
    return unidades[number];
  }
  if (number >= 10 && number < 20) {
    return dezenasComUnidade[number - 11];
  }
  if (number >= 20 && number < 100) {
    return (
      dezenas[Math.floor(number / 10) - 1] +
      (number % 10 !== 0 ? " e " + unidades[number % 10] : "")
    );
  }
  return "Valor fora do intervalo";
}
