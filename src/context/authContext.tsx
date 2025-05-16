import { createContext } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  refreshAuthStatus: () => void;
  loggedUser: string;
  setLoggedUser: (userName: string) => void;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: true,
  refreshAuthStatus: () => {},
  loggedUser: "",
  setLoggedUser: () => {},
  loading: false,
});
