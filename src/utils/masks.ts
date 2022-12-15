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
