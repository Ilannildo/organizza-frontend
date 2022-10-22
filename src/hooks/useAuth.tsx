import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  return authContext;
}