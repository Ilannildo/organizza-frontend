export function stringAvatar(name: string, width: number, height: number) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      width,
      height,
    },
    children: `${name.replace(/\s(de|da|dos|das)\s/g, " ").split(" ")[0][0]}`,
  };
}

export const maskCpf = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};

export const maskZipCode = (value: string) => {
  return value.replace(/^(\d{5})(\d)/, "$1-$2");
};

export const maskPhoneNumber = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d)(\d{4})$/, "$1-$2");
};

export function removeMaskCpf(value: string) {
  return value.replace(/[^\d]+/g, "");
}

export function maskCreditCard(value: string) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{4})(\d)/, "$1 $2")
    .replace(/(\d{4})(\d)/, "$1 $2")
    .replace(/(\d{4})(\d{1,2})/, "$1 $2");
}

export function maskCreditCardText(value: string) {
  // return value
  //   .replace(/\D/g, "")
  //   .replace(/(\d{4})(\d)/, "****")
  //   .replace(/(\d{4})(\d)/, "****")
  //   .replace(/(\d{4})(\d)/, "$1 $2");
  let hideNum = [];
  for (let i = 0; i < value.length; i++) {
    if (i < value.length - 4) {
      hideNum.push("*");
    } else {
      hideNum.push(value[i]);
    }
  }
  return hideNum.slice(11, hideNum.length).join("");
}

export function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export const getEventStatus = (
  status: "published" | "started" | "finished"
) => {
  if (status === "published") return "Publicado";
  if (status === "started") return "Cadastrado";
  if (status === "finished") return "Encerrado";
};

export const getEventStatusColor = (
  status: "published" | "started" | "finished"
) => {
  if (status === "published") return "#A1E3CB";
  if (status === "started") return "#F19413";
  if (status === "finished") return "#C2C7CF";
  return "#00D488";
};

export const currencyMask = (value: number) => {
  return value.toLocaleString("pt-br", { minimumFractionDigits: 2 });
};

export const removeCurrencyMask = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d)(\d{2})$/, "$1,$2")
    .replace(/(?=(\d{3})+(\D))\B/g, "")
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
    .replace(/[.]/g, "")
    .replace(/[,]/g, ".");
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount);
};

export const getReturnValuesCounter = (countDown: number) => {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  let minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((countDown % (1000 * 60)) / 1000);
  
  minutes = seconds >= 30 ? minutes + 1 : minutes;

  minutes = minutes % 60;

  return [days, hours, minutes, seconds];
};

export function padTo2Digits(num: number) {
  return num.toString().padStart(2, "0");
}
