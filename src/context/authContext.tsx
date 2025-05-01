import { createContext } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  refreshAuthStatus: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: true,
  refreshAuthStatus: () => {},
});
