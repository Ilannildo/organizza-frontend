import { useContext } from "react"
import { EventCheckoutContext } from "../contexts/EventCheckout";

export const useEventCheckout = () => {
  const context = useContext(EventCheckoutContext);
  return context;
}