import { useContext } from "react";
import { CurrentUserContext } from "./context";

export const useUserContext = () => {
  return useContext(CurrentUserContext);
};
