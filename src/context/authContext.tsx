import { createContext } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  refreshAuthStatus: () => void;
  loggedUser: string;
  setLoggedUser: (userName: string) => void;
};

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: true,
  refreshAuthStatus: () => {},
  loggedUser: "",
  setLoggedUser: () => {},
});
