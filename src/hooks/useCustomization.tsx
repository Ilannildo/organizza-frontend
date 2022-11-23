import { useContext } from "react"
import { CustomizationContext } from "../contexts/CustomizationContext";

export const useCustomization = () => {
  const context = useContext(CustomizationContext);
  return context;
}