import CreditCardOverlay from "../../assets/cards/credit-card-overlay.png";
import Logo from "../../assets/images/logo.svg";
import { maskCpf, maskCreditCard } from "../../utils/masks";
import { creditCardLogo } from "../../utils/roles";
import "./style.css";

interface ICreditCard {
  cardNumber: string;
  cardOwnerName: string;
  expirationDate: string;
  securityCode: string;
  userDocument: string;
  cardType: string;
  cvvFocus: boolean;
}

export const CreditCard = ({
  cardNumber,
  cardOwnerName,
  cardType,
  expirationDate,
  securityCode,
  userDocument,
  cvvFocus,
}: ICreditCard) => {
  const creditCard = creditCardLogo.find((card) => card.type === cardType);

  return (
    <>
      <div className={`card ${cvvFocus ? "card-rotate" : ""}`}>
        <div
          className="card__front card__part"
          style={{
            backgroundImage: `url(${CreditCardOverlay})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundColor: creditCard?.color || "#73777F",
          }}
        >
          <img
            className="card__front-square card__square"
            src={creditCard?.logo || Logo}
            alt=""
          />
          <p className="card_numer">
            {cardNumber ? maskCreditCard(cardNumber) : "**** **** **** ****"}
          </p>
          <div className="card__space-75">
            <p className="card__info">{cardOwnerName || "Nome completo"}</p>
            <p className="card__info">
              {userDocument ? `CPF: ${maskCpf(userDocument)}` : ""}
            </p>
          </div>
          <div className="card__space-25">
            <p className="card__info">{expirationDate || "MM/AAAA"}</p>
          </div>
        </div>

        <div
          className="card__back card__part"
          style={{
            backgroundImage: `url(${CreditCardOverlay})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundColor: creditCard?.color || "#73777F",
          }}
        >
          <div className="card__black-line"></div>
          <div className="card__back-content">
            <div className="card__secret">
              <p className="card__secret--last">{securityCode || "CVV"}</p>
            </div>
            <img
              className="card__back-square card__square"
              alt=""
              src={creditCard?.logo}
            />
          </div>
        </div>
      </div>
    </>
  );
};
