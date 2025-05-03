import { useEffect, useState } from "react";
import { AuthContext } from "./authContext";

async function fetchUser(): Promise<boolean> {
  try {
    const response = await fetch("http://localhost:4647/check-session", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return false;
  }
}

// Create a provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loggedUser, setLoggedUser] = useState<string>("");

  const refreshAuthStatus = () => {
    if (document.cookie.includes("token")) {
      console.log("Token found in cookies");
      fetchUser().then((authStatus) => {
        setIsAuthenticated(authStatus);
      });
    } else {
      setIsAuthenticated(false);
      setLoggedUser("");
    }
  };

  useEffect(() => {
    refreshAuthStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, refreshAuthStatus, loggedUser, setLoggedUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
