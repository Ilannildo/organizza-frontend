import { creditCards } from "../utils/roles";

const validateCardNumber = (value: string) => {
  //Check if the number contains only numeric value
  //and is of between 13 to 19 digits
  const regex = new RegExp("^[0-9]{13,19}$");
  if (!regex.test(value)) {
    return false;
  }

  return luhnCheck(value);
};

const luhnCheck = (val: string) => {
  let checksum = 0; // running checksum total
  let j = 1; // takes value of 1 or 2

  // Process each digit one by one starting from the last
  for (let i = val.length - 1; i >= 0; i--) {
    let calc = 0;
    // Extract the next digit and multiply by 1 or 2 on alternative digits.
    calc = Number(val.charAt(i)) * j;

    // If the result is in two digits add 1 to the checksum total
    if (calc > 9) {
      checksum = checksum + 1;
      calc = calc - 10;
    }

    // Add the units element to the checksum total
    checksum = checksum + calc;

    // Switch the value of j
    if (j === 1) {
      j = 2;
    } else {
      j = 1;
    }
  }

  //Check if it is divisible by 10 or not.
  return checksum % 10 === 0;
};

export const checkCreditCard = (firstSixDigits: string) => {
  //Error messages
  const ccErrors = [];
  ccErrors[0] = "Unknown card type";
  ccErrors[1] = "No card number provided";
  ccErrors[2] = "Credit card number is in invalid format";
  ccErrors[3] = "Credit card number is invalid";
  ccErrors[4] = "Credit card number has an inappropriate number of digits";
  ccErrors[5] =
    "Warning! This credit card number is associated with a scam attempt";

  //Response format
  const response = (
    success: boolean,
    message: string | null = null,
    type: string | null = null
  ) => ({
    message,
    success,
    type,
  });

  if (firstSixDigits.length === 0) {
    return response(false, ccErrors[1]);
  }

  // Now remove any spaces from the credit card number
  // Update this if there are any other special characters like -
  firstSixDigits = firstSixDigits.replace(/\s/g, "");

  // Validate the format of the credit card
  // luhn's algorithm
  if (!validateCardNumber(firstSixDigits)) {
    return response(false, ccErrors[2]);
  }

  // Check it's not a spam number
  if (firstSixDigits === "5490997771092064") {
    return response(false, ccErrors[5]);
  }

  // The following are the card-specific checks we undertake.
  let lengthValid = false;
  let prefixValid = false;
  let cardCompany = "";

  // Check if card belongs to any organization
  for (let i = 0; i < creditCards.length; i++) {
    const prefix = creditCards[i].prefixes.split(",");

    for (let j = 0; j < prefix.length; j++) {
      const exp = new RegExp("^" + prefix[j]);
      if (exp.test(firstSixDigits)) {
        prefixValid = true;
      }
    }

    if (prefixValid) {
      const lengths = creditCards[i].length.split(",");
      // Now see if its of valid length;
      for (let j = 0; j < lengths.length; j++) {
        if (firstSixDigits.length.toString() === lengths[j]) {
          lengthValid = true;
        }
      }
    }

    if (lengthValid && prefixValid) {
      cardCompany = creditCards[i].name;
      return response(true, null, cardCompany);
    }
  }

  // If it isn't a valid prefix there's no point at looking at the length
  if (!prefixValid) {
    return response(false, ccErrors[3]);
  }

  // See if all is OK by seeing if the length was valid
  if (!lengthValid) {
    return response(false, ccErrors[4]);
  }

  // The credit card is in the required format.
  return response(true, null, cardCompany);
};
