import { useEffect, useState, useCallback } from "react";
import { AuthContext } from "./authContext";

async function fetchUser(): Promise<boolean> {
  try {
    const response = await fetch("/api/check-session", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Response from check-session:", response);
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

  const refreshAuthStatus = useCallback(() => {
    try {
      fetchUser().then((authStatus) => {
        setIsAuthenticated(authStatus);
        if (!loggedUser) {
          setLoggedUser(localStorage.getItem("loggedUser") || "");
        }
      });
    } catch (error) {
      console.error("Error in refreshAuthStatus:", error);
    }
  }, [loggedUser]);

  useEffect(() => {
    refreshAuthStatus();
  }, [refreshAuthStatus]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, refreshAuthStatus, loggedUser, setLoggedUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
